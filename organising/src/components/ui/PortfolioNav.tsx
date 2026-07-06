/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

type PortfolioNavProps = {
  isVisible?: boolean;
  homeHref?: string;
  workHref?: string;
  illustrationHref?: string;
  aboutHref?: string;
  onAboutClick?: () => void;
  className?: string;
};

const productDesignLinks = [
  { label: 'Launchpad Platform', href: '/preview.html' },
  { label: 'Patient CRM', href: '/patient-crm/' },
  { label: 'Hireable AI CV Builder', href: '/case/hireable/' },
  { label: 'Reading Rep Online Giving', href: '/case/reading-rep/' },
  { label: 'Ohisama Sushi Digital Menu', href: '/case/ohisama/' },
  { label: 'The Future of TfL Go', href: '/case/tfl-go/' },
];

export default function PortfolioNav({
  isVisible = true,
  homeHref = '/',
  workHref = '/#work',
  illustrationHref = '/illustration',
  aboutHref = '/',
  onAboutClick,
  className = '',
}: PortfolioNavProps) {
  const visibilityClass = isVisible ? 'is-visible' : 'is-hidden';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAboutClick = () => {
    setIsMenuOpen(false);
    onAboutClick?.();
  };

  return (
    <header className={`portfolio-nav ${visibilityClass} ${className}`.trim()} aria-label="Portfolio">
      <div className="nav-identity">
        <a href={homeHref} aria-label="Kaiwei Fu home">Kaiwei Fu</a>
        <span>AI Experience Designer</span>
      </div>
      <button
        className={`nav-mobile-trigger ${isMenuOpen ? 'is-open' : ''}`.trim()}
        type="button"
        aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isMenuOpen}
        aria-controls="portfolio-primary-nav"
        onClick={() => setIsMenuOpen((current) => !current)}
      >
        <span className="nav-mobile-trigger-label">Menu</span>
        <span className="nav-mobile-trigger-icon" aria-hidden="true">
          <span />
          <span />
        </span>
      </button>
      <nav id="portfolio-primary-nav" className={isMenuOpen ? 'is-open' : ''}>
        <span className="nav-mobile-section-label">Navigation</span>
        <a className="nav-mobile-only" href={homeHref} onClick={() => setIsMenuOpen(false)}>Home</a>
        <div className="nav-menu">
          <a className="nav-menu-trigger" href={workHref} aria-haspopup="true" onClick={() => setIsMenuOpen(false)}>
            Product design
          </a>
          <div className="nav-dropdown" role="menu" aria-label="Product design cases">
            {productDesignLinks.map((link) => (
              <a href={link.href} role="menuitem" key={link.href} onClick={() => setIsMenuOpen(false)}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <a href={illustrationHref} onClick={() => setIsMenuOpen(false)}>Illustration</a>
        {onAboutClick ? (
          <button type="button" onClick={handleAboutClick}>About</button>
        ) : (
          <a href={aboutHref} onClick={() => setIsMenuOpen(false)}>About</a>
        )}
        <div className="nav-mobile-case-list" aria-label="Case studies">
          <span className="nav-mobile-section-label">Case studies</span>
          {productDesignLinks.map((link) => (
            <a href={link.href} key={link.href} onClick={() => setIsMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
