/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export interface PillTabItem {
  id?: string | number;
  number: string;
  label: string;
}

interface PillTabsProps {
  items: PillTabItem[];
  activeIndex: number;
  onChange: (index: number) => void;
  containerClassName?: string;
  buttonClassName?: string;
  activeButtonClassName?: string;
  inactiveButtonClassName?: string;
  numberClassName?: string;
  activeNumberClassName?: string;
  inactiveNumberClassName?: string;
}

/**
 * @deprecated Prefer CaseSegmentTabs for case-study step navigation. Keep only for true pill/chip patterns.
 */
export default function PillTabs({
  items,
  activeIndex,
  onChange,
  containerClassName = 'flex flex-wrap items-center gap-[var(--space-inline)]',
  buttonClassName = 'case-chip flex items-center gap-[var(--space-inline)] rounded-[var(--radius-pill)] px-[var(--space-control-x)] py-[var(--space-control-y)] transition-colors',
  activeButtonClassName = 'bg-[var(--surface-base)] text-[var(--text-primary)] shadow-[var(--shadow-control)]',
  inactiveButtonClassName = 'text-[var(--text-muted)] hover:text-[var(--text-primary)]',
  numberClassName = 'case-caption-copy text-[length:var(--font-tab-index)]',
  activeNumberClassName = 'text-[var(--accent-sage)]',
  inactiveNumberClassName = 'text-[var(--text-subtle)]',
}: PillTabsProps) {
  return (
    <div className={containerClassName}>
      {items.map((item, index) => {
        const isActive = activeIndex === index;

        return (
          <button
            key={item.id ?? item.label}
            type="button"
            onClick={() => onChange(index)}
            className={`${buttonClassName} ${isActive ? activeButtonClassName : inactiveButtonClassName}`}
          >
            <span className={`${numberClassName} ${isActive ? activeNumberClassName : inactiveNumberClassName}`}>
              {item.number}
            </span>
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
