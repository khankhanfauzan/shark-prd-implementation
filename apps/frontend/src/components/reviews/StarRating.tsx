'use client';

import { Star } from 'lucide-react';

import { cn } from '@/lib/utils';

export const starSizeClass = {
  sm: 'size-3.5',
  md: 'size-5',
  lg: 'size-7',
} as const;

export type StarSize = keyof typeof starSizeClass;

export function StarGlyph({
  fill,
  size = 'md',
}: {
  fill: number;
  size?: StarSize;
}) {
  const clamped = Math.max(0, Math.min(1, fill));

  return (
    <span className={cn('relative', starSizeClass[size])}>
      <Star
        className={cn(starSizeClass[size], 'fill-star-empty text-star-empty')}
        aria-hidden
      />
      {clamped > 0 && (
        <span
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${clamped * 100}%` }}
        >
          <Star
            className={cn(starSizeClass[size], 'fill-star text-star')}
            aria-hidden
          />
        </span>
      )}
    </span>
  );
}

type StarRatingProps = {
  value: number;
  max?: number;
  size?: StarSize;
  className?: string;
};

export function StarRating({
  value,
  max = 5,
  size = 'md',
  className,
}: StarRatingProps) {
  const clamped = Math.max(0, Math.min(max, value));

  return (
    <div
      className={cn('inline-flex items-center gap-0.5', className)}
      role="img"
      aria-label={`Rating ${clamped.toFixed(1)} dari ${max} bintang`}
    >
      {Array.from({ length: max }, (_, i) => (
        <StarGlyph key={i} size={size} fill={Math.min(1, Math.max(0, clamped - i))} />
      ))}
    </div>
  );
}
