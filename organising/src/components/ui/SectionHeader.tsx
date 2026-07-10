/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface SectionHeaderProps {
  category: string;
  title?: string;
  sysId: string;
  chapterLabel: string;
  variant?: 'section' | 'inline';
}

export default function SectionHeader({
  category,
  title,
  variant = 'section',
}: SectionHeaderProps) {
  const heading = (
    <>
      <span className="case-section-label mb-[var(--space-sm)]">
        {category}
      </span>
      {title ? (
        <h2 className="case-heading max-w-3xl text-[length:var(--font-heading-md)] leading-[var(--line-height-heading)]">
          {title}
        </h2>
      ) : null}
    </>
  );

  if (variant === 'inline') {
    return heading;
  }

  return (
    <div className="mx-auto w-full max-w-[var(--container-main)] px-[var(--space-page-x)] pt-[var(--space-6xl)] pb-[var(--space-section-header-body)] md:px-[var(--space-page-x-desktop)]">
      {heading}
    </div>
  );
}
