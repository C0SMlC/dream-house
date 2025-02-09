import { Hasura } from "@/utils/Hasura";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { z } from "zod";
import argon2 from "argon2";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const propertySchema = z.object({
  title: z.string(),
  type: z.enum(["Sell", "Rent", "PG"]),
  property_type: z.enum(["Residential", "Commercial"]),
  location: z.string().nonempty(),
  city: z.string().nonempty(),
  locality: z.string().nonempty(),
  house_no: z.string().optional(),
  num_of_bedrooms: z.number().min(0).optional(),
  num_of_bathroom: z.number().min(0).optional(),
  price: z.number().min(0),
  balconies: z.number().min(0).optional(),
  flat_area: z.number().positive().optional(),
  other_rooms: z.string().optional(),
  furnishing: z.enum(["Furnished", "Semi-Furnished", "Unfurnished"]).optional(),
  parking: z.boolean().optional(),
  total_floors: z.number().min(0).optional(),
  property_on: z.number().min(0).optional(),
  availability: z.enum(["", "Ready to move", "Under Construction"]),
  amenities: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  society_building_features: z.array(z.string()).optional(),
});

async function uploadToS3(file, type) {
  // Convert the file to buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Clean the filename: replace all spaces with hyphens and trim
  const cleanFileName = file.name.replace(/\s+/g, "-").trim();
  const fileName = `${type}/${Date.now()}-${cleanFileName}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: buffer,
    ContentType: file.type,
  });

  await s3.send(command);

  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
}

export async function GET(req) {
  try {
    let url;
    try {
      url = new URL(
        req.url || "",
        `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}`
      );
    } catch (e) {
      console.error("URL parsing error:", e);
      throw new Error("Invalid request URL");
    }

    const type = url.searchParams.get("type");

    if (!type) {
      const propertyQuery = `
      query getProperties{
        properties{
          id
          title
          price
          city
          location
          type
          property_photos {
            photo_url
          } 
          num_of_bedrooms
        }
      }
    `;

      const response = await Hasura(propertyQuery);

      if (response.errors) {
        throw new Error(response.errors[0].message);
      }

      return new Response(
        JSON.stringify({
          success: true,
          data: response,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          },
        }
      );
    }

    if (!["Sell", "Rent", "PG"].includes(type)) {
      throw new Error("Invalid type parameter");
    }

    const propertyQuery = `
      query getProperties($type: listing_type_enum) {
        properties(where: {type: {_eq: $type}}) {
          id
          title
          price
          city
          location
          type
          property_photos {
            photo_url
          } 
          num_of_bedrooms
        }
      }
    `;

    const response = await Hasura(propertyQuery, { type });

    if (response.errors) {
      throw new Error(response.errors[0].message);
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: response,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        },
      }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        stack:
          process.env.NEXT_PUBLIC_NODE_ENV === "development"
            ? error.stack
            : undefined,
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        },
      }
    );
  }
}

export async function POST(req) {
  try {
    const cookieStore = await cookies();
    const adminAuth = cookieStore.get("adminAuth");

    if (!adminAuth) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const jsonFields = JSON.parse(formData.get("json"));
    const password = jsonFields.password.toUpperCase();

    if (!process.env[password]) {
      return NextResponse.json(
        { success: false, message: "Invalid key" },
        { status: 401 }
      );
    }

    const isVerified = await argon2.verify(
      adminAuth.value,
      process.env[password]
    );

    if (!isVerified) {
      return NextResponse.json(
        { success: false, message: "Invalid authentication" },
        { status: 401 }
      );
    }
    const parsedData = propertySchema.parse(jsonFields);

    const photos = formData.getAll("photos");
    const videos = formData.getAll("videos");

    const photoUrls = await Promise.all(
      photos.map(async (photo) => await uploadToS3(photo, "photos"))
    );
    const videoUrls = await Promise.all(
      videos.map(async (video) => await uploadToS3(video, "videos"))
    );

    const propertyMutation = `
      mutation AddProperty($data: properties_insert_input!) {
        insert_properties_one(object: $data) {
          id
        }
      }
    `;

    const propertyResponse = await Hasura(propertyMutation, {
      data: parsedData,
    });
    // const propertyResult = await propertyResponse.json();

    if (propertyResponse.errors) {
      throw new Error(propertyResponse.errors[0].message);
    }

    const propertyId = propertyResponse.data.insert_properties_one.id;

    if (photoUrls.length > 0) {
      const photosMutation = `
        mutation InsertPhotos($objects: [property_photos_insert_input!]!) {
          insert_property_photos(objects: $objects) {
            affected_rows
          }
        }
      `;

      await Hasura(photosMutation, {
        objects: photoUrls.map((url) => ({
          property_id: propertyId,
          photo_url: url,
        })),
      });
    }

    if (videoUrls.length > 0) {
      const videosMutation = `
        mutation InsertVideos($objects: [property_videos_insert_input!]!) {
          insert_property_videos(objects: $objects) {
            affected_rows
          }
        }
      `;

      await Hasura(videosMutation, {
        objects: videoUrls.map((url) => ({
          property_id: propertyId,
          video_url: url,
        })),
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        id: propertyId,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
