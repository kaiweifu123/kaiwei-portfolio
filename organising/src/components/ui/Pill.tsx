/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

type PillProps = {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'home';
};

export default function Pill({ children, className = '', variant = 'default' }: PillProps) {
  const variantClassName = variant === 'home' ? 'portfolio-pill--home' : '';
  return <span className={`portfolio-pill ${variantClassName} ${className}`.trim()}>{children}</span>;
}
