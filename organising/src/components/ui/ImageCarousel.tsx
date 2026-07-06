/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface ImageCarouselProps {
  images: string[];
  activeIndex: number;
  onChange: (index: number) => void;
  alt: (index: number) => string;
  outerClassName?: string;
  frameClassName?: string;
  imageClassName?: string;
  dotsClassName?: string;
}

export default function ImageCarousel({
  images,
  activeIndex,
  onChange,
  alt,
  outerClassName = 'mx-auto w-full',
  frameClassName = 'relative overflow-hidden border border-[var(--border-frame-color)] bg-[var(--surface-base)] p-[var(--space-component)]',
  imageClassName = 'w-full object-contain',
  dotsClassName = 'mt-[var(--space-sm)] flex items-center justify-center gap-[var(--space-inline)]',
}: ImageCarouselProps) {
  if (!images.length) return null;

  const safeIndex = Math.min(activeIndex, images.length - 1);
  const hasMultipleImages = images.length > 1;

  return (
    <div className={outerClassName}>
      <div className={frameClassName}>
        <img
          src={images[safeIndex]}
          alt={alt(safeIndex)}
          className={imageClassName}
        />
        {hasMultipleImages && (
          <>
            <button
              type="button"
              onClick={() => onChange((safeIndex - 1 + images.length) % images.length)}
              className="case-carousel-control case-carousel-control-left"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => onChange((safeIndex + 1) % images.length)}
              className="case-carousel-control case-carousel-control-right"
              aria-label="Next image"
            >
              ›
            </button>
          </>
        )}
      </div>
      {hasMultipleImages && (
        <div className={dotsClassName}>
          {images.map((image, imageIndex) => (
            <button
              key={image}
              type="button"
              onClick={() => onChange(imageIndex)}
              className={`h-1.5 rounded-[var(--radius-pill)] transition-all ${
                safeIndex === imageIndex ? 'w-6 bg-[var(--color-primary)]' : 'w-1.5 bg-[var(--text-faint)]'
              }`}
              aria-label={`Show image ${imageIndex + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
