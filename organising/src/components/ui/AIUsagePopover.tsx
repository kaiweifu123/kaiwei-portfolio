/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useId, useRef, useState } from 'react';
import { Blocks, BookOpen, Braces, Compass, GitBranch, LayoutGrid, MessageSquareText, Mic, Palette, Presentation, RefreshCw, Scale, Sparkle, Telescope, Users, Workflow, X } from 'lucide-react';

export type AIUsageItem = {
  kind: 'market' | 'competitor' | 'affinity' | 'documentation' | 'concept' | 'exploration' | 'iteration' | 'inspiration' | 'operations' | 'system' | 'feedback' | 'knowledge' | 'directions' | 'tokens' | 'collaboration';
  title: string;
  description: string;
  tool: string;
  mark: string;
};

type AIUsagePopoverProps = {
  items: AIUsageItem[];
  label?: string;
};

const icons = {
  market: Telescope,
  competitor: Scale,
  affinity: LayoutGrid,
  documentation: Mic,
  concept: Presentation,
  exploration: Palette,
  iteration: RefreshCw,
  inspiration: Compass,
  operations: Workflow,
  system: Blocks,
  feedback: MessageSquareText,
  knowledge: BookOpen,
  directions: GitBranch,
  tokens: Braces,
  collaboration: Users,
};

export default function AIUsagePopover({ items, label = 'How AI was used here' }: AIUsagePopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const popoverId = useId();

  const cancelClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openPopover = () => {
    cancelClose();
    setIsOpen(true);
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimerRef.current = setTimeout(() => setIsOpen(false), 180);
  };

  const closePopover = () => {
    cancelClose();
    setIsOpen(false);
  };

  useEffect(() => () => cancelClose(), []);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!anchorRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      className="ai-usage-anchor"
      ref={anchorRef}
      onMouseEnter={openPopover}
      onMouseLeave={scheduleClose}
    >
      <button
        className="ai-usage-trigger"
        type="button"
        data-sound="sparkle"
        aria-label={label}
        aria-expanded={isOpen}
        aria-controls={popoverId}
        aria-haspopup="dialog"
        onClick={() => {
          cancelClose();
          setIsOpen((current) => !current);
        }}
      >
        <Sparkle aria-hidden="true" />
      </button>

      {isOpen ? (
        <div className="ai-usage-popover" id={popoverId} role="dialog" aria-label={label}>
          <div className="ai-usage-popover-header">
            <p className="case-section-label">{label}</p>
            <button className="ai-usage-close" type="button" aria-label="Close AI usage details" onClick={closePopover}>
              <X aria-hidden="true" />
            </button>
          </div>

          <div className="ai-usage-grid">
            {items.map((item) => {
              const Icon = icons[item.kind];
              return (
                <article className="ai-usage-card" key={item.title}>
                  <span className="ai-usage-card-icon" aria-hidden="true"><Icon /></span>
                  <h3 className="case-card-title">{item.title}</h3>
                  <p className="case-card-body">{item.description}</p>
                  <div className="ai-usage-tool">
                    <span className={`ai-usage-tool-mark ai-usage-tool-mark--${item.kind}`} aria-hidden="true">{item.mark}</span>
                    <span className="case-caption-copy">{item.tool}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
