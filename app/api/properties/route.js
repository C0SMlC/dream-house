import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { z } from "zod";

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
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
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
    Key: fileName,
    Body: buffer,
    ContentType: file.type,
  });

  await s3.send(command);

  return `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${fileName}`;
}

export async function POST(req) {
  try {
    const formData = await req.formData();

    const jsonFields = JSON.parse(formData.get("json"));
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

    const propertyResponse = await fetch(
      process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
        },
        body: JSON.stringify({
          query: propertyMutation,
          variables: {
            data: parsedData,
          },
        }),
      }
    );

    const propertyResult = await propertyResponse.json();
    if (propertyResult.errors) {
      throw new Error(propertyResult.errors[0].message);
    }

    const propertyId = propertyResult.data.insert_properties_one.id;

    if (photoUrls.length > 0) {
      const photosMutation = `
        mutation InsertPhotos($objects: [property_photos_insert_input!]!) {
          insert_property_photos(objects: $objects) {
            affected_rows
          }
        }
      `;

      await fetch(process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
        },
        body: JSON.stringify({
          query: photosMutation,
          variables: {
            objects: photoUrls.map((url) => ({
              property_id: propertyId,
              photo_url: url,
            })),
          },
        }),
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

      await fetch(process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
        },
        body: JSON.stringify({
          query: videosMutation,
          variables: {
            objects: videoUrls.map((url) => ({
              property_id: propertyId,
              video_url: url,
            })),
          },
        }),
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

export async function GET(req) {
  try {
    // Get type from URL parameters
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    if (!type) {
      throw new Error("Type parameter is required");
    }

    // Validate type parameter
    if (!["Sell", "Rent", "PG"].includes(type)) {
      throw new Error("Invalid type parameter");
    }

    const propertyQuery = `
      query getProperties($type:listing_type_enum) {
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

    const propertyResponse = await fetch(
      process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
        },
        body: JSON.stringify({
          query: propertyQuery,
          variables: { type },
        }),
      }
    );

    const properties = await propertyResponse.json();
    if (properties.errors) {
      throw new Error(properties.errors[0].message);
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: properties,
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
