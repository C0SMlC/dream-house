// app/api/agreements/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import argon2 from "argon2";
import { Hasura } from "@/utils/Hasura";
import { google } from "googleapis";

const setupGoogleCalendar = () => {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: privateKey.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  console.log(
    "Calender: ",
    process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n")
  );
  return google.calendar({ version: "v3", auth });
};

export async function POST(req) {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const adminAuth = cookieStore.get("adminAuth");

    if (!adminAuth) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const data = await req.json();
    const { password, days, ...agreementData } = data;

    // Verify password
    if (!process.env[password.toUpperCase()]) {
      return NextResponse.json(
        { success: false, error: "Invalid password" },
        { status: 401 }
      );
    }

    const isVerified = await argon2.verify(
      adminAuth.value,
      process.env[password.toUpperCase()]
    );

    if (!isVerified) {
      return NextResponse.json(
        { success: false, error: "Authentication failed" },
        { status: 401 }
      );
    }

    // Format dates for database
    const formattedData = {
      ...agreementData,
      start_date: agreementData.start_date
        ? new Date(agreementData.start_date).toISOString()
        : null,
      end_date: agreementData.end_date
        ? new Date(agreementData.end_date).toISOString()
        : null,
    };

    // Insert into database
    const mutation = `
      mutation InsertAgreement($data: rental_agreements_insert_input!) {
        insert_rental_agreements_one(object: $data) {
          id
        }
      }
    `;

    const response = await Hasura(mutation, {
      data: formattedData,
    });

    if (response.errors) {
      throw new Error(response.errors[0].message);
    }

    const agreementId = response.data.insert_rental_agreements_one.id;

    try {
      const calendar = setupGoogleCalendar();

      const event = {
        summary: `Rental Agreement Ending Soon: ${formattedData.token_no}`,
        location: formattedData.address,
        description: `
    REMINDER: This rental agreement will end on ${new Date(
      formattedData.end_date
    ).toLocaleDateString()}.
    
    Agreement Details:
    - Flat/Shop: ${formattedData.flat_shop_no}
    - Owner: ${formattedData.owner_name} (${formattedData.owner_phone})
    - Type: ${formattedData.type}
    - Tenant Phone: ${formattedData.tenant_phone}
    - Original Start Date: ${new Date(
      formattedData.start_date
    ).toLocaleDateString()}
    - End Date: ${new Date(formattedData.end_date).toLocaleDateString()}
  `,
        start: {
          // Start date 7 days before end date
          date: new Date(
            new Date(formattedData.end_date).getTime() - 7 * 24 * 60 * 60 * 1000
          )
            .toISOString()
            .split("T")[0],
          timeZone: "Asia/Kolkata",
        },
        end: {
          date: new Date(
            new Date(formattedData.end_date).getTime() -
              7 * 24 * 60 * 60 * 1000 +
              24 * 60 * 60 * 1000
          )
            .toISOString()
            .split("T")[0],
          timeZone: "Asia/Kolkata",
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: "email", minutes: 24 * 60 },
            { method: "popup", minutes: 60 },
          ],
        },
        colorId: formattedData.type === "Residential" ? "1" : "2",
      };

      const calendarEvent = await calendar.events.insert({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        resource: event,
      });

      console.log(
        "Calendar event created successfully:",
        calendarEvent.data.id
      );

      const updateMutation = `
        mutation UpdateAgreementCalendarId($id: Int!, $calendar_event_id: String!) {
          update_rental_agreements_by_pk(
            pk_columns: {id: $id},
            _set: {calendar_event_id: $calendar_event_id}
          ) {
            id
          }
        }
      `;

      await Hasura(updateMutation, {
        id: agreementId,
        calendar_event_id: calendarEvent.data.id,
      });
    } catch (calendarError) {
      console.error("Failed to create calendar event:", calendarError.message);
      console.error("Error details:", calendarError);
    }

    return NextResponse.json({
      success: true,
      id: agreementId,
    });
  } catch (error) {
    console.error("Error processing agreement:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const cookieStore = cookies();
    const adminAuth = cookieStore.get("adminAuth");

    if (!adminAuth) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const query = `
      query GetAgreements {
        rental_agreements(order_by: {created_at: desc}) {
          id
          address
          token_no
          flat_shop_no
          location
          owner_name
          owner_phone
          tenant_phone
          start_date
          end_date
          type
          calendar_event_id
          created_at
        }
      }
    `;

    const response = await Hasura(query);

    if (response.errors) {
      throw new Error(response.errors[0].message);
    }

    return NextResponse.json({
      success: true,
      data: response.data.rental_agreements,
    });
  } catch (error) {
    console.error("Error fetching agreements:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch agreements" },
      { status: 500 }
    );
  }
}
