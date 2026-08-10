/** Public Formspree form id — safe to expose (same as a form action URL). */
export function getFormspreeEndpoint(): string | null {
  const id = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID?.trim();
  if (!id) return null;
  // Allow full URL or bare form id
  if (id.startsWith("http")) return id;
  return `https://formspree.io/f/${id}`;
}
