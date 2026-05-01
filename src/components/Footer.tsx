'use client';

import { useModal } from '@/context/ModalContext';

export default function Footer() {
  const { open: openModal } = useModal();
  const year = new Date().getFullYear();

  function handleContact(e: React.MouseEvent) {
    e.preventDefault();
    openModal();
  }

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-col">
          <div className="logo">
            Verdict <span>Two</span>
          </div>
          <p>
            Experienced photographers for the moments you cannot reshoot. Based
            locally; happy to travel.
          </p>
        </div>
        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><a href="#work">Our work</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#quote">Free quote</a></li>
            <li><a href="#" onClick={handleContact}>Contact</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:hello@verdicttwo.example">hello@verdicttwo.example</a></li>
            <li><a href="tel:+61400000000">+61 400 000 000</a></li>
            <li>100 Example Street, Sydney NSW</li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <p className="mb-0">
          © {year} Verdict Two Photography. Demo content inspired by{' '}
          <a href="https://yazzenphotography.com.au/" rel="noopener">Yazzen Photography</a>.
          Stock photos from{' '}
          <a href="https://www.pexels.com/" rel="noopener">Pexels</a>{' '}
          (wedding &amp; celebration imagery; hero and several frames feature Black
          couples and African wedding traditions).
        </p>
      </div>
    </footer>
  );
}
