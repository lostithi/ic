/** Public Formspree form id — safe to expose (same as a form action URL). */
const DEFAULT_FORM_ID = "xqpzqzav";

export function getFormspreeEndpoint(): string | null {
  const id = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID?.trim() || DEFAULT_FORM_ID;
  if (!id) return null;
  if (id.startsWith("http")) return id;
  return `https://formspree.io/f/${id}`;
}
