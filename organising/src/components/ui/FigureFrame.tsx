/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Lightbox from './Lightbox';
import { isVideoSource, useInViewVideo, useMediaLoadedClass } from './mediaLoading';

interface FigureFrameProps {
  src: string;
  alt: string;
  wrapperClassName?: string;
  frameClassName?: string;
  imageClassName?: string;
  videoPreload?: React.VideoHTMLAttributes<HTMLVideoElement>['preload'];
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
  videoPreload = 'none',
  caption,
  referrerPolicy,
  variant = 'default',
}: FigureFrameProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const videoRef = useInViewVideo<HTMLVideoElement>(isVideoSource(src));
  const mediaLoaded = useMediaLoadedClass();
  const resolvedFrameClassName = frameClassName === ''
    ? ''
    : variant === 'flush'
      ? 'media-skeleton relative w-full overflow-hidden rounded-[var(--radius-md)] bg-[var(--surface-base)]'
      : `media-skeleton ${frameClassName}`;

  const media = isVideoSource(src) ? (
    <video
      ref={videoRef}
      src={src}
      aria-label={alt}
      className={`${imageClassName} media-fade ${mediaLoaded.className}`.trim()}
      muted
      loop
      playsInline
      preload={videoPreload}
      onLoadedData={mediaLoaded.onLoadedData}
    />
  ) : (
    <button className="zoomable-image-trigger" type="button" onClick={() => setIsLightboxOpen(true)} aria-label={`Open image preview: ${alt}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy={referrerPolicy}
        className={`${imageClassName} media-fade ${mediaLoaded.className}`.trim()}
        loading="lazy"
        decoding="async"
        onLoad={mediaLoaded.onLoad}
      />
    </button>
  );

  return (
    <div className={wrapperClassName}>
      {resolvedFrameClassName ? <div className={resolvedFrameClassName}>{media}</div> : media}
      {caption}
      {isLightboxOpen ? <Lightbox src={src} alt={alt} onClose={() => setIsLightboxOpen(false)} /> : null}
    </div>
  );
}
