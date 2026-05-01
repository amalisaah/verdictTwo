const IMAGES = [
  {
    mobile: 'https://images.pexels.com/photos/31464056/pexels-photo-31464056.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    src: 'https://images.pexels.com/photos/31464056/pexels-photo-31464056.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&fit=crop',
    alt: 'Outdoor traditional wedding celebration',
    caption: 'Tradition',
  },
  {
    mobile: 'https://images.pexels.com/photos/31851041/pexels-photo-31851041.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    src: 'https://images.pexels.com/photos/31851041/pexels-photo-31851041.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&fit=crop',
    alt: 'Wedding ceremony in documentary black and white',
    caption: 'Ceremony',
  },
  {
    mobile: 'https://images.pexels.com/photos/30307363/pexels-photo-30307363.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    src: 'https://images.pexels.com/photos/30307363/pexels-photo-30307363.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&fit=crop',
    alt: 'Elegant wedding couple in a sunlit room',
    caption: 'Portraits',
  },
  {
    mobile: 'https://images.pexels.com/photos/13895241/pexels-photo-13895241.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    src: 'https://images.pexels.com/photos/13895241/pexels-photo-13895241.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&fit=crop',
    alt: 'Couple laughing together in formal wedding attire',
    caption: 'Joy',
  },
  {
    mobile: 'https://images.pexels.com/photos/20519804/pexels-photo-20519804.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    src: 'https://images.pexels.com/photos/20519804/pexels-photo-20519804.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&fit=crop',
    alt: 'Wedding couple inside a church setting',
    caption: 'Sacred space',
  },
  {
    mobile: 'https://images.pexels.com/photos/29205722/pexels-photo-29205722.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    src: 'https://images.pexels.com/photos/29205722/pexels-photo-29205722.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&fit=crop',
    alt: 'Romantic black and white wedding portrait outdoors',
    caption: 'Filmic tone',
  },
  {
    mobile: 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    src: 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&fit=crop',
    alt: 'Wedding rings and floral detail',
    caption: 'Details',
  },
  {
    mobile: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    src: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&fit=crop',
    alt: 'Wedding reception styling and guests',
    caption: 'Reception',
  },
];

export default function Gallery() {
  return (
    <section className="section section--cream" id="gallery">
      <div className="container">
        <p className="section__label text-center">Gallery</p>
        <h2 className="section__title text-center">Keep every frame</h2>
        <p
          className="section__lead text-center"
          style={{ marginInline: 'auto', marginBottom: '2rem' }}
        >
          Responsive crops load sharper portraits on phones and wider storytelling
          frames on desktop.
        </p>
        <div className="gallery-grid">
          {IMAGES.map(({ mobile, src, alt, caption }) => (
            <figure key={caption}>
              <picture>
                <source media="(max-width: 767px)" srcSet={mobile} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={alt} width={900} height={900} loading="lazy" />
              </picture>
              <figcaption>{caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
