/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Pill from './ui/Pill';

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
    description: 'an ai powered infrastructure builder generating $8m+ in monthly revenue',
    highlights: ['$8m+'],
    tags: ['SaaS', 'AI', 'Telehealthcare', 'Strategy'],
    href: '/preview.html',
  },
  {
    title: 'Patient CRM',
    image: '/case-assets/crm.png',
    video: '/case-assets/crm-card.mp4',
    description: 'A telehealth CRM that unifies fragmented workflows, reducing hours of manual work to seconds.',
    highlights: ['hours', 'seconds'],
    tags: ['SaaS', 'CRM', 'Telehealthcare', 'Strategy'],
    href: '/patient-crm/',
  },
  {
    title: 'Hireable AI CV Builder',
    image: '/case-assets/hireable-cover.gif',
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
  description = 'Projects across startups, nonprofits, and enterprise.',
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
          <a className="selected-work-card" href={project.href} key={project.title}>
            <figure className={`project-media project-media-${project.title.toLowerCase().replaceAll(' ', '-')}`}>
              {project.video ? (
                <video
                  src={project.video}
                  poster={project.image}
                  aria-label={`${project.title} case study preview`}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img src={project.image} alt={`${project.title} case study preview`} />
              )}
            </figure>
            <h3>{project.title}</h3>
            <p className="project-description">
              {renderProjectDescription(project)}
            </p>
            <ul className="project-tags" aria-label={`${project.title} tags`}>
              {project.tags.map((tag) => (
                <li key={tag}>
                  <Pill>{tag}</Pill>
                </li>
              ))}
            </ul>
          </a>
        ))}
      </main>
    </section>
  );
}
