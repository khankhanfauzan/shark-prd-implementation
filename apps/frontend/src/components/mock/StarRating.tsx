type StarRatingProps = {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
};

const sizeClass = {
  sm: 'h-3.5 w-3.5',
  md: 'h-5 w-5',
  lg: 'h-7 w-7',
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
          <span key={i} className={`relative ${sizeClass[size]}`}>
            <svg viewBox="0 0 24 24" className={`${sizeClass[size]} text-[var(--star-empty)]`} aria-hidden>
              <path
                fill="currentColor"
                d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.4l1.1-6.5L2.6 9.3l6.5-.9L12 2.5z"
              />
            </svg>
            {fill > 0 && (
              <span
                className="absolute inset-0 overflow-hidden text-[var(--star)]"
                style={{ width: `${fill * 100}%` }}
              >
                <svg viewBox="0 0 24 24" className={sizeClass[size]} aria-hidden>
                  <path
                    fill="currentColor"
                    d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.4l1.1-6.5L2.6 9.3l6.5-.9L12 2.5z"
                  />
                </svg>
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
