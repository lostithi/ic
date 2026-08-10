import LeftRail from "@/components/shell/LeftRail";
import MobileNav from "@/components/shell/MobileNav";
import TopStatus from "@/components/shell/TopStatus";

export default function SiteFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#ff2a00] text-black">
      <MobileNav />
      <LeftRail />

      <div className="relative min-h-screen pt-14 md:ml-[72px] md:pt-0">
        <div className="hidden md:block">
          <TopStatus />
        </div>

        <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
          <div className="h-full w-full bg-[linear-gradient(to_bottom,transparent_0%,transparent_calc(100%-1px),rgba(0,0,0,0.28)_100%)] bg-[length:100%_4px]" />
        </div>

        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}
