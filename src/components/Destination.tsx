export default function Destination() {
  return (
    <section className="section section--cream">
      <div className="container dest">
        <div className="dest__visual">
          <picture>
            <source
              media="(max-width: 767px)"
              srcSet="https://images.pexels.com/photos/30307363/pexels-photo-30307363.jpeg?auto=compress&cs=tinysrgb&w=900&h=1100&fit=crop"
            />
            <source
              media="(min-width: 768px)"
              srcSet="https://images.pexels.com/photos/30307363/pexels-photo-30307363.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&fit=crop"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.pexels.com/photos/30307363/pexels-photo-30307363.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Wedding couple in elegant sunlit indoor portrait"
              width={1400}
              height={900}
              loading="lazy"
            />
          </picture>
        </div>
        <div>
          <p className="section__label">Destination</p>
          <h2 className="section__title">We travel for you</h2>
          <p className="section__lead">
            Regional celebrations, interstate weekends, and international
            destinations—travel is quoted transparently so you can plan confidently.
          </p>
          <a className="btn btn--dark" href="#quote" style={{ marginTop: '1rem' }}>
            Plan destination coverage
          </a>
        </div>
      </div>
    </section>
  );
}
