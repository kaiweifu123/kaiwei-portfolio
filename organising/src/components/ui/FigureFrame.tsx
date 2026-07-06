/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Lightbox from './Lightbox';

interface FigureFrameProps {
  src: string;
  alt: string;
  wrapperClassName?: string;
  frameClassName?: string;
  imageClassName?: string;
  caption?: React.ReactNode;
  referrerPolicy?: React.ImgHTMLAttributes<HTMLImageElement>['referrerPolicy'];
  variant?: 'default' | 'flush';
}

export default function FigureFrame({
  src,
  alt,
  wrapperClassName,
  frameClassName = 'overflow-hidden border border-[var(--border-frame-color)] bg-[var(--surface-base)]',
  imageClassName = 'block w-full',
  caption,
  referrerPolicy,
  variant = 'default',
}: FigureFrameProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const resolvedFrameClassName = variant === 'flush'
    ? 'relative w-full overflow-hidden rounded-[var(--radius-md)] bg-[var(--surface-base)]'
    : frameClassName;

  const image = (
    <button className="zoomable-image-trigger" type="button" onClick={() => setIsLightboxOpen(true)} aria-label={`Open image preview: ${alt}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy={referrerPolicy}
        className={imageClassName}
      />
    </button>
  );

  return (
    <div className={wrapperClassName}>
      {resolvedFrameClassName ? <div className={resolvedFrameClassName}>{image}</div> : image}
      {caption}
      {isLightboxOpen ? <Lightbox src={src} alt={alt} onClose={() => setIsLightboxOpen(false)} /> : null}
    </div>
  );
}
