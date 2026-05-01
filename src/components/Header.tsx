'use client';

import { useState, useEffect } from 'react';
import { useModal } from '@/context/ModalContext';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { open: openModal } = useModal();

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 40);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
          Verdict <span>Two</span>
        </a>
        <button
          className={`nav-toggle${menuOpen ? ' is-open' : ''}`}
          type="button"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav>
          <ul className={`nav-desktop${menuOpen ? ' is-open' : ''}`}>
            <li><a href="#work" onClick={closeMenu}>Our work</a></li>
            <li><a href="#gallery" onClick={closeMenu}>Gallery</a></li>
            <li><a href="#reviews" onClick={closeMenu}>Reviews</a></li>
            <li><a href="#quote" onClick={closeMenu}>Free quote</a></li>
            <li><a href="#" onClick={handleContact}>Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
