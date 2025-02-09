import argon2 from "argon2";
import { Hasura } from "@/utils/Hasura";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request, { params }) {
  let { propertyId } = await params;

  const getPropertyQuery = `query getProperty($id: Int!) {
    properties_by_pk(id: $id) {
      amenities
      availability
      balconies
      city
      created_at
      features
      flat_area
      furnishing
      house_no
      id
      locality
      location
      num_of_bathroom
      num_of_bedrooms
      other_rooms
      parking
      price
      property_on
      property_photos(where: {property_id: {_eq: $id}}) {
        photo_url
        created_at
      }
      property_videos(where: {property_id: {_eq: $id}}) {
        video_url
        created_at
      }
      society_building_features
      title
      total_floors
      type
      updated_at
    }
  }`;

  const response = await Hasura(getPropertyQuery, { id: Number(propertyId) });

  if (response.errors) {
    return NextResponse.json(
      {
        success: false,
        error: response.errors[0].message,
        stack:
          process.env.NEXT_PUBLIC_NODE_ENV === "development"
            ? response.errors[0].stack
            : undefined,
      },
      {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        },
      }
    );
  }

  return NextResponse.json(
    {
      success: true,
      data: response.data.properties_by_pk,
    },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      },
    }
  );
}

export async function DELETE(request, { params }) {
  // Destructure propertyId from params
  const { propertyId } = await params;

  // Get the admin cookie (which stores the hashed admin password)
  const cookieStore = await cookies();
  const adminCookie = cookieStore.get("adminAuth");

  console.log("adminCookie", adminCookie);
  if (!adminCookie) {
    return NextResponse.json(
      { success: false, message: "Admin authentication required." },
      { status: 401 }
    );
  }
  const storedHash = adminCookie.value;

  // Get the provided password from the request body
  let providedPassword;
  try {
    const body = await request.json();
    providedPassword = process.env[body.password.toUpperCase()];
    console.log(providedPassword);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  if (!providedPassword) {
    return NextResponse.json(
      { success: false, message: "Password is required." },
      { status: 400 }
    );
  }

  // Verify the provided password against the stored hash
  const isVerified = await argon2.verify(storedHash, providedPassword);
  if (!isVerified) {
    return NextResponse.json(
      { success: false, message: "Invalid admin password." },
      { status: 401 }
    );
  }

  const deletePropertyQuery = `
    mutation deleteProperty($propertyId: Int!) {
      delete_properties_by_pk(id: $propertyId) {
        id
      }
      delete_property_photos(where: { property_id: { _eq: $propertyId } }) {
        affected_rows
      }
      delete_property_videos(where: { property_id: { _eq: $propertyId } }) {
        affected_rows
      }
    }
  `;

  const response = await Hasura(deletePropertyQuery, {
    propertyId: Number(propertyId),
  });

  if (response.errors) {
    return NextResponse.json(
      {
        success: false,
        error: response.errors[0].message,
        stack:
          process.env.NEXT_PUBLIC_NODE_ENV === "development"
            ? response.errors[0].stack
            : undefined,
      },
      {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        },
      }
    );
  }

  return NextResponse.json(
    { success: true, data: null },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS DELETE",
      },
    }
  );
}
