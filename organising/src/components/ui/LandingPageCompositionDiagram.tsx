/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Card from './Card';
import Callout from './Callout';
import FigureFrame from './FigureFrame';

const inputs = [
  {
    title: 'Brand primitives',
    body: 'Colour · typography · radius · imagery',
  },
  {
    title: 'Content inputs',
    body: 'Audience · offer · program · claims',
  },
  {
    title: 'Section library',
    body: 'Hero · features · medications · testimonials · FAQ · CTA',
  },
  {
    title: 'Composition rules',
    body: 'Hierarchy · allowed combinations · responsive · accessibility',
  },
];

export default function LandingPageCompositionDiagram() {
  return (
    <figure className="case-paragraph-stack">
      <div className="grid items-stretch gap-[var(--space-sm)] md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)]">
        {inputs.map((input, index) => (
          <React.Fragment key={input.title}>
            <Card className="flex min-h-full flex-col justify-center p-[var(--space-card-md)] text-center">
              <p className="case-card-title">{input.title}</p>
              <p className="case-card-body mt-[var(--space-text-stack)]">{input.body}</p>
            </Card>
            {index < inputs.length - 1 ? (
              <span
                className="self-center text-center text-[var(--text-muted)]"
                aria-hidden="true"
              >
                +
              </span>
            ) : null}
          </React.Fragment>
        ))}
      </div>

      <div className="flex justify-center text-[var(--text-muted)]" aria-hidden="true">↓</div>

      <Callout variant="card" className="mx-auto w-full max-w-[420px] text-center">
        <p className="case-caption-label">AI assembles within the system</p>
        <p className="case-card-body mt-[var(--space-text-stack)]">Selects · configures · composes</p>
      </Callout>

      <div className="flex justify-center text-[var(--text-muted)]" aria-hidden="true">↓</div>

      <div className="rounded-[var(--radius-lg)] bg-[var(--surface-base)] p-[var(--space-card-lg)] shadow-[var(--shadow-card)]">
        <Card className="mx-auto w-full max-w-[320px] p-[var(--space-card-md)] text-center">
          <p className="case-card-title case-card-title-primary">White-label landing page</p>
        </Card>

        <figcaption className="case-caption-copy mt-[var(--space-component)] text-center">
          Human-designed compositions provided the quality-control layer for every generated landing page.
        </figcaption>

        <FigureFrame
          src="/case-assets/design-system-website-compositions.jpg"
          alt="A large design canvas showing many white-label website compositions across multiple brand themes and layouts"
          wrapperClassName="mt-[var(--space-component-lg)]"
          frameClassName=""
          imageClassName="block w-full rounded-[var(--radius-md)]"
        />
      </div>
    </figure>
  );
}
