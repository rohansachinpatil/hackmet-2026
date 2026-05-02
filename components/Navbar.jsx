'use client';
import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="navbar">
        <a href="https://www.ecell-met.tech/" target="_blank" rel="noopener noreferrer" className="nav-logo">
          E-CELL<span style={{ color: 'var(--primary)' }}>::</span>MET
        </a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#tracks">Tracks</a></li>
          <li><a href="#prizes">Prizes</a></li>
          <li><a href="#timeline">Timeline</a></li>
          <li><a href="#judges">Judges</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>
        <a href="#register" className="nav-cta">[ REGISTER ]</a>
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          id="hamburgerBtn"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} id="mobileMenu">
        <a href="#about" onClick={closeMenu}>About</a>
        <a href="#tracks" onClick={closeMenu}>Tracks</a>
        <a href="#prizes" onClick={closeMenu}>Prizes</a>
        <a href="#timeline" onClick={closeMenu}>Timeline</a>
        <a href="#judges" onClick={closeMenu}>Judges</a>
        <a href="#faq" onClick={closeMenu}>FAQ</a>
        <a href="#register" onClick={closeMenu} style={{ color: 'var(--primary-dark)', fontWeight: 700 }}>[ REGISTER NOW ]</a>
      </div>
    </>
  );
}
