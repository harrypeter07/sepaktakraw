import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Create a submission record for contact form
    const submission = await prisma.submission.create({
      data: {
        formKey: "contact",
        data: {
          name,
          email,
          subject,
          message,
          timestamp: new Date().toISOString()
        }
      }
    });

    return NextResponse.json(
      { 
        message: "Contact form submitted successfully",
        id: submission.id 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}
