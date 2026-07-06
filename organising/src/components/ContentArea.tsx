/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { SectionItem } from '../types';
import IssueCardStack, { Issue } from './ui/IssueCardStack';
import { 
  User, 
  Award, 
  MapPin, 
  Check, 
  Sparkles,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  Layers,
  Heart,
  MessageSquare
} from 'lucide-react';
import CaseSegmentTabs from './ui/CaseSegmentTabs';
import StepImageWalkthrough from './ui/StepImageWalkthrough';
import FigureFrame from './ui/FigureFrame';
import Callout from './ui/Callout';
import SectionShell from './ui/SectionShell';
import Card from './ui/Card';
import EditorialHeader from './ui/EditorialHeader';
import CaseStudyTopNav from './ui/CaseStudyTopNav';
import CaseHero from './ui/CaseHero';
import ContentBlock, { ContentLabel, ContentParagraph } from './ui/ContentBlock';
import ProjectPager from './ui/ProjectPager';
import { caseStudyPagerItems, getAdjacentPagerItems } from '../projectPagerItems';
import workshopBoardImg from '../assets/images/AI CAPABILITY DIRECTION WORKSHOP - sep 2025.jpg';
import userPersonaFormImg from '../assets/images/demo-steps/user-persona-form.jpg';
import addProductsTableImg from '../assets/images/demo-steps/add-products-1.jpg';
import addProductsDetailImg from '../assets/images/demo-steps/add-products-2.jpg';
import brandingStoreInfoImg from '../assets/images/demo-steps/branding-store-info.jpg';
import brandingColorImg from '../assets/images/demo-steps/branding-color-1.jpg';
import brandingColorCustomImg from '../assets/images/demo-steps/branding-color-2-customise.jpg';
import brandingLogoImg from '../assets/images/demo-steps/branding-logo.jpg';
import storefrontGeneratedImg from '../assets/images/demo-steps/storefront-generation-result.jpg';
import storefrontIntakeImg from '../assets/images/demo-steps/storefront-intake-preview.jpg';
import domainReadyImg from '../assets/images/demo-steps/domain-ready-to-publish.jpg';
import launchOpsStoreManagementImg from '../assets/images/launch-ops/store-management.jpg';
import launchOpsClientManagementImg from '../assets/images/launch-ops/client-management.jpg';
import launchOpsCommerceImg from '../assets/images/launch-ops/commerce.jpg';
import launchOpsJourneyImg from '../assets/images/launch-ops/journey.jpg';
import launchOpsCommunicationImg from '../assets/images/launch-ops/communication.jpg';
import brandSurfaceExampleImg from '../assets/images/launchpad-v1/branding-example.jpg';
import brandSurfaceVariationsImg from '../assets/images/launchpad-v1/branding-preview.jpg';
import clientPortalImg from '../assets/images/launchpad-v1/client-portal.jpg';
import patientPortalImg from '../assets/images/launchpad-v1/patient-portal.jpg';
import consentImg from '../assets/images/launchpad-v1/consent.jpg';
import userTestingImg from '../assets/images/launchpad-v1/research/user-testing.jpg';
import telehealthLaunchWorkflowImg from '../assets/images/launchpad-v1/research/telehealth-launch-workflow.png';
import cmoIssuesConfusionImg from '../assets/images/launchpad-v1/research/cmo-issues-confusion.png';
import selectProductsBeforeImg from '../assets/images/launchpad-v2/compare/add-products-product-table.jpg';
import selectProductsAfterImg from '../assets/images/launchpad-v2/compare/onboarding-product.png';
import navigationIaBeforeImg from '../assets/images/launchpad-v2/compare/navigation-ia-before.jpg';
import navigationIaAfterImg from '../assets/images/launchpad-v2/compare/navigation-ia-after.jpg';
import buildBrandBeforeImg from '../assets/images/launchpad-v2/compare/step04-build-brand-before.jpg';
import buildBrandAfterImg from '../assets/images/launchpad-v2/compare/step04-build-brand-after.jpg';
import colorBeforeImg from '../assets/images/launchpad-v2/compare/step05-color-before.jpg';
import colorAfterImg from '../assets/images/launchpad-v2/compare/step05-color-after.jpg';
import logoBeforeImg from '../assets/images/launchpad-v2/compare/step05-logo-before.jpg';
import logoAfterImg from '../assets/images/launchpad-v2/compare/step05-logo-after.jpg';
import designSiteBeforeImg from '../assets/images/launchpad-v2/compare/step06-design-site-before.jpg';
import designSiteAfterImg from '../assets/images/launchpad-v2/compare/step06-design-site-after.jpg';
import christianWilliamsImg from '../assets/images/people/christian-williams.png';
import launchpadHeroPoster from '../assets/images/launchpad-v2/website-preview.jpg';
import launchpadHeroVideo from '../assets/videos/launchpad.mp4';

const demoStepImages: Record<number, string[]> = {
  0: [userPersonaFormImg],
  1: [addProductsTableImg, addProductsDetailImg],
  2: [brandingStoreInfoImg, brandingColorImg, brandingColorCustomImg, brandingLogoImg],
  3: [storefrontGeneratedImg, storefrontIntakeImg],
  4: [domainReadyImg],
};

const demoStepCaptions: Record<number, string[]> = {
  0: ['Define the target audience'],
  1: ['Review recommended products', 'Inspect product details'],
  2: ['Confirm store information', 'Choose a brand color', 'Customize the palette', 'Generate logo options'],
  3: ['Preview the generated storefront', 'Preview the intake experience'],
  4: ['Choose a launch domain'],
};

const launchpadMetaItems = [
  { label: 'Role', values: ['Product Design', 'AI Experience Design'] },
  { label: 'Team', values: ['Founder', '2 PMs', 'Developers'] },
  { label: 'Users', values: ['Enterprise telehealth teams'] },
  { label: 'Timeline', values: ['Sep 2025 - Present', 'Ongoing'] },
];

const architectureTabImages: Record<number, Record<number, string[]>> = {
  0: {
    0: [brandSurfaceExampleImg, brandSurfaceVariationsImg],
  },
  1: {
    0: [launchOpsStoreManagementImg],
    1: [launchOpsClientManagementImg],
    2: [launchOpsCommerceImg],
    3: [launchOpsJourneyImg],
    4: [launchOpsCommunicationImg],
  },
  2: {
    0: [clientPortalImg],
    1: [patientPortalImg],
  },
  3: {
    0: [consentImg],
  },
};

const cmoIssues: Issue[] = [
  { id: 1, title: 'Users could not tell who should act' },
  { id: 2, title: 'AI felt absent at key moments' },
  { id: 3, title: 'Generated content felt random' },
  { id: 4, title: 'Options had text but no preview' },
  { id: 5, title: 'Generated content missed the brand tone' },
  { id: 6, title: 'Minimal UI made the next step unclear' },
];

const caseStudyPreloadImages = [
  workshopBoardImg,
  userPersonaFormImg,
  addProductsTableImg,
];

const sectionAnchorIds: Record<string, string> = {
  'PH-01': 'research-1',
  'PH-02': 'research-2',
  'PH-03': 'design-1',
  'PH-04': 'design-2',
  'PH-05': 'iteration-1',
  'PH-06': 'iteration-2',
  RESULT: 'result',
};

const sectionNavLabels: Record<string, string> = {
  OVERVIEW: 'Overview',
  'PH-01': 'Research',
  'PH-02': 'Opportunity',
  'PH-03': 'First Demo',
  'PH-04': 'Design V1',
  'PH-05': 'Users Feedback',
  'PH-06': 'Iteration',
  RESULT: 'Result',
};

const sectionSignalLabels: Record<string, string> = {};

interface ContentAreaProps {
  items: SectionItem[];
  selectedId: string;
  enrolledIds: string[];
  onEnrollToggle: (id: string) => void;
  onEdit: (item: SectionItem) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onSelect: (id: string) => void;
  onAddNew: () => void;
  pageProgress: number;
  language: 'zh' | 'en';
  onToggleLanguage: () => void;
}

const renderParagraphText = (text: string) => {
  const links = [
    {
      text: 'NYTimes',
      url: 'https://www.nytimes.com/2026/04/02/technology/ai-billion-dollar-company-medvi.html',
    },
    {
      text: 'a healthcare conference',
      url: 'https://hlth.com/event-recordings/hlth25/sessions',
    },
  ];
  const link = links.find(({ text: linkText }) => text.includes(linkText));

  if (!link) {
    return text;
  }

  const parts = text.split(link.text);

  return (
    <>
      {parts.map((part, index) => (
        <React.Fragment key={`${part}-${index}`}>
          {part}
          {index < parts.length - 1 && (
            <a
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-[var(--color-link)] underline decoration-[var(--color-link-decoration)] underline-offset-4 transition-colors hover:text-[var(--color-link-hover)] hover:decoration-[var(--color-link-decoration-hover)]"
            >
              {link.text}
            </a>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

type AnnotationTarget = {
  x: number;
  y: number;
  w: number;
  h: number;
  badgeX: number;
  badgeY: number;
};

function SelectProductsComparison() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeChange, setActiveChange] = useState(0);
  const [visibleChange, setVisibleChange] = useState(0);
  const [comparisonView, setComparisonView] = useState<'before' | 'after'>('after');
  const [isAnnotationLeaving, setIsAnnotationLeaving] = useState(false);
  const annotationTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (annotationTimerRef.current) {
        window.clearTimeout(annotationTimerRef.current);
      }
    };
  }, []);

  const revealChange = (index: number) => {
    if (index === activeChange) return;

    if (annotationTimerRef.current) {
      window.clearTimeout(annotationTimerRef.current);
    }

    setActiveChange(index);
    setIsAnnotationLeaving(true);
    annotationTimerRef.current = window.setTimeout(() => {
      setVisibleChange(index);
      setIsAnnotationLeaving(false);
    }, 180);
  };

  const tabs = [
    {
      num: '01',
      label: 'Navigation IA',
      eyebrow: 'Navigation IA - Global Workflow',
      title: 'Making the launch process legible',
      desc: 'The original navigation treated onboarding as a linear checklist. I redesigned it as a clearer workflow system that shows where users are, what agents are doing with them, and how much setup time remains.',
      beforeImg: navigationIaBeforeImg,
      afterImg: navigationIaAfterImg,
      aspect: '1443 / 146',
      changes: [
        {
          num: 'Change 01',
          title: 'Workflow-level IA',
          desc: 'I grouped related tasks into clearer steps so the onboarding path felt like a guided setup workflow instead of a long form sequence.',
          mini: 'ia',
          target: { x: 20.0, y: 34.0, w: 57.8, h: 40.0, badgeX: 48, badgeY: 35.5 },
        },
        {
          num: 'Change 02',
          title: 'Agents working with the user',
          desc: 'I added visible agent presence in the top bar so generation felt collaborative instead of hidden in the background.',
          mini: 'agents',
          target: { x: 86.9, y: 36.5, w: 6.3, h: 39.5, badgeX: 85.2, badgeY: 31.5 },
        },
        {
          num: 'Change 03',
          title: 'Remaining setup time',
          desc: 'I surfaced the approximate time left so users had feedback while the system was generating and configuring the store.',
          mini: 'time',
          target: { x: 91.8, y: 36.0, w: 6.6, h: 22.5, badgeX: 90.4, badgeY: 31.5 },
        },
      ],
    },
    {
      num: '02',
      label: 'Select Products',
      eyebrow: 'Select Products - Step 03',
      title: 'Rethinking how products are presented',
      desc: "The original flow buried products inside a chat-driven experience with no visual context. I redesigned it around three principles: show the AI's reasoning, organise by category, and let users scan visually.",
      beforeImg: selectProductsBeforeImg,
      afterImg: selectProductsAfterImg,
      aspect: '1440 / 918',
      changes: [
        {
          num: 'Change 01',
          title: 'Chat -> AI recommendation summary',
          desc: 'I replaced the persistent chat panel with a compact summary that explains why these products were recommended without taking over the screen.',
          mini: 'summary',
          target: { x: 15.0, y: 17.2, w: 70.1, h: 10.4, badgeX: 78, badgeY: 15.2 },
        },
        {
          num: 'Change 02',
          title: 'Table -> Product card grid',
          desc: 'I changed the product list from table rows into image-led cards, making product types easier to scan and compare.',
          mini: 'cards',
          target: { x: 15.9, y: 34.6, w: 14.9, h: 31.1, badgeX: 33, badgeY: 34.2 },
        },
        {
          num: 'Change 03',
          title: 'Category tabs for filtering',
          desc: 'I grouped products by treatment direction so users could browse by need instead of facing one long list of options.',
          mini: 'tabs',
          target: { x: 15.9, y: 28.9, w: 41.0, h: 6.8, badgeX: 58, badgeY: 26.8 },
        },
      ],
    },
    {
      num: '03',
      label: 'Build Brand',
      eyebrow: 'Build Brand - Step 04',
      title: 'Making brand generation iterative',
      desc: 'The first version gave users one generated result. If it missed the mark, the only path was to start over. I redesigned the step so users could keep momentum and refine the brand in place.',
      beforeImg: buildBrandBeforeImg,
      afterImg: buildBrandAfterImg,
      aspect: '2880 / 1836',
      changes: [
        {
          num: 'Change 01',
          title: 'Generate More',
          desc: "I surfaced naming options inline, so users could explore directions without re-filling the form.",
          mini: 'options',
          target: { x: 64.2, y: 29.3, w: 11.2, h: 6.3, badgeX: 78, badgeY: 27.5 },
        },
        {
          num: 'Change 02',
          title: 'Refine with AI',
          desc: 'I added a natural-language prompt to tweak the result in place instead of restarting generation.',
          mini: 'prompt',
          target: { x: 73.2, y: 29.8, w: 10.6, h: 6.4, badgeX: 77.4, badgeY: 30.2 },
        },
      ],
    },
    {
      num: '04',
      label: 'Choose Color',
      eyebrow: 'Choose Style: Color - Step 05',
      title: 'Letting users see color decisions before committing',
      desc: 'Users were choosing color blindly. The most memorable failure was selecting gold and getting something that felt yellow. I changed the step so every color choice had immediate storefront context.',
      beforeImg: colorBeforeImg,
      afterImg: colorAfterImg,
      aspect: '2880 / 1616',
      changes: [
        {
          num: 'Change 01',
          title: 'Live storefront preview',
          desc: 'I made the left panel update in real time as color was selected, so the choice became visible before confirmation.',
          mini: 'preview',
          target: { x: 17.3, y: 25.3, w: 23.2, h: 61.2, badgeX: 42, badgeY: 23 },
        },
      ],
    },
    {
      num: '05',
      label: 'Choose Logo',
      eyebrow: 'Choose Style: Logo - Step 05',
      title: 'Turning logo creation into a directed choice',
      desc: 'The first version treated logo work as a single upload area. Users could not explore directions or adjust the output. I split the paths and added previews so the logo could be evaluated as a system.',
      beforeImg: logoBeforeImg,
      afterImg: logoAfterImg,
      aspect: '2896 / 1804',
      changes: [
        {
          num: 'Change 01',
          title: 'Generate vs Upload split',
          desc: 'I separated the two paths so users could choose AI exploration or bring an existing asset.',
          mini: 'split',
          target: { x: 15.2, y: 21.5, w: 20.2, h: 6.8, badgeX: 36, badgeY: 20 },
        },
        {
          num: 'Change 02',
          title: 'Three logo format previews',
          desc: 'I showed multiple logo formats at once so users could judge whether the mark worked beyond one square preview.',
          mini: 'formats',
          target: { x: 15.2, y: 29.7, w: 12.8, h: 29.4, badgeX: 30, badgeY: 29.5 },
        },
        {
          num: 'Change 03',
          title: 'Natural-language refinement',
          desc: 'I added prompt-based refinement so users could change direction without regenerating from scratch.',
          mini: 'prompt',
          target: { x: 48.5, y: 44.1, w: 26.5, h: 25.2, badgeX: 76, badgeY: 43.2 },
        },
      ],
    },
    {
      num: '06',
      label: 'Design Site',
      eyebrow: 'Design Site - Step 06',
      title: 'Making the final site adjustable before launch',
      desc: 'Images and logos used to feel final too early. I redesigned the step so users could refine generated assets and explicitly confirm where the finished logo would be used.',
      beforeImg: designSiteBeforeImg,
      afterImg: designSiteAfterImg,
      aspect: '2880 / 1836',
      changes: [
        {
          num: 'Change 01',
          title: 'AI image refinement',
          desc: 'I added a natural-language prompt to adjust generated imagery without leaving the site preview.',
          mini: 'image',
          target: { x: 32.6, y: 40.5, w: 24.3, h: 22.2, badgeX: 58, badgeY: 38.4 },
        },
        {
          num: 'Change 02',
          title: 'Upload site imagery',
          desc: 'I let users replace generated visuals with their own website images, so the final storefront could use real brand assets instead of generic AI output.',
          mini: 'usage',
          target: { x: 64.6, y: 32.1, w: 8.4, h: 6.2, badgeX: 76, badgeY: 34.6 },
        },
      ],
    },
  ];

  const active = tabs[activeTab];
  const selectedChange = active.changes[visibleChange] ?? active.changes[0];
  const isAfterView = comparisonView === 'after';
  return (
    <div className="bg-[var(--surface-panel)] p-[var(--space-lg)] text-[var(--text-primary)]">
      <CaseSegmentTabs
        items={tabs.map((tab) => ({ number: tab.num, label: tab.label }))}
        activeIndex={activeTab}
        onChange={(index) => {
          setActiveTab(index);
          setActiveChange(0);
          setVisibleChange(0);
          setComparisonView('after');
          setIsAnnotationLeaving(false);
        }}
        className="mb-[var(--space-section-body-element)]"
      />

      <div className="mx-auto min-h-[96px] w-full md:w-[92%]">
        <h3 className="case-heading text-[length:var(--font-heading-md)] leading-[var(--line-height-heading)]">
          {active.title}
        </h3>
        <p className="case-body-copy mt-[var(--space-section-body-element)] max-w-2xl text-[var(--text-secondary-neutral)]">
          {active.desc}
        </p>
      </div>

      <div className="case-card mx-auto mt-[var(--space-section-body-element)] w-full overflow-hidden">
        <div className="flex aspect-[2880/1866] items-center justify-center bg-[var(--surface-10)] select-none">
          <div
            className="redesign-walkthrough relative w-full overflow-hidden border-y border-[var(--border-cool-color)] bg-[var(--surface-10)]"
            style={{ aspectRatio: active.aspect }}
          >
            <img
              key={`${active.label}-${comparisonView}`}
              src={isAfterView ? active.afterImg : active.beforeImg}
              alt={`${active.label} ${isAfterView ? 'redesigned' : 'previous'} interface`}
              className="block h-full w-full object-contain"
              draggable={false}
            />
            {isAfterView && (
              <div className={`walkthrough-annotation-layer ${isAnnotationLeaving ? 'is-leaving' : ''}`}>
                <div
                  key={`${active.label}-${selectedChange.num}-target`}
                  className="walkthrough-target pointer-events-none absolute z-20"
                  style={{
                    left: `${selectedChange.target.x}%`,
                    top: `${selectedChange.target.y}%`,
                    width: `${selectedChange.target.w}%`,
                    height: `${selectedChange.target.h}%`,
                  }}
                />
                <span
                  key={`${active.label}-${selectedChange.num}-badge`}
                  className={`walkthrough-badge pointer-events-none absolute z-40 ${
                    selectedChange.target.y < 8 || selectedChange.target.badgeY < 8 ? 'is-inside' : ''
                  }`}
                  style={{
                    left: `${selectedChange.target.badgeX}%`,
                    top: `${selectedChange.target.badgeY}%`,
                  }}
                >
                  {selectedChange.num.replace(' ', '_')}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <p className="case-caption-copy mt-[var(--space-text-stack)] text-center">Click a change card to reveal the redesigned area.</p>

	              <div className="mt-[var(--space-section-body-element)] w-full">
        <p className="case-section-label">
          UI Changes
        </p>
        <div className="mt-[var(--space-section-body-element)] grid min-h-[150px] grid-cols-1 border-t border-[var(--border-soft-color)] md:grid-cols-3">
          {active.changes.map((change, index) => (
            <button
              key={change.num}
              type="button"
              onClick={() => revealChange(index)}
              className={`change-trigger group border-b border-[var(--border-soft-color)] p-[var(--space-lg)] text-left transition-all duration-300 md:border-b-0 md:border-r md:last:border-r-0 ${
                index === activeChange ? 'is-active' : ''
              }`}
            >
              <p className="case-caption-copy transition-colors group-[.is-active]:text-[var(--color-primary)]">{change.num}</p>
              <p className="case-card-title mt-[var(--space-xs)]">{change.title}</p>
              <p className="case-card-support mt-[var(--space-xs)]">{change.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResultSnapshot() {
  const metrics = [
    {
      value: 'Live',
      label: 'LaunchPad launched',
      support: 'Public launch Jun 16',
    },
    {
      value: '44',
      label: 'Clients signed',
      support: 'Onboarding or live',
    },
    {
      value: '15',
      label: 'Clients live',
      support: 'Published branded storefronts',
    },
    {
      value: '12 min',
      label: 'Avg onboarding time',
      support: 'Average time to complete onboarding',
    },
  ];

  return (
    <section className="case-card case-surface-base overflow-hidden">
      <div className="grid md:grid-cols-4">
        {metrics.map((metric, index) => (
          <div
            key={metric.label}
            className={`p-[var(--space-card-lg)] ${
              index > 0 ? 'border-t border-[var(--border-soft-color)] md:border-l md:border-t-0' : ''
            }`}
          >
            <div className="case-result-value">{metric.value}</div>
            <div className="case-caption-label mt-[var(--space-sm)]">{metric.label}</div>
            <p className="case-card-support mt-[var(--space-xs)]">{metric.support}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ResultDemoVideo() {
  return (
    <figure className="case-card case-surface-base overflow-hidden p-[var(--space-card-sm)]">
      <div className="case-video-frame">
        <iframe
          src="https://player.vimeo.com/video/1204195561?title=0&byline=0&portrait=0"
          title="LaunchPad demo video"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </figure>
  );
}

export default function ContentArea({
  items,
  selectedId,
  enrolledIds,
  onEnrollToggle,
  onEdit,
  containerRef,
  onSelect,
  onAddNew,
  pageProgress,
  language,
  onToggleLanguage,
}: ContentAreaProps) {
  // Local submitting status for click events feedback
  const [submittingMap, setSubmittingMap] = useState<Record<string, boolean>>({});
  const [activeDemoStep, setActiveDemoStep] = useState<number>(2);
  const [activeBackstageTab, setActiveBackstageTab] = useState<number>(0);
  const preloadedImagesRef = useRef<HTMLImageElement[]>([]);
  const { previous, next } = getAdjacentPagerItems(caseStudyPagerItems, 'launchpad');

  useEffect(() => {
    const connectionHints = [
      { rel: 'preconnect', href: 'https://player.vimeo.com' },
      { rel: 'preconnect', href: 'https://i.vimeocdn.com' },
      { rel: 'dns-prefetch', href: 'https://player.vimeo.com' },
      { rel: 'dns-prefetch', href: 'https://i.vimeocdn.com' },
    ];

    connectionHints.forEach(({ rel, href }) => {
      const selector = `link[data-case-study-preload="${rel}-${href}"]`;
      if (document.head.querySelector(selector)) return;

      const link = document.createElement('link');
      link.rel = rel;
      link.href = href;
      link.dataset.caseStudyPreload = `${rel}-${href}`;
      document.head.appendChild(link);
    });

    preloadedImagesRef.current = caseStudyPreloadImages.map((src) => {
      const image = new Image();
      image.decoding = 'async';
      image.src = src;
      return image;
    });
  }, []);

  useEffect(() => {
    const root = containerRef.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-section-reveal]'));

    if (reduceMotion || sections.length === 0) {
      sections.forEach((section) => section.classList.add('is-visible'));
      return;
    }

    document.body.classList.add('section-reveal-ready');

    const revealVisibleSections = () => {
      const viewportHeight = root?.clientHeight ?? window.innerHeight;
      const revealLine = viewportHeight * 0.82;

      sections.forEach((section) => {
        if (section.classList.contains('is-visible')) return;

        const rootTop = root?.getBoundingClientRect().top ?? 0;
        const sectionTop = section.getBoundingClientRect().top - rootTop;

        if (sectionTop < revealLine) {
          section.classList.add('is-visible');
        }
      });
    };

    revealVisibleSections();
    root?.addEventListener('scroll', revealVisibleSections, { passive: true });
    window.addEventListener('resize', revealVisibleSections);

    return () => {
      root?.removeEventListener('scroll', revealVisibleSections);
      window.removeEventListener('resize', revealVisibleSections);
      document.body.classList.remove('section-reveal-ready');
    };
  }, [containerRef, items.length]);

  const handleEnrollClick = (itemId: string, isEnrolled: boolean) => {
    if (isEnrolled) {
      onEnrollToggle(itemId);
    } else {
      setSubmittingMap((prev) => ({ ...prev, [itemId]: true }));
      setTimeout(() => {
        setSubmittingMap((prev) => ({ ...prev, [itemId]: false }));
        onEnrollToggle(itemId);
      }, 700);
    }
  };

  const contextItem = items[0];
  const contextIsEnrolled = contextItem ? enrolledIds.includes(contextItem.id) : false;
  const contextIsSubmitting = contextItem ? submittingMap[contextItem.id] || false : false;
  const handleMainScroll = (event: React.UIEvent<HTMLDivElement>) => {
    if (event.currentTarget.scrollLeft !== 0) {
      event.currentTarget.scrollLeft = 0;
    }
  };

  return (
    <div className="flex-1 bg-[var(--surface-base)] flex flex-col relative h-full select-none selection:bg-[var(--text-strong)] selection:text-[var(--text-inverse)]">
      {/* Main Continuous Scroll Panel */}
      <div
        ref={containerRef}
        id="continuous-scroll-content-container"
        className="flex-1 overflow-x-hidden overflow-y-auto scroll-smooth"
        onScroll={handleMainScroll}
      >
        {contextItem && (
          <>
            <EditorialHeader
              brandLabel="LaunchPad — OpenLoop"
              brandHref="https://openloophealth.com/launchpad"
              leftLabel="Portfolio Case Study"
              rightLabel="2025"
              actionLabel="LaunchPad"
              actionHref="https://openloophealth.com/launchpad"
            />
            <CaseStudyTopNav
              items={[
                { id: 'OVERVIEW', label: sectionNavLabels.OVERVIEW },
                ...items.map((item) => ({
                  id: item.id,
                  label: sectionNavLabels[item.id] ?? item.category,
                })),
                { id: 'RESULT', label: sectionNavLabels.RESULT },
              ]}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          </>
        )}

        {contextItem && (
          <CaseHero
            variant="showcase"
            title={(
              <>
                Launch enterprise-grade virtual care brand in{' '}
                <span className="text-[var(--color-primary)]">as little as a day.</span>
              </>
            )}
            subtitle={(
              <>
                an ai powered infrastructure builder generating{' '}
                <span className="text-[var(--color-primary)]">$8m+</span> in monthly revenue
              </>
            )}
            chips={['0-1', 'U.S. Telehealth']}
            meta={launchpadMetaItems}
            artifact={{
              type: 'video',
              src: launchpadHeroVideo,
              ariaLabel: 'LaunchPad product demo preview',
              autoPlay: true,
              muted: true,
              loop: true,
              playsInline: true,
              preload: 'auto',
              poster: launchpadHeroPoster,
            }}
          />
        )}

        <div>
        {contextItem && (
          <section id="overview" data-section-reveal className="border-t border-[var(--border-soft-color)] bg-[var(--surface-base)]">
            <div className="mx-auto w-full max-w-[var(--container-main)] px-[var(--space-page-x)] py-[var(--space-section-padding-y)] md:px-[var(--space-page-x-desktop)]">
              <div className="mx-auto max-w-[var(--container-section-body)]">
                <span className="case-section-label">Overview</span>

                <ContentParagraph>
                  Today, people can access treatments like weight loss programmes entirely online, creating new opportunities for telehealth businesses. However, launching a healthcare brand is complex. OpenLoop provides the platform behind these healthcare brands.
                </ContentParagraph>

                <FigureFrame
                  src={telehealthLaunchWorkflowImg}
                  alt="Telehealth brand launch workflow from idea to optimisation"
                  wrapperClassName="mt-[var(--space-section-body-element)]"
                  variant="flush"
                />              

                <div className="mt-[var(--space-section-body-element)]">
                  <ContentParagraph>
                    Built on top of OpenLoop's white-label telehealth infrastructure, LaunchPad uses AI to help brands go from idea to launch faster.
                  </ContentParagraph>
                </div>

              </div>
            </div>
          </section>
        )}
        {items.map((item, index) => {
          const isFocused = item.id === selectedId;

          const isFirstSection = index === 0;

          return (
            <SectionShell
              key={item.id}
              id={sectionAnchorIds[item.id] ?? `sec-${item.id}`}
              phaseId={item.id}
              category={item.category}
              title={item.title}
              sysId={item.sysId}
              chapterLabel={isFirstSection ? 'STARTING CHAPTER' : 'CORE CHAPTER PARTITION'}
              isFocused={isFocused}
              signalLabel={sectionSignalLabels[item.id]}
              surface={index % 2 === 0 ? 'subtle' : 'base'}
            >
              {/* Left Column (Span 2/3): The Case Study Text + Rich Interactive Custom Infographic */}
                    <div className="case-narrative-flow min-w-0 text-[var(--text-primary)] lg:col-span-3">
                    
                    {/* Opening paragraphs */}
                    {item.id !== 'PH-02' && item.id !== 'PH-05' && (
                    <div className="case-body-copy case-paragraph-stack">
                      <p>{item.dropCap}{item.dropCapText}</p>
                      {item.paragraphs.map((p, idx) => (
                        <p key={idx}>{renderParagraphText(p)}</p>
                      ))}
                    </div>
                    )}

                    {/* Highly stylized Blockquote */}
                    {item.quote && item.id !== 'PH-02' && item.id !== 'PH-05' && (
                      <Callout variant="quote">
                        <p className="case-body-copy italic">
                          "{item.quote}"
                        </p>
                      </Callout>
                    )}

                    {item.id === 'PH-02' && (
                      <div className="case-body-copy case-paragraph-stack">
                        <p>
                          OpenLoop already owns the hard parts of telehealth: clinical operations, pharmacy workflows, and compliance.
                        </p>
                        <p>
                          The missing layer is what unlocks a new market: a productized setup experience that helps people without a medical background launch a telehealth business.
                        </p>
                      </div>
                    )}

                    {/* PHASE 1 WORKSHOP BOARD IMAGE */}
                    {item.id === 'PH-01' && (
                      <div className="case-card case-visual-block group w-full overflow-hidden p-[var(--space-sm)] transition-all duration-300 hover:border-[var(--border-default-color)] hover:shadow-[var(--shadow-floating)]">
                        <div className="grid grid-cols-1 gap-[var(--space-xs)] p-[var(--space-xs)] pb-[var(--space-sm)] sm:grid-cols-2 lg:grid-cols-4">
                          {[
                            {
                              title: 'AI Scribe',
                              badge: 'Crowded Market',
                              badgeClass: 'case-badge-primary',
                              body: 'Heavily commoditised documentation with little defensible moat.',
                            },
                            {
                              title: 'Clinical Asst',
                              badge: 'Mature Giants',
                              badgeClass: 'case-badge-primary',
                              body: 'Large EHR incumbents already owned the clinical assistant layer.',
                            },
                            {
                              title: 'Compliance',
                              badge: 'Function Only',
                              badgeClass: 'case-badge-primary',
                              body: 'Useful as a feature, but weak as a standalone revenue engine.',
                            },
                            {
                              title: 'Analytics',
                              badge: 'Weak Hook',
                              badgeClass: 'case-badge-primary',
                              body: 'Data cleanup alone felt too detached from the core care workflow.',
                            },
                          ].map((card) => (
                            <Card key={card.title} className="min-h-[88px] px-[var(--space-sm)] py-[var(--space-sm)]">
                              <h4 className="case-caption-label truncate">
                                {card.title}
                              </h4>
                              <div className={`case-badge mt-[var(--space-sm)] max-w-full ${card.badgeClass}`}>
                                {card.badge}
                              </div>
                              <p className="case-card-body mt-[var(--space-xs)]">
                                {card.body}
                              </p>
                            </Card>
                          ))}
                        </div>
                        <FigureFrame
                          src={workshopBoardImg}
                          alt="AI Capability Direction Workshop Sep 2025"
                          referrerPolicy="no-referrer"
                          variant="flush"
                          imageClassName="block w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                          caption={(
                            <div className="case-caption-copy mt-[var(--space-sm)] border-t border-[var(--border-soft-color)] px-[var(--space-md)] py-[var(--space-sm)] select-none">
                              <span>AI Capability Direction Workshop-Oct 2025</span>
                            </div>
                          )}
                        />
                      </div>
                    )}

                    {/* PHASE 1: Editorial comparison block shown in first section */}
                    {item.id === 'PH-01' && (
                      <div className="mt-[var(--space-section-body-element)] flex flex-col gap-[var(--space-section-body-element)]">
                        <p className="case-body-copy font-medium">
                          So we reframed the question. Instead of asking what AI could do, we asked: What unique capabilities does OpenLoop already have, and how could AI amplify them?
                        </p>
                        <div className="case-card overflow-hidden bg-[var(--surface-10)]">
                          <div className="space-y-[var(--space-sm)] px-[var(--space-2xl)] py-[var(--space-xl)]">
                            <span className="case-caption-label block">
                              Instead of asking
                            </span>
                            <p className="case-body-copy font-semibold">
                              What other AI products could we build?
                            </p>
                          </div>

                          <div className="space-y-[var(--space-sm)] border-t border-[var(--border-soft-color)] px-[var(--space-2xl)] py-[var(--space-xl)]">
                            <span className="case-caption-label block">
                              We asked
                            </span>
                            <p className="case-body-copy font-semibold">
                              Which of OpenLoop's existing capabilities could AI turn into a competitive advantage?
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ========================================================= */}
                    {/* CUSTOM HIGH-FIDELITY INTERACTIVE INFOGRAPHIC PER PHASE */}
                    {/* ========================================================= */}
                    
                    {/* PHASE 2: INFRASTRUCTURE DIAGRAM */}
                    {item.id === 'PH-02' && (
                      <div className="case-visual-block flex flex-col gap-[var(--space-section-body-element)]">
                          <section className="grid grid-cols-1 gap-[var(--space-section-body-element)] md:grid-cols-2">
                            {[
                              {
                                tag: 'Past customer base',
                                name: 'Established enterprises',
                                description: 'Already have brand, website, and acquisition teams. OpenLoop fills the clinical layer only.',
                                scope: ['muted', 'covered', 'covered'],
                              },
                              {
                                tag: 'Emerging customer base',
                                name: 'Creators & small wellness brands',
                                description: 'Have audience and community trust — but need the entire product layer built for them.',
                                scope: ['new-build', 'covered', 'covered'],
                              },
                            ].map((customer, customerIndex) => (
                              <div
                                key={customer.name}
                                className={`case-card p-[var(--space-lg)] ${
                                  customerIndex === 1 ? 'border-[var(--border-default-color)]' : 'border-[var(--border-soft-color)]'
                                }`}
                              >
                                <span className="case-badge case-badge-neutral mb-[var(--space-sm)]">
                                  {customer.tag}
                                </span>
                                <h4 className="case-card-title mt-[var(--space-sm)]">
                                  {customer.name}
                                </h4>
                                <p className="case-card-support mt-[var(--space-sm)] min-h-[54px]">
                                  {customer.description}
                                </p>
                                <div className="mt-[var(--space-section-body-element)] grid grid-cols-1 gap-[3px] sm:grid-cols-3">
                                  {[
                                    ['Setup tech', 'Storefront + intake'],
                                    ['Clinical ops', 'Clinical + pharmacy'],
                                    ['Compliance', 'Rules + review'],
                                  ].map(([service, detail], scopeIndex) => {
                                    const state = customer.scope[scopeIndex];
                                    return (
                                      <div
                                        key={service}
                                        className={`relative min-h-[52px] rounded-[var(--radius-sm)] border px-[var(--space-sm)] py-[var(--space-sm)] ${
                                          state === 'new-build'
                                            ? 'border-[var(--color-primary)] bg-[var(--surface-base)] text-[var(--color-primary)]'
                                            : state === 'covered'
                                              ? 'border-[var(--border-soft-color)] bg-[var(--surface-section)] text-[var(--text-primary)]'
                                              : 'border-[var(--border-soft-color)] bg-[var(--surface-section)] text-[var(--text-tertiary)] opacity-35'
                                        }`}
                                      >
                                        {state === 'new-build' && (
                                          <span className="case-badge case-badge-danger absolute -right-1.5 -top-2 bg-[var(--surface-base)]">
                                            New build
                                          </span>
                                        )}
                                        <span className="case-card-title block">{service}</span>
                                        <span className="case-card-support mt-[var(--space-2xs)] block opacity-75">{detail}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                          </section>

                          <section className="border-t border-[var(--border-soft-color)] pt-[var(--space-section-body-element)]">
                            <div className="grid grid-cols-1 items-center gap-[var(--space-section-body-element)] md:grid-cols-[1fr_auto_1fr]">
                              <div>
                                <span className="case-caption-label block">
                                  What OpenLoop has
                                </span>
                                <p className="case-card-title mt-[var(--space-2xs)]">
                                  Clinical ops, pharmacy & compliance
                                </p>
                                <p className="case-card-support mt-[var(--space-2xs)]">
                                  The hardest, most regulated parts of telehealth — already built.
                                </p>
                              </div>
                              <div className="case-card-title text-[var(--text-tertiary)]">
                                +
                              </div>
                              <div>
                                <span className="case-caption-label block">
                                  What needs to be built
                                </span>
                                <p className="case-card-title mt-[var(--space-2xs)] text-[var(--color-primary)]">
                                  A productized Setup Layer
                                </p>
                                <p className="case-card-support mt-[var(--space-2xs)]">
                                  Storefront, intake, and brand config — so anyone can launch a telehealth business without a medical background.
                                </p>
                              </div>
                            </div>
                          </section>
                      </div>
                    )}

	                    {/* PHASE 3: FIGMA WALKTHROUGH STRIP */}
	                    {item.id === 'PH-03' && (
	                      <>
	                        <div className="case-card case-visual-block grid overflow-hidden bg-[var(--surface-base)] md:grid-cols-3">
	                          {[
		                            {
		                              label: 'Goal',
		                              body: 'Make the future tangible.',
		                            },
		                            {
		                              label: 'Principle',
		                              body: 'Borrow familiar patterns.',
		                              sub: 'Validate the business model first.',
		                            },
		                            {
		                              label: 'Why it worked',
		                              body: 'Stakeholders evaluated the opportunity instead of imagining it.',
	                            },
	                          ].map((block, index) => (
	                            <div
	                              key={block.label}
	                              className={`bg-[var(--surface-base)] p-[var(--space-card-lg)] ${
	                                index > 0 ? 'border-t border-[var(--border-soft-color)] md:border-l md:border-t-0' : ''
	                              }`}
	                            >
	                              <span className="case-caption-label block">{block.label}</span>
	                              <p className="case-card-title mt-[var(--space-sm)]">{block.body}</p>
	                              {'sub' in block && block.sub && (
	                                <p className="case-card-support mt-[var(--space-xs)]">
	                                  {block.sub}
	                                </p>
	                              )}
	                            </div>
	                          ))}
	                        </div>

			                      <div className="mt-[var(--space-section-body-element)]">
                              {(() => {
                                const steps = [
                                  {
                                    id: 1,
                                    title: 'Target Users',
                                    code: 'Target Users',
                                    placeholderTitle: 'Target user definition screen',
                                    placeholderMeta: 'UI 截图占位',
                                    placeholderDesc: '用户画像 · 专攻方向 · 受众偏好',
                                    goal: 'Turn a vague customer audience into a user definition the system can understand.',
                                    decision: 'Users need to confirm who they serve before later recommendations have context.',
                                  },
                                  {
                                    id: 2,
                                    title: 'Product Selection',
                                    code: 'Products',
                                    placeholderTitle: 'Product recommendation screen',
                                    placeholderMeta: 'UI 截图占位',
                                    placeholderDesc: '推荐理由 · 产品组合 · 适配说明',
                                    goal: 'Help users understand why the system recommends each product, not just see the final result.',
                                    decision: 'Recommendations need rationale and comparison, not only output.',
                                  },
                                  {
                                    id: 3,
                                    title: 'Branding',
                                    code: 'Branding',
                                    placeholderTitle: 'Brand info, color, and logo generation screen',
                                    placeholderMeta: 'UI 截图占位',
                                    placeholderDesc: 'Store info · Theme color · Custom color · Logo generation',
                                    goal: 'Let users confirm the brand name, slogan, and brief before choosing colors and generating a logo, turning abstract preferences into something visible.',
                                    decision: 'Brand information and color choices shape the logo and storefront, so the system needs a confirmed direction first.',
                                  },
                                  {
                                    id: 4,
                                    title: 'Storefront',
                                    code: 'Storefront',
                                    placeholderTitle: 'Website style and intake preview screen',
                                    placeholderMeta: 'UI 截图占位',
                                    placeholderDesc: 'Website template · Generated storefront · Intake preview',
                                    goal: 'Let users choose a website style, then preview the generated storefront and intake flow before launch.',
                                    decision: 'The storefront needs to show both the brand surface and the patient entry point.',
                                  },
                                  {
                                    id: 5,
                                    title: 'Domain',
                                    code: 'Domain',
                                    placeholderTitle: 'Domain claim screen',
                                    placeholderMeta: 'UI 截图占位',
                                    placeholderDesc: 'Suggested domain · Domain selection · Confirm and submit',
                                    goal: 'Let users choose from recommended domains and understand this is the final confirmation before launch.',
                                    decision: 'Domain selection should feel clear and non-technical, with a visible path to publishing.',
                                  },
                                ];
		                                return (
		                                  <StepImageWalkthrough
                                        steps={steps.map((step) => ({
                                          id: step.id,
                                          number: String(step.id).padStart(2, '0'),
                                          label: step.title,
                                          title: step.title,
                                          description: step.goal,
                                        }))}
                                        activeIndex={activeDemoStep}
                                        onChange={setActiveDemoStep}
                                        images={demoStepImages[activeDemoStep] ?? []}
                                        imageCaptions={demoStepCaptions[activeDemoStep] ?? []}
                                        imageAlt={(imageIndex) => `Step ${activeDemoStep + 1} reference ${imageIndex + 1}`}
                                      />
                                );
                              })()}
			                      </div>
                        <Callout variant="card" className="case-card case-surface-base mt-[var(--space-section-body-element)]">
	                          <span className="case-caption-label block">Stakeholder feedback</span>
                            <div className="mt-[var(--space-section-body-element)] grid gap-[var(--space-section-body-element)] md:grid-cols-[auto_1fr] md:items-start">
                              <div className="case-card-title flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-panel)]">
                                CW
                              </div>
                              <div>
                                <h3 className="case-card-title">Christian Williams</h3>
                                <p className="case-card-body mt-[var(--space-xs)] text-[var(--text-tertiary)]">
                                  Chief Operating Officer
                                </p>
                                <p className="case-body-copy mt-[var(--space-text-stack)] italic">
                                  “Wow... this actually flows much better than I expected.”
                                </p>
                                <p className="case-caption-copy mt-[var(--space-text-stack)]">
                                  — Shared during the demo review
                                </p>
                              </div>
                            </div>
                            <div className="mt-[var(--space-section-body-element)] border-t border-[var(--border-soft-color)] pt-[var(--space-section-body-element)]">
                              <p className="case-body-copy">
                                The conversation moved from whether the idea was worth pursuing to <em>how</em> the real onboarding experience should work.
                              </p>
                            </div>
	                        </Callout>
	                      </>
	                    )}

                    {/* PHASE 4: DEMO VS REAL BUSINESS FLOW */}
                    {item.id === 'PH-04' && (
                      <div className="case-visual-block">
                        <div>
                          {(() => {
                            const tabs = [
                              {
                                letter: 'A',
                                short: 'Brand surface',
                                title: 'Generated brand surface',
                                description: 'This layer turns brand positioning, style preferences, and product choices into a previewable brand surface. Customers are not just filling out a form. They can see how their telehealth brand will appear through pages, copy, and visual systems.',
                                color: 'emerald',
                                nav: [
                                  ['Brand brief form', 'Name · Tagline · Mission'],
                                  ['Logo picker', 'Upload · Generate · Library'],
                                  ['Theme controls', 'Colors · Fonts · Tokens'],
                                  ['Section editor', 'Hero · Products · Footer'],
                                  ['CTA preview', 'Button copy · Link targets'],
                                  ['Email preview', 'Welcome · Reminder layouts'],
                                ],
                                appTitle: 'Brand Builder',
                                screenTitle: 'Storefront Preview',
                                cards: ['Brand brief locked', 'Logo selected', 'Theme tokens generated', 'Hero section ready', 'CTA linked to intake'],
                                meta: [['Primary', 'brand accent'], ['Template', 'wellness'], ['Preview', 'staging']],
                              },
                              {
                                letter: 'B',
                                short: 'Launch operations',
                                title: 'Launch operations',
                                description: 'This layer connects store management, client management, business setup, journey data, communications, and compliance review. It helps the internal team turn a created brand into something that can be operated, tracked, and managed.',
                                color: 'indigo',
                                nav: [
                                  ['Store mgmt', 'Store profile · Versioning'],
                                  ['Client mgmt', 'Client account · Team access'],
                                  ['Commerce', 'Programs · Pricing · Orders'],
                                  ['Journey analytics', 'Funnel · Status · Drop-off'],
                                  ['Communications', 'Email · SMS · Notifications'],
                                  ['Compliance', 'Rules · Review · Audit trail'],
                                ],
                                appTitle: 'Launchops Admin',
                                screenTitle: 'Launch Readiness — Lumara',
                                cards: ['Brand info complete', 'Programs configured', 'Website generated', 'Domain DNS pending', 'Team access set'],
                                meta: [['Status', 'pending_review'], ['Programs', '3 active'], ['Domain', 'needs verification']],
                              },
                              {
                                letter: 'C',
                                short: 'Portal experience',
                                title: 'Client & patient portals',
                                description: 'This layer connects the post-launch client portal and patient self-service portal. Clients need visibility into performance, configuration, and operations. Patients need to manage orders, appointments, documents, and follow-up care.',
                                color: 'amber',
                                nav: [
                                  ['Client portal', ''],
                                  ['Patient portal', ''],
                                ],
                                appTitle: 'Portal experience',
                                screenTitle: 'Client and Patient Portals',
                                cards: ['Question tree mapped', 'Eligibility rules previewed', 'Medical fields required', 'Patient profile created', 'Care flow active'],
                                meta: [['Flow', 'initial visit'], ['Rules', '12 checks'], ['Status', 'ready']],
                              },
                              {
                                letter: 'D',
                                short: 'Compliance',
                                title: 'Compliance',
                                description: 'This layer handles compliance review, consent settings, patient communications, and audit records. It helps every brand meet telehealth requirements while keeping responsibilities traceable after launch.',
                                color: 'violet',
                                nav: [
                                  ['Adjustment for compliance', 'Search · DNS · SSL'],
                                  ['Sender identity', 'From name · Email auth'],
                                  ['Support routing', 'Inbox · Escalation'],
                                  ['Consent settings', 'Purpose · Channel permissions'],
                                  ['Audit log', 'Events · Review history'],
                                ],
                                appTitle: 'Trust Center',
                                screenTitle: 'Domain & Consent Setup',
                                cards: ['Domain DNS verified', 'Sender identity approved', 'Consent copy synced', 'Audit trail enabled', 'Support route active'],
                                meta: [['Domain', 'verified'], ['Consent', 'active'], ['Audit', 'on']],
                              },
                            ];
                            const activeArchitectureImageGroups = architectureTabImages[activeBackstageTab] ?? {};
                            const activeArchitectureImages = Object.values(activeArchitectureImageGroups).flat();
                            const architectureCaptions = tabs[activeBackstageTab].short === 'Brand surface'
                              ? ['Website example', 'Theme controls']
                              : tabs[activeBackstageTab].nav
                                .slice(0, activeArchitectureImages.length)
                                .map(([name]) => name);

                            return (
                              <div>
                                <StepImageWalkthrough
                                  title="Launchpad Product Architecture"
                                  supportLayers={[
                                    {
                                      title: 'Brand surface',
                                      items: ['Brand positioning', 'Storefront generation', 'Theme and content controls'],
                                    },
                                    {
                                      title: 'Launch operations',
                                      items: ['Store management', 'Product and pricing setup', 'Launch readiness tracking'],
                                    },
                                    {
                                      title: 'Portal experience',
                                      items: ['Client portal', 'Patient portal', 'Intake and care journey'],
                                    },
                                    {
                                      title: 'Compliance',
                                      items: ['Consent settings', 'Eligibility and rules review', 'Audit trail'],
                                    },
                                  ]}
                                  steps={tabs.map((tab, idx) => ({
                                    id: tab.letter,
                                    number: String(idx + 1).padStart(2, '0'),
                                    label: tab.short,
                                    title: tab.title,
                                    description: tab.description,
                                  }))}
                                  activeIndex={activeBackstageTab}
                                  onChange={setActiveBackstageTab}
                                  images={activeArchitectureImages}
                                  imageCaptions={architectureCaptions}
                                  imageAlt={(imageIndex) => `${tabs[activeBackstageTab].short} UI screenshot ${imageIndex + 1}`}
                                />
                              </div>
                            );
                          })()}
                        </div>
                      </div>
	                    )}

                    {/* PHASE 5: USER FEEDBACK WALL & DESIGN PRINCIPLES */}
                    {item.id === 'PH-05' && (
                      <div className="case-narrative-flow">
                        <Callout variant="quote">
                          <p className="case-body-copy italic">
                            "{item.quote}"
                          </p>
                        </Callout>

                        <p className="case-body-copy">
                          As MedVi — an OpenLoop customer — went viral and was covered by NYTimes, the first wave of real customers arrived. Their feedback pointed to a completely different problem than the team had anticipated.
                        </p>

                        <section className="case-card case-visual-block overflow-hidden">
                          <div className="flex flex-col gap-[var(--space-section-body-element)] p-[var(--space-card-lg)]">
                            <div>
                              <span className="case-caption-label block">Research</span>
                              <div className="case-stat-row mt-[var(--space-section-body-element)]">
                                {[
                                  { number: '3', label: 'Research methods' },
                                  { number: '8', label: 'SME interviews' },
                                  { number: '35', label: 'Usability test sessions' },
                                  { number: '2', label: 'Month research cycle' },
                                ].map((stat) => (
                                  <div key={stat.label} className="case-stat-card">
                                    <div className="case-stat-number">{stat.number}</div>
                                    <div className="case-stat-label">{stat.label}</div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <span className="case-caption-label block">
                                Stakeholder Review · The CMO surfaced 6 issues
                              </span>

                              <div className="case-issue-review-layout mt-[var(--space-section-body-element)]">
                                <figure className="case-issue-review-figure hidden md:block" aria-label="Illustration of unclear AI-generated setup choices">
                                  <img
                                    src={cmoIssuesConfusionImg}
                                    alt=""
                                    className="case-issue-review-image"
                                  />
                                </figure>
                                <IssueCardStack issues={cmoIssues} />
                              </div>
                            </div>

                            <div>
                              <span className="case-caption-label block">PM's Direction</span>
                              <div className="mt-[var(--space-section-body-element)] flex flex-wrap gap-x-[var(--space-section-body-element)] gap-y-[var(--space-text-stack)] text-[var(--text-tertiary)]">
                                {['Four-state AI status indicator', 'Persistent AI chat panel', 'Proactive AI prompts at every step'].map((text) => (
                                  <span key={text} className="case-card-title flex items-center gap-[var(--space-sm)] text-[var(--text-tertiary)]">
                                    <span className="text-[var(--color-primary)]">*</span>
                                    <span>{text}</span>
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="rounded-[var(--radius-lg)] bg-[var(--surface-section)] p-[var(--space-lg)]">
                              <span className="case-caption-label block">
                                Design Judgment
                              </span>
                              <div className="mt-[var(--space-section-body-element)] grid gap-[var(--space-section-body-element)] md:grid-cols-[0.8fr_1.2fr] md:items-start">
                                <h3 className="case-card-title case-card-title-primary">
                                  The issue was not that AI was too invisible
                                </h3>
                                <div>
                                  <ul className="space-y-[var(--space-text-stack)]">
                                    {['AI was not appearing at the right moment', 'Users were not helped, and decision pressure increased', 'The question was not whether the AI was good enough'].map((text) => (
                                      <li key={text} className="case-body-copy flex gap-[var(--space-section-body-element)]">
                                        <span className="text-[var(--color-primary)]">→</span>
                                        <span>{text}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                    )}

                    {/* PHASE 6: REFLECTION, INTERACTIVE UI CHAT COMPARISON */}
                    {item.id === 'PH-06' && (
                      <div className="case-visual-block flex flex-col gap-[var(--space-section-body-element)]">
                        <SelectProductsComparison />
                      </div>
                    )}
              </div>
            </SectionShell>
          );
        })}
          <SectionShell
            id="result"
            phaseId="RESULT"
            category="Result"
            title="From demo concept to live launch system"
            sysId="From demo concept to live launch system"
            chapterLabel="Result"
            isFocused={selectedId === 'RESULT'}
            surface={items.length % 2 === 0 ? 'subtle' : 'base'}
          >
            <div className="case-narrative-flow min-w-0 text-[var(--text-primary)] lg:col-span-3">
              <p className="case-body-copy">
                LaunchPad moved from a prototype into a live operating product, with signed clients entering onboarding and branded storefronts already published.
              </p>
              <ResultSnapshot />
              <ResultDemoVideo />
            </div>
          </SectionShell>
          <div className="mx-auto w-full max-w-[var(--container-main)] px-[var(--space-page-x)] pb-[var(--space-section-padding-y)] md:px-[var(--space-page-x-desktop)]">
            <ProjectPager
              ariaLabel="Browse case studies"
              previous={previous}
              next={next}
            />
          </div>
          </div>
      </div>
    </div>
  );
}
