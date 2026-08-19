'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

export function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const activeImage = images[activeIndex];

  const updateScrollState = useCallback(() => {
    const el = thumbsRef.current;
    if (!el) {
      return;
    }

    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = thumbsRef.current;
    if (!el) {
      return;
    }

    updateScrollState();
    const observer = new ResizeObserver(updateScrollState);
    observer.observe(el);
    el.addEventListener('scroll', updateScrollState, { passive: true });

    return () => {
      observer.disconnect();
      el.removeEventListener('scroll', updateScrollState);
    };
  }, [images, updateScrollState]);

  useEffect(() => {
    const container = thumbsRef.current;
    const thumb = container?.querySelector<HTMLElement>(
      `[data-thumb-index="${activeIndex}"]`
    );
    if (!container || !thumb) {
      return;
    }

    const thumbLeft = thumb.offsetLeft;
    const thumbRight = thumbLeft + thumb.offsetWidth;
    const viewLeft = container.scrollLeft;
    const viewRight = viewLeft + container.clientWidth;

    if (thumbLeft < viewLeft) {
      container.scrollTo({ left: thumbLeft, behavior: 'smooth' });
    } else if (thumbRight > viewRight) {
      container.scrollTo({
        left: thumbRight - container.clientWidth,
        behavior: 'smooth',
      });
    }
  }, [activeIndex]);

  const scrollThumbs = (direction: 'left' | 'right') => {
    const el = thumbsRef.current;
    if (!el) {
      return;
    }

    el.scrollBy({
      left: direction === 'left' ? -el.clientWidth * 0.8 : el.clientWidth * 0.8,
      behavior: 'smooth',
    });
  };

  if (!activeImage) {
    return (
      <div
        className="aspect-square w-full rounded-xl bg-[linear-gradient(145deg,oklch(0.82_0.03_240)_0%,oklch(0.72_0.05_165)_48%,oklch(0.55_0.06_165)_100%)]"
        role="img"
        aria-label={`${alt} placeholder`}
      />
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted">
        <Image
          src={activeImage}
          alt={alt}
          fill
          priority
          className="object-contain p-4"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>

      {images.length > 1 ? (
        <div className="relative">
          {canScrollLeft ? (
            <button
              type="button"
              onClick={() => scrollThumbs('left')}
              aria-label="Lihat gambar sebelumnya"
              className="absolute left-0 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-md bg-foreground text-background shadow-sm"
            >
              <ChevronLeft className="size-4" />
            </button>
          ) : null}

          <div
            ref={thumbsRef}
            className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {images.map((image, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  data-thumb-index={index}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Gambar ${index + 1}`}
                  aria-pressed={isActive}
                  className={cn(
                    'relative size-20 shrink-0 overflow-hidden rounded-lg border-2 bg-muted transition-colors',
                    isActive
                      ? 'border-primary'
                      : 'border-transparent hover:border-border'
                  )}
                >
                  <Image
                    src={image}
                    alt=""
                    fill
                    className="object-contain p-1"
                    sizes="80px"
                  />
                </button>
              );
            })}
          </div>

          {canScrollRight ? (
            <button
              type="button"
              onClick={() => scrollThumbs('right')}
              aria-label="Lihat gambar berikutnya"
              className="absolute right-0 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-md bg-foreground text-background shadow-sm"
            >
              <ChevronRight className="size-4" />
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
