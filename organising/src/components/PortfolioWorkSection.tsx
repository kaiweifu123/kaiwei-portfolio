/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Pill from './ui/Pill';
import { prefetchInternalHref, useInViewVideo, useMediaLoadedClass } from './ui/mediaLoading';

type PortfolioProject = {
  title: string;
  image: string;
  video?: string;
  description: string;
  highlights?: string[];
  tags: string[];
  href: string;
};

type PortfolioWorkSectionProps = {
  title?: string;
  description?: string;
  id?: string;
};

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const renderProjectDescription = (project: PortfolioProject) => {
  if (!project.highlights?.length) {
    return project.description;
  }

  const highlightPattern = new RegExp(`(${project.highlights.map(escapeRegExp).join('|')})`, 'g');

  return project.description.split(highlightPattern).map((part, index) =>
    project.highlights?.includes(part) ? <em key={`${project.title}-${index}`}>{part}</em> : part,
  );
};

const portfolioProjects: PortfolioProject[] = [
  {
    title: 'Launchpad Platform',
    image: '/case-assets/launchpad.jpg',
    video: '/case-assets/launchpad.mp4',
    description: 'An AI powered infrastructure builder generating $8m+ in monthly revenue',
    highlights: ['$8m+'],
    tags: ['SaaS', 'AI', 'Telehealthcare', 'Strategy'],
    href: '/preview.html',
  },
  {
    title: 'White-label Design Systems for the AI Era',
    image: '/case-assets/design-system-cover.jpg',
    description: 'A governed design system for scalable, AI-generated white-label websites.',
    highlights: ['governed design system', 'AI-generated'],
    tags: ['Design Systems', 'AI', 'White-label', 'Healthcare'],
    href: '/case/design-system/',
  },
  {
    title: 'Patient CRM',
    image: '/case-assets/crm.png',
    video: '/case-assets/crm-card.mp4',
    description: 'A telehealth CRM that unifies fragmented workflows, reducing hours of manual work to seconds.',
    highlights: ['hours', 'seconds'],
    tags: ['SaaS', 'CRM', 'Telehealthcare', 'Strategy', 'Multi-role UX'],
    href: '/patient-crm/',
  },
  {
    title: 'Hireable AI CV Builder',
    image: '/case-assets/hireable-cover.jpg',
    video: '/case-assets/hireable-cover.mp4',
    description: 'Won £120k+ investment with a prototype of a resume builder.',
    highlights: ['£120k+'],
    tags: ['Product Design', 'SaaS', 'AI'],
    href: '/case/hireable/',
  },
  {
    title: 'Reading Rep Online Giving',
    image: '/case-assets/reading-rep.jpg',
    video: '/case-assets/reading-rep-cover.mp4',
    description: 'Online giving flow that increased donation rate by +28%.',
    highlights: ['+28%'],
    tags: ['Website', 'Donation Flow'],
    href: '/case/reading-rep/',
  },
  {
    title: 'Ohisama Sushi Digital Menu',
    image: '/case-assets/ohisama.jpg',
    description: 'Digital menu shaped by service observation and hospitality constraints.',
    tags: ['Product Design', 'Mobile', 'Hospitality'],
    href: '/case/ohisama/',
  },
  {
    title: 'The Future of TfL Go',
    image: '/case-assets/tfl-go.png',
    video: '/case-assets/tfl-go.mov',
    description: 'Mobile travel concept for journey clarity, guidance, and accessibility.',
    tags: ['Product Design', 'Mobile', 'Transport'],
    href: '/case/tfl-go/',
  },
];

export default function PortfolioWorkSection({
  title = 'Select Work',
  description = 'Projects across enterprise, nonprofits, and startups.',
  id = 'work',
}: PortfolioWorkSectionProps) {
  return (
    <section className="work-section selected-work" id={id} aria-label={title}>
      <aside className="work-sidebar">
        <div className="work-sidebar-panel selected-work-intro">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </aside>

      <main className="work-content">
        {portfolioProjects.map((project) => (
          <a
            className="selected-work-card"
            href={project.href}
            key={project.title}
            onMouseEnter={() => prefetchInternalHref(project.href)}
            onTouchStart={() => prefetchInternalHref(project.href)}
          >
            <figure className={`project-media project-media-${project.title.toLowerCase().replaceAll(' ', '-')}`}>
              <WorkCardMedia project={project} />
            </figure>
            <h3>{project.title}</h3>
            <p className="project-description">
              {renderProjectDescription(project)}
            </p>
            <ul className="project-tags" aria-label={`${project.title} tags`}>
              {project.tags.map((tag) => (
                <li key={tag}>
                  <Pill variant="home">{tag}</Pill>
                </li>
              ))}
            </ul>
          </a>
        ))}
      </main>
    </section>
  );
}

function WorkCardMedia({ project }: { project: PortfolioProject }) {
  const videoRef = useInViewVideo<HTMLVideoElement>(Boolean(project.video));
  const mediaLoaded = useMediaLoadedClass();

  if (project.video) {
    return (
      <video
        ref={videoRef}
        src={project.video}
        poster={project.image}
        aria-label={`${project.title} case study preview`}
        muted
        loop
        playsInline
        preload="none"
        className={`media-fade ${mediaLoaded.className}`.trim()}
        onLoadedData={mediaLoaded.onLoadedData}
      />
    );
  }

  return (
    <img
      src={project.image}
      alt={`${project.title} case study preview`}
      loading="lazy"
      decoding="async"
      className={`media-fade ${mediaLoaded.className}`.trim()}
      onLoad={mediaLoaded.onLoad}
    />
  );
}
