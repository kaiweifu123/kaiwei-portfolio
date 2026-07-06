/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useState } from 'react';
import EditorialHeader from './ui/EditorialHeader';
import CaseStudyTopNav from './ui/CaseStudyTopNav';
import CaseHero from './ui/CaseHero';
import SectionShell from './ui/SectionShell';
import FigureFrame from './ui/FigureFrame';
import StageBlock from './ui/StageBlock';
import TestingBlock from './ui/TestingBlock';
import IterationBlock from './ui/IterationBlock';
import ReflectionBlock from './ui/ReflectionBlock';
import GoalLayout from './ui/GoalLayout';
import StackedCardsFigure from './ui/StackedCardsFigure';
import InsightCards from './ui/InsightCards';
import DesignPageFigures from './ui/DesignPageFigures';
import Card from './ui/Card';
import Callout from './ui/Callout';
import ProjectPager from './ui/ProjectPager';
import { type PortfolioBlock, type PortfolioCase } from '../portfolioCases';
import { caseStudyPagerItems, getAdjacentPagerItems } from '../projectPagerItems';

interface PortfolioCasePageProps {
  caseStudy: PortfolioCase;
}

const renderCaption = (caption?: string) => {
  if (!caption) return undefined;

  return (
    <p className="case-caption-copy mt-[var(--space-text-stack)]">
      {caption}
    </p>
  );
};

function ParagraphBlock({ items }: { items: string[] }) {
  return (
    <div className="case-paragraph-stack">
      {items.map((item) => (
        <p key={item} className="case-body-copy">
          {item}
        </p>
      ))}
    </div>
  );
}

function RichParagraphBlock({
  items,
}: {
  items: { parts: { text: string; strong?: boolean }[] }[];
}) {
  return (
    <div className="case-paragraph-stack">
      {items.map((item) => (
        <p key={item.parts.map((part) => part.text).join('')} className="case-body-copy">
          {item.parts.map((part, index) => {
            const key = `${part.text}-${index}`;

            return part.strong ? (
              <strong key={key} className="font-semibold text-[var(--text-primary)]">
                {part.text}
              </strong>
            ) : (
              <span key={key}>{part.text}</span>
            );
          })}
        </p>
      ))}
    </div>
  );
}

function MethodBlock({
  label,
  title,
  body,
  tone = 'blue',
}: {
  label: string;
  title: string;
  body: string[];
  tone?: 'blue' | 'black';
}) {
  const isBlack = tone === 'black';
  const badgeClassName = isBlack
    ? 'rotate-[4deg] border-[#010002] bg-[#010002] text-white shadow-[10px_10px_0_#ff9d00]'
    : '-rotate-[7deg] border-[#0019a8] bg-[#0019a8] text-white shadow-[10px_10px_0_#4eeb52]';

  return (
    <div className="grid items-center gap-[var(--space-3xl)] py-[var(--space-3xl)] md:grid-cols-[0.38fr_0.62fr]">
      <div className="flex justify-center md:justify-start">
        <div
          className={`case-organic-badge ${badgeClassName}`}
        >
          <span>
            {label}
            <br />
            {title}
          </span>
        </div>
      </div>
      <div className="case-paragraph-stack text-center md:text-left">
        {body.map((item) => (
          <p key={item} className="case-body-copy text-[length:var(--font-heading-md)] leading-[1.32]">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}

function CardGrid({ items }: { items: { title: string; body?: string }[] }) {
  const gridClassName = items.length === 3
    ? 'grid gap-[var(--space-section-body-element)] md:grid-cols-2 lg:grid-cols-3'
    : 'grid gap-[var(--space-section-body-element)] md:grid-cols-2';

  return (
    <div className={gridClassName}>
      {items.map((item) => {
        const isNumericTitle = /^\d+$/.test(item.title);

        return (
        <Card key={`${item.title}-${item.body}`} className="p-[var(--space-card-lg)]">
          <h3 className={isNumericTitle ? 'font-label text-[28px] font-semibold leading-[var(--line-height-title)] text-[var(--color-primary)]' : 'case-card-title text-[length:var(--font-stage-title)]'}>
            {item.title}
          </h3>
          {item.body ? (
            <p className="case-card-body mt-[var(--space-text-stack)] text-[length:var(--font-body-sm)]">
              {item.body}
            </p>
          ) : null}
        </Card>
        );
      })}
    </div>
  );
}

function EvidenceBlock({
  title,
  items,
}: {
  title: string;
  items: { title: string; body?: string }[];
}) {
  return (
    <Callout variant="card">
      <h3 className="case-stage-title">
        {title}
      </h3>
      <div className="mt-[var(--space-section-body-element)] grid gap-[var(--space-section-body-element)] md:grid-cols-2">
        {items.map((item) => (
          <Card key={`${item.title}-${item.body}`} className="p-[var(--space-card-md)] shadow-none">
            <h4 className="case-card-title text-[length:var(--font-body-sm)]">
              {item.title}
            </h4>
            {item.body ? (
              <p className="case-card-body mt-[var(--space-text-stack)]">
                {item.body}
              </p>
            ) : null}
          </Card>
        ))}
      </div>
    </Callout>
  );
}

function GalleryBlock({
  figures,
  layout = 'stack',
}: {
  figures: Extract<PortfolioBlock, { type: 'gallery' }>['figures'];
  layout?: Extract<PortfolioBlock, { type: 'gallery' }>['layout'];
}) {
  if (layout === 'paired') {
    const rows = figures.reduce<typeof figures[]>((groups, figure, index) => {
      if (index % 2 === 0) groups.push([figure]);
      else groups[groups.length - 1]?.push(figure);
      return groups;
    }, []);

    return (
      <div className="grid gap-[var(--space-section-body-element)]">
        {rows.map((row, rowIndex) => {
          const shouldReverse = row.length === 2 && rowIndex % 2 === 1;

          return (
          <div
            key={row.map((figure) => figure.src).join('|')}
            className={row.length === 2 ? 'grid items-center gap-[var(--space-section-body-element)] md:grid-cols-[0.82fr_1.18fr]' : ''}
          >
            {row.map((figure, figureIndex) => (
              <div
                key={`${figure.src}-${figure.alt}`}
                className={shouldReverse && figureIndex === 0 ? 'md:col-start-2' : shouldReverse && figureIndex === 1 ? 'md:col-start-1 md:row-start-1' : undefined}
              >
                <FigureFrame
                  src={figure.src}
                  alt={figure.alt}
                  frameClassName="flex h-[min(56vh,560px)] w-full items-center justify-center overflow-hidden rounded-[var(--radius-md)] bg-[var(--surface-base)]"
                  imageClassName="block h-full w-full object-contain"
                  caption={renderCaption(figure.caption)}
                />
              </div>
            ))}
          </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid gap-[var(--space-section-body-element)]">
      {figures.map((figure) => (
        <div key={`${figure.src}-${figure.alt}`}>
          <FigureFrame
            src={figure.src}
            alt={figure.alt}
            variant="flush"
            caption={renderCaption(figure.caption)}
          />
        </div>
      ))}
    </div>
  );
}

function BlockRenderer({ block }: { block: PortfolioBlock }) {
  switch (block.type) {
    case 'paragraphs':
      return <ParagraphBlock items={block.items} />;
    case 'rich-paragraphs':
      return <RichParagraphBlock items={block.items} />;
    case 'method':
      return <MethodBlock label={block.label} title={block.title} body={block.body} tone={block.tone} />;
    case 'goal-layout':
      return <GoalLayout goals={block.goals} figure={block.figure} />;
    case 'stacked-cards-figure':
      return <StackedCardsFigure items={block.items} figure={block.figure} />;
    case 'insight-cards':
      return <InsightCards items={block.items} />;
    case 'design-pages':
      return <DesignPageFigures items={block.items} />;
    case 'reflection':
      return <ReflectionBlock takeaways={block.takeaways} quote={block.quote} metrics={block.metrics} figure={block.figure} closing={block.closing} />;
    case 'iterations':
      return <IterationBlock items={block.items} />;
    case 'testing':
      return <TestingBlock methods={block.methods} findings={block.findings} />;
    case 'stages':
      return <StageBlock items={block.items} />;
    case 'meta':
      return null;
    case 'cards':
      return <CardGrid items={block.items} />;
    case 'evidence':
      return <EvidenceBlock title={block.title} items={block.items} />;
    case 'figure':
      return (
        <FigureFrame
          src={block.src}
          alt={block.alt}
          variant={block.frame === 'raw' ? 'default' : 'flush'}
          frameClassName={block.frame === 'raw' ? '' : undefined}
          imageClassName={block.frame === 'raw' ? 'block w-full' : undefined}
          caption={renderCaption(block.caption)}
        />
      );
    case 'gallery':
      return <GalleryBlock figures={block.figures} layout={block.layout} />;
    default:
      return null;
  }
}

export default function PortfolioCasePage({ caseStudy }: PortfolioCasePageProps) {
  const [selectedId, setSelectedId] = useState(caseStudy.sections[0]?.id ?? 'overview');

  const navItems = useMemo(
    () => caseStudy.sections.map((section) => ({ id: section.id, label: section.label })),
    [caseStudy.sections]
  );

  useEffect(() => {
    document.body.classList.remove('case-study-chrome-collapsed');
    setSelectedId(caseStudy.sections[0]?.id ?? 'overview');
  }, [caseStudy.slug, caseStudy.sections]);

  useEffect(() => {
    const handleScroll = () => {
      const marker = window.scrollY + 160;
      let nextId = caseStudy.sections[0]?.id ?? selectedId;

      for (const section of caseStudy.sections) {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= marker) {
          nextId = section.id;
        }
      }

      setSelectedId(nextId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [caseStudy.sections, selectedId]);

  const handleSelect = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setSelectedId(id);
  };

  const firstSectionId = caseStudy.sections[0]?.id ?? 'overview';
  const { previous, next } = getAdjacentPagerItems(caseStudyPagerItems, caseStudy.slug);

  return (
    <div className="min-h-screen bg-[var(--surface-base)] text-[var(--text-primary)]">
      <EditorialHeader
        brandLabel={caseStudy.title}
        brandHref={`/case/${caseStudy.slug}`}
        leftLabel="Portfolio Case"
        rightLabel="Kaiweifu Portfolio 2025"
        actionLabel="Index"
        actionHref="/"
      />
      <CaseStudyTopNav items={navItems} selectedId={selectedId} onSelect={handleSelect} />

      <main>
        <CaseHero
          variant="editorial"
          title={caseStudy.title}
          subtitle={caseStudy.subtitle}
          subtitleHighlight={caseStudy.subtitleHighlight}
          chips={caseStudy.chips}
          productLink={caseStudy.productLink}
          meta={caseStudy.meta}
          artifact={{
            type: 'image',
            src: caseStudy.hero.src,
            alt: caseStudy.hero.alt,
            fit: caseStudy.hero.fit,
            background: caseStudy.hero.background,
            objectPosition: caseStudy.hero.objectPosition,
          }}
        />

        {caseStudy.sections.map((section) => {
          const blocks = [...section.blocks];

          return (
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
            >
              <div className="case-narrative-flow">
                {blocks.map((block, blockIndex) => (
                  <React.Fragment key={`${section.id}-${block.type}-${blockIndex}`}>
                    <BlockRenderer block={block} />
                  </React.Fragment>
                ))}
              </div>
            </SectionShell>
          );
        })}

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
