import { siteContent } from "@/lib/content";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-end" id="top">
      <div className="w-full px-5 pb-8 pt-24 md:px-8 md:pb-10 md:pt-28">
        <div className="grid min-h-[calc(100vh-5rem)] grid-cols-1 gap-8 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-8">
            <div className="max-w-[1100px]">
              <h1 className="font-display leading-none uppercase italic">
                <span className="block text-[4.3rem] font-bold tracking-[-0.08em] sm:text-[5.6rem] md:text-[9rem] lg:text-[11rem] xl:text-[13rem]">
                  <span className="inline">{siteContent.hero.titleTop}</span>
                </span>

                <span className="block text-[4.2rem] font-bold tracking-[-0.08em] sm:text-[5.5rem] md:text-[8.8rem] lg:text-[10.8rem] xl:text-[12.8rem]">
                  <span className="inline-box">{siteContent.hero.titleBottom}</span>
                </span>
              </h1>
            </div>
          </div>

          <div className="md:col-span-4 md:flex md:items-center md:justify-center">
            <div className="hidden h-[320px] w-full max-w-[280px] border border-black/60 md:block" />
          </div>

          <div className="md:col-span-5">
            <p className="max-w-[32rem] font-mono-ui text-[0.95rem] uppercase leading-[1.35] tracking-[0.05em] text-black md:text-[1.05rem]">
              <span className="inline-tag">WEB</span>{" "}
              <span className="inline-tag">SEO</span>{" "}
              <span className="inline-tag">MARKETING</span>
              <br />
              <br />
              Cooking up <span className="inline-bar">sharper</span> digital systems for
              brands that want to feel less <span className="inline-box">template</span> and
              a lot more <span className="inline-cut">themselves</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}