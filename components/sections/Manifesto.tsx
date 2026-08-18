export default function Manifesto() {
  return (
    <section id="manifesto" className="vertebra-stop">
      <div className="vertebra-panel mf-rail-panel">
        <div className="mf-rail" aria-hidden>
          <span className="mf-rail-ticks">
            <span className="mf-rail-tick" />
            <span className="mf-rail-tick" />
            <span className="mf-rail-tick" />
            <span className="mf-rail-tick" />
          </span>
        </div>
        <div className="mf-rail-body">
          <p className="kicker-line mf-rail-kicker">[MANIFESTO]</p>
          <h2 className="mf-rail-thesis">
            They have a <span className="inline-box">structure</span> problem.
          </h2>
          <div className="mf-rail-notes">
            <span>Most brands do not have a visibility problem.</span>
            <span>Their website leans one way.</span>
            <span>Their search presence leans another.</span>
            <span>Their marketing bends with every weekly trend.</span>
            <span>We build the spine so all three stand upright.</span>
          </div>
          <p className="mf-rail-coda">
            Start at the head. Descend the system — one backbone for web, SEO,
            and strategy.
          </p>
        </div>
      </div>
    </section>
  );
}
