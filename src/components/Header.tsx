'use client';

import { useState, useEffect } from 'react';
import { useModal } from '@/context/ModalContext';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isNarrowViewport, setIsNarrowViewport] = useState(false);
  const { open: openModal } = useModal();

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 40);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    function sync() {
      setIsNarrowViewport(mq.matches);
    }
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        document.body.style.overflow = '';
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    const next = !menuOpen;
    setMenuOpen(next);
    document.body.style.overflow = next ? 'hidden' : '';
  }

  function handleContact(e: React.MouseEvent) {
    e.preventDefault();
    closeMenu();
    openModal();
  }

  return (
    <header className={`site-header${isScrolled ? ' is-scrolled' : ''}`} id="top">
      <div className="header-inner">
        <a href="#top" className="logo">
          Verdict <span>Photography</span>
        </a>
        <button
          className={`nav-toggle${menuOpen ? ' is-open' : ''}`}
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav
          className={`site-nav${menuOpen ? ' is-open' : ''}`}
          id="site-navigation"
          aria-label="Primary"
          inert={isNarrowViewport && !menuOpen ? true : undefined}
        >
          <div className="site-nav__panel">
            <p className="site-nav__eyebrow">Explore</p>
            <ul className="site-nav__list">
              <li><a href="#work" onClick={closeMenu}>Our work</a></li>
              <li><a href="#gallery" onClick={closeMenu}>Gallery</a></li>
              <li><a href="#packages" onClick={closeMenu}>Packages</a></li>
              <li><a href="#reviews" onClick={closeMenu}>Reviews</a></li>
              <li><a href="#quote" onClick={closeMenu}>Free quote</a></li>
              <li><a href="#" onClick={handleContact}>Contact</a></li>
            </ul>
          </div>
          <button
            type="button"
            className="site-nav__backdrop"
            tabIndex={menuOpen ? 0 : -1}
            aria-label="Close menu"
            onClick={closeMenu}
          />
        </nav>
      </div>
    </header>
  );
}
