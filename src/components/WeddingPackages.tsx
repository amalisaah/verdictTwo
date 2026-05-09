import type { WeddingPackage } from '@/data/weddingPackages';
import { WEDDING_PACKAGES } from '@/data/weddingPackages';

function PriceBadge({ pkg }: { pkg: WeddingPackage }) {
  const mod =
    pkg.priceBadgeVariant === 'red' ? 'price-badge--red' : 'price-badge--gold';
  return (
    <div className={`price-badge ${mod}`} aria-label={`Price ${pkg.priceLabel}`}>
      <span className="price-badge__tab" aria-hidden="true" />
      <span className="price-badge__text">{pkg.priceLabel}</span>
    </div>
  );
}

function PackageHero({ pkg }: { pkg: WeddingPackage }) {
  const alt = `${pkg.shortName} package — placeholder imagery`;
  // TODO(assets): replace with shoot-specific assets per tier (see weddingPackages.ts).

  if (pkg.tier === 'gold'&& pkg.images.heroExtra?.length) {
    return (
      <div className="package-card__hero-strip package-card__hero-strip--triple">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={pkg.images.hero} alt="" width={400} height={533} loading="lazy" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={pkg.images.heroExtra[0]} alt="" width={400} height={533} loading="lazy" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={pkg.images.heroExtra[1]} alt="" width={400} height={533} loading="lazy" />
      </div>
    );
  }

  if (pkg.tier === 'luxury' && pkg.images.heroExtra?.length) {
    return (
      <div className="package-card__hero-strip package-card__hero-strip--dual">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={pkg.images.hero} alt={alt} width={600} height={450} loading="lazy" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={pkg.images.heroExtra[0]}
          alt=""
          width={600}
          height={450}
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="package-card__hero-strip package-card__hero-strip--single">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={pkg.images.hero} alt={alt} width={1200} height={520} loading="lazy" />
    </div>
  );
}

function PackageTitle({ pkg }: { pkg: WeddingPackage }) {
  if (pkg.tier === 'silver') {
    return (
      <div className="package-card__title package-card__title--silver">
        <span className="package-card__title-line">{pkg.titleLines[0]}</span>
        <span className="package-card__title-line">{pkg.titleLines[1]}</span>
      </div>
    );
  }

  return (
    <div className="package-card__title package-card__title--stacked">
      <span className="package-card__title-serif">{pkg.titleLines[0]}</span>
      <span className="package-card__title-sans">{pkg.titleLines[1]}</span>
    </div>
  );
}

function PackageCard({ pkg }: { pkg: WeddingPackage }) {
  return (
    <article
      className={`package-card package-card--${pkg.tier}`}
      aria-labelledby={`package-heading-${pkg.id}`}
    >
      <PackageHero pkg={pkg} />

      <div className="package-card__body">
        <div className="package-card__mid">
          <header className="package-card__header">
            <h3 id={`package-heading-${pkg.id}`} className="sr-only">
              {pkg.title}
            </h3>
            <PackageTitle pkg={pkg} />
          </header>
          <ul className="package-card__features">
            {pkg.features.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>

        <div className="package-card__footer">
          <div className="package-card__accent">
            {pkg.images.accent ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={pkg.images.accent}
                  alt=""
                  width={360}
                  height={480}
                  loading="lazy"
                />
              </>
            ) : null}
          </div>
          <div className="package-card__cta">
            <PriceBadge pkg={pkg} />
            <a className="package-card__enquire btn btn--dark" href="#quote">
              Enquire
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function WeddingPackages() {
  return (
    <section className="section section--packages" id="packages" aria-labelledby="packages-heading">
      <div className="container">
        <p className="section__label text-center">Investment</p>
        <h2 id="packages-heading" className="section__title text-center">
          Wedding packages
        </h2>
        <p
          className="section__lead text-center"
          style={{ marginInline: 'auto', marginBottom: '2.75rem' }}
        >
          Clear tiers with full-day coverage, edited galleries, film, and printed art—pick
          the deal that fits your day, then tell us your date in the quote form.
        </p>
        <div className="packages-grid">
          {WEDDING_PACKAGES.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}
