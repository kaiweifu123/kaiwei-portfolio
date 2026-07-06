/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import PortfolioNav from './ui/PortfolioNav';
import InfoOverlay from './ui/InfoOverlay';
import Lightbox from './ui/Lightbox';
import ProjectPager from './ui/ProjectPager';
import { prefetchInternalHref, useInViewVideo, useMediaLoadedClass } from './ui/mediaLoading';

type IllustrationMedia = {
  src: string;
  width: number;
  height: number;
  mime: string;
};

export type IllustrationProject = {
  slug: string;
  title: string;
  description: string;
  theme: string;
  medium: string;
  year: string;
  cover: IllustrationMedia;
  media: IllustrationMedia[];
};

export const illustrationProjects: IllustrationProject[] = [
  {
    slug: "kodak",
    title: "Gender Equality Through the Lens of Kodak",
    description: "Illustrations exploring photography's role in expanding women's visibility, participation, and economic agency.",
    theme: "Editorial narrative",
    medium: "Digital illustration",
    year: "2020",
    cover: { src: "/illustration/kodak/cover.jpg", width: 3508, height: 2480, mime: "image/jpeg" },
    media: [
      { src: "/illustration/kodak/01.jpg", width: 3508, height: 2480, mime: "image/jpeg" },
      { src: "/illustration/kodak/02.jpg", width: 3508, height: 2480, mime: "image/jpeg" },
      { src: "/illustration/kodak/03.jpg", width: 3508, height: 2480, mime: "image/jpeg" },
      { src: "/illustration/kodak/04.jpg", width: 3508, height: 2480, mime: "image/jpeg" },
    ],
  },
  {
    slug: "london-tube-sketch",
    title: "London Tube Sketch",
    description: "Quick sketches from London Tube journeys, capturing fleeting moments and the city's everyday faces below the surface.",
    theme: "Tube sketchbook",
    medium: "Scanned sketch series",
    year: "2022",
    cover: { src: "/illustration/london-tube-sketch/cover.jpg", width: 2868, height: 1822, mime: "image/jpeg" },
    media: [
      { src: "/illustration/london-tube-sketch/01.jpg", width: 2868, height: 1822, mime: "image/jpeg" },
      { src: "/illustration/london-tube-sketch/02.jpg", width: 2394, height: 1489, mime: "image/jpeg" },
      { src: "/illustration/london-tube-sketch/03.jpg", width: 4792, height: 2856, mime: "image/jpeg" },
      { src: "/illustration/london-tube-sketch/04.jpg", width: 4867, height: 2876, mime: "image/jpeg" },
    ],
  },
  {
    slug: "moments-from-the-tube",
    title: "Moments from the Tube",
    description: "People encountered during daily Tube travel, capturing quiet narratives that unfold in shared underground spaces.",
    theme: "Observed commute",
    medium: "Photo collage and digital drawing",
    year: "2022",
    cover: { src: "/illustration/moments-from-the-tube/cover.jpg", width: 2388, height: 1397, mime: "image/jpeg" },
    media: [
      { src: "/illustration/moments-from-the-tube/01.jpg", width: 2388, height: 1397, mime: "image/jpeg" },
      { src: "/illustration/moments-from-the-tube/02.jpg", width: 1653, height: 1668, mime: "image/jpeg" },
      { src: "/illustration/moments-from-the-tube/03.jpg", width: 2388, height: 1668, mime: "image/jpeg" },
      { src: "/illustration/moments-from-the-tube/04.jpg", width: 2388, height: 1668, mime: "image/jpeg" },
      { src: "/illustration/moments-from-the-tube/05.jpg", width: 2388, height: 1668, mime: "image/jpeg" },
      { src: "/illustration/moments-from-the-tube/06.jpg", width: 2388, height: 1668, mime: "image/jpeg" },
      { src: "/illustration/moments-from-the-tube/07.jpg", width: 2388, height: 1668, mime: "image/jpeg" },
      { src: "/illustration/moments-from-the-tube/08.jpg", width: 2388, height: 1668, mime: "image/jpeg" },
    ],
  },
  {
    slug: "london-life",
    title: "The Faces of London Life",
    description: "Animated observations from daily Tube journeys, capturing the small rituals and shared rhythms of London life.",
    theme: "Observed city life",
    medium: "Animated GIF series",
    year: "2020",
    cover: { src: "/illustration/london-life/cover.mp4", width: 2388, height: 1668, mime: "video/mp4" },
    media: [
      { src: "/illustration/london-life/01.mp4", width: 2388, height: 1668, mime: "video/mp4" },
      { src: "/illustration/london-life/02.mp4", width: 2388, height: 1668, mime: "video/mp4" },
      { src: "/illustration/london-life/03.mp4", width: 1668, height: 2388, mime: "video/mp4" },
      { src: "/illustration/london-life/04.mp4", width: 1668, height: 2388, mime: "video/mp4" },
      { src: "/illustration/london-life/05.mp4", width: 2388, height: 1668, mime: "video/mp4" },
      { src: "/illustration/london-life/06.mp4", width: 2048, height: 2048, mime: "video/mp4" },
      { src: "/illustration/london-life/07.mp4", width: 1668, height: 2388, mime: "video/mp4" },
      { src: "/illustration/london-life/08.mp4", width: 1668, height: 2388, mime: "video/mp4" },
      { src: "/illustration/london-life/09.mp4", width: 1668, height: 2388, mime: "video/mp4" },
      { src: "/illustration/london-life/10.mp4", width: 1668, height: 2388, mime: "video/mp4" },
      { src: "/illustration/london-life/11.mp4", width: 1668, height: 2388, mime: "video/mp4" },
      { src: "/illustration/london-life/12.mp4", width: 1668, height: 2388, mime: "video/mp4" },
      { src: "/illustration/london-life/13.mp4", width: 1668, height: 2388, mime: "video/mp4" },
      { src: "/illustration/london-life/14.mp4", width: 1668, height: 2388, mime: "video/mp4" },
      { src: "/illustration/london-life/15.mp4", width: 1668, height: 2388, mime: "video/mp4" },
      { src: "/illustration/london-life/16.mp4", width: 1668, height: 2388, mime: "video/mp4" },
    ],
  },
  {
    slug: "tarot",
    title: "Tarot Drawing",
    description: "A personal tarot set exploring symbolism, emotion, intuition, desire, control, self-esteem, and chaos.",
    theme: "Symbolic system",
    medium: "Drawing series",
    year: "2020",
    cover: { src: "/illustration/tarot/cover.jpg", width: 1440, height: 1687, mime: "image/jpeg" },
    media: [
      { src: "/illustration/tarot/01.jpg", width: 1440, height: 1687, mime: "image/jpeg" },
      { src: "/illustration/tarot/02.jpg", width: 1440, height: 1687, mime: "image/jpeg" },
      { src: "/illustration/tarot/03.jpg", width: 1440, height: 1687, mime: "image/jpeg" },
      { src: "/illustration/tarot/04.jpg", width: 6613, height: 3288, mime: "image/jpeg" },
    ],
  },
  {
    slug: "autonomous-archive",
    title: "Autonomous Archive",
    description: "Notebook excerpts combining illustration and writing around self-identity, growth, and social observation.",
    theme: "Personal archive",
    medium: "Notebook excerpts",
    year: "2020",
    cover: { src: "/illustration/autonomous-archive/cover.jpg", width: 7066, height: 2480, mime: "image/jpeg" },
    media: [
      { src: "/illustration/autonomous-archive/01.jpg", width: 7066, height: 2480, mime: "image/jpeg" },
      { src: "/illustration/autonomous-archive/02.jpg", width: 3985, height: 2480, mime: "image/jpeg" },
      { src: "/illustration/autonomous-archive/03.jpg", width: 3106, height: 2480, mime: "image/jpeg" },
    ],
  },
];

function IllustrationNav({ onAboutClick }: { onAboutClick: () => void }) {
  return <PortfolioNav onAboutClick={onAboutClick} />;
}

export default function IllustrationPage() {
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  return (
    <main className="portfolio-home illustration-page">
      <IllustrationNav onAboutClick={() => setIsInfoOpen(true)} />
      {isInfoOpen ? <InfoOverlay onClose={() => setIsInfoOpen(false)} /> : null}

      <section className="work-section illustration-work-section" id="illustration" aria-label="Illustration projects">
        <aside className="work-sidebar">
          <div className="work-sidebar-panel selected-work-intro">
            <h2>Illustration</h2>
            <p>Selected personal work across visual storytelling, animation, symbolism, and observational drawing.</p>
          </div>
        </aside>
        <main className="work-content illustration-index">
          {illustrationProjects.map((project, index) => (
            <a
              className="illustration-index-card"
              href={`/illustration/${project.slug}`}
              key={project.slug}
              onMouseEnter={() => prefetchInternalHref(`/illustration/${project.slug}`)}
              onTouchStart={() => prefetchInternalHref(`/illustration/${project.slug}`)}
            >
              <IllustrationMediaFrame
                media={project.cover}
                alt={`${project.title} preview`}
                loading="lazy"
              />
              <div className="illustration-card-meta" aria-label={`${project.title} details`}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span>{project.theme}</span>
                <span>{project.media.length} pieces</span>
              </div>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
            </a>
          ))}
        </main>
      </section>
    </main>
  );
}

export function IllustrationProjectPage({ project }: { project: IllustrationProject }) {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);
  const projectIndex = illustrationProjects.findIndex((item) => item.slug === project.slug);
  const previousProject = illustrationProjects[(projectIndex - 1 + illustrationProjects.length) % illustrationProjects.length];
  const nextProject = illustrationProjects[(projectIndex + 1) % illustrationProjects.length];
  const featuredMedia = project.slug === 'moments-from-the-tube' ? project.media[0] : undefined;
  const galleryMedia = featuredMedia ? project.media.slice(1) : project.media;

  return (
    <main className="portfolio-home illustration-page illustration-detail-page">
      <IllustrationNav onAboutClick={() => setIsInfoOpen(true)} />
      {isInfoOpen ? <InfoOverlay onClose={() => setIsInfoOpen(false)} /> : null}

      <section className="illustration-detail-hero">
        <div className="illustration-detail-heading">
          <p className="illustration-kicker">{project.theme}</p>
          <h1>{project.title}</h1>
        </div>
        <aside className="illustration-detail-summary" aria-label={`${project.title} summary`}>
          <p>{project.description}</p>
          <dl>
            <div>
              <dt>Medium</dt>
              <dd>{project.medium}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt>Pieces</dt>
              <dd>{project.media.length}</dd>
            </div>
          </dl>
        </aside>
      </section>

      {featuredMedia ? (
        <IllustrationMediaFrame
          className="illustration-feature-media"
          media={featuredMedia}
          alt={`${project.title} featured artwork`}
          loading="eager"
          onPreview={featuredMedia.mime.startsWith('image/')
            ? () => setLightboxImage({ src: featuredMedia.src, alt: `${project.title} featured artwork` })
            : undefined}
        />
      ) : null}

      <section className="illustration-project-gallery illustration-detail-gallery" aria-label={`${project.title} artworks`}>
        {galleryMedia.map((media, index) => (
          <IllustrationMediaFrame
            className="illustration-project-media"
            media={media}
            alt={`${project.title} artwork ${index + 1}`}
            loading={index < 2 ? 'eager' : 'lazy'}
            onPreview={media.mime.startsWith('image/')
              ? () => setLightboxImage({ src: media.src, alt: `${project.title} artwork ${index + 1}` })
              : undefined}
          />
        ))}
      </section>

      {lightboxImage ? (
        <Lightbox src={lightboxImage.src} alt={lightboxImage.alt} onClose={() => setLightboxImage(null)} />
      ) : null}

      <ProjectPager
        ariaLabel="Browse illustration projects"
        previous={{ title: previousProject.title, href: `/illustration/${previousProject.slug}` }}
        next={{ title: nextProject.title, href: `/illustration/${nextProject.slug}` }}
      />
    </main>
  );
}

function IllustrationMediaFrame({
  className,
  media,
  alt,
  loading,
  onPreview,
}: {
  className?: string;
  media: IllustrationMedia;
  alt: string;
  loading: 'eager' | 'lazy';
  onPreview?: () => void;
}) {
  const mediaLoaded = useMediaLoadedClass();
  const videoRef = useInViewVideo<HTMLVideoElement>(media.mime.startsWith('video/'));
  const style = { aspectRatio: `${media.width} / ${media.height}` };

  if (media.mime.startsWith('video/')) {
    return (
      <figure className={`${className ?? ''} media-skeleton`.trim()} style={style}>
        <video
          ref={videoRef}
          src={media.src}
          aria-label={alt}
          muted
          loop
          playsInline
          preload="none"
          className={`media-fade ${mediaLoaded.className}`.trim()}
          onLoadedData={mediaLoaded.onLoadedData}
        />
      </figure>
    );
  }

  const image = (
    <img
      src={media.src}
      alt={alt}
      loading={loading}
      decoding="async"
      className={`media-fade ${mediaLoaded.className}`.trim()}
      onLoad={mediaLoaded.onLoad}
    />
  );

  return (
    <figure className={`${className ?? ''} media-skeleton`.trim()} style={style}>
      {onPreview ? (
        <button
          className="zoomable-image-trigger"
          type="button"
          onClick={onPreview}
          aria-label={`Open image preview: ${alt}`}
        >
          {image}
        </button>
      ) : image}
    </figure>
  );
}
