export default function Showcase() {
  return (
    <section className="section section--cream" id="work">
      <div className="container">
        <p className="section__label text-center">Portfolio</p>
        <h2 className="section__title text-center">Stunning moments, honestly told</h2>
        <p
          className="section__lead text-center"
          style={{ marginInline: 'auto', marginBottom: '2.5rem' }}
        >
          A small selection of real celebrations—ceremony, portraits, and the dance
          floor energy you will want to relive.
        </p>
        <div className="showcase">
          <article className="showcase-card">
            <picture>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/wedding-portrait-2.jpg"
                alt="Wedding portrait"
                width={1200}
                height={1600}
                loading="lazy"
              />
            </picture>
            <div className="showcase-card__cap">Ceremony</div>
          </article>
          <article className="showcase-card">
            <picture>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/wedding-portrait-1.jpg"
                alt="Wedding portrait"
                width={1200}
                height={1600}
                loading="lazy"
              />
            </picture>
            <div className="showcase-card__cap">Timeless portrait</div>
          </article>
          <article className="showcase-card">
            <picture>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/wedding-portrait-5.jpg"
                alt="Wedding portrait"
                width={1200}
                height={1600}
                loading="lazy"
              />
            </picture>
            <div className="showcase-card__cap">Romance</div>
          </article>
        </div>
      </div>
    </section>
  );
}
