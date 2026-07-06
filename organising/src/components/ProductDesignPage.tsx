/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import PortfolioNav from './ui/PortfolioNav';
import PortfolioWorkSection from './PortfolioWorkSection';
import InfoOverlay from './ui/InfoOverlay';

export default function ProductDesignPage() {
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

  return (
    <main className={`portfolio-home portfolio-work-page ${isNavVisible ? 'is-nav-visible' : 'is-nav-hidden'}`}>
      <PortfolioNav
        isVisible={isNavVisible}
        workHref="/#work"
        illustrationHref="/illustration"
        onAboutClick={() => setIsInfoOpen(true)}
      />
      {isInfoOpen ? <InfoOverlay onClose={() => setIsInfoOpen(false)} /> : null}
      <PortfolioWorkSection title="Product Design" id="product-design" />
    </main>
  );
}
