/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import PortfolioNav from './ui/PortfolioNav';
import PortfolioWorkSection from './PortfolioWorkSection';
import InfoOverlay from './ui/InfoOverlay';
import heroComicImg from '../assets/images/home/hero-comic.png';

export default function HomePage() {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;
    const threshold = 8;

    const updateNavVisibility = () => {
      const currentScrollY = Math.max(window.scrollY, 0);
      const delta = currentScrollY - lastScrollY.current;

      if (currentScrollY < 80) {
        setIsNavVisible(true);
      } else if (delta > threshold) {
        setIsNavVisible(false);
      } else if (delta < -threshold) {
        setIsNavVisible(true);
      }

      lastScrollY.current = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNavVisibility);
        ticking = true;
      }
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.slice(1);

    if (!hash) {
      return;
    }

    window.requestAnimationFrame(() => {
      document.getElementById(decodeURIComponent(hash))?.scrollIntoView();
    });
  }, []);

  return (
    <main className={`portfolio-home ${isNavVisible ? 'is-nav-visible' : 'is-nav-hidden'}`}>
      <PortfolioNav
        isVisible={isNavVisible}
        homeHref="#top"
        workHref="#work"
        illustrationHref="/illustration"
        onAboutClick={() => setIsInfoOpen(true)}
      />

      {isInfoOpen ? <InfoOverlay onClose={() => setIsInfoOpen(false)} /> : null}

      <section className="portfolio-hero" id="top">
        <div className="portfolio-hero-copy">
          <h1>
            I design AI-powered experiences that make complex journeys easier to start and easier to complete.
          </h1>
        </div>
        <img
          className="portfolio-hero-comic"
          src={heroComicImg}
          alt=""
          aria-hidden="true"
        />
      </section>

      <PortfolioWorkSection />
    </main>
  );
}
