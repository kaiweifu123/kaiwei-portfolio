/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface CalloutProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'quote' | 'card';
}

export default function Callout({ children, className, variant }: CalloutProps) {
  const variantClassName = variant === 'quote'
    ? 'case-callout-quote'
    : variant === 'card'
      ? 'case-callout-card'
      : '';

  return <div className={`${variantClassName} ${className ?? ''}`}>{children}</div>;
}
