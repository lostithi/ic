"use client";

import { useState, useTransition } from "react";
import { submitContactForm } from "@/app/actions/contact";
import {
  payloadFromFormData,
  validateContactPayload,
  type ContactFieldErrors,
} from "@/lib/contact";

const fieldClassName =
  "w-full border border-black bg-transparent px-4 py-3 font-mono-ui text-sm uppercase tracking-[0.08em] text-black outline-none transition duration-200 placeholder:text-black/40 focus:bg-black focus:text-[#ff2a00] focus:placeholder:text-[#ff2a00]/70";

const labelClassName =
  "mb-2 block font-mono-ui text-[11px] uppercase tracking-[0.2em]";

async function submitToNetlifyForms(form: HTMLFormElement) {
  const formData = new FormData(form);
  const body = new URLSearchParams();

  body.set("form-name", "contact");
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") {
      body.append(key, value);
    }
  }

  const response = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error(`Netlify Forms failed with ${response.status}`);
  }
}

export default function ContactForm() {
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});

  if (status === "success") {
    return (
      <div className="border border-black px-5 py-8 md:px-6">
        <p className="font-mono-ui text-[11px] uppercase tracking-[0.24em]">
          [SENT]
        </p>
        <p className="mt-4 font-display text-3xl font-bold uppercase italic tracking-[-0.05em] md:text-4xl">
          Message locked in.
        </p>
        <p className="mt-4 max-w-xl font-mono-ui text-sm uppercase leading-[1.6] tracking-[0.05em]">
          {message || "Message received. We'll get back to you shortly."}
        </p>
      </div>
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = payloadFromFormData(formData);
    const errors = validateContactPayload(payload);

    if (Object.keys(errors).length > 0) {
      setStatus("error");
      setFieldErrors(errors);
      setMessage("Check the highlighted fields and try again.");
      return;
    }

    setFieldErrors({});
    setMessage("");

    startTransition(async () => {
      try {
        const result = await submitContactForm(
          { status: "idle", message: "" },
          formData,
        );

        if (result.status === "success") {
          setStatus("success");
          setMessage(result.message);
          return;
        }

        if (result.status === "error") {
          setStatus("error");
          setFieldErrors(result.fieldErrors || {});
          setMessage(result.message);
          return;
        }

        // fallback or unexpected: Netlify Forms path
        await submitToNetlifyForms(form);
        setStatus("success");
        setMessage("Message received. We'll get back to you shortly.");
      } catch (error) {
        console.error(error);
        setStatus("error");
        setMessage(
          "Could not send right now. Email us directly at hello@illegalithi.com.",
        );
      }
    });
  }

  return (
    <form
      name="contact"
      method="POST"
      onSubmit={handleSubmit}
      className="space-y-5"
      noValidate
    >
      <input type="hidden" name="form-name" value="contact" />

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClassName}>
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={fieldClassName}
            placeholder="Your name"
          />
          {fieldErrors.name ? (
            <p className="mt-2 font-mono-ui text-[11px] uppercase tracking-[0.14em]">
              {fieldErrors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className={labelClassName}>
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClassName}
            placeholder="you@brand.com"
          />
          {fieldErrors.email ? (
            <p className="mt-2 font-mono-ui text-[11px] uppercase tracking-[0.14em]">
              {fieldErrors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="company" className={labelClassName}>
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            className={fieldClassName}
            placeholder="Brand / studio"
          />
        </div>

        <div>
          <label htmlFor="projectType" className={labelClassName}>
            Project type *
          </label>
          <select
            id="projectType"
            name="projectType"
            required
            defaultValue=""
            className={`${fieldClassName} appearance-none`}
          >
            <option value="" disabled>
              Select one
            </option>
            <option value="Web development">Web development</option>
            <option value="SEO">SEO</option>
            <option value="Strategy">Strategy</option>
            <option value="Full system">Full system</option>
          </select>
          {fieldErrors.projectType ? (
            <p className="mt-2 font-mono-ui text-[11px] uppercase tracking-[0.14em]">
              {fieldErrors.projectType}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="budget" className={labelClassName}>
          Budget range
        </label>
        <select
          id="budget"
          name="budget"
          defaultValue=""
          className={`${fieldClassName} appearance-none`}
        >
          <option value="">Prefer not to say</option>
          <option value="Under £2k">Under £2k</option>
          <option value="£2k–£5k">£2k–£5k</option>
          <option value="£5k–£10k">£5k–£10k</option>
          <option value="£10k+">£10k+</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClassName}>
          Project notes *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${fieldClassName} resize-y normal-case tracking-[0.04em]`}
          placeholder="What are you building, and what needs to feel sharper?"
        />
        {fieldErrors.message ? (
          <p className="mt-2 font-mono-ui text-[11px] uppercase tracking-[0.14em]">
            {fieldErrors.message}
          </p>
        ) : null}
      </div>

      <div
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="bot-field">Don’t fill this out</label>
        <input id="bot-field" name="bot-field" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" ? (
        <p
          aria-live="polite"
          className="border border-black px-4 py-3 font-mono-ui text-sm uppercase tracking-[0.08em]"
        >
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex border border-black bg-black px-5 py-3 font-mono-ui text-sm uppercase tracking-[0.16em] text-[#ff2a00] transition duration-200 hover:bg-transparent hover:text-black focus:bg-transparent focus:text-black disabled:cursor-wait disabled:opacity-60"
      >
        {pending ? "Sending..." : "Send project brief"}
      </button>
    </form>
  );
}
