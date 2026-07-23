/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { portfolioCases } from './portfolioCases';

export type ProjectPagerItem = {
  id: string;
  title: string;
  href: string;
};

export const caseStudyPagerItems: ProjectPagerItem[] = [
  {
    id: 'launchpad',
    title: 'Launchpad Platform',
    href: '/preview.html',
  },
  {
    id: 'design-system',
    title: 'White-label Design Systems for the AI Era',
    href: '/case/design-system/',
  },
  {
    id: 'patient-crm',
    title: 'Patient CRM',
    href: '/patient-crm/',
  },
  ...portfolioCases
    .filter((caseStudy) => caseStudy.slug !== 'fuze')
    .map((caseStudy) => ({
      id: caseStudy.slug,
      title: caseStudy.title,
      href: `/case/${caseStudy.slug}/`,
    })),
];

export const getAdjacentPagerItems = (items: ProjectPagerItem[], currentId: string) => {
  const index = items.findIndex((item) => item.id === currentId);
  const safeIndex = index >= 0 ? index : 0;

  return {
    previous: items[(safeIndex - 1 + items.length) % items.length],
    next: items[(safeIndex + 1) % items.length],
  };
};
