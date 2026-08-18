'use client';

import Image from 'next/image';
import { useState } from 'react';

import { cn } from '@/lib/utils';

export function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  if (!activeImage) {
    return (
      <div
        className="aspect-[4/3] w-full rounded-xl bg-[linear-gradient(145deg,oklch(0.82_0.03_240)_0%,oklch(0.72_0.05_165)_48%,oklch(0.55_0.06_165)_100%)]"
        role="img"
        aria-label={`${alt} placeholder`}
      />
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted">
        <Image
          src={activeImage}
          alt={alt}
          fill
          priority
          className="object-cover"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>
      {images.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Gambar ${index + 1}`}
              aria-pressed={index === activeIndex}
              className={cn(
                'relative h-16 w-20 shrink-0 overflow-hidden rounded-md border',
                index === activeIndex
                  ? 'border-primary ring-1 ring-primary'
                  : 'border-border opacity-80 hover:opacity-100'
              )}
            >
              <Image
                src={image}
                alt=""
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
