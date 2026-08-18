const services = [
  {
    id: "01",
    title: "WEB",
    content: (
      <>
        Focused websites built as brand{" "}
        <span className="inline-bar">structure</span> — clear hierarchy,
        stronger journeys, and pages that convert attention into{" "}
        <span className="inline-cut">action</span>.
      </>
    ),
  },
  {
    id: "02",
    title: "SEO",
    content: (
      <>
        Search architecture that supports the same story as the site: technical{" "}
        <span className="inline-box">clarity</span>, intent-led pages, and
        systems that help the right people{" "}
        <span className="inline-cut">find you</span>.
      </>
    ),
  },
  {
    id: "03",
    title: "STRATEGY",
    content: (
      <>
        Positioning and messaging that give the whole system a{" "}
        <span className="inline-bar">backbone</span> — so web and SEO are not
        guessing what the brand is supposed to be.
      </>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="vertebra-stop">
      <div className="vertebra-panel svc-panel">
        <div className="svc-head">
          <p className="kicker-line">[SERVICES]</p>
          <h2 className="svc-lede">
            Built for brands that need a <span className="inline-box">spine</span>
            , not another <span className="svc-stroke">template</span>.
          </h2>
        </div>
        <div>
          {services.map((item) => (
            <div key={item.id} className="svc-row">
              <h3 className="svc-title">{item.title}</h3>
              <p className="svc-copy">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
