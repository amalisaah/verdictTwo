const REVIEWS = [
  {
    text: 'Humble, caring, and organised—the whole process felt calm. Our album arrived quickly and every spread feels intentional.',
    cite: 'Shilan M.',
  },
  {
    text: 'Timeless portraits and candid energy on the dance floor. They made the day fun while staying invisible when it mattered.',
    cite: 'Noora H.',
  },
  {
    text: 'Professional from first call to final delivery. We could not have asked for a better team beside us.',
    cite: 'Sami I.',
  },
  {
    text: 'So many compliments on the photos—and on the day itself everything ran smoothly thanks to their experience.',
    cite: 'Rita A.',
  },
];

export default function Reviews() {
  return (
    <section className="section section--cream" id="reviews">
      <div className="container">
        <p className="section__label text-center">Reviews</p>
        <h2 className="section__title text-center">Kind words from couples</h2>
        <div className="reviews" style={{ marginTop: '2rem' }}>
          {REVIEWS.map(({ text, cite }) => (
            <blockquote key={cite} className="review-card">
              <p className="stars" aria-hidden="true">★★★★★</p>
              <p>{text}</p>
              <cite>— {cite}</cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
