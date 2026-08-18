import { Star } from 'lucide-react';

import { cn } from '@/lib/utils';

type StarRatingProps = {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
};

const sizeClass = {
  sm: 'size-3.5',
  md: 'size-5',
  lg: 'size-7',
};

/** US-01 slot — Star Rating visual (static mock) */
export function StarRating({ value, max = 5, size = 'md' }: StarRatingProps) {
  const clamped = Math.max(0, Math.min(max, value));

  return (
    <div
      className="inline-flex items-center gap-0.5"
      role="img"
      aria-label={`Rating ${clamped.toFixed(1)} dari ${max} bintang`}
    >
      {Array.from({ length: max }, (_, i) => {
        const fill = Math.min(1, Math.max(0, clamped - i));
        return (
          <span key={i} className={cn('relative', sizeClass[size])}>
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
      })}
    </div>
  );
}
