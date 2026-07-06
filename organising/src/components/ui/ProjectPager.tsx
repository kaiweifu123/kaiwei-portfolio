/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

type ProjectPagerLink = {
  title: string;
  href: string;
};

type ProjectPagerProps = {
  previous: ProjectPagerLink;
  next: ProjectPagerLink;
  ariaLabel?: string;
};

export default function ProjectPager({
  previous,
  next,
  ariaLabel = 'Browse projects',
}: ProjectPagerProps) {
  return (
    <nav className="project-pager" aria-label={ariaLabel}>
      <a className="pager-link pager-link-previous" href={previous.href}>
        <span>Prev,</span>
        <strong>{previous.title}</strong>
      </a>
      <a className="pager-link pager-link-next" href={next.href}>
        <span>Next,</span>
        <strong>{next.title}</strong>
      </a>
    </nav>
  );
}
