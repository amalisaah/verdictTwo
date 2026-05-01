'use client';

import { useEffect } from 'react';
import { useModal } from '@/context/ModalContext';

export default function ContactModal() {
  const { isOpen, close } = useModal();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [close]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) close();
  }

  return (
    <div
      className={`modal-overlay${isOpen ? ' is-open' : ''}`}
      role="dialog"
      aria-modal={true}
      aria-labelledby="modal-title"
      onClick={handleOverlayClick}
    >
      <div className="modal">
        <button className="modal__close" type="button" aria-label="Close" onClick={close}>
          &times;
        </button>
        <h2 id="modal-title">Get in touch</h2>
        <p className="section__lead">We typically reply within one business day.</p>
        <form
          className="quote-form"
          style={{ marginTop: '1rem' }}
          onSubmit={(e) => {
            e.preventDefault();
            alert('Demo only — wire this form to your email or CRM.');
          }}
        >
          <label htmlFor="m-name">Name</label>
          <input id="m-name" type="text" required />
          <label htmlFor="m-email">Email</label>
          <input id="m-email" type="email" required />
          <label htmlFor="m-note">Message</label>
          <textarea id="m-note" required></textarea>
          <button
            type="submit"
            className="btn btn--primary"
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
