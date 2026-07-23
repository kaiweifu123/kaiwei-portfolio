/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import MetaGrid, { type MetaGridItem } from './MetaGrid';
import Pill from './Pill';
import { useMediaLoadedClass } from './mediaLoading';

type CaseHeroArtifact =
  | {
      type: 'image';
      src: string;
      alt: string;
      fit?: 'contain' | 'cover';
      background?: string;
      objectPosition?: string;
      onClick?: () => void;
      showDivider?: boolean;
    }
  | {
      type: 'video';
      src: string;
      ariaLabel: string;
      background?: string;
      className?: string;
      autoPlay?: boolean;
      muted?: boolean;
      loop?: boolean;
      playsInline?: boolean;
      preload?: React.VideoHTMLAttributes<HTMLVideoElement>['preload'];
      poster?: string;
    };

type CaseHeroProps = {
  variant: 'editorial' | 'showcase';
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  subtitleHighlight?: string;
  chips?: string[];
  productLink?: {
    label: string;
    href: string;
  };
  meta?: MetaGridItem[];
  artifact: CaseHeroArtifact;
};

function HighlightedSubtitle({ subtitle, highlight }: { subtitle: string; highlight?: string }) {
  if (!highlight || !subtitle.includes(highlight)) {
    return <>{subtitle}</>;
  }

  const [before, after] = subtitle.split(highlight);

  return (
    <>
      {before}
      <span className="text-[var(--color-primary)]">{highlight}</span>
      {after}
    </>
  );
}

function HeroCopy({
  title,
  subtitle,
  subtitleHighlight,
  chips = [],
  productLink,
  meta = [],
  variant,
}: Omit<CaseHeroProps, 'artifact'>) {
  const titleNode = typeof title === 'string' && title.includes('CRM')
    ? (
      <>
        {title.split('CRM')[0]}<span className="text-[var(--color-primary)]">CRM</span>{title.split('CRM').slice(1).join('CRM')}
      </>
    )
    : title;

  return (
    <div className={variant === 'showcase' ? 'case-hero-copy-inner' : 'w-[min(500px,100%)] text-center'}>
      <h1 className="font-hero-display text-[length:var(--font-hero-display-size)] leading-[var(--line-height-hero-display)] tracking-[var(--tracking-hero-display)] text-[var(--text-hero-display)]">
        {titleNode}
      </h1>
      {subtitle ? (
        <p className="font-hero-subtitle mt-[var(--space-2xl)] text-[length:var(--font-hero-subtitle-size)] italic leading-[var(--line-height-hero-subtitle)] tracking-[var(--tracking-hero-subtitle)] text-[var(--text-primary)]">
          {typeof subtitle === 'string'
            ? <HighlightedSubtitle subtitle={subtitle} highlight={subtitleHighlight} />
            : subtitle}
        </p>
      ) : null}
      {chips.length || productLink ? (
        <div className="mt-[var(--space-2xl)] flex flex-wrap justify-center gap-[var(--space-sm)]" aria-label="Project metadata">
          {chips.map((chip) => (
            <span key={chip} className="inline-flex">
              <Pill>{chip}</Pill>
            </span>
          ))}
          {productLink ? (
            <a
              className="portfolio-pill portfolio-pill-link"
              href={productLink.href}
              target="_blank"
              rel="noreferrer"
            >
              {productLink.label} -&gt;
            </a>
          ) : null}
        </div>
      ) : null}
      {meta.length ? (
        <div className="mt-[var(--space-4xl)] w-full">
          <MetaGrid items={meta} variant="hero" />
        </div>
      ) : null}
    </div>
  );
}

function EditorialArtifact({ artifact }: { artifact: CaseHeroArtifact }) {
  const mediaLoaded = useMediaLoadedClass();

  if (artifact.type !== 'image') {
    return null;
  }

  const heroFit = artifact.fit ?? 'contain';
  const heroArtifactPanelClassName = heroFit === 'cover'
    ? 'case-hero-editorial-artifact-panel case-hero-editorial-artifact-panel--cover'
    : 'case-hero-editorial-artifact-panel case-hero-editorial-artifact-panel--contain';
  const dividerClassName = artifact.showDivider === false ? ' case-hero-editorial-artifact-panel--no-divider' : '';
  const heroFigureClassName = heroFit === 'cover'
    ? 'case-hero-editorial-figure case-hero-editorial-figure--cover'
    : 'case-hero-editorial-figure case-hero-editorial-figure--contain';
  const heroImageClassName = heroFit === 'cover'
    ? 'case-hero-editorial-image case-hero-editorial-image--cover'
    : 'case-hero-editorial-image case-hero-editorial-image--contain';

  return (
    <div className={`${heroArtifactPanelClassName}${dividerClassName}`} style={artifact.background ? { backgroundColor: artifact.background } : undefined}>
      <figure className={`${heroFigureClassName} media-skeleton`}>
        <img
          src={artifact.src}
          alt={artifact.alt}
          className={`${heroImageClassName} media-fade ${mediaLoaded.className}`.trim()}
          loading="eager"
          decoding="async"
          onLoad={mediaLoaded.onLoad}
          style={artifact.objectPosition ? { objectPosition: artifact.objectPosition } : undefined}
        />
      </figure>
    </div>
  );
}

function ShowcaseArtifact({ artifact }: { artifact: CaseHeroArtifact }) {
  const background = artifact.background ? { backgroundColor: artifact.background } : undefined;
  const mediaLoaded = useMediaLoadedClass();

  return (
    <div className="case-hero-showcase-artifact-panel" style={background}>
      <div className="case-hero-showcase-artifact media-skeleton">
        {artifact.type === 'image' ? (
          <button
            className="zoomable-image-trigger"
            type="button"
            onClick={artifact.onClick}
            aria-label={`Open image preview: ${artifact.alt}`}
          >
            <img
              src={artifact.src}
              alt={artifact.alt}
              className={`media-fade ${mediaLoaded.className}`.trim()}
              loading="eager"
              decoding="async"
              onLoad={mediaLoaded.onLoad}
            />
          </button>
        ) : (
          <video
            className={`${artifact.className ?? 'case-hero-showcase-video'} media-fade ${mediaLoaded.className}`.trim()}
            src={artifact.src}
            autoPlay={artifact.autoPlay}
            muted={artifact.muted}
            loop={artifact.loop}
            playsInline={artifact.playsInline}
            preload={artifact.preload}
            poster={artifact.poster}
            aria-label={artifact.ariaLabel}
            onLoadedData={mediaLoaded.onLoadedData}
          />
        )}
      </div>
    </div>
  );
}

export default function CaseHero({ variant, title, subtitle, subtitleHighlight, chips = [], productLink, meta = [], artifact }: CaseHeroProps) {
  if (variant === 'editorial') {
    return (
      <section className="case-hero-editorial">
        <div className="case-hero-editorial-copy-panel">
          <HeroCopy variant={variant} title={title} subtitle={subtitle} subtitleHighlight={subtitleHighlight} chips={chips} productLink={productLink} meta={meta} />
        </div>
        <EditorialArtifact artifact={artifact} />
      </section>
    );
  }

  return (
    <section className="case-hero-showcase">
      <div className="case-hero-showcase-copy-panel">
        <HeroCopy variant={variant} title={title} subtitle={subtitle} chips={chips} productLink={productLink} meta={meta} />
      </div>
      <ShowcaseArtifact artifact={artifact} />
    </section>
  );
}
