export type ContactPayload = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
  honeypot: string;
};

export type ContactFieldErrors = Partial<
  Record<"name" | "email" | "projectType" | "message", string>
>;

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateContactPayload(payload: ContactPayload): ContactFieldErrors {
  const fieldErrors: ContactFieldErrors = {};

  if (payload.name.trim().length < 2) {
    fieldErrors.name = "Enter your name.";
  }

  if (!isValidEmail(payload.email.trim())) {
    fieldErrors.email = "Enter a valid email.";
  }

  if (!payload.projectType.trim()) {
    fieldErrors.projectType = "Select a project type.";
  }

  if (payload.message.trim().length < 12) {
    fieldErrors.message = "Tell us a bit more about the project.";
  }

  return fieldErrors;
}

export function payloadFromFormData(formData: FormData): ContactPayload {
  const asString = (value: FormDataEntryValue | null) =>
    typeof value === "string" ? value.trim() : "";

  return {
    name: asString(formData.get("name")),
    email: asString(formData.get("email")),
    company: asString(formData.get("company")),
    projectType: asString(formData.get("projectType")),
    budget: asString(formData.get("budget")),
    message: asString(formData.get("message")),
    honeypot: asString(formData.get("bot-field") || formData.get("company_website")),
  };
}
