/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Card from './ui/Card';
import Callout from './ui/Callout';
import FigureFrame from './ui/FigureFrame';
import ImageCarousel from './ui/ImageCarousel';
import MetaGrid from './ui/MetaGrid';
import CaseSegmentTabs from './ui/CaseSegmentTabs';
import SectionHeader from './ui/SectionHeader';
import SectionShell from './ui/SectionShell';
import SegmentedToggle from './ui/SegmentedToggle';
import userTestingImg from '../assets/images/launchpad-v1/research/user-testing.jpg';
import productBeforeImg from '../assets/images/launchpad-v2/compare/add-products-product-table.jpg';
import productAfterImg from '../assets/images/launchpad-v2/compare/onboarding-product.png';

export default function DesignSystemPage() {
  const [tabIndex, setTabIndex] = useState(1);
  const [mode, setMode] = useState<'before' | 'after'>('after');
  const [carouselIndex, setCarouselIndex] = useState(0);

  return (
    <main className="min-h-screen bg-[var(--surface-page)] px-[var(--space-page-x)] py-[var(--space-5xl)] text-[var(--text-primary)] md:px-[var(--space-page-x-desktop)]">
      <div className="mx-auto max-w-[var(--container-main)]">
        <p className="case-section-label">
          Internal Design System
        </p>
        <h1 className="case-heading mt-[var(--space-md)] text-[length:var(--font-heading-xl)] leading-[var(--line-height-tight)]">
          Component primitive showcase
        </h1>
        <p className="mt-[var(--space-lg)] max-w-[var(--container-content)] text-[length:var(--font-body)] leading-[var(--line-height-body)] text-[var(--text-secondary)]">
          Development-only reference for the shared primitives used by the LaunchPad case study.
        </p>
      </div>

      <div className="mx-auto mt-[var(--space-5xl)] max-w-[var(--container-main)] space-y-[var(--space-5xl)]">
        <section className="bg-[var(--surface-base)]">
          <SectionHeader
            category="Primitive"
            title="SectionHeader"
            sysId="DS-01"
            chapterLabel="SHOWCASE"
          />
        </section>

        <SectionShell
          id="ds-section-shell"
          phaseId="DS-SECTION"
          category="Primitive"
          title="SectionShell"
          sysId="DS-02"
          chapterLabel="SHOWCASE"
          isFocused={false}
        >
          <div className="lg:col-span-3 text-[length:var(--font-body)] leading-[var(--line-height-body)] text-[var(--text-secondary)]">
            SectionShell wraps the major section structure, header, and reading-column layout.
          </div>
        </SectionShell>

        <section>
          <h2 className="case-heading mb-[var(--space-lg)] text-[length:var(--font-heading-md)]">FigureFrame</h2>
          <div className="grid gap-[var(--space-2xl)] md:grid-cols-2">
            <FigureFrame src={userTestingImg} alt="Default framed research image" />
            <FigureFrame
              src={userTestingImg}
              alt="Raw research image"
              frameClassName=""
              imageClassName="block w-full"
            />
          </div>
        </section>

        <section>
          <h2 className="case-heading mb-[var(--space-lg)] text-[length:var(--font-heading-md)]">Card</h2>
          <div className="grid gap-[var(--space-lg)] md:grid-cols-3">
            {['Mini evidence', 'Content block', 'Comparison block'].map((title) => (
              <Card key={title} className="p-[var(--space-card-lg)]">
                <p className="case-section-label">
                  Card
                </p>
                <h3 className="case-card-title mt-[var(--space-sm)]">{title}</h3>
                <p className="mt-[var(--space-sm)] text-[length:var(--font-body-sm)] leading-[var(--line-height-block)] text-[var(--text-muted)]">
                  A bounded repeated content block using the shared token layer.
                </p>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="case-heading mb-[var(--space-lg)] text-[length:var(--font-heading-md)]">Callout</h2>
          <div className="space-y-[var(--space-lg)]">
            <Callout variant="quote">
              <p className="case-body-copy italic">
                AI should appear when users need help, not compete for attention.
              </p>
            </Callout>
            <Callout variant="card" className="case-card">
              <p className="case-section-label">
                Feedback
              </p>
              <p className="mt-[var(--space-sm)] text-[length:var(--font-body)] leading-[var(--line-height-body)] text-[var(--text-secondary)]">
                A neutral callout can hold stakeholder or research notes.
              </p>
            </Callout>
          </div>
        </section>

        <section>
          <h2 className="case-heading mb-[var(--space-lg)] text-[length:var(--font-heading-md)]">MetaGrid</h2>
          <MetaGrid
            items={[
              { label: 'Role', values: ['Product Design'] },
              { label: 'Platform', values: ['Web Application', 'AI-powered SaaS'] },
              { label: 'Team', values: ['Founder', 'PMs'] },
              { label: 'Timeline', values: ['Sep 2025 - Present'] },
            ]}
          />
        </section>

        <section>
          <h2 className="case-heading mb-[var(--space-lg)] text-[length:var(--font-heading-md)]">CaseSegmentTabs</h2>
          <CaseSegmentTabs
            items={[
              { number: '01', label: 'Workflow stepper' },
              { number: '02', label: 'Product recommendation' },
              { number: '03', label: 'Brand identity' },
            ]}
            activeIndex={tabIndex}
            onChange={setTabIndex}
          />
        </section>

        <section>
          <h2 className="case-heading mb-[var(--space-lg)] text-[length:var(--font-heading-md)]">SegmentedToggle</h2>
          <SegmentedToggle
            options={[
              {
                value: 'before',
                label: 'Before',
              },
              {
                value: 'after',
                label: 'After',
              },
            ]}
            value={mode}
            onChange={setMode}
            variant="before-after"
          />
        </section>

        <section>
          <h2 className="case-heading mb-[var(--space-lg)] text-[length:var(--font-heading-md)]">ImageCarousel</h2>
          <ImageCarousel
            images={[productBeforeImg, productAfterImg]}
            activeIndex={carouselIndex}
            onChange={setCarouselIndex}
            alt={(index) => `Design system carousel example ${index + 1}`}
          />
        </section>
      </div>
    </main>
  );
}
