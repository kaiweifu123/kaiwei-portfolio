/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import FigureFrame from './FigureFrame';
import React from 'react';

export interface StackedCardsFigureItem {
  title: string;
  body: string;
}

export default function StackedCardsFigure({
  items,
  figure,
}: {
  items: StackedCardsFigureItem[];
  figure: { src: string; alt: string; caption?: React.ReactNode };
}) {
  return (
    <div className="grid items-center gap-[var(--space-section-body-element)] md:grid-cols-[0.42fr_0.58fr]">
      <div className="flex flex-col justify-center gap-[var(--space-section-body-element)]">
        {items.map((item) => (
          <article
            key={item.title}
            className="rounded-[var(--radius-md)] border border-[var(--border-soft-color)] bg-[var(--surface-base)] p-[var(--space-card-md)] shadow-[var(--shadow-card)]"
          >
            <h3 className="case-card-title text-[length:var(--font-body-sm)]">
              {item.title}
            </h3>
            <p className="case-card-body mt-[var(--space-text-stack)] text-[length:var(--font-body-sm)]">
              {item.body}
            </p>
          </article>
        ))}
      </div>

      <FigureFrame
        src={figure.src}
        alt={figure.alt}
        wrapperClassName="flex h-full min-h-[320px] flex-col justify-center"
        frameClassName=""
        imageClassName="block w-full object-contain"
        caption={figure.caption ? (
          <p className="case-caption-copy mt-[var(--space-text-stack)]">
            {figure.caption}
          </p>
        ) : undefined}
      />
    </div>
  );
}
