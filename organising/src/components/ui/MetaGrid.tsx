/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export interface MetaGridItem {
  label: string;
  values: string[];
}

interface MetaGridProps {
  items: MetaGridItem[];
  className?: string;
  variant?: 'default' | 'hero';
}

export default function MetaGrid({ items, className, variant = 'default' }: MetaGridProps) {
  const isHero = variant === 'hero';
  const containerClassName = className
    ?? (isHero
      ? 'grid grid-cols-2 gap-x-[var(--space-lg)] gap-y-[var(--space-xl)] pt-0 text-left min-[500px]:grid-cols-4 min-[500px]:gap-y-0'
      : 'grid grid-cols-1 gap-y-[var(--space-3xl)] pt-[var(--space-section-body-element)] md:grid-cols-2 lg:grid-cols-4 lg:gap-y-0');
  const itemClassName = isHero
    ? 'border-l border-[var(--border-soft-color)] pl-[var(--space-md)]'
    : 'border-l border-[var(--border-soft-color)] pl-[var(--space-2xl)] md:min-h-[132px]';

  return (
    <div className={containerClassName}>
      {items.map((item) => {
        return (
          <div
            key={item.label}
            className={itemClassName}
          >
            <h2 className="case-label">
              {item.label}
            </h2>
            <div className={`${isHero ? 'text-[length:var(--font-body-sm)]' : 'case-body-copy'} mt-[var(--space-text-stack)] space-y-[var(--space-text-stack)]`}>
              {item.values.map((value) => (
                <p key={value}>{value}</p>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
