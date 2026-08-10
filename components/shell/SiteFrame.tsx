import LeftRail from "@/components/shell/LeftRail";
import MobileNav from "@/components/shell/MobileNav";
import TopStatus from "@/components/shell/TopStatus";

export default function SiteFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-transparent text-[var(--spine-white)]">
      <MobileNav />
      <LeftRail />

      <div className="relative min-h-screen pt-14 md:ml-[88px] md:pt-0">
        <div className="hidden md:block">
          <TopStatus />
        </div>
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}
