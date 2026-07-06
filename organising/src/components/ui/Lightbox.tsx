/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

type LightboxProps = {
  src: string;
  alt: string;
  onClose: () => void;
};

export default function Lightbox({ src, alt, onClose }: LightboxProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragState = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    isDragging: boolean;
  } | null>(null);
  const lastTapTime = useRef(0);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const toggleZoom = () => {
    setIsZoomed((current) => {
      if (current) {
        setPan({ x: 0, y: 0 });
      }

      return !current;
    });
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLImageElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragState.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: pan.x,
      originY: pan.y,
      isDragging: false,
    };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLImageElement>) => {
    const state = dragState.current;

    if (!state || state.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - state.startX;
    const deltaY = event.clientY - state.startY;

    if (isZoomed) {
      if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
        state.isDragging = true;
      }

      setPan({ x: state.originX + deltaX, y: state.originY + deltaY });
      return;
    }

    if (deltaY > 72 && Math.abs(deltaX) < 64) {
      state.isDragging = true;
      onClose();
    }
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLImageElement>) => {
    const state = dragState.current;
    dragState.current = null;

    if (!state || state.pointerId !== event.pointerId) return;
  };

  const handleImageClick = () => {
    const now = window.performance.now();

    if (now - lastTapTime.current < 280) {
      toggleZoom();
      lastTapTime.current = 0;
      return;
    }

    lastTapTime.current = now;
  };

  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Image preview">
      <button className="lightbox-scrim" type="button" aria-label="Close image preview" onClick={onClose} />
      <div className="lightbox-stage">
        <button className="lightbox-close" type="button" aria-label="Close image preview" onClick={onClose}>
          <X aria-hidden="true" size={18} strokeWidth={2.4} />
        </button>
        <img
          src={src}
          alt={alt}
          className={isZoomed ? 'is-zoomed' : undefined}
          style={{ transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${isZoomed ? 2 : 1})` }}
          onClick={handleImageClick}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => {
            dragState.current = null;
          }}
          draggable={false}
        />
      </div>
    </div>,
    document.body,
  );
}
