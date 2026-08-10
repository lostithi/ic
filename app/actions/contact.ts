"use server";

import { Resend } from "resend";
import {
  payloadFromFormData,
  validateContactPayload,
  type ContactFieldErrors,
} from "@/lib/contact";
import { siteContent } from "@/lib/content";

export type ContactFormState = {
  status: "idle" | "success" | "error" | "fallback";
  message: string;
  fieldErrors?: ContactFieldErrors;
};

export const contactInitialState: ContactFormState = {
  status: "idle",
  message: "",
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const payload = payloadFromFormData(formData);

  if (payload.honeypot) {
    return {
      status: "success",
      message: "Message received. We'll get back to you shortly.",
    };
  }

  const fieldErrors = validateContactPayload(payload);
  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Check the highlighted fields and try again.",
      fieldErrors,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Client will submit through Netlify Forms instead.
    return {
      status: "fallback",
      message: "Using Netlify Forms.",
    };
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || siteContent.contact.email;
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL ||
    "Illegalithi Creations <onboarding@resend.dev>";

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: payload.email,
      subject: `New project inquiry from ${payload.name}`,
      text: [
        "New Illegalithi Creations inquiry",
        "",
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Company: ${payload.company || "—"}`,
        `Project type: ${payload.projectType}`,
        `Budget: ${payload.budget || "—"}`,
        "",
        "Message:",
        payload.message,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return {
        status: "fallback",
        message: "Resend failed; trying Netlify Forms.",
      };
    }

    return {
      status: "success",
      message: "Message received. We'll get back to you shortly.",
    };
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      status: "fallback",
      message: "Resend failed; trying Netlify Forms.",
    };
  }
}
