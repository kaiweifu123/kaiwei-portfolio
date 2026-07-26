/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useState } from 'react';
import EditorialHeader from './ui/EditorialHeader';
import CaseStudyTopNav from './ui/CaseStudyTopNav';
import CaseHero from './ui/CaseHero';
import SectionShell from './ui/SectionShell';
import Callout from './ui/Callout';
import FigureFrame from './ui/FigureFrame';
import LandingPageCompositionDiagram from './ui/LandingPageCompositionDiagram';
import AutoHeightIframe from './ui/AutoHeightIframe';
import ProjectPager from './ui/ProjectPager';
import AIUsagePopover, { type AIUsageItem } from './ui/AIUsagePopover';
import { caseStudyPagerItems, getAdjacentPagerItems } from '../projectPagerItems';

type NarrativeBlock =
  | { type: 'paragraphs'; items: React.ReactNode[] }
  | { type: 'list'; items: string[] }
  | { type: 'quote'; lead: string; quote: React.ReactNode }
  | { type: 'question-shift'; from: { lead: string; quote: React.ReactNode }; to: { lead: string; quote: React.ReactNode } }
  | { type: 'figure'; src: string; alt: string; caption?: string; size?: 'full' | 'compact'; cropLeft?: boolean; cropRightBottom?: boolean; cropCanvas?: boolean; framed?: boolean; shadowOnly?: boolean; videoPreload?: React.VideoHTMLAttributes<HTMLVideoElement>['preload'] }
  | { type: 'html-embed'; src: string; title: string }
  | { type: 'composition-diagram' }
  | {
      type: 'media-copy';
      lead?: { strong: string; rest: string };
      items: string[];
      image: { src: string; alt: string };
    }
  | {
      type: 'media-copy-wide';
      items: React.ReactNode[];
      image: { src: string; alt: string; caption?: string };
    };

type NarrativeSection = {
  id: string;
  label: string;
  title: string;
  surface: 'base' | 'subtle';
  blocks: NarrativeBlock[];
};

const systemFoundationAIUsage: AIUsageItem[] = [
  {
    kind: 'tokens',
    title: 'Token Management',
    description: 'Standardise token naming and apply design tokens across components.',
    tool: 'Codex',
    mark: 'C',
  },
  {
    kind: 'system',
    title: 'Component Governance',
    description: 'Define reusable corner radii, sizing, variants, and component properties.',
    tool: 'Codex',
    mark: 'C',
  },
];

const designPrinciplesAIUsage: AIUsageItem[] = [
  {
    kind: 'system',
    title: 'Rule Extraction',
    description: 'Extract reusable design rules and document token application at the component level.',
    tool: 'Codex',
    mark: 'C',
  },
  {
    kind: 'exploration',
    title: 'Theme Generation',
    description: 'Explore configurable brand themes while preserving design system constraints.',
    tool: 'ChatGPT',
    mark: 'C',
  },
  {
    kind: 'iteration',
    title: 'Prompt Optimisation',
    description: 'Iterate prompt strategies to improve controllability and design consistency.',
    tool: 'ChatGPT',
    mark: 'C',
  },
];

const sections: NarrativeSection[] = [
  {
    id: 'context',
    label: 'Context',
    title: "Building a Brand Was Easy. Scaling One Wasn't.",
    surface: 'base',
    blocks: [
      {
        type: 'paragraphs',
        items: [
          'Every healthcare company wants patients to experience a consistent, trustworthy brand.',
        ],
      },
      {
        type: 'paragraphs',
        items: [
          'Traditional website projects are built one client at a time. However, building a white-label platform requires a different mindset.',
        ],
      },
      {
        type: 'figure',
        src: '/case-assets/design-system-bespoke-to-product-thinking.png',
        alt: 'Traditional bespoke website delivery compared with a white-label platform built on one shared foundation',
      },
      {
        type: 'paragraphs',
        items: [
          'In 2025, OpenLoop took on a new product challenge: helping healthcare companies launch complete patient-facing experiences.',
          'For the first time, branding became a core product capability rather than a bespoke service.',
        ],
      },
      {
        type: 'quote',
        lead: 'How might we:',
        quote: 'How do you turn custom branding into a reusable product capability?',
      },
    ],
  },
  {
    id: 'turning-point',
    label: 'How It Started',
    title: 'From Demo to Platform',
    surface: 'subtle',
    blocks: [
      {
        type: 'paragraphs',
        items: [
          "Launchpad didn't start as a white-label platform. It started with a demo.",
          'The brief was simple enough: build one beautiful website to help communicate the product vision within two days.',
          'That seemed entirely reasonable.',
        ],
      },
      {
        type: 'figure',
        src: '/case-assets/design-system-original-demo-v2.mp4',
        alt: 'Original Launchpad website demo showing a polished precision-medicine storefront',
        cropLeft: true,
        framed: true,
      },
      {
        type: 'media-copy',
        lead: {
          strong: 'Less than two days later,',
          rest: 'the requirements for the demo changed.',
        },
        items: [
          "The next request wasn't another website—it was dozens of them.",
          'Overnight, a one-off showcase had to become a scalable product foundation—and we had one week to make it happen.',
        ],
        image: {
          src: '/case-assets/design-system-demo-worked-reaction.jpg',
          alt: 'A surprised cat reacting to the demo becoming a platform request',
        },
      },
    ],
  },
  {
    id: 'system',
    label: 'System Foundation',
    title: 'Turning Creativity into Rules',
    surface: 'base',
    blocks: [
      {
        type: 'paragraphs',
        items: [
          'The product evolved too quickly for a perfect design system.',
          <>So I built <strong className="font-semibold text-[var(--text-primary)]">Design System 0.0</strong>—stabilising the foundations first, then improving them through real product work.</>,
        ],
      },
      {
        type: 'figure',
        src: '/case-assets/design-system-token-hierarchy.svg',
        alt: 'Primitive design tokens mapping to brand-aware semantic tokens',
        caption: 'Token hierarchy',
      },
      {
        type: 'paragraphs',
        items: [
          <>Components knew <strong className="font-semibold text-[var(--text-primary)]">what they were</strong>, not <strong className="font-semibold text-[var(--text-primary)]">who they belonged to</strong>. At the most foundational level, brand colour and corner radius were the first customisable elements.</>,
        ],
      },
      {
        type: 'figure',
        src: '/case-assets/design-system-brand-component-comparison.svg',
        alt: 'The same button, input, and badge components shown across Brand A, Brand B, and Brand C',
        caption: 'Only a handful of variables changed. Everything else stayed the same.',
      },
    ],
  },
  {
    id: 'customisation',
    label: 'System Expansion',
    title: 'Building Meaningful Customisation',
    surface: 'subtle',
    blocks: [
      {
        type: 'paragraphs',
        items: [
          'Stabilising the first version of the design system was only the beginning.',
          'What clients wanted was not just different colours, but a more personalised marketing landing page.',
          'The homepage became a library of reusable sections, composed differently for each brand.',
        ],
      },
      {
        type: 'figure',
        src: '/case-assets/design-system-website-sections.jpg',
        alt: 'A library of composable website sections showing multiple Hero, medication, feature, CTA, process, and testimonial layouts',
        caption: 'Hero, Features, Testimonials, FAQ, and other sections with variants',
      },
    ],
  },
  {
    id: 'boundaries',
    label: 'AI Experiment',
    title: 'Designing the Boundaries',
    surface: 'base',
    blocks: [
      {
        type: 'paragraphs',
        items: [
          'Once the design system was stable, we started exploring how far website composition could go.',
          'Different content modules and brand themes could theoretically create countless landing pages.',
          'It sounded promising.',
        ],
      },
      {
        type: 'figure',
        src: '/case-assets/design-system-website-generation-failure.mp4',
        alt: 'AI website generation experiment combining content modules and brand themes',
        framed: true,
        cropRightBottom: true,
      },
      {
        type: 'media-copy-wide',
        items: [
          <>Generating <strong className="font-semibold text-[var(--text-primary)]">good</strong> pages wasn’t easy at all :^/</>,
          'So we looked beyond our own product.',
          'Then we opened Relume’s Figma file.',
          <><strong className="font-semibold text-[var(--text-primary)]">It just kept going.</strong></>,
          'Hundreds of carefully crafted templates, organised into a system that AI could assemble.',
        ],
        image: {
          src: '/case-assets/design-system-relume-template-library.jpg',
          alt: 'Relume Figma Kit showing a large library of reusable website templates and section variants',
          caption: 'The template library behind Relume’s composition model.',
        },
      },
      {
        type: 'paragraphs',
        items: [
          'For a team of our size in early 2025, reproducing that scale simply wasn’t realistic—a constraint that changed the question we were asking.',
        ],
      },
      {
        type: 'question-shift',
        from: {
          lead: 'Instead of asking',
          quote: <strong>“How much freedom should AI have?”</strong>,
        },
        to: {
          lead: 'We started asking',
          quote: <strong>“Where should the boundary between AI and human design be?”</strong>,
        },
      },
      {
        type: 'paragraphs',
        items: [
          'That became the foundation of our next design decision.',
          <><strong className="font-semibold text-[var(--text-primary)]">Good AI isn’t defined by unlimited generation. It’s defined by carefully designed boundaries.</strong></>,
        ],
      },
    ],
  },
  {
    id: 'design-principles',
    label: 'Design Principles',
    title: 'Turning boundaries into assets',
    surface: 'subtle',
    blocks: [
      {
        type: 'paragraphs',
        items: [
          'Together with Product, we shifted from generating websites to generating controlled variations.',
          'Components and layout ensured consistency, while colours, typography, corner radius, and other brand primitives—became configurable.',
        ],
      },
      {
        type: 'figure',
        src: '/case-assets/design-system-theme-configurator.svg',
        alt: 'Theme Configurator defining reusable typography, spacing, radius, shadow, and border assets',
        caption: 'Theme Configurator',
      },
      {
        type: 'paragraphs',
        items: [
          'The same principle extended to AI-generated imagery.',
          'Rather than treating prompts as one-off instructions, we turned them into reusable design assets.',
          'At the time, we didn’t yet have the concept of “skills” for packaging this kind of reusable AI logic.',
        ],
      },
      {
        type: 'html-embed',
        src: '/case-assets/prompt-architecture-diagram.html',
        title: 'Image prompt architecture and generated output diagram',
      },
      {
        type: 'paragraphs',
        items: [
          'Design systems no longer stopped at components. They now governed both interfaces and AI generation.',
        ],
      },
    ],
  },
  {
    id: 'composition',
    label: 'Composition Model',
    title: 'Composing experiences',
    surface: 'base',
    blocks: [
      {
        type: 'paragraphs',
        items: [
          'Once reusable design assets were in place, creating a new website no longer meant starting from scratch.',
          'Instead, each experience was assembled from reusable sections, shared design assets, and brand-specific configurations.',
        ],
      },
      {
        type: 'composition-diagram',
      },
      {
        type: 'paragraphs',
        items: [
          <><strong className="font-semibold text-[var(--text-primary)]">One design system. Many compositions.</strong></>,
          'Rather than creating templates for individual brands, we built a composable system that could support different products, audiences, and identities while remaining visually and technically consistent.',
        ],
      },
    ],
  },
  {
    id: 'result',
    label: 'Outcome',
    title: 'From assets to experiences',
    surface: 'subtle',
    blocks: [
      {
        type: 'paragraphs',
        items: [
          'The result wasn’t just a faster way to build websites.',
          'It was a reusable system where a single set of design assets could generate distinct, on-brand experiences while remaining consistent, scalable, and AI-ready.',
        ],
      },
      {
        type: 'figure',
        src: '/case-assets/design-system-result.mp4',
        alt: 'Final white-label website experience produced from the governed design system',
        shadowOnly: true,
        cropCanvas: true,
        videoPreload: 'metadata',
      },
    ],
  },
  {
    id: 'reflection',
    label: 'Reflection',
    title: 'What I would do differently in 2026',
    surface: 'base',
    blocks: [
      {
        type: 'paragraphs',
        items: [
          'If I were building this again in 2026, I would design the AI operating model alongside the design system.',
        ],
      },
      {
        type: 'html-embed',
        src: '/case-assets/reflection-2026-pipeline.html',
        title: 'Eight-step white-label site build pipeline for 2026',
      },
    ],
  },
];

export default function LaunchpadDesignSystemCaseStudy() {
  const [selectedId, setSelectedId] = useState(sections[0].id);
  const { previous, next } = getAdjacentPagerItems(caseStudyPagerItems, 'design-system');
  const navItems = useMemo(
    () => sections.map((section) => ({ id: section.id, label: section.label })),
    []
  );

  useEffect(() => {
    document.body.classList.remove('case-study-chrome-collapsed');

    const handleScroll = () => {
      const marker = window.scrollY + 160;
      let nextId = sections[0].id;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= marker) nextId = section.id;
      }

      setSelectedId(nextId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelect = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setSelectedId(id);
  };

  return (
    <div className="min-h-screen bg-[var(--surface-base)] text-[var(--text-primary)]">
      <EditorialHeader
        brandLabel="Launchpad Design System"
        brandHref="/case/design-system/"
        leftLabel="Portfolio Case"
        rightLabel="Kaiweifu Portfolio 2026"
        actionLabel="Index"
        actionHref="/"
      />
      <CaseStudyTopNav items={navItems} selectedId={selectedId} onSelect={handleSelect} />

      <main>
        <CaseHero
          variant="editorial"
          title={(
            <>
              Rethinking <span className="text-[var(--color-primary)]">White-label</span> Design Systems for the <span className="text-[var(--color-primary)]">AI Era</span>
            </>
          )}
          subtitle="How I transformed bespoke client work into reusable rules, assets, and constraints for AI-generated healthcare brands."
          subtitleHighlight="bespoke client work"
          chips={['White-label healthcare', 'AI-generated website design', 'Design-system governance']}
          artifact={{
            type: 'image',
            src: '/case-assets/design-system-hero.jpg',
            alt: 'Launchpad design system components and white-label brand color palettes',
            fit: 'contain',
            background: '#ffffff',
            showDivider: false,
          }}
        />

        {sections.map((section) => (
          <SectionShell
            key={section.id}
            id={section.id}
            phaseId={section.id}
            category={section.label}
            title={section.title}
            sysId={section.id}
            chapterLabel={section.label}
            isFocused={selectedId === section.id}
            surface={section.surface}
            headerAction={
              section.id === 'system'
                ? <AIUsagePopover items={systemFoundationAIUsage} />
                : section.id === 'design-principles'
                  ? <AIUsagePopover items={designPrinciplesAIUsage} />
                  : undefined
            }
          >
            <div className="case-narrative-flow">
              {section.blocks.map((block, blockIndex) => {
                if (block.type === 'media-copy-wide') {
                  return (
                    <div
                      key={`${section.id}-media-copy-wide-${blockIndex}`}
                      className="grid gap-[var(--space-component-lg)] md:grid-cols-[minmax(0,1fr)_minmax(260px,0.8fr)] md:items-start"
                    >
                      <div className="case-paragraph-stack min-w-0">
                        {block.items.map((item, itemIndex) => (
                          <p key={itemIndex} className="case-body-copy">{item}</p>
                        ))}
                      </div>
                      <FigureFrame
                        src={block.image.src}
                        alt={block.image.alt}
                        frameClassName=""
                        imageClassName="block w-full rounded-[var(--radius-md)]"
                        caption={block.image.caption ? (
                          <p className="case-caption-copy mt-[var(--space-text-stack)] text-center">{block.image.caption}</p>
                        ) : undefined}
                      />
                    </div>
                  );
                }

                if (block.type === 'composition-diagram') {
                  return <LandingPageCompositionDiagram key={`${section.id}-composition-${blockIndex}`} />;
                }

                if (block.type === 'html-embed') {
                  return (
                    <AutoHeightIframe
                      key={`${section.id}-html-embed-${blockIndex}`}
                      src={block.src}
                      title={block.title}
                    />
                  );
                }

                if (block.type === 'media-copy') {
                  return (
                    <div key={`${section.id}-media-copy-${blockIndex}`} className="flex flex-col gap-[var(--space-2xl)] md:flex-row md:items-center">
                      <div className="case-paragraph-stack min-w-0 flex-1">
                        {block.lead ? (
                          <p className="case-body-copy">
                            <strong className="font-semibold text-[var(--text-primary)]">{block.lead.strong}</strong>{' '}
                            {block.lead.rest}
                          </p>
                        ) : null}
                        {block.items.map((item) => (
                          <p key={item} className="case-body-copy">{item}</p>
                        ))}
                      </div>
                      <FigureFrame
                        src={block.image.src}
                        alt={block.image.alt}
              wrapperClassName="mx-auto w-full max-w-[100px] flex-none md:mr-0"
                        frameClassName=""
                        imageClassName="block w-full"
                      />
                    </div>
                  );
                }

                if (block.type === 'figure') {
                  return (
                    <React.Fragment key={`${section.id}-figure-${blockIndex}`}>
                      <FigureFrame
                        src={block.src}
                        alt={block.alt}
                        wrapperClassName={block.cropCanvas
                          ? 'relative aspect-[1.708/1] overflow-hidden rounded-[12px] shadow-[var(--shadow-card)]'
                          : block.size === 'compact'
                          ? 'mx-auto w-full max-w-[360px]'
                          : block.shadowOnly
                            ? 'shadow-[var(--shadow-card)]'
                            : undefined}
                        frameClassName={block.framed
                          ? 'overflow-hidden rounded-[var(--radius-md)] bg-[var(--surface-base)] shadow-[var(--shadow-card)]'
                          : ''}
                        imageClassName={block.cropCanvas
                          ? 'absolute left-0 top-0 block w-[calc(107%+4px)] max-w-none -translate-x-[3.5%] -translate-y-[4%]'
                          : block.cropLeft
                          ? 'block w-[calc(100%+1px)] max-w-none -translate-x-px'
                          : block.cropRightBottom
                            ? 'block w-[calc(100%+8px)] max-w-none -mb-[2px]'
                            : 'block w-full'}
                        videoPreload={block.videoPreload}
                        caption={block.caption ? (
                          <p className="case-caption-copy mt-[var(--space-text-stack)] text-center">{block.caption}</p>
                        ) : undefined}
                      />
                    </React.Fragment>
                  );
                }

                if (block.type === 'quote') {
                  return (
                    <React.Fragment key={`${section.id}-quote-${blockIndex}`}>
                      <Callout variant="quote">
                        <div className="case-paragraph-stack">
                          {block.lead ? <p className="case-caption-label">{block.lead}</p> : null}
                          <p className="case-stage-title">
                            {block.quote}
                          </p>
                        </div>
                      </Callout>
                    </React.Fragment>
                  );
                }

                if (block.type === 'question-shift') {
                  const renderQuestion = (question: typeof block.from) => (
                    <Callout variant="quote">
                      <div className="case-paragraph-stack">
                        <p className="case-caption-label">{question.lead}</p>
                        <p className="case-stage-title">{question.quote}</p>
                      </div>
                    </Callout>
                  );

                  return (
                    <div
                      key={`${section.id}-question-shift-${blockIndex}`}
                      className="grid items-center gap-[var(--space-xl)] md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]"
                    >
                      {renderQuestion(block.from)}
                      <span
                        className="text-center text-[length:var(--font-heading-sm)] text-[var(--color-primary)] max-md:rotate-90"
                        aria-hidden="true"
                      >
                        →
                      </span>
                      {renderQuestion(block.to)}
                    </div>
                  );
                }

                if (block.type === 'list') {
                  return (
                    <ul
                      key={`${section.id}-list-${blockIndex}`}
                      className="case-body-copy list-disc space-y-[var(--space-text-stack)] pl-[var(--space-xl)]"
                    >
                      {block.items.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  );
                }

                return (
                  <div key={`${section.id}-paragraphs-${blockIndex}`} className="case-paragraph-stack">
                    {block.items.map((item, itemIndex) => (
                      <p key={itemIndex} className="case-body-copy">{item}</p>
                    ))}
                  </div>
                );
              })}
            </div>
          </SectionShell>
        ))}
        <div className="mx-auto w-full max-w-[var(--container-main)] px-[var(--space-page-x)] pb-[var(--space-section-padding-y)] md:px-[var(--space-page-x-desktop)]">
          <ProjectPager
            ariaLabel="Browse case studies"
            previous={previous}
            next={next}
          />
        </div>
      </main>
    </div>
  );
}
