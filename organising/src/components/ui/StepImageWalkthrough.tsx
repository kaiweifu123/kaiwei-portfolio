/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import CaseSegmentTabs from './CaseSegmentTabs';
import Lightbox from './Lightbox';
import { PillTabItem } from './PillTabs';

export interface StepImageWalkthroughStep extends PillTabItem {
  title: string;
  description: string;
}

export interface StepImageWalkthroughSupportLayer {
  title: string;
  items: string[];
}

interface StepImageWalkthroughProps {
  title?: string;
  supportLayers?: StepImageWalkthroughSupportLayer[];
  steps: StepImageWalkthroughStep[];
  activeIndex: number;
  onChange: (index: number) => void;
  images: string[];
  imageCaptions?: string[];
  imageAlt: (imageIndex: number) => string;
  imageClassName?: string;
}

export default function StepImageWalkthrough({
  title,
  supportLayers = [],
  steps,
  activeIndex,
  onChange,
  images,
  imageCaptions = [],
  imageAlt,
  imageClassName = 'block w-full h-auto',
}: StepImageWalkthroughProps) {
  const activeStep = steps[activeIndex];
  const hasSupportLayerTabs = supportLayers.length > 0;
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);

  return (
    <div className="case-card w-full max-w-full overflow-hidden">
      {title && (
        <div className="border-b border-[var(--border-soft-color)] bg-[var(--surface-base)] px-[var(--space-card-lg)] py-[var(--space-lg)]">
          <h3 className="case-card-title">{title}</h3>
        </div>
      )}
      {supportLayers.length > 0 && (
        <div className="border-b border-[var(--border-soft-color)] bg-[var(--surface-10)] px-[var(--space-card-lg)] py-[var(--space-lg)]">
          <div className="grid gap-[var(--space-sm)]">
            <div className="rounded-[var(--radius-md)] border border-[var(--border-soft-color)] bg-[var(--surface-base)] px-[var(--space-md)] py-[var(--space-sm)] text-center">
              <span className="case-card-title">LaunchPad</span>
            </div>
            <div className="grid gap-[var(--space-sm)] sm:grid-cols-2 lg:grid-cols-4">
              {supportLayers.map((layer, index) => (
                <button
                  key={layer.title}
                  type="button"
                  onClick={() => onChange(index)}
                  aria-pressed={activeIndex === index}
                  className={`rounded-[var(--radius-md)] border px-[var(--space-sm)] py-[var(--space-sm)] text-left transition-colors ${
                    activeIndex === index
                      ? 'border-[var(--color-primary)] bg-[var(--surface-base)] shadow-[var(--shadow-card)]'
                      : 'border-[var(--border-soft-color)] bg-[var(--surface-base)] hover:border-[var(--color-primary)]'
                  }`}
                >
                  <span className="case-caption-copy block">{String(index + 1).padStart(2, '0')}</span>
                  <span className="case-card-support mt-[var(--space-xs)] block text-[var(--text-primary)]">{layer.title}</span>
                </button>
              ))}
            </div>
          </div>
          {/* Preserve the layer details for screen readers without duplicating the visual hierarchy. */}
          <ul className="sr-only">
            {supportLayers.map((layer, index) => (
              <li key={layer.title}>
                {String(index + 1).padStart(2, '0')} {layer.title}: {layer.items.join(', ')}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="border-b border-[var(--border-soft-color)] bg-[var(--surface-base)]">
        {!hasSupportLayerTabs && (
          <div className="bg-[var(--surface-panel)]">
            <CaseSegmentTabs
              items={steps}
              activeIndex={activeIndex}
              onChange={onChange}
            />
          </div>
        )}
        {activeStep && (
          <div className="px-[var(--space-card-lg)] py-[var(--space-lg)]">
            <p className="case-card-support">
              {activeStep.description}
            </p>
          </div>
        )}
      </div>

      <div className="bg-[var(--surface-base)]">
        {images.map((image, imageIndex) => {
          const caption = imageCaptions[imageIndex];

          return (
            <figure
              key={image}
              className={imageIndex > 0 ? 'border-t border-[var(--border-soft-color)]' : ''}
            >
              {caption && (
                <figcaption className="border-b border-[var(--border-soft-color)] bg-[var(--surface-10)] px-[var(--space-card-lg)] py-[var(--space-md)]">
                  <span className="case-caption-label">{caption}</span>
                </figcaption>
              )}
              <button
                className="zoomable-image-trigger"
                type="button"
                onClick={() => setLightboxImage({ src: image, alt: imageAlt(imageIndex) })}
                aria-label={`Open image preview: ${imageAlt(imageIndex)}`}
              >
                <img
                  src={image}
                  alt={imageAlt(imageIndex)}
                  className={imageClassName}
                />
              </button>
            </figure>
          );
        })}
      </div>
      {lightboxImage ? (
        <Lightbox
          src={lightboxImage.src}
          alt={lightboxImage.alt}
          onClose={() => setLightboxImage(null)}
        />
      ) : null}
    </div>
  );
}
