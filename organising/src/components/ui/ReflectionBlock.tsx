/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import FigureFrame from './FigureFrame';

export interface ReflectionTakeaway {
  title: string;
  body: string;
}

export interface ReflectionMetric {
  value: string;
  label: string;
}

export default function ReflectionBlock({
  takeaways,
  quote,
  metrics,
  figure,
  closing,
}: {
  takeaways: ReflectionTakeaway[];
  quote?: string;
  metrics: ReflectionMetric[];
  figure: { src: string; alt: string; caption: string };
  closing: string[];
}) {
  return (
    <div className="grid gap-[var(--space-section-body-element)]">
      <div className="grid gap-[var(--space-section-body-element)] md:grid-cols-3">
        {takeaways.map((takeaway) => (
          <article key={takeaway.title} className="border-t border-[var(--border-soft-color)] pt-[var(--space-section-body-element)]">
            <h3 className="case-card-title text-[length:var(--font-body-sm)] leading-[var(--line-height-heading)]">
              {takeaway.title}
            </h3>
            <p className="case-card-body mt-[var(--space-text-stack)] text-[length:var(--font-body-sm)]">
              {takeaway.body}
            </p>
          </article>
        ))}
      </div>

      {quote ? (
        <blockquote className="border-l border-[var(--color-primary)] py-[var(--space-sm)] pl-[var(--space-2xl)] pr-[var(--space-lg)] font-quote text-[length:var(--font-body-size)] italic leading-[var(--line-height-body)] text-[var(--text-secondary-neutral)]">
          {quote}
        </blockquote>
      ) : null}

      <div className="grid gap-[var(--space-section-body-element)] md:grid-cols-3">
        {metrics.map((metric) => (
          <article
            key={`${metric.value}-${metric.label}`}
            className="rounded-[var(--radius-md)] border border-[var(--border-soft-color)] bg-[var(--surface-base)] p-[var(--space-card-lg)] shadow-[var(--shadow-card)]"
          >
            <div className="font-label text-[28px] font-semibold leading-[var(--line-height-title)] text-[var(--color-primary)]">
              {metric.value}
            </div>
            <p className="case-card-body mt-[var(--space-text-stack)] text-[length:var(--font-body-sm)]">
              {metric.label}
            </p>
          </article>
        ))}
      </div>

      <FigureFrame
        src={figure.src}
        alt={figure.alt}
        frameClassName="overflow-hidden rounded-[var(--radius-md)] border border-[var(--border-frame-color)] bg-[var(--surface-base)] shadow-[var(--shadow-card)]"
        imageClassName="block w-full"
        caption={<p className="case-caption-copy mt-[var(--space-text-stack)]">{figure.caption}</p>}
      />

      <div className="case-paragraph-stack">
        {closing.map((paragraph) => (
          <p key={paragraph} className="case-body-copy">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
