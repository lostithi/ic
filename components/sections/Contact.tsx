import ContactForm from "@/components/sections/ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="vertebra-stop">
      <div className="vertebra-panel ct-reveal-panel">
        <div className="ct-reveal-grid">
          <div className="ct-reveal-intro">
            <p className="kicker-line ct-reveal-kicker">[CONTACT]</p>
            <span className="ct-reveal-ghost" aria-hidden="true">
              Brief
            </span>
            <p className="ct-reveal-copy ct-reveal-copy--lead">
              Base of the spine. Drop your project notes below.
            </p>
          </div>
          <div className="ct-reveal-form">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
