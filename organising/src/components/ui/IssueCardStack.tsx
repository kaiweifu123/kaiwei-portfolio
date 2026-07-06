/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';

export interface Issue {
  id: number;
  title: string;
}

interface IssueCardStackProps {
  issues: Issue[];
  className?: string;
}

const visibleStackSize = 5;
const dismissDurationMs = 260;
const restackDurationMs = 380;

export default function IssueCardStack({ issues, className }: IssueCardStackProps) {
  const [current, setCurrent] = useState(0);
  const [dismissing, setDismissing] = useState(false);
  const animatingRef = useRef(false);

  if (issues.length === 0) {
    return null;
  }

  const total = issues.length;
  const currentIssue = issues[current];

  const advance = () => {
    if (animatingRef.current) return;

    animatingRef.current = true;
    setDismissing(true);

    window.setTimeout(() => {
      setCurrent((value) => (value + 1) % total);
      setDismissing(false);
    }, dismissDurationMs);

    window.setTimeout(() => {
      animatingRef.current = false;
    }, dismissDurationMs + restackDurationMs);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;

    event.preventDefault();
    advance();
  };

  return (
    <section aria-label="CMO issues" className={`case-issue-stack ${className ?? ''}`}>
      <div className="case-issue-stack-scene">
        <IssueCard issue={currentIssue} currentPosition={current + 1} total={total} isSizer />

        {issues.map((issue, index) => {
          const rank = (index - current + total) % total;
          const isFront = rank === 0;
          const isVisible = rank < visibleStackSize;

          return (
            <IssueCard
              key={issue.id}
              issue={issue}
              currentPosition={rank + 1}
              total={total}
              rank={rank}
              isFront={isFront}
              isDismissing={isFront && dismissing}
              isVisible={isVisible}
              onClick={isFront ? advance : undefined}
              onKeyDown={isFront ? handleKeyDown : undefined}
            />
          );
        })}
      </div>
    </section>
  );
}

interface IssueCardProps {
  key?: React.Key;
  issue: Issue;
  currentPosition: number;
  total: number;
  rank?: number;
  isFront?: boolean;
  isDismissing?: boolean;
  isVisible?: boolean;
  isSizer?: boolean;
  onClick?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

function IssueCard({
  issue,
  currentPosition,
  total,
  rank = 0,
  isFront = false,
  isDismissing = false,
  isVisible = true,
  isSizer = false,
  onClick,
  onKeyDown,
}: IssueCardProps) {
  const style = isSizer
    ? undefined
    : ({
        '--issue-card-rank': rank,
        '--issue-card-scale': 1 - 0.035 * rank,
        '--issue-card-opacity': isVisible ? 1 : 0,
        '--issue-card-z': total - rank,
      } as React.CSSProperties);

  const className = [
    'case-issue-card',
    isFront ? 'is-front' : '',
    isDismissing ? 'is-dismissing' : '',
    isSizer ? 'is-sizer' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const footerText = currentPosition === total ? 'all done' : 'tap to continue ->';

  return (
    <div
      className={className}
      style={style}
      role={isFront ? 'button' : undefined}
      tabIndex={isFront ? 0 : undefined}
      aria-label={isFront ? `Issue ${issue.id}: ${issue.title} - press to see next` : undefined}
      aria-hidden={isSizer || !isFront ? true : undefined}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <p className="case-caption-label case-issue-card-label">Issue {issue.id}</p>
      <h3 className="case-card-title">{issue.title}</h3>

      {(isFront || isSizer) && (
        <div className="case-issue-card-footer">
          <span>{footerText}</span>
          <span>
            {currentPosition} / {total}
          </span>
        </div>
      )}
    </div>
  );
}
