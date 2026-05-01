'use client';

import { useState, useEffect } from 'react';

const WORDS = [
  'beautiful, romantic',
  'passionate, intimate',
  'one of a kind',
  'precious & special',
  'joyful & timeless',
];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity(0);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % WORDS.length);
        setOpacity(1);
      }, 220);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero" aria-label="Introduction">
      <div className="hero__media" aria-hidden="true">
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet="https://images.pexels.com/photos/31464056/pexels-photo-31464056.jpeg?auto=compress&cs=tinysrgb&w=900&h=1500&fit=crop"
          />
          <source
            media="(min-width: 768px)"
            srcSet="https://images.pexels.com/photos/31464056/pexels-photo-31464056.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.pexels.com/photos/31464056/pexels-photo-31464056.jpeg?auto=compress&cs=tinysrgb&w=1400"
            alt=""
            width={1920}
            height={1080}
            fetchPriority="high"
          />
        </picture>
      </div>
      <div className="hero__content">
        <p className="hero__eyebrow">Wedding photography</p>
        <h1 className="hero__title">
          Capturing
          <span
            className="hero__rotator"
            aria-live="polite"
            style={{ opacity, transition: 'opacity 0.22s ease' }}
          >
            {WORDS[wordIndex]}
          </span>
          moments
        </h1>
        <p className="hero__sub">
          Weddings, anniversaries, christenings, and the quiet in-between moments
          that become your family&apos;s legacy.
        </p>
        <div className="hero__actions">
          <a className="btn btn--primary" href="#quote">Get free quote</a>
          <a className="btn btn--outline" href="#work">View our work</a>
        </div>
      </div>
    </section>
  );
}
