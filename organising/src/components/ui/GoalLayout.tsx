/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import StackedCardsFigure from './StackedCardsFigure';
import React from 'react';

export interface GoalLayoutItem {
  title: string;
  body: string;
}

export default function GoalLayout({
  goals,
  figure,
}: {
  goals: GoalLayoutItem[];
  figure: { src: string; alt: string; caption?: React.ReactNode };
}) {
  return <StackedCardsFigure items={goals} figure={figure} />;
}
