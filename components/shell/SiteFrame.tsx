import SiteHeader from "@/components/shell/SiteHeader";

export default function SiteFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-transparent text-[var(--spine-white)]">
      <SiteHeader />
      <div className="relative min-h-screen">
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}
