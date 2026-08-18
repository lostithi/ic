"use client";

import { useState, type FormEvent } from "react";
import {
  payloadFromFormData,
  validateContactPayload,
  type ContactFieldErrors,
} from "@/lib/contact";
import { getFormspreeEndpoint } from "@/lib/formspree";
import { brand } from "@/lib/brand";

type FormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: ContactFieldErrors;
};

const labelClassName =
  "mb-2 block font-mono-ui text-[11px] uppercase tracking-[0.2em]";

export default function ContactForm() {
  const [state, setState] = useState<FormState>({
    status: "idle",
    message: "",
  });
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = payloadFromFormData(formData);
    const fieldErrors = validateContactPayload(payload);

    if (Object.keys(fieldErrors).length > 0) {
      setState({
        status: "error",
        message: "Check the highlighted fields and try again.",
        fieldErrors,
      });
      return;
    }

    if (payload.honeypot) {
      setState({
        status: "success",
        message: "Message received. We'll get back to you shortly.",
      });
      return;
    }

    const endpoint = getFormspreeEndpoint();
    if (!endpoint) {
      setState({
        status: "error",
        message: `Formspree is not connected on this deploy. Email ${brand.email} or add NEXT_PUBLIC_FORMSPREE_FORM_ID and rebuild.`,
      });
      return;
    }

    // Formspree fields
    const body = new FormData();
    body.set("name", payload.name);
    body.set("email", payload.email);
    body.set("company", payload.company);
    body.set("projectType", payload.projectType);
    body.set("budget", payload.budget);
    body.set("message", payload.message);
    body.set("_subject", `Spine Studio inquiry from ${payload.name}`);
    body.set("_replyto", payload.email);

    setPending(true);
    setState({ status: "idle", message: "" });

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setState({
          status: "success",
          message: "Message received. We'll get back to you shortly.",
        });
        form.reset();
        return;
      }

      let detail = "";
      try {
        const data = (await response.json()) as {
          error?: string;
          errors?: Array<{ message?: string }>;
        };
        detail =
          data.error ||
          data.errors?.map((item) => item.message).filter(Boolean).join(" ") ||
          "";
      } catch {
        detail = "";
      }

      setState({
        status: "error",
        message:
          detail ||
          `Could not send right now. Email us directly at ${brand.email}.`,
      });
    } catch {
      setState({
        status: "error",
        message: `Could not send right now. Email us directly at ${brand.email}.`,
      });
    } finally {
      setPending(false);
    }
  }

  if (state.status === "success") {
    return (
      <div className="border border-white px-5 py-8 md:px-6">
        <p className="font-mono-ui text-[11px] uppercase tracking-[0.24em]">
          [SENT]
        </p>
        <p className="mt-4 font-display text-3xl font-bold uppercase italic tracking-[-0.05em] md:text-4xl">
          Message locked in.
        </p>
        <p className="mt-4 max-w-xl font-mono-ui text-sm uppercase leading-[1.6] tracking-[0.05em] text-white/75">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5"
      noValidate
      suppressHydrationWarning
    >
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
            className="field-spine"
            placeholder="Your name"
            suppressHydrationWarning
          />
          {state.fieldErrors?.name ? (
            <p className="mt-2 font-mono-ui text-[11px] uppercase tracking-[0.14em]">
              {state.fieldErrors.name}
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
            className="field-spine"
            placeholder="you@brand.com"
            suppressHydrationWarning
          />
          {state.fieldErrors?.email ? (
            <p className="mt-2 font-mono-ui text-[11px] uppercase tracking-[0.14em]">
              {state.fieldErrors.email}
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
            className="field-spine"
            placeholder="Brand / studio"
            suppressHydrationWarning
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
            className="field-spine appearance-none"
          >
            <option value="" disabled>
              Select one
            </option>
            <option value="Web development">Web development</option>
            <option value="SEO">SEO</option>
            <option value="Strategy">Strategy</option>
            <option value="Full system">Full system</option>
          </select>
          {state.fieldErrors?.projectType ? (
            <p className="mt-2 font-mono-ui text-[11px] uppercase tracking-[0.14em]">
              {state.fieldErrors.projectType}
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
          className="field-spine appearance-none"
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
          className="field-spine resize-y normal-case tracking-[0.04em]"
          placeholder="What needs a backbone?"
        />
        {state.fieldErrors?.message ? (
          <p className="mt-2 font-mono-ui text-[11px] uppercase tracking-[0.14em]">
            {state.fieldErrors.message}
          </p>
        ) : null}
      </div>

      <div
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="bot-field">Don’t fill this out</label>
        <input
          id="bot-field"
          name="bot-field"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {state.status === "error" ? (
        <p
          aria-live="polite"
          className="border border-white px-4 py-3 font-mono-ui text-sm uppercase tracking-[0.08em]"
        >
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="btn-solid disabled:opacity-60"
      >
        {pending ? "Sending..." : "Send project brief"}
      </button>
    </form>
  );
}
