'use client';

import { useState, useEffect } from 'react';
import { useModal } from '@/context/ModalContext';

export default function FloatingCta() {
  const [isVisible, setIsVisible] = useState(false);
  const { open: openModal } = useModal();

  useEffect(() => {
    function onScroll() {
      setIsVisible(window.scrollY > 400);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleContact(e: React.MouseEvent) {
    e.preventDefault();
    openModal();
  }

  return (
    <div
      className={`float-cta${isVisible ? ' is-visible' : ''}`}
      aria-hidden={isVisible ? 'false' : 'true'}
    >
      <a className="btn btn--primary" href="#quote">Quote</a>
      <a
        className="btn btn--outline"
        style={{ color: 'var(--text)', borderColor: 'var(--border)' }}
        href="#"
        onClick={handleContact}
      >
        Contact
      </a>
    </div>
  );
}
