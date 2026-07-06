/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import FigureFrame from './FigureFrame';

export interface StageItem {
  index: string;
  eyebrow: string;
  title: string;
  body?: string[];
  feature?: {
    media: { src: string; alt: string };
    title: string;
    body: string;
    evidence: { src: string; alt: string; caption: string };
  };
  cards?: { title: string; body?: string }[];
  figures?: { src: string; alt: string; caption?: string }[];
  figureLayout?: 'grid' | 'stack';
  figureCaption?: string;
  proseBlocks?: { title: string; items?: string[] }[];
  postProseFigures?: { src: string; alt: string; caption?: string }[];
  split?: {
    body: string[];
    figure: { src: string; alt: string; caption?: string };
  };
  callout?: string;
}

function Caption({ children }: { children?: string }) {
  if (!children) return null;

  return (
    <p className="case-caption-copy mt-[var(--space-text-stack)]">
      {children}
    </p>
  );
}

function StageFigure({ figure }: { figure: { src: string; alt: string; caption?: string } }) {
  return (
    <FigureFrame
      src={figure.src}
      alt={figure.alt}
      frameClassName="overflow-hidden rounded-[var(--radius-md)] border border-[var(--border-frame-color)] bg-[var(--surface-base)] shadow-[var(--shadow-card)]"
      imageClassName="block w-full"
      caption={<Caption>{figure.caption}</Caption>}
    />
  );
}

export default function StageBlock({ items }: { items: StageItem[] }) {
  return (
    <div className="grid gap-[var(--space-5xl)]">
      {items.map((item) => (
        <article key={`${item.index}-${item.title}`} className="border-t border-[var(--border-soft-color)] pt-[var(--space-4xl)]">
          <div className="grid gap-[var(--space-3xl)] md:grid-cols-[136px_minmax(0,1fr)]">
            <aside className="self-start md:sticky md:top-[calc(var(--case-study-top-nav-offset,var(--editorial-header-height))+var(--case-study-top-nav-height,44px)+var(--space-lg))]">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-pill)] bg-[var(--surface-section)] font-label text-[var(--color-primary)]">
                {item.index}
              </div>
              <p className="case-caption-copy mt-[var(--space-sm)]">
                {item.eyebrow}
              </p>
            </aside>

            <div>
              {item.feature ? (
                <div className="grid items-center gap-[var(--space-4xl)] lg:grid-cols-[minmax(220px,0.62fr)_minmax(360px,1fr)]">
                  <StageFigure figure={item.feature.media} />
                  <div className="grid justify-items-center gap-[var(--space-section-body-element)] text-center">
                    <h3 className="case-stage-title">
                      {item.feature.title}
                    </h3>
                    <p className="case-body-copy max-w-[520px]">
                      {item.feature.body}
                    </p>
                    <FigureFrame
                      src={item.feature.evidence.src}
                      alt={item.feature.evidence.alt}
                      frameClassName=""
                      imageClassName="block w-full"
                      caption={<Caption>{item.feature.evidence.caption}</Caption>}
                    />
                  </div>
                </div>
              ) : (
                <h3 className="case-stage-title">
                  {item.title}
                </h3>
              )}

              {!item.feature && item.body?.length ? (
                <div className="case-paragraph-stack mt-[var(--space-section-body-element)]">
                  {item.body.map((paragraph) => (
                    <p key={paragraph} className="case-body-copy">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : null}

              {item.cards?.length ? (
                <div className="mt-[var(--space-section-body-element)] grid gap-[var(--space-section-body-element)] md:grid-cols-2">
                  {item.cards.map((card) => (
                    <div
                      key={`${card.title}-${card.body}`}
                      className="rounded-[var(--radius-md)] border border-[var(--border-soft-color)] bg-[var(--surface-base)] p-[var(--space-card-lg)] shadow-[var(--shadow-card)]"
                    >
                      <h4 className="case-card-title text-[length:var(--font-body-sm)]">
                        {card.title}
                      </h4>
                      {card.body ? (
                        <p className="case-card-body mt-[var(--space-sm)] text-[length:var(--font-body-sm)]">
                          {card.body}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : null}

              {item.split ? (
                <div className="mt-[var(--space-section-body-element)] grid items-center gap-[var(--space-section-body-element)] md:grid-cols-2">
                  <div className="case-paragraph-stack">
                    {item.split.body.map((paragraph) => (
                      <p key={paragraph} className="case-body-copy">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <StageFigure figure={item.split.figure} />
                </div>
              ) : null}

              {item.figures?.length ? (
                <div className="mt-[var(--space-section-body-element)]">
                  <div className={`grid gap-[var(--space-section-body-element)] ${item.figureLayout === 'grid' ? 'md:grid-cols-2' : ''}`}>
                    {item.figures.map((figure) => (
                      <div key={`${figure.src}-${figure.alt}`}>
                        <StageFigure figure={figure} />
                      </div>
                    ))}
                  </div>
                  <Caption>{item.figureCaption}</Caption>
                </div>
              ) : null}

              {item.proseBlocks?.length ? (
                <div className="grid gap-[var(--space-section-body-element)]">
                  {item.proseBlocks.map((block) => (
                    <div key={block.title} className="mt-[var(--space-section-body-element)] max-w-[var(--container-content)]">
                      <h4 className="case-card-title text-[length:var(--font-body-size)]">
                        {block.title}
                      </h4>
                      {block.items?.length ? (
                        <ol className="mt-[var(--space-text-stack)] list-decimal space-y-[var(--space-sm)] pl-5">
                          {block.items.map((itemText) => (
                            <li key={itemText} className="case-body-copy">
                              {itemText}
                            </li>
                          ))}
                        </ol>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : null}

              {item.postProseFigures?.length ? (
                <div className="mt-[var(--space-section-body-element)] grid gap-[var(--space-section-body-element)]">
                  {item.postProseFigures.map((figure) => (
                    <div key={`${figure.src}-${figure.alt}`}>
                      <StageFigure figure={figure} />
                    </div>
                  ))}
                </div>
              ) : null}

              {item.callout ? (
                <blockquote className="mt-[var(--space-section-body-element)] border-l border-[var(--color-primary)] py-[var(--space-sm)] pl-[var(--space-2xl)] pr-[var(--space-lg)] font-quote text-[length:var(--font-body-size)] italic leading-[var(--line-height-body)] text-[var(--text-secondary-neutral)]">
                  {item.callout}
                </blockquote>
              ) : null}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
