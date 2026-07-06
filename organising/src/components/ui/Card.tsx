/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface CardProps {
  key?: React.Key;
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return <div className={`case-card ${className ?? ''}`}>{children}</div>;
}
