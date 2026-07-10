/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, FileText, Linkedin, Mail, X } from 'lucide-react';

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

const normalizePath = (path: string) => {
  const clean = path.replace(/\/+$/, '');
  return clean === '' ? '/' : clean;
};

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
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const currentPath =
    typeof window !== 'undefined' ? normalizePath(window.location.pathname) : '';
  const isCurrentPage = (href: string) => normalizePath(href) === currentPath;
  const isProductDesignCurrent = currentPath === '/product-design';
  const isIllustrationCurrent = currentPath.startsWith('/illustration');
  const shouldRenderMenu = isMenuOpen || isMenuClosing;

  const openMenu = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    setIsMenuClosing(false);
    setIsMenuOpen(true);
  };

  const closeMenu = (animated = true) => {
    if (!isMenuOpen && !isMenuClosing) {
      return;
    }

    if (!animated) {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      setIsMenuClosing(false);
      setIsMenuOpen(false);
      return;
    }

    setIsMenuClosing(true);
    setIsMenuOpen(false);

    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
    }

    closeTimerRef.current = window.setTimeout(() => {
      setIsMenuClosing(false);
      closeTimerRef.current = null;
    }, 280);
  };

  useEffect(() => {
    if (!shouldRenderMenu) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) {
        return;
      }

      const focusable = Array.from(
        panelRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ) as HTMLElement[];

      if (!focusable.length) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [shouldRenderMenu, isMenuOpen, isMenuClosing]);

  useEffect(() => () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
    }
  }, []);

  const handleAboutClick = () => {
    closeMenu(false);
    onAboutClick?.();
  };

  return (
    <header className={`portfolio-nav ${visibilityClass} ${shouldRenderMenu ? 'is-menu-open' : ''} ${className}`.trim()} aria-label="Portfolio">
      <div className="nav-identity">
        <a href={homeHref} aria-label="Kaiwei Fu home">Kaiwei Fu</a>
        <span>AI experience designer</span>
      </div>
      <div className="nav-mobile-controls">
        <button
          className="nav-mobile-about"
          type="button"
          onClick={handleAboutClick}
        >
          About
        </button>
        <button
          className={`nav-mobile-trigger ${isMenuOpen ? 'is-open' : ''}`.trim()}
          type="button"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="portfolio-menu-panel"
          onClick={() => {
            if (isMenuOpen) {
              closeMenu();
            } else {
              openMenu();
            }
          }}
        >
          <span className="nav-mobile-trigger-icon" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>
      {shouldRenderMenu ? (
        <div
          className={`nav-menu-overlay ${isMenuClosing ? 'is-closing' : ''}`.trim()}
          id="portfolio-menu-panel"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Portfolio menu"
        >
          <div className="nav-menu-panel">
            <div className="nav-menu-panel-header">
              <a className="nav-menu-panel-identity" href={homeHref} onClick={() => closeMenu(false)}>
                <span>Kaiwei Fu</span>
                <small>AI experience designer</small>
              </a>
              <div className="nav-menu-panel-actions">
                <button
                  className="nav-menu-pill"
                  type="button"
                  onClick={handleAboutClick}
                >
                  About
                </button>
                <button
                  className="nav-menu-close"
                  type="button"
                  aria-label="Close menu"
                  ref={closeButtonRef}
                  onClick={() => closeMenu()}
                >
                  <X aria-hidden="true" size={18} strokeWidth={2.3} />
                </button>
              </div>
            </div>

            <div className="nav-menu-panel-content">
              <section className="nav-menu-section" aria-labelledby="portfolio-menu-product-design">
                <a
                  className={`nav-menu-section-link ${isProductDesignCurrent ? 'is-current' : ''}`.trim()}
                  href="/product-design"
                  id="portfolio-menu-product-design"
                  aria-current={isProductDesignCurrent ? 'page' : undefined}
                  onClick={() => closeMenu(false)}
                >
                  <span>Product Design</span>
                  <ArrowUpRight aria-hidden="true" size={14} strokeWidth={2} />
                </a>
                <div className="nav-menu-link-list">
                  {productDesignLinks.map((link) => (
                    <a
                      href={link.href}
                      key={link.href}
                      className={isCurrentPage(link.href) ? 'is-current' : undefined}
                      aria-current={isCurrentPage(link.href) ? 'page' : undefined}
                      onClick={() => closeMenu(false)}
                    >
                      <span>{link.label}</span>
                      {isCurrentPage(link.href) ? <span className="nav-landed-dot" aria-hidden="true" /> : null}
                    </a>
                  ))}
                </div>
              </section>

              <section className="nav-menu-section" aria-labelledby="portfolio-menu-illustration">
                <a
                  className={`nav-menu-section-link ${isIllustrationCurrent ? 'is-current' : ''}`.trim()}
                  href={illustrationHref}
                  id="portfolio-menu-illustration"
                  aria-current={isIllustrationCurrent ? 'page' : undefined}
                  onClick={() => closeMenu(false)}
                >
                  <span>Illustration</span>
                  <ArrowUpRight aria-hidden="true" size={14} strokeWidth={2} />
                  {isIllustrationCurrent ? <span className="nav-landed-dot" aria-hidden="true" /> : null}
                </a>
              </section>
            </div>

            <footer className="nav-menu-panel-footer">
              <a href="mailto:kaiweifu2022@gmail.com" onClick={() => closeMenu(false)}>
                <Mail aria-hidden="true" size={16} strokeWidth={2} />
                <span>Email</span>
              </a>
              <a href="/cv/kaiwei-fu-cv.pdf" download onClick={() => closeMenu(false)}>
                <FileText aria-hidden="true" size={16} strokeWidth={2} />
                <span>CV</span>
              </a>
              <a href="https://www.linkedin.com/in/kaiwei-fu-b10474239" target="_blank" rel="noreferrer" onClick={() => closeMenu(false)}>
                <Linkedin aria-hidden="true" size={16} strokeWidth={2} />
                <span>LinkedIn</span>
              </a>
            </footer>
          </div>
        </div>
      ) : null}
      <nav id="portfolio-primary-nav">
        <a className="nav-mobile-only" href={homeHref} onClick={() => setIsMenuOpen(false)}>Home</a>
        <div className="nav-mobile-case-list" aria-label="Case studies">
          <span className="nav-mobile-section-label">Case studies</span>
          {productDesignLinks.map((link) => (
            <a
              href={link.href}
              key={link.href}
              className={isCurrentPage(link.href) ? 'is-current' : undefined}
              aria-current={isCurrentPage(link.href) ? 'page' : undefined}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
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
          <button className="nav-desktop-about" type="button" onClick={handleAboutClick}>About</button>
        ) : (
          <a className="nav-desktop-about" href={aboutHref} onClick={() => setIsMenuOpen(false)}>About</a>
        )}
        <div className="nav-mobile-footer">
          {onAboutClick ? (
            <button type="button" onClick={handleAboutClick}>About</button>
          ) : (
            <a href={aboutHref} onClick={() => setIsMenuOpen(false)}>About</a>
          )}
          <span aria-hidden="true">·</span>
          <a href="/cv/kaiwei-fu-cv.pdf" download onClick={() => setIsMenuOpen(false)}>Download CV</a>
        </div>
      </nav>
    </header>
  );
}
