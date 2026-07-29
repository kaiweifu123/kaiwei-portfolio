/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PillTabItem } from './PillTabs';

interface CaseSegmentTabsProps {
  items: PillTabItem[];
  activeIndex: number;
  onChange: (index: number) => void;
  className?: string;
}

export default function CaseSegmentTabs({
  items,
  activeIndex,
  onChange,
  className,
}: CaseSegmentTabsProps) {
  return (
    <div className={`case-segment-tabs ${className ?? ''}`}>
      {items.map((item, index) => {
        const isActive = activeIndex === index;

        return (
          <button
            key={item.id ?? item.label}
            type="button"
            data-sound="tab"
            onClick={() => onChange(index)}
            className={`case-segment-tab ${isActive ? 'active' : ''}`}
            aria-pressed={isActive}
          >
            <span className="case-segment-tab-label">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
