// app/api/contact/route.js
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const createEmailTemplate = (data) => {
  const { name, email, phone, message, formType } = data;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          .email-container {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #1e40af;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
          }
          .content {
            padding: 20px;
            background-color: #f9fafb;
            border: 1px solid #e5e7eb;
          }
          .field {
            margin-bottom: 15px;
          }
          .field-label {
            font-weight: bold;
            color: #374151;
          }
          .field-value {
            margin-top: 5px;
            color: #1f2937;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h2>${
              formType === "contact"
                ? "New Contact Form Submission"
                : "New Rental Agreement Request"
            }</h2>
          </div>
          <div class="content">
            <div class="field">
              <div class="field-label">Name:</div>
              <div class="field-value">${name}</div>
            </div>
            <div class="field">
              <div class="field-label">Email:</div>
              <div class="field-value">${email}</div>
            </div>
            <div class="field">
              <div class="field-label">Phone:</div>
              <div class="field-value">${phone}</div>
            </div>
            ${
              message
                ? `
            <div class="field">
              <div class="field-label">Message:</div>
              <div class="field-value">${message}</div>
            </div>
            `
                : ""
            }
          </div>
        </div>
      </body>
    </html>
  `;
};

export async function POST(request) {
  try {
    const data = await request.json();
    const { formType = "contact" } = data;

    const mailOptions = {
      from: "contact@dreamhomesproperties.in",
      to: "dreamhomes.propertyconsultant1@gmail.com",
      subject:
        formType === "contact"
          ? "New Contact Form Submission - Dream Homes"
          : "New Rental Agreement Request - Dream Homes",
      html: createEmailTemplate(data),
      replyTo: data.email,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send email" },
      { status: 500 }
    );
  }
}
