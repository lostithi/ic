import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Process from "@/components/sections/Process";
import Services from "@/components/sections/Services";
import WorkPreview from "@/components/sections/WorkPreview";
import SiteFooter from "@/components/shell/SiteFooter";
import SiteFrame from "@/components/shell/SiteFrame";
import SpineJourney from "@/components/spine/SpineJourney";

export default function HomePage() {
  return (
    <SiteFrame>
      <SpineJourney>
        <main>
          <Hero />
          <Services />
          <Manifesto />
          <WorkPreview />
          <Process />
          <About />
          <Contact />
        </main>
        <SiteFooter />
      </SpineJourney>
    </SiteFrame>
  );
}
