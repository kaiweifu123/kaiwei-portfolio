/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type React from 'react';

export interface TestingMethod {
  visual: 'ab' | 'prototype';
  title: string;
  body: string;
}

export interface TestingFinding {
  visual: 'qr' | 'allergy' | 'translation';
  title: string;
  body: string;
}

function MethodVisual({ type }: { type: TestingMethod['visual'] }) {
  if (type === 'ab') {
    return (
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-[var(--space-xl)] text-center text-[var(--color-primary)]">
        <div className="grid justify-items-center gap-[var(--space-xs)]">
          <strong className="font-label text-[length:var(--font-caption)]">A</strong>
          <span className="text-[length:clamp(20px,1.95vw,28px)] leading-none">▤</span>
          <span className="font-label text-[length:var(--font-body-sm)]">Paper</span>
        </div>
        <i className="h-16 w-px bg-[var(--border-soft-color)]" />
        <div className="grid justify-items-center gap-[var(--space-xs)]">
          <strong className="font-label text-[length:var(--font-caption)]">B</strong>
          <span className="text-[length:clamp(20px,1.95vw,28px)] leading-none">▯</span>
          <span className="font-label text-[length:var(--font-body-sm)]">Digital</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-[var(--space-xl)] text-center text-[var(--color-primary)]">
      <div className="flex h-[clamp(60px,5.56vw,80px)] w-[clamp(36px,3.34vw,48px)] items-center justify-center rounded-[var(--radius-sm)] border-2 border-current text-[length:clamp(18px,1.67vw,24px)]">▯</div>
      <span className="font-label text-[length:var(--font-caption)] leading-[var(--line-height-block)]">
        →<br />
        observe
      </span>
      <div className="flex h-[clamp(48px,4.45vw,64px)] w-[clamp(36px,3.34vw,48px)] items-center justify-center rounded-[var(--radius-sm)] border-2 border-current text-[length:clamp(17px,1.53vw,22px)]">▤</div>
    </div>
  );
}

function FindingVisual({ type }: { type: TestingFinding['visual'] }) {
  if (type === 'qr') {
    return (
      <div className="flex items-center justify-between gap-[var(--space-xl)]">
        <div className="grid w-[clamp(72px,6.67vw,96px)] grid-cols-4 gap-[var(--space-xs)]">
          {Array.from({ length: 7 }).map((_, index) => (
            <span
              key={index}
              className={`h-[clamp(14px,1.39vw,20px)] w-[clamp(14px,1.39vw,20px)] rounded-full ${index < 4 ? 'bg-[var(--color-primary)]' : 'bg-[var(--border-soft-color)]'}`}
            />
          ))}
        </div>
        <strong className="font-label text-[length:clamp(20px,1.95vw,28px)] leading-none text-[var(--color-primary)]">4 / 7</strong>
      </div>
    );
  }

  if (type === 'allergy') {
    return (
      <div className="grid justify-items-center gap-[var(--space-sm)]">
        <div className="rounded-[var(--radius-sm)] border border-[var(--border-soft-color)] bg-[var(--surface-base)] px-[var(--space-lg)] py-[var(--space-sm)] text-center font-quote text-[length:var(--font-body-sm)] leading-[var(--line-height-block)] text-[var(--text-secondary-neutral)]">
          "Any nut allergies<br />
          in this?"
        </div>
        <div className="rounded-[var(--radius-pill)] bg-[color-mix(in_srgb,var(--color-primary)_12%,white)] px-[var(--space-lg)] py-[var(--space-xs)] font-ui text-[length:var(--font-body-sm)] text-[var(--color-primary)]">
          Still asked verbally
        </div>
      </div>
    );
  }

  return (
    <div className="grid justify-items-center gap-[var(--space-sm)]">
      <div className="rounded-[var(--radius-sm)] border border-[var(--border-soft-color)] bg-[var(--surface-base)] px-[var(--space-lg)] py-[var(--space-xs)] font-ui text-[length:var(--font-body-sm)] text-[var(--color-primary)]">
        🇨🇳 炒米粉
      </div>
      <span className="font-ui text-[length:var(--font-caption)] text-[var(--text-tertiary)]">corrected ↓</span>
      <div className="rounded-[var(--radius-sm)] border border-[var(--border-soft-color)] bg-[var(--surface-base)] px-[var(--space-lg)] py-[var(--space-xs)] font-ui text-[length:var(--font-body-sm)] text-[#1f7a32]">
        🇬🇧 Fried rice noodles
      </div>
    </div>
  );
}

function TestingCard({
  children,
  title,
  body,
}: {
  children: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <article className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--border-soft-color)] bg-[var(--surface-base)] shadow-[var(--shadow-card)]">
      <div className="border-b border-[var(--border-soft-color)] bg-[color-mix(in_srgb,var(--color-primary)_5%,white)] px-[var(--space-card-lg)] py-[var(--space-xl)]">
        {children}
      </div>
      <div className="p-[var(--space-card-lg)]">
        <h4 className="case-card-title text-[length:var(--font-stage-title)] leading-[var(--line-height-title)]">
          {title}
        </h4>
        <p className="case-card-body mt-[var(--space-sm)] text-[length:var(--font-body-sm)]">
          {body}
        </p>
      </div>
    </article>
  );
}

export default function TestingBlock({
  methods,
  findings,
}: {
  methods: TestingMethod[];
  findings: TestingFinding[];
}) {
  return (
    <div className="grid gap-[var(--space-5xl)]">
      <div>
        <h3 className="case-caption-label">Methods</h3>
        <div className="mt-[var(--space-section-body-element)] grid gap-[var(--space-section-body-element)] md:grid-cols-2">
          {methods.map((method) => (
            <div key={method.title}>
              <TestingCard title={method.title} body={method.body}>
                <MethodVisual type={method.visual} />
              </TestingCard>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="case-caption-label">Findings</h3>
        <div className="mt-[var(--space-section-body-element)] grid gap-[var(--space-section-body-element)] md:grid-cols-3">
          {findings.map((finding) => (
            <div key={finding.title}>
              <TestingCard title={finding.title} body={finding.body}>
                <FindingVisual type={finding.visual} />
              </TestingCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
