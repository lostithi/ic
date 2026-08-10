import { NextResponse } from "next/server";
import { processContactForm } from "@/lib/submit-contact";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const result = await processContactForm(formData);
    return NextResponse.json(result, {
      status: result.status === "success" ? 200 : 400,
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Could not send right now. Please try again or email us directly.",
      },
      { status: 500 },
    );
  }
}
