export default function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <p className="section__label text-center">Our guarantee</p>
        <h2 className="section__title text-center">Designed around your day</h2>
        <div className="services-grid" style={{ marginTop: '2.5rem' }}>
          <article className="service-card">
            <h3>Customisable</h3>
            <p>
              Packages flex to your schedule, guest count, and the parts of the day
              that matter most to you.
            </p>
            <a href="#quote">See services →</a>
          </article>
          <article className="service-card">
            <h3>Pre-wedding shoot</h3>
            <p>
              Optional session to dial in style—modern, editorial, traditional, or
              candid—before the big day.
            </p>
            <a href="#work">Our work →</a>
          </article>
          <article className="service-card">
            <h3>All-day coverage</h3>
            <p>
              We cover the full arc of the wedding, not hourly slices, so nothing
              important is rushed.
            </p>
            <a href="#quote">Get free quote →</a>
          </article>
        </div>
      </div>
    </section>
  );
}
