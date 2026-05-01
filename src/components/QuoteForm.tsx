'use client';

import { useState } from 'react';

const TOTAL_STEPS = 3;

export default function QuoteForm() {
  const [step, setStep] = useState(0);

  function goTo(i: number) {
    setStep(Math.max(0, Math.min(i, TOTAL_STEPS - 1)));
  }

  function handleNext() {
    if (step < TOTAL_STEPS - 1) {
      goTo(step + 1);
    } else {
      alert('Thank you — this is a demo form. Connect it to your backend or form service.');
    }
  }

  return (
    <section className="section" id="quote">
      <div className="container">
        <p className="section__label text-center">Enquire</p>
        <h2 className="section__title text-center">Get your quote today</h2>
        <p
          className="section__lead text-center"
          style={{ marginInline: 'auto', marginBottom: '2rem' }}
        >
          Tell us how you found us and what you are celebrating—we will follow up
          with availability and clear pricing.
        </p>
        <div className="quote-section">
          <div className="form-steps">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                type="button"
                className={step === i ? 'is-active' : ''}
                onClick={() => goTo(i)}
              >
                Step {i + 1}
              </button>
            ))}
          </div>
          <form className="quote-form" onSubmit={(e) => e.preventDefault()}>
            <div className={`form-panel${step === 0 ? ' is-active' : ''}`}>
              <label htmlFor="hear">How did you hear about us?</label>
              <select id="hear" name="hear">
                <option>Google</option>
                <option>Instagram</option>
                <option>Word of mouth</option>
                <option>Family / friend</option>
                <option>Vendor / supplier</option>
                <option>Other</option>
              </select>
              <label htmlFor="event">Event type</label>
              <select id="event" name="event">
                <option>Wedding</option>
                <option>Engagement</option>
                <option>Anniversary</option>
                <option>Proposal</option>
                <option>Other</option>
              </select>
            </div>

            <div className={`form-panel${step === 1 ? ' is-active' : ''}`}>
              <div className="grid-2">
                <div>
                  <label htmlFor="name">Your name</label>
                  <input id="name" name="name" type="text" autoComplete="name" required />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" autoComplete="email" required />
                </div>
              </div>
              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" type="tel" autoComplete="tel" />
            </div>

            <div className={`form-panel${step === 2 ? ' is-active' : ''}`}>
              <label htmlFor="date">Event date (or season)</label>
              <input id="date" name="date" type="text" placeholder="e.g. March 2027" />
              <label htmlFor="msg">Tell us about your day</label>
              <textarea
                id="msg"
                name="message"
                placeholder="Venue, guest count, anything we should know"
              ></textarea>
            </div>

            <div className="form-nav">
              <button
                type="button"
                className="btn btn--outline"
                style={{
                  color: 'var(--text)',
                  borderColor: 'var(--border)',
                  visibility: step === 0 ? 'hidden' : 'visible',
                }}
                onClick={() => goTo(step - 1)}
              >
                Back
              </button>
              <button type="button" className="btn btn--primary" onClick={handleNext}>
                {step === TOTAL_STEPS - 1 ? 'Submit' : 'Next'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
