import { useEffect, useRef, useState } from 'react';

export function isVideoSource(src: string) {
  return /\.(mp4|mov|webm)(\?|#|$)/i.test(src);
}

export function useMediaLoadedClass(initialLoaded = false) {
  const [isLoaded, setIsLoaded] = useState(initialLoaded);

  return {
    isLoaded,
    className: isLoaded ? 'is-loaded' : '',
    onLoad: () => setIsLoaded(true),
    onLoadedData: () => setIsLoaded(true),
  };
}

export function useInViewVideo<T extends HTMLVideoElement>(enabled = true) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || !enabled) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: '180px 0px', threshold: 0.2 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [enabled]);

  return ref;
}

export function prefetchInternalHref(href: string) {
  if (!href.startsWith('/') || href.startsWith('//')) return;
  if (document.head.querySelector(`link[data-route-prefetch="${href}"]`)) return;

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  link.as = 'document';
  link.dataset.routePrefetch = href;
  document.head.appendChild(link);
}
