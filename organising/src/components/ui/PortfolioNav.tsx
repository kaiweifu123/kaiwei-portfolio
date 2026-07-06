/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

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

  return (
    <header className={`portfolio-nav ${visibilityClass} ${className}`.trim()} aria-label="Portfolio">
      <div className="nav-identity">
        <a href={homeHref} aria-label="Kaiwei Fu home">Kaiwei Fu</a>
        <span>AI Experience Designer</span>
      </div>
      <nav>
        <div className="nav-menu">
          <a className="nav-menu-trigger" href={workHref} aria-haspopup="true">
            Product design
          </a>
          <div className="nav-dropdown" role="menu" aria-label="Product design cases">
            {productDesignLinks.map((link) => (
              <a href={link.href} role="menuitem" key={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <a href={illustrationHref}>Illustration</a>
        {onAboutClick ? (
          <button type="button" onClick={onAboutClick}>About</button>
        ) : (
          <a href={aboutHref}>About</a>
        )}
      </nav>
    </header>
  );
}
