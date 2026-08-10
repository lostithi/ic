import { getCloudflareContext } from "@opennextjs/cloudflare";
import { Resend } from "resend";
import {
  payloadFromFormData,
  validateContactPayload,
  type ContactFieldErrors,
} from "@/lib/contact";
import { brand } from "@/lib/brand";
import { siteContent } from "@/lib/content";

export type ContactResult = {
  status: "success" | "error";
  message: string;
  fieldErrors?: ContactFieldErrors;
};

function readEnv(key: string): string | undefined {
  const fromProcess = process.env[key];
  if (typeof fromProcess === "string" && fromProcess.length > 0) {
    return fromProcess;
  }

  try {
    const env = getCloudflareContext().env as Record<string, unknown>;
    const value = env[key];
    return typeof value === "string" && value.length > 0 ? value : undefined;
  } catch {
    return undefined;
  }
}

function resendFailureMessage(error: unknown): string {
  const raw =
    typeof error === "object" &&
    error &&
    "message" in error &&
    typeof (error as { message: unknown }).message === "string"
      ? (error as { message: string }).message
      : "";

  const lower = raw.toLowerCase();

  if (
    lower.includes("domain is not verified") ||
    lower.includes("not verified") ||
    lower.includes("invalid from") ||
    lower.includes("from address")
  ) {
    return "Sender email is not verified in Resend yet. Set CONTACT_FROM_EMAIL to Spine Studio <onboarding@resend.dev> until spinestudio.uk is verified.";
  }

  if (lower.includes("api key") || lower.includes("unauthorized")) {
    return "Resend API key is invalid. Check RESEND_API_KEY on the Worker.";
  }

  return `Could not send right now. Email us directly at ${brand.email}.`;
}

export async function processContactForm(
  formData: FormData,
): Promise<ContactResult> {
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

  const apiKey = readEnv("RESEND_API_KEY");
  const toEmail = readEnv("CONTACT_TO_EMAIL") || siteContent.contact.email;
  // Resend only allows custom from-addresses after domain verification.
  const fromEmail =
    readEnv("CONTACT_FROM_EMAIL") ||
    "Spine Studio <onboarding@resend.dev>";

  if (!apiKey) {
    console.error("RESEND_API_KEY is missing");
    return {
      status: "error",
      message: `The form is not connected yet. Email us directly at ${brand.email}.`,
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: payload.email,
      subject: `New project inquiry from ${payload.name}`,
      text: [
        "New Spine Studio inquiry",
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
        status: "error",
        message: resendFailureMessage(error),
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
      message: resendFailureMessage(error),
    };
  }
}
