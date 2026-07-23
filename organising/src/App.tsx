/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import ContentArea from './components/ContentArea';
import SyllabusModalForm from './components/SyllabusModalForm';
import DesignSystemPage from './components/DesignSystemPage';
import LaunchpadDesignSystemCaseStudy from './components/LaunchpadDesignSystemCaseStudy';
import PatientCrmCaseStudy from './components/PatientCrmCaseStudy';
import PortfolioCasePage from './components/PortfolioCasePage';
import HomePage from './components/HomePage';
import ProductDesignPage from './components/ProductDesignPage';
import IllustrationPage, { IllustrationProjectPage, illustrationProjects } from './components/IllustrationPage';
import { SectionItem } from './types';
import { archiveData as initialData } from './data';
import { portfolioCases } from './portfolioCases';
import { AlertTriangle } from 'lucide-react';

const STORAGE_KEY = 'acs-archive-syllabus-data';
const ENROLLED_KEY = 'acs-archive-enrolled-ids';
const SECTION_ANCHOR_IDS: Record<string, string> = {
  OVERVIEW: 'overview',
  'PH-01': 'research-1',
  'PH-02': 'research-2',
  'PH-03': 'design-1',
  'PH-04': 'design-2',
  'PH-05': 'iteration-1',
  'PH-06': 'iteration-2',
  RESULT: 'result',
};

const hiddenPortfolioCaseSlugs = new Set(['fuze']);

const getStickyStackHeight = () => {
  const header = document.querySelector<HTMLElement>('.editorial-header');
  const nav = document.querySelector<HTMLElement>('.case-study-top-nav');
  const headerIsCollapsed = document.body.classList.contains('case-study-chrome-collapsed');
  return (headerIsCollapsed ? 0 : header?.offsetHeight ?? 0) + (nav?.offsetHeight ?? 0);
};

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement: new (
          options: { pageLanguage: string; includedLanguages: string; autoDisplay: boolean },
          elementId: string
        ) => void;
      };
    };
  }
}

export default function App() {
  const pathname = window.location.pathname.replace(/\/$/, '');
  const portfolioCaseSlug = pathname.match(/^\/case\/([^/]+)$/)?.[1];
  const portfolioCase = portfolioCaseSlug
    ? portfolioCases.find((caseStudy) => caseStudy.slug === portfolioCaseSlug && !hiddenPortfolioCaseSlugs.has(caseStudy.slug))
    : undefined;

  if (portfolioCase) {
    return <PortfolioCasePage caseStudy={portfolioCase} />;
  }

  if (pathname === '/case/design-system') {
    return <LaunchpadDesignSystemCaseStudy />;
  }

  if (pathname === '') {
    return <HomePage />;
  }

  if (pathname === '/product-design') {
    return <ProductDesignPage />;
  }

  if (pathname === '/illustration') {
    return <IllustrationPage />;
  }

  const illustrationSlug = pathname.match(/^\/illustration\/([^/]+)$/)?.[1];
  const illustrationProject = illustrationSlug
    ? illustrationProjects.find((project) => project.slug === illustrationSlug)
    : undefined;

  if (illustrationProject) {
    return <IllustrationProjectPage project={illustrationProject} />;
  }

  if (pathname === '/design-system') {
    return <DesignSystemPage />;
  }

  if (pathname === '/patient-crm') {
    return <PatientCrmCaseStudy />;
  }

  const [items, setItems] = useState<SectionItem[]>([]);
  const [selectedId, setSelectedId] = useState<string>('PH-01'); // Perfect screenshot default
  const [enrolledIds, setEnrolledIds] = useState<string[]>([]);
  const [pageProgress, setPageProgress] = useState(0);
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');
  
  // Continuous scroll content frame ref
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState<SectionItem | null>(null);

  // Dynamic ticking clock for System Footer
  const [currentTimeStr, setCurrentTimeStr] = useState('14:02:44 GMT');

  // Load from local storage on initial mount
  useEffect(() => {
    // Always use the filesystem initialData to guarantee custom copywriting updates show up instantly
    setItems(initialData);
    
    // Clear catalog stored data to prevent the browser cache from blocking code edits 
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      // Ignored
    }

    try {
      const storedEnrolls = localStorage.getItem(ENROLLED_KEY);
      if (storedEnrolls) {
        setEnrolledIds(JSON.parse(storedEnrolls));
      }
    } catch (e) {
      // Ignored
    }
  }, []);

  // Update dynamic GMT clock ticker
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to GMT / UTC representation
      const pad = (num: number) => String(num).padStart(2, '0');
      const hours = pad(now.getUTCHours());
      const minutes = pad(now.getUTCMinutes());
      const seconds = pad(now.getUTCSeconds());
      setCurrentTimeStr(`Last Sync: ${hours}:${minutes}:${seconds} GMT`);
    };

    updateTime(); // Initial update
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (document.getElementById('google-translate-script')) return;

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate) return;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'zh-CN',
          includedLanguages: 'zh-CN,en',
          autoDisplay: false,
        },
        'google_translate_element'
      );
    };

    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Setup Continuous Scroll spy & page progress tracking
  useEffect(() => {
    const container = containerRef.current;
    if (!container || items.length === 0) return;

    const handleScroll = () => {
      const maxScroll = container.scrollHeight - container.clientHeight;
      const progress = maxScroll > 0 ? (container.scrollTop / maxScroll) * 100 : 0;
      setPageProgress(Math.min(100, Math.max(0, progress)));

      const stickyNavOffset = getStickyStackHeight() + 24;
      const marker = container.scrollTop + stickyNavOffset;
      let activeId = 'OVERVIEW';

      for (const id of ['OVERVIEW', ...items.map((item) => item.id), 'RESULT']) {
        const anchorId = SECTION_ANCHOR_IDS[id] ?? `sec-${id}`;
        const el = document.getElementById(anchorId);
        if (el && el.offsetTop <= marker) {
          activeId = id;
        }
      }

      if (activeId) {
        setSelectedId(activeId);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });

    const timeout = setTimeout(handleScroll, 100);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, [items]);

  const saveItemsList = (updatedList: SectionItem[]) => {
    setItems(updatedList);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
  };

  // Smooth scroll to targeted academic division
  const handleSelectCourse = (id: string) => {
    const anchorId = SECTION_ANCHOR_IDS[id] ?? `sec-${id}`;
    const el = document.getElementById(anchorId);
    const container = containerRef.current;
    if (el && container) {
      const relativeTop = el.offsetTop - getStickyStackHeight() - 16;
      container.scrollTo({
        top: relativeTop,
        behavior: 'smooth',
      });
      window.history.replaceState(null, '', `#${anchorId}`);
      setSelectedId(id);
    }
  };

  // Toggle enrollment status database
  const handleEnrollToggle = (id: string) => {
    let next: string[];
    if (enrolledIds.includes(id)) {
      next = enrolledIds.filter((item) => item !== id);
    } else {
      next = [...enrolledIds, id];
    }
    setEnrolledIds(next);
    localStorage.setItem(ENROLLED_KEY, JSON.stringify(next));
  };

  const handleToggleLanguage = () => {
    const nextLanguage = language === 'zh' ? 'en' : 'zh';
    setLanguage(nextLanguage);

    const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
    if (!select) return;

    select.value = nextLanguage === 'en' ? 'en' : 'zh-CN';
    select.dispatchEvent(new Event('change'));
  };

  // Open creation form modal
  const handleOpenAddNew = () => {
    setModalItem(null);
    setIsModalOpen(true);
  };

  // Open edit form modal
  const handleOpenEdit = (item: SectionItem) => {
    setModalItem(item);
    setIsModalOpen(true);
  };

  // Handle save of addition or edit
  const handleSaveItem = (savedItem: SectionItem) => {
    if (modalItem) {
      // We edited an existing item
      const updated = items.map((i) => (i.id === modalItem.id ? savedItem : i));
      saveItemsList(updated);
    } else {
      // We added a brand new item
      // Check if code collision
      if (items.some((i) => i.id === savedItem.id)) {
        alert(`Mnemonic Code collision detected. Section with ID ${savedItem.id} already exists.`);
        return;
      }
      const updated = [...items, savedItem];
      saveItemsList(updated);
      
      // Delay selection to allow rendering to populate DOM heights
      setTimeout(() => {
        handleSelectCourse(savedItem.id);
      }, 100);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[var(--color-brutal-bg)] text-[var(--color-brutal-dark)] antialiased font-sans">
      
      {/* Central Screen Layout */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-hidden relative">
          {items.length > 0 ? (
            <ContentArea
              items={items}
              selectedId={selectedId}
              enrolledIds={enrolledIds}
              onEnrollToggle={handleEnrollToggle}
              onEdit={handleOpenEdit}
              containerRef={containerRef}
              onSelect={handleSelectCourse}
              onAddNew={handleOpenAddNew}
              pageProgress={pageProgress}
              language={language}
              onToggleLanguage={handleToggleLanguage}
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center text-[var(--text-subtle)]">
              <AlertTriangle className="w-8 h-8 text-[var(--text-faint)] mb-3" />
              <p className="font-sans text-xs">No active syllabus entries in workspace.</p>
              <button
                onClick={handleOpenAddNew}
                className="mt-4 px-4 py-2 border border-dashed border-[var(--color-brutal-border)] font-sans text-xs hover:border-[var(--text-strong)] hover:text-[var(--text-strong)] rounded transition-all cursor-pointer"
              >
                Assemble New Syllabus Entry
              </button>
            </div>
          )}
        </div>
      </div>

      <div id="google_translate_element" className="hidden" />


      {/* Editor Modal Overlay */}
      {isModalOpen && (
        <SyllabusModalForm
          item={modalItem}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveItem}
        />
      )}
    </div>
  );
}
