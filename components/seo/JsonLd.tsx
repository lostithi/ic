import { brand } from "@/lib/brand";

export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: brand.name,
    url: brand.url,
    email: brand.email,
    description: brand.description,
    slogan: brand.tagline,
    areaServed: "Worldwide",
    serviceType: ["Web Development", "SEO", "Digital Strategy"],
    brand: {
      "@type": "Brand",
      name: brand.name,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
