/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

type PillProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Pill({ children, className = '' }: PillProps) {
  return <span className={`portfolio-pill ${className}`.trim()}>{children}</span>;
}
