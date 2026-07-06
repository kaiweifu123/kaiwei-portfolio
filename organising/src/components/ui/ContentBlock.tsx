/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface ContentBlockProps {
  label: string;
  children: React.ReactNode;
  className?: string;
  labelVariant?: 'section' | 'heading';
}

export function ContentLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="case-section-label">
      {children}
    </span>
  );
}

export function ContentParagraph({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`case-body-copy max-w-4xl ${className}`}>
      {children}
    </p>
  );
}

export default function ContentBlock({
  label,
  children,
  className = '',
  labelVariant = 'section',
}: ContentBlockProps) {
  return (
    <div className={className}>
      {labelVariant === 'heading' ? (
        <h3 className="case-heading text-[length:var(--font-heading-md)] leading-[var(--line-height-heading)]">
          {label}
        </h3>
      ) : (
        <ContentLabel>{label}</ContentLabel>
      )}
      {children}
    </div>
  );
}
