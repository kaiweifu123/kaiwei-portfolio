/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

export interface CaseStudyTopNavItem {
  id: string;
  label: string;
}

interface CaseStudyTopNavProps {
  items: CaseStudyTopNavItem[];
  selectedId: string;
  onSelect: (id: string) => void;
  scrollRootId?: string;
  collapseThreshold?: number;
  showDivider?: boolean;
}

export default function CaseStudyTopNav({
  items,
  selectedId,
  onSelect,
  scrollRootId = 'continuous-scroll-content-container',
  collapseThreshold = 96,
  showDivider = false,
}: CaseStudyTopNavProps) {
  const navRef = useRef<HTMLElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scrollRoot = document.getElementById(scrollRootId);
    const header = document.querySelector<HTMLElement>('.editorial-header');
    const nav = navRef.current;

    if (!header || !nav) return;

    const updateHeaderOffset = (isCollapsed = document.body.classList.contains('case-study-chrome-collapsed')) => {
      document.body.style.setProperty('--case-study-top-nav-offset', isCollapsed ? '0px' : `${header.offsetHeight}px`);
    };

    const resizeObserver = new ResizeObserver(() => updateHeaderOffset());
    resizeObserver.observe(header);
    updateHeaderOffset();

    const getScrollTop = () => {
      if (scrollRoot) return scrollRoot.scrollTop;
      return window.scrollY || document.documentElement.scrollTop || 0;
    };

    let lastScrollTop = getScrollTop();
    let ticking = false;

    const updateChromeState = () => {
      const currentScrollTop = getScrollTop();
      const scrollingDown = currentScrollTop > lastScrollTop;
      const pastThreshold = currentScrollTop > collapseThreshold;

      const shouldCollapse = scrollingDown && pastThreshold;

      document.body.classList.toggle('case-study-chrome-collapsed', shouldCollapse);
      updateHeaderOffset(shouldCollapse);

      lastScrollTop = Math.max(currentScrollTop, 0);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateChromeState);
        ticking = true;
      }
    };

    const scrollTarget: HTMLElement | Window = scrollRoot ?? window;
    scrollTarget.addEventListener('scroll', handleScroll, { passive: true });
    updateChromeState();

    return () => {
      resizeObserver.disconnect();
      document.body.style.removeProperty('--case-study-top-nav-offset');
      scrollTarget.removeEventListener('scroll', handleScroll);
      document.body.classList.remove('case-study-chrome-collapsed');
    };
  }, [collapseThreshold, scrollRootId]);

  useEffect(() => {
    const inner = innerRef.current;
    const activeItem = inner?.querySelector<HTMLElement>('.case-study-top-nav-item.active');
    if (!inner || !activeItem) return;

    const targetLeft = activeItem.offsetLeft - (inner.clientWidth - activeItem.offsetWidth) / 2;
    inner.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
  }, [selectedId]);

  return (
    <nav
      ref={navRef}
      className={`case-study-top-nav ${showDivider ? 'has-divider' : ''}`.trim()}
      aria-label="Case study sections"
    >
      <div className="case-study-top-nav-inner" ref={innerRef}>
        {items.map((item) => {
          const isActive = item.id === selectedId;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={`case-study-top-nav-item ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
