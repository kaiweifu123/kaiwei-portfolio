/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ArrowDown,
  ArrowLeftRight,
  ArrowUp,
  ArrowUpRight,
  Clock3,
  Eye,
  Grid2X2,
  Map,
  RotateCcw,
  Target,
  TrendingUp,
  UserCheck,
} from 'lucide-react';
import Card from './Card';
import Callout from './Callout';
import CaseSegmentTabs from './CaseSegmentTabs';
import Lightbox from './Lightbox';

export interface CaseStudyCardItem {
  label: string;
  title: string;
  body: string;
  videoSrc?: string;
}

export interface CaseStudyPainPoint {
  percentage?: string;
  painPoint: string;
  designDecision: string;
  description: string;
  category: string;
}

export interface CaseStudyMetric {
  title: string;
  badge: string;
}

export interface CaseStudyReviewQuote {
  quote: string;
  name: string;
  role: string;
}

function normalizePainPointLabel(label: string) {
  const labels: Record<string, string> = {
    'Multiple System Switching': 'System switching',
    'Fragmented Patient Data': 'Fragmented data',
    'Unsynced Data': 'Unsynced status',
    'Unable to Resolve Directly': "Can't resolve directly",
  };

  return labels[label] ?? label;
}

function normalizeSuccessLabel(label: string) {
  const labels: Record<string, string> = {
    'Time spent piecing information together': 'Time piecing info',
    'Identification of blockers': 'Identify blockers',
    'Understanding of current patient status': 'Patient status clarity',
    'Confidence in deciding next actions': 'Decision confidence',
  };

  return labels[label] ?? label;
}

const painPointIcons = [ArrowLeftRight, Grid2X2, RotateCcw, ArrowUpRight];
const successCriteriaIcons = [Clock3, Target, UserCheck, TrendingUp];
const principleIcons = [Map, Eye, Target];

export interface ContextMediaExtensionProps {
  intro: React.ReactNode;
  stripImage: {
    src: string;
    alt: string;
  };
  detailCopy: React.ReactNode;
  detailImage: {
    src: string;
    alt: string;
  };
  closing: React.ReactNode;
}

export function ContextMediaExtension({
  intro,
  stripImage,
  detailCopy,
  detailImage,
  closing,
}: ContextMediaExtensionProps) {
  return (
    <div className="case-narrative-flow">
      <p className="case-body-copy">{intro}</p>

      <img
        src={stripImage.src}
        alt={stripImage.alt}
        className="case-context-media-strip"
      />

      <div className="case-context-media-explain">
        <div className="case-body-copy case-paragraph-stack">{detailCopy}</div>

        <img
          src={detailImage.src}
          alt={detailImage.alt}
          className="case-context-media-detail-image"
        />
      </div>

      <p className="case-body-copy">{closing}</p>
    </div>
  );
}

export function CaseStudyCardGrid({
  items,
  columns = 'md:grid-cols-2',
}: {
  items: CaseStudyCardItem[];
  columns?: string;
}) {
  return (
    <div className={`grid grid-cols-1 gap-[var(--space-section-body-element)] ${columns}`}>
      {items.map((item) => (
        <Card key={`${item.label}-${item.title}`} className="p-[var(--space-card-lg)]">
          <span className="case-caption-label block">{item.label}</span>
          <h3 className="case-card-title mt-[var(--space-text-stack)]">{item.title}</h3>
          {item.body ? (
            <p className="case-card-body mt-[var(--space-text-stack)]">{item.body}</p>
          ) : null}
        </Card>
      ))}
    </div>
  );
}

export function ResearchMethodCards({ items }: { items: CaseStudyCardItem[] }) {
  return (
    <div className="case-research-methods">
      {items.map((item, index) => (
        <Card
          key={`${item.label}-${item.title}`}
          className={`case-research-method-card ${index === 0 ? 'is-active' : ''}`}
        >
          <span className="case-research-method-index">{item.label}</span>
          <h3 className="case-research-method-title">{item.title}</h3>
        </Card>
      ))}
    </div>
  );
}

export function ResearchSummaryPanel({
  methods,
  painPoints,
  successCriteria,
  principles,
  quote,
}: {
  methods: CaseStudyCardItem[];
  painPoints: CaseStudyPainPoint[];
  successCriteria: CaseStudyMetric[];
  principles: CaseStudyCardItem[];
  quote: string;
}) {
  return (
    <section className="case-visual-block case-research-summary-panel">
      <div className="case-research-summary-inner">
        <div className="case-research-summary-group">
          <span className="case-caption-label block">Research methods</span>
          <div className="case-stat-row">
            {methods.map((item) => (
              <div key={item.title} className="case-stat-card">
                <div className="case-stat-number">{item.label}</div>
                <div className="case-stat-label">{item.title}</div>
              </div>
            ))}
          </div>
        </div>

        <blockquote className="case-research-summary-quote">
          <p>"{quote}"</p>
        </blockquote>

        <div className="case-research-summary-group">
          <span className="case-caption-label block">Pain points</span>
          <div className="case-pain-bars">
            {painPoints.map((item, index) => {
              const value = Number.parseFloat(item.percentage ?? '0');
              const Icon = painPointIcons[index % painPointIcons.length];

              return (
                <div
                  className="case-pain-bar-row"
                  key={item.painPoint}
                  style={{ '--pain-value': value } as React.CSSProperties}
                >
                  <span className="case-research-icon case-research-icon-primary" aria-hidden="true">
                    <Icon size={18} strokeWidth={2} />
                  </span>
                  <span className="case-pain-bar-label">{normalizePainPointLabel(item.painPoint)}</span>
                  <span className="case-pain-bar-track" aria-hidden="true">
                    <span className="case-pain-bar-fill" />
                  </span>
                  <span className="case-pain-bar-value">{item.percentage}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="case-research-summary-group">
          <span className="case-caption-label block">Success criteria</span>
          <div className="case-success-criteria-row">
            {successCriteria.map((item, index) => {
              const isReduced = item.badge.toLowerCase().includes('reduced');
              const Icon = successCriteriaIcons[index % successCriteriaIcons.length];

              return (
                <Card key={item.title} className="case-success-criterion-card">
                  <span className={`case-research-icon ${isReduced ? 'case-research-icon-primary' : 'case-research-icon-success'}`} aria-hidden="true">
                    <Icon size={20} strokeWidth={2} />
                  </span>
                  <span className={`case-success-arrow ${isReduced ? 'is-reduced' : 'is-increased'}`} aria-hidden="true">
                    {isReduced ? <ArrowDown size={24} strokeWidth={2} /> : <ArrowUp size={24} strokeWidth={2} />}
                  </span>
                  <span className="case-success-criterion-title">{normalizeSuccessLabel(item.title)}</span>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="case-research-summary-group">
          <span className="case-caption-label block">Design principles</span>
          <div className="case-design-principle-row">
            {principles.map((item, index) => {
              const Icon = principleIcons[index % principleIcons.length];

              return (
              <Card key={item.title} className="case-design-principle-card">
                <span className="case-research-icon case-research-icon-primary" aria-hidden="true">
                  <Icon size={22} strokeWidth={2} />
                </span>
                <h4>{item.title}</h4>
              </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function DesignProcessTabs({
  reviewerQuote,
  processImages,
}: {
  reviewerQuote?: CaseStudyReviewQuote;
  processImages?: {
    organizing?: { type?: 'image' | 'video'; src: string; alt: string };
    workflow?: { type?: 'image' | 'video'; src: string; alt: string };
    prototype?: { type?: 'image' | 'video'; src: string; alt: string };
  };
}) {
  const [activeTab, setActiveTab] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);
  const tabs = [
    { id: 'organizing', number: '01', label: 'Organizing info' },
    { id: 'workflow', number: '02', label: 'Workflow structure' },
    { id: 'prototype', number: '03', label: 'AI prototyping' },
    { id: 'refinement', number: '04', label: 'Refinement' },
  ];
  const renderProcessFigure = (media?: { type?: 'image' | 'video'; src: string; alt: string }) =>
    media ? (
      <figure className="case-design-process-figure">
        {media.type === 'video' ? (
          <video
            src={media.src}
            aria-label={media.alt}
            controls
            muted
            loop
            playsInline
          />
        ) : (
          <button
            className="zoomable-image-trigger"
            type="button"
            onClick={() => setLightboxImage({ src: media.src, alt: media.alt })}
            aria-label={`Open image preview: ${media.alt}`}
          >
            <img src={media.src} alt={media.alt} />
          </button>
        )}
      </figure>
    ) : null;

  return (
    <section className="case-card case-visual-block case-design-process-tabs overflow-hidden">
      <CaseSegmentTabs items={tabs} activeIndex={activeTab} onChange={setActiveTab} />
      <div className="case-design-process-body">
        {activeTab === 0 ? (
          <div className="case-narrative-flow">
            <span className="case-caption-label block">Step 1</span>
            <h3 className="case-design-process-title">Organizing the information</h3>
            <p className="case-card-support">
              We grouped patient information around what agents needed to understand and decide first.
            </p>
            {renderProcessFigure(processImages?.organizing)}
          </div>
        ) : null}

        {activeTab === 1 ? (
          <div className="case-narrative-flow">
            <span className="case-caption-label block">Step 2</span>
            <h3 className="case-design-process-title">Structuring manager workflows</h3>
            <p className="case-card-support">
              The workflow view had to show where work was overloaded, why it was stuck, and where support could move next.
            </p>
            {renderProcessFigure(processImages?.workflow)}
          </div>
        ) : null}

        {activeTab === 2 ? (
          <div className="case-narrative-flow">
            <span className="case-caption-label block">Step 3</span>
            <h3 className="case-design-process-title">Using AI prototyping to compare directions</h3>
            <p className="case-card-support">
              Instead of a long research cycle, we rapidly compared a workflow-first escalation tracker against a traditional chart view.
            </p>
            {renderProcessFigure(processImages?.prototype)}
            {reviewerQuote ? <ReviewerQuoteCard {...reviewerQuote} /> : null}
          </div>
        ) : null}

        {activeTab === 3 ? (
          <div className="case-narrative-flow">
            <span className="case-caption-label block">Step 4</span>
            <h3 className="case-design-process-title">refinement</h3>
            <span className="case-caption-label block">Operational feedback & evolution</span>
            <p className="case-card-support">
              Once the system entered real workflows, the structure continued evolving based on operational feedback,
              changing priorities, and real support behaviors.
            </p>
          </div>
        ) : null}
      </div>
      {lightboxImage ? (
        <Lightbox
          src={lightboxImage.src}
          alt={lightboxImage.alt}
          onClose={() => setLightboxImage(null)}
        />
      ) : null}
    </section>
  );
}

export function PainPointDecisionMatrix({ items }: { items: CaseStudyPainPoint[] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="case-narrative-flow">
      <div className="flex items-center justify-between gap-[var(--space-section-body-element)]">
        <span className="case-caption-label block">Pain points to design decisions</span>
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="case-display-button"
        >
          {expanded ? 'Collapse details' : 'Show details'}
        </button>
      </div>
      <div className="case-display-grid">
        {items.map((item) => (
          <Card key={item.painPoint} className="overflow-hidden">
            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              className="case-pain-card"
            >
              <div className="flex items-start gap-[var(--space-section-body-element)]">
                {item.percentage ? (
                  <span className="case-badge case-badge-neutral">{item.percentage}</span>
                ) : null}
                <div>
                  <h3 className="case-card-title">
                    {item.painPoint}
                    <span className="px-[var(--space-xs)] text-[var(--text-tertiary)]">→</span>
                    <span className="text-[var(--text-tertiary)]">{item.designDecision}</span>
                  </h3>
                  <span className="case-caption-label mt-[var(--space-text-stack)] block">{item.category}</span>
                </div>
              </div>
            </button>
            {expanded ? (
              <div className="case-pain-detail">
                <span className="case-caption-label block">Case analysis details</span>
                <p className="case-card-body mt-[var(--space-text-stack)]">{item.description}</p>
              </div>
            ) : null}
          </Card>
        ))}
      </div>
    </div>
  );
}

export function SuccessCriteriaPanel({
  items,
  label = 'Success criteria',
}: {
  items: CaseStudyMetric[];
  label?: string;
}) {
  const badgeClassName = label.toLowerCase().includes('outcome') ? 'case-badge-success' : 'case-badge-primary';

  return (
    <div className="case-narrative-flow">
      <span className="case-caption-label block">{label}</span>
      <div className="case-display-grid">
        {items.map((item) => (
          <Card key={item.title} className="p-[var(--space-card-lg)]">
            <h3 className="case-card-title">{item.title}</h3>
            <span className={`case-badge ${badgeClassName} mt-[var(--space-section-body-element)]`}>{item.badge}</span>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function ConceptDirectionToggle({ items }: { items: CaseStudyCardItem[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = items[selectedIndex];

  return (
    <div className="case-display-panel">
      <div className="case-display-panel-header">
        <span className="case-caption-label block">Concept comparison</span>
        <div className="case-display-toggle">
          {items.map((item, index) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={`case-display-toggle-button ${selectedIndex === index ? 'active' : ''}`}
              aria-pressed={selectedIndex === index}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="case-display-panel-body case-narrative-flow">
        <span className="case-caption-label block">{selected.body}</span>
        <h3 className="case-card-title">{selected.title}</h3>
        {selected.videoSrc ? (
          <video
            src={selected.videoSrc}
            className="case-concept-preview-video"
            controls
            muted
            loop
            playsInline
          />
        ) : (
          <div className="case-concept-preview">
            {selectedIndex === 0 ? (
              <div className="case-card-body flex flex-wrap items-center gap-[var(--space-sm)]">
                <span className="case-badge case-badge-neutral">01 Checked out</span>
                <span>→</span>
                <span className="case-badge case-badge-primary">02 Review blocked</span>
                <span>→</span>
                <span className="case-badge case-badge-neutral">03 Dispatched</span>
              </div>
            ) : (
              <div className="case-card-body space-y-[var(--space-text-stack)]">
                <p className="flex justify-between gap-[var(--space-section-body-element)]">
                  <span>Avg resolution count</span>
                  <strong>12.4h delay index</strong>
                </p>
                <p className="flex justify-between gap-[var(--space-section-body-element)]">
                  <span>Ticket volume metrics</span>
                  <strong>1,540 total nodes / cycle</strong>
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function ReviewerQuoteCard({ quote, name, role }: CaseStudyReviewQuote) {
  return (
    <Callout variant="quote" className="case-review-quote">
      <span className="case-caption-label block">Concept testing feedback</span>
      <p className="case-body-copy mt-[var(--space-section-body-element)] italic">"{quote}"</p>
      <div className="mt-[var(--space-section-body-element)]">
        <h3 className="case-card-title">{name}</h3>
        <p className="case-card-body mt-[var(--space-text-stack)]">{role}</p>
      </div>
    </Callout>
  );
}

export function VideoShowcase({
  src,
  label = 'The final design',
  showLabel = true,
}: {
  src: string;
  label?: string;
  showLabel?: boolean;
}) {
  return (
    <div className="case-narrative-flow">
      {showLabel ? (
        <div className="case-section-divider" role="presentation">
          <span>{label}</span>
        </div>
      ) : null}
      <div className="case-showcase-media">
        <video
          src={src}
          className="case-showcase-video"
          controls
          muted
          loop
          playsInline
        />
      </div>
    </div>
  );
}
