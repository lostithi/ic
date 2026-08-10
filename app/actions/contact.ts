"use server";

import { Resend } from "resend";
import { siteContent } from "@/lib/content";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<
    Record<"name" | "email" | "projectType" | "message", string>
  >;
};

const initialMessage = "";

export const contactInitialState: ContactFormState = {
  status: "idle",
  message: initialMessage,
};

function asString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const honeypot = asString(formData.get("company_website"));
  if (honeypot) {
    return {
      status: "success",
      message: "Message received. We'll get back to you shortly.",
    };
  }

  const name = asString(formData.get("name"));
  const email = asString(formData.get("email"));
  const company = asString(formData.get("company"));
  const projectType = asString(formData.get("projectType"));
  const budget = asString(formData.get("budget"));
  const message = asString(formData.get("message"));

  const fieldErrors: ContactFormState["fieldErrors"] = {};

  if (name.length < 2) {
    fieldErrors.name = "Enter your name.";
  }

  if (!isValidEmail(email)) {
    fieldErrors.email = "Enter a valid email.";
  }

  if (!projectType) {
    fieldErrors.projectType = "Select a project type.";
  }

  if (message.length < 12) {
    fieldErrors.message = "Tell us a bit more about the project.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Check the highlighted fields and try again.",
      fieldErrors,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || siteContent.contact.email;
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL || "Illegalithi Creations <onboarding@resend.dev>";

  if (!apiKey) {
    console.error("RESEND_API_KEY is missing");
    return {
      status: "error",
      message:
        "The form is not connected yet. Email us directly at hello@illegalithi.com.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `New project inquiry from ${name}`,
      text: [
        "New Illegalithi Creations inquiry",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company || "—"}`,
        `Project type: ${projectType}`,
        `Budget: ${budget || "—"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return {
        status: "error",
        message:
          "Could not send right now. Email us directly at hello@illegalithi.com.",
      };
    }

    return {
      status: "success",
      message: "Message received. We'll get back to you shortly.",
    };
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      status: "error",
      message:
        "Could not send right now. Email us directly at hello@illegalithi.com.",
    };
  }
}
