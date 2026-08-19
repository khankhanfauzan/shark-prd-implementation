'use client';

import * as React from 'react';

import { StarGlyph, type StarSize } from '@/components/reviews/StarRating';
import { cn } from '@/lib/utils';

type StarRatingInputProps = {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  size?: StarSize;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  name?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>;

export const StarRatingInput = React.forwardRef<
  HTMLDivElement,
  StarRatingInputProps
>(function StarRatingInput(
  {
    value,
    onChange,
    max = 5,
    size = 'lg',
    disabled = false,
    invalid = false,
    required = true,
    name,
    className,
    onBlur,
    onKeyDown,
    ...props
  },
  ref
) {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const buttonsRef = React.useRef<Array<HTMLButtonElement | null>>([]);
  const preview = hovered ?? value;
  const focusIndex = Math.max(1, value || 1) - 1;

  function setRating(next: number) {
    const clamped = Math.max(1, Math.min(max, next));
    onChange(clamped);
    buttonsRef.current[clamped - 1]?.focus();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(event);
    if (event.defaultPrevented || disabled) {
      return;
    }

    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault();
      setRating((value || 0) + 1);
      return;
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault();
      setRating((value || 1) - 1);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      setRating(1);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      setRating(max);
      return;
    }

    if (/^[1-9]$/.test(event.key)) {
      const numeric = Number(event.key);
      if (numeric >= 1 && numeric <= max) {
        event.preventDefault();
        setRating(numeric);
      }
    }
  }

  return (
    <div
      ref={ref}
      className={cn(
        'inline-flex items-center gap-0.5 rounded-md',
        invalid && 'ring-1 ring-destructive',
        disabled && 'opacity-50',
        className
      )}
      role="radiogroup"
      aria-label={`Pilih rating 1 sampai ${max} bintang`}
      aria-required={required || undefined}
      aria-invalid={invalid || undefined}
      aria-disabled={disabled || undefined}
      onBlur={(event) => {
        onBlur?.(event);
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setHovered(null);
        }
      }}
      onKeyDown={handleKeyDown}
      onMouseLeave={() => setHovered(null)}
      {...props}
    >
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1;
        const filled = starValue <= preview;
        const checked = starValue === value;

        return (
          <button
            key={starValue}
            ref={(node) => {
              buttonsRef.current[i] = node;
            }}
            type="button"
            role="radio"
            name={name}
            aria-checked={checked}
            aria-label={`${starValue} bintang`}
            tabIndex={disabled ? -1 : i === focusIndex ? 0 : -1}
            disabled={disabled}
            className="rounded-sm p-0.5 transition hover:scale-110 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:hover:scale-100"
            onMouseEnter={() => {
              if (!disabled) {
                setHovered(starValue);
              }
            }}
            onClick={() => setRating(starValue)}
          >
            <StarGlyph fill={filled ? 1 : 0} size={size} />
          </button>
        );
      })}
    </div>
  );
});
