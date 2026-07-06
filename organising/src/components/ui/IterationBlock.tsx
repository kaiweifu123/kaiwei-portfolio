/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import FigureFrame from './FigureFrame';

export interface IterationItem {
  image: { src: string; alt: string };
  title: string;
  body: string;
}

export default function IterationBlock({ items }: { items: IterationItem[] }) {
  return (
    <div className="grid gap-[var(--space-4xl)]">
      {items.map((item) => (
        <article key={item.title} className="grid gap-[var(--space-section-body-element)]">
          <FigureFrame
            src={item.image.src}
            alt={item.image.alt}
            frameClassName="overflow-hidden rounded-[var(--radius-md)] border border-[var(--border-frame-color)] bg-[var(--surface-base)] shadow-[var(--shadow-card)]"
            imageClassName="block w-full"
          />
          <div className="grid gap-[var(--space-text-stack)]">
            <h3 className="case-stage-title">
              {item.title}
            </h3>
            <p className="case-body-copy">
              {item.body}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
