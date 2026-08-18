'use client';

import { Star } from 'lucide-react';

import { cn } from '@/lib/utils';

type StarRatingProps = {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (value: number) => void;
  disabled?: boolean;
};

const sizeClass = {
  sm: 'size-3.5',
  md: 'size-5',
  lg: 'size-7',
};

export function StarRating({
  value,
  max = 5,
  size = 'md',
  onChange,
  disabled = false,
}: StarRatingProps) {
  const clamped = Math.max(0, Math.min(max, value));
  const interactive = Boolean(onChange) && !disabled;

  return (
    <div
      className="inline-flex items-center gap-0.5"
      role={interactive ? 'radiogroup' : 'img'}
      aria-label={`Rating ${clamped.toFixed(1)} dari ${max} bintang`}
    >
      {Array.from({ length: max }, (_, i) => {
        const fill = Math.min(1, Math.max(0, clamped - i));
        const starValue = i + 1;
        const star = (
          <span className={cn('relative', sizeClass[size])}>
            <Star
              className={cn(sizeClass[size], 'fill-star-empty text-star-empty')}
              aria-hidden
            />
            {fill > 0 && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <Star
                  className={cn(sizeClass[size], 'fill-star text-star')}
                  aria-hidden
                />
              </span>
            )}
          </span>
        );

        if (!interactive) {
          return <span key={i}>{star}</span>;
        }

        return (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={starValue === value}
            aria-label={`${starValue} bintang`}
            className="rounded-sm p-0.5 transition hover:scale-110 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            onClick={() => onChange?.(starValue)}
          >
            {star}
          </button>
        );
      })}
    </div>
  );
}
