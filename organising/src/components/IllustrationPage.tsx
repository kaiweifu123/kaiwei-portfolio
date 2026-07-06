/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import PortfolioNav from './ui/PortfolioNav';
import InfoOverlay from './ui/InfoOverlay';
import Lightbox from './ui/Lightbox';
import ProjectPager from './ui/ProjectPager';

type CargoMedia = {
  hash: string;
  name: string;
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
  cover: CargoMedia;
  media: CargoMedia[];
};

export const illustrationProjects: IllustrationProject[] = [
  {
    slug: 'kodak',
    title: 'Gender Equality Through the Lens of Kodak',
    description:
      "Illustrations exploring photography's role in expanding women's visibility, participation, and economic agency.",
    theme: 'Editorial narrative',
    medium: 'Digital illustration',
    year: '2020',
    cover: { hash: 'B2011028102463208200148059635998', name: '01.jpg', width: 3508, height: 2480, mime: 'image/jpeg' },
    media: [
      { hash: 'B2011028102463208200148059635998', name: '01.jpg', width: 3508, height: 2480, mime: 'image/jpeg' },
      { hash: 'H2011028549390923617983076188446', name: '02.jpg', width: 3508, height: 2480, mime: 'image/jpeg' },
      { hash: 'K2011028789881126106934500606238', name: '03.jpg', width: 3508, height: 2480, mime: 'image/jpeg' },
      { hash: 'W2011029125648761736595759120670', name: '04.jpg', width: 3508, height: 2480, mime: 'image/jpeg' },
    ],
  },
  {
    slug: 'london-tube-sketch',
    title: 'London Tube Sketch',
    description:
      "Quick sketches from London Tube journeys, capturing fleeting moments and the city's everyday faces below the surface.",
    theme: 'Tube sketchbook',
    medium: 'Scanned sketch series',
    year: '2022',
    cover: {
      hash: 'V2009278880935960839872101695774',
      name: 'scan_20034120_2022-10-13-13-47-03_1_edited.jpg',
      width: 2868,
      height: 1822,
      mime: 'image/jpeg',
    },
    media: [
      {
        hash: 'V2009278880935960839872101695774',
        name: 'scan_20034120_2022-10-13-13-47-03_1_edited.jpg',
        width: 2868,
        height: 1822,
        mime: 'image/jpeg',
      },
      {
        hash: 'X2009280514100000661673544466718',
        name: 'scan_20034120_2022-10-10-21-21-38_page-0001.jpg',
        width: 2394,
        height: 1489,
        mime: 'image/jpeg',
      },
      {
        hash: 'D2009281652337896985847717380382',
        name: 'scan_20034120_2022-10-13-19-14-03_1.jpeg',
        width: 4792,
        height: 2856,
        mime: 'image/jpeg',
      },
      {
        hash: 'J2009281238540533924395055530270',
        name: 'scan_20034120_2022-10-13-13-47-03_2.jpeg',
        width: 4867,
        height: 2876,
        mime: 'image/jpeg',
      },
    ],
  },
  {
    slug: 'moments-from-the-tube',
    title: 'Moments from the Tube',
    description:
      'People encountered during daily Tube travel, capturing quiet narratives that unfold in shared underground spaces.',
    theme: 'Observed commute',
    medium: 'Photo collage and digital drawing',
    year: '2022',
    cover: { hash: 'O2011154421210279176951266754846', name: '.jpg', width: 2388, height: 1397, mime: 'image/jpeg' },
    media: [
      { hash: 'O2011154421210279176951266754846', name: '.jpg', width: 2388, height: 1397, mime: 'image/jpeg' },
      { hash: 'P2011155134877913900626399674654', name: 'IMG_2804.jpg', width: 1653, height: 1668, mime: 'image/jpeg' },
      { hash: 'M2011155065075434325709456359710', name: 'IMG_2766.JPG', width: 2388, height: 1668, mime: 'image/jpeg' },
      { hash: 'B2011154885791528673326324203806', name: 'IMG_2757.JPG', width: 2388, height: 1668, mime: 'image/jpeg' },
      { hash: 'R2011154838125141986860842828062', name: 'IMG_2752.JPG', width: 2388, height: 1668, mime: 'image/jpeg' },
      { hash: 'K2011155001083679134011021803806', name: 'IMG_2763.JPG', width: 2388, height: 1668, mime: 'image/jpeg' },
      { hash: 'I2011154778781966301737215279390', name: 'IMG_2743.JPG', width: 2388, height: 1668, mime: 'image/jpeg' },
      { hash: 'O2011154709828036954210911338782', name: 'IMG_2741.JPG', width: 2388, height: 1668, mime: 'image/jpeg' },
    ],
  },
  {
    slug: 'london-life',
    title: 'The Faces of London Life',
    description:
      'Animated observations from daily Tube journeys, capturing the small rituals and shared rhythms of London life.',
    theme: 'Observed city life',
    medium: 'Animated GIF series',
    year: '2020',
    cover: { hash: 'D2011068580651791231007328518430', name: 'IMG_3100.GIF', width: 2388, height: 1668, mime: 'image/gif' },
    media: [
      { hash: 'D2011068580651791231007328518430', name: 'IMG_3100.GIF', width: 2388, height: 1668, mime: 'image/gif' },
      { hash: 'J2011068580393536813975394795806', name: 'IMG_2776.GIF', width: 2388, height: 1668, mime: 'image/gif' },
      { hash: 'W2011068580504217278417652105502', name: 'IMG_3092.GIF', width: 1668, height: 2388, mime: 'image/gif' },
      { hash: 'H2011068580522664022491361657118', name: 'IMG_3093.GIF', width: 1668, height: 2388, mime: 'image/gif' },
      { hash: 'S2011068579378965889921369456926', name: 'ezgif-4-fb30c47869.gif', width: 2388, height: 1668, mime: 'image/gif' },
      { hash: 'X2011068580411983558049104347422', name: 'IMG_2789.GIF', width: 2048, height: 2048, mime: 'image/gif' },
      { hash: 'V2011068580430430302122813899038', name: 'IMG_2833.GIF', width: 1668, height: 2388, mime: 'image/gif' },
      { hash: 'T2011068580578004254712490311966', name: 'IMG_3096.GIF', width: 1668, height: 2388, mime: 'image/gif' },
      { hash: 'R2011068580467323790270233002270', name: 'IMG_3090.GIF', width: 1668, height: 2388, mime: 'image/gif' },
      { hash: 'I2011068580485770534343942553886', name: 'IMG_3091.GIF', width: 1668, height: 2388, mime: 'image/gif' },
      { hash: 'U2011068580614897742859909415198', name: 'IMG_3098.GIF', width: 1668, height: 2388, mime: 'image/gif' },
      { hash: 'C2011068580633344486933618966814', name: 'IMG_3099.GIF', width: 1668, height: 2388, mime: 'image/gif' },
      { hash: 'L2011068580559557510638780760350', name: 'IMG_3095.GIF', width: 1668, height: 2388, mime: 'image/gif' },
      { hash: 'P2011068580448877046196523450654', name: 'IMG_3089.GIF', width: 1668, height: 2388, mime: 'image/gif' },
      { hash: 'R2011068580541110766565071208734', name: 'IMG_3094.GIF', width: 1668, height: 2388, mime: 'image/gif' },
      { hash: 'T2011068580596450998786199863582', name: 'IMG_3097.GIF', width: 1668, height: 2388, mime: 'image/gif' },
    ],
  },
  {
    slug: 'tarot',
    title: 'Tarot Drawing',
    description:
      'A personal tarot set exploring symbolism, emotion, intuition, desire, control, self-esteem, and chaos.',
    theme: 'Symbolic system',
    medium: 'Drawing series',
    year: '2020',
    cover: { hash: 'K2011122991666173134690932965662', name: '17938551532793946.jpg', width: 1440, height: 1687, mime: 'image/jpeg' },
    media: [
      { hash: 'K2011122991666173134690932965662', name: '17938551532793946.jpg', width: 1440, height: 1687, mime: 'image/jpeg' },
      { hash: 'C2011122991684619878764642517278', name: '18270674368048987.jpg', width: 1440, height: 1687, mime: 'image/jpeg' },
      { hash: 'F2011122991352578485437870588190', name: '17894812040416437.jpg', width: 1440, height: 1687, mime: 'image/jpeg' },
      { hash: 'I2011122991703066622838352068894', name: 'IMG_9164.JPG', width: 6613, height: 3288, mime: 'image/jpeg' },
    ],
  },
  {
    slug: 'autonomous-archive',
    title: 'Autonomous Archive',
    description:
      'Notebook excerpts combining illustration and writing around self-identity, growth, and social observation.',
    theme: 'Personal archive',
    medium: 'Notebook excerpts',
    year: '2020',
    cover: { hash: 'E2011190869560045353369308709150', name: '8.jpg', width: 7066, height: 2480, mime: 'image/jpeg' },
    media: [
      { hash: 'E2011190869560045353369308709150', name: '8.jpg', width: 7066, height: 2480, mime: 'image/jpeg' },
      { hash: 'R2011190869154216983747698573598', name: '7.jpg', width: 3985, height: 2480, mime: 'image/jpeg' },
      { hash: 'S2011190869578492097443018260766', name: '9.jpg', width: 3106, height: 2480, mime: 'image/jpeg' },
    ],
  },
];

const cargoAssetUrl = (media: CargoMedia, width = 1600) =>
  `https://freight.cargo.site/w/${width}/i/${media.hash}/${encodeURIComponent(media.name)}`;

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
            <a className="illustration-index-card" href={`/illustration/${project.slug}`} key={project.slug}>
              <figure>
                <img
                  src={cargoAssetUrl(project.cover, project.cover.mime === 'image/gif' ? 760 : 1400)}
                  alt={`${project.title} preview`}
                  loading="lazy"
                />
              </figure>
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
        <figure className="illustration-feature-media">
          <button
            className="zoomable-image-trigger"
            type="button"
            onClick={() => setLightboxImage({
              src: cargoAssetUrl(featuredMedia, 1800),
              alt: `${project.title} featured artwork`,
            })}
            aria-label={`Open image preview: ${project.title} featured artwork`}
          >
            <img
              src={cargoAssetUrl(featuredMedia, 1800)}
              alt={`${project.title} featured artwork`}
              loading="eager"
            />
          </button>
        </figure>
      ) : null}

      <section className="illustration-project-gallery illustration-detail-gallery" aria-label={`${project.title} artworks`}>
        {galleryMedia.map((media, index) => (
          <figure className="illustration-project-media" key={`${project.slug}-${media.hash}-${index}`}>
            <button
              className="zoomable-image-trigger"
              type="button"
              onClick={() => setLightboxImage({
                src: cargoAssetUrl(media, media.mime === 'image/gif' ? 760 : 1400),
                alt: `${project.title} artwork ${index + 1}`,
              })}
              aria-label={`Open image preview: ${project.title} artwork ${index + 1}`}
            >
              <img
                src={cargoAssetUrl(media, media.mime === 'image/gif' ? 760 : 1400)}
                alt={`${project.title} artwork ${index + 1}`}
                loading={index < 2 ? 'eager' : 'lazy'}
              />
            </button>
          </figure>
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
