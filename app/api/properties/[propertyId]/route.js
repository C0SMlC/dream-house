import { Hasura } from "@/utils/Hasura";
import { NextResponse } from "next/server";

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
    console.log(JSON.stringify(response.errors));
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
