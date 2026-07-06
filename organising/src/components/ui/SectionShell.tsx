/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface SectionShellProps {
  key?: React.Key;
  id: string;
  phaseId: string;
  category: string;
  title: string;
  sysId: string;
  chapterLabel: string;
  isFocused: boolean;
  signalLabel?: string;
  surface?: 'base' | 'subtle';
  hideHeader?: boolean;
  children: React.ReactNode;
}

export default function SectionShell({
  id,
  phaseId,
  category,
  title,
  signalLabel,
  surface = 'base',
  hideHeader = false,
  children,
}: SectionShellProps) {
  return (
    <section
      id={id}
      data-phase-id={phaseId}
      data-section-reveal
      className={`relative border-t border-[var(--border-soft-color)] ${
        surface === 'subtle' ? 'bg-[var(--surface-section-subtle)]' : 'bg-[var(--surface-base)]'
      }`}
    >
      <div className="mx-auto w-full max-w-[var(--container-main)] px-[var(--space-page-x)] py-[var(--space-section-padding-y)] md:px-[var(--space-page-x-desktop)]">
        <div className="mx-auto max-w-[var(--container-section-body)]">
          {!hideHeader ? (
            <>
              <span className="case-section-label mb-[var(--space-sm)]">
                {category}
              </span>
              {signalLabel ? (
                <span className="case-section-label mt-[var(--space-xs)] text-[var(--text-faint)]">
                  {signalLabel}
                </span>
              ) : null}
              <h2 className="case-heading max-w-[var(--container-content)] text-[length:var(--font-heading-md)] leading-[var(--line-height-heading)]">
                {title}
              </h2>
            </>
          ) : null}
          <div className={hideHeader ? '' : 'mt-[var(--space-section-header-body)]'}>
          {children}
          </div>
        </div>
      </div>
    </section>
  );
}
