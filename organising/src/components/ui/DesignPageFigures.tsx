/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import FigureFrame from './FigureFrame';

export interface DesignPageFigureItem {
  title: {
    parts: {
      text: string;
      emphasis?: boolean;
    }[];
  };
  figure: {
    src: string;
    alt: string;
  };
}

export default function DesignPageFigures({ items }: { items: DesignPageFigureItem[] }) {
  return (
    <div className="grid gap-[var(--space-5xl)]">
      {items.map((item, itemIndex) => {
        const stageLabel = item.title.parts.find((part) => part.emphasis)?.text ?? `Stage ${itemIndex + 1}`;

        return (
        <article key={item.figure.src} className="border-t border-[var(--border-soft-color)] pt-[var(--space-4xl)]">
          <div className="grid gap-[var(--space-3xl)] md:grid-cols-[136px_minmax(0,1fr)]">
            <aside className="self-start md:sticky md:top-[calc(var(--case-study-top-nav-offset,var(--editorial-header-height))+var(--case-study-top-nav-height,44px)+var(--space-lg))]">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-pill)] bg-[var(--surface-section)] font-label text-[var(--color-primary)]">
                {itemIndex + 1}
              </div>
              <p className="case-caption-copy mt-[var(--space-sm)]">
                {stageLabel}
              </p>
            </aside>

            <div className="grid gap-[var(--space-section-body-element)]">
              <h3 className="case-stage-title">
                {item.title.parts.map((part, index) => (
                  <span
                    key={`${part.text}-${index}`}
                    className={part.emphasis ? 'case-card-title-primary' : undefined}
                  >
                    {part.text}
                  </span>
                ))}
              </h3>
              <FigureFrame
                src={item.figure.src}
                alt={item.figure.alt}
                frameClassName=""
                imageClassName="block w-full"
              />
            </div>
          </div>
        </article>
        );
      })}
    </div>
  );
}
