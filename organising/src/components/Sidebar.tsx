/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SectionItem } from '../types';

const SECTION_ANCHOR_IDS: Record<string, string> = {
  'PH-01': 'research-1',
  'PH-02': 'research-2',
  'PH-03': 'design-1',
  'PH-04': 'design-2',
  'PH-05': 'iteration-1',
  'PH-06': 'iteration-2',
  RESULT: 'result',
};

const SECTION_PHASE_LABELS: Record<string, string> = {
  'PH-01': 'Research',
  'PH-02': 'Opportunity',
  'PH-03': 'First Demo',
  'PH-04': 'Architecture',
  'PH-05': 'Judgment',
  'PH-06': 'Iteration',
  RESULT: 'Result',
};

interface SidebarProps {
  items: SectionItem[];
  selectedId: string;
  onSelect: (id: string) => void;
  onAddNew: () => void;
  enrolledIds: string[];
  pageProgress: number;
  language: 'zh' | 'en';
  onToggleLanguage: () => void;
}

export default function Sidebar({
  items,
  selectedId,
  onSelect,
  language,
  onToggleLanguage,
}: SidebarProps) {
  return (
    <aside className="case-study-timeline-sidebar">
      <nav className="case-study-timeline-nav" aria-label="Case study phase navigation">
        {items.map((item, index) => {
          const isActive = item.id === selectedId;
          const href = `#${SECTION_ANCHOR_IDS[item.id] ?? `sec-${item.id}`}`;

          return (
            <a
              key={item.id}
              href={href}
              className={`phase-item ${isActive ? 'active' : ''}`}
              onClick={(event) => {
                event.preventDefault();
                onSelect(item.id);
              }}
            >
              <span className="phase-code">{SECTION_PHASE_LABELS[item.id] ?? item.id}</span>
              <span className="phase-title">{item.title}</span>
            </a>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={onToggleLanguage}
        className="timeline-translate-button"
      >
        <span>Translate</span>
        <strong>{language === 'zh' ? '中 → EN' : 'EN → 中'}</strong>
      </button>
    </aside>
  );
}
