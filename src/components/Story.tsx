export default function Story() {
  return (
    <section className="section" id="story">
      <div className="container intro-grid">
        <div>
          <div className="intro-stat">
            <div className="intro-stat__num">15+</div>
            <div className="intro-stat__text">Years of smiles</div>
          </div>
        </div>
        <div className="intro-copy">
          <p className="section__label">Our story</p>
          <h2>Impeccable attention to detail</h2>
          <p className="section__lead">
            As a dedicated wedding photography studio, we weave the story of your
            day with warmth and clarity—from the lace on the gown to the laughter
            at the tables and the light as you walk back down the aisle.
          </p>
          <p className="section__lead">
            Continue your journey with us for christenings, anniversaries, and any
            other chapter you want remembered forever.
          </p>
          <a className="btn btn--dark" href="#gallery" style={{ marginTop: '1rem' }}>
            Explore the gallery
          </a>
        </div>
      </div>
    </section>
  );
}
