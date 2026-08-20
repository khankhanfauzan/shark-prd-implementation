'use client';

import { Loader2, MessageSquareDashed } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export function RatingSkeleton() {
  return (
    <div className="flex gap-4 pb-6" aria-hidden>
      <Skeleton className="h-16 w-24 rounded-xl" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
}

export function ReviewCardSkeleton() {
  return (
    <div className="flex gap-4 py-6" aria-hidden>
      <Skeleton className="size-11 shrink-0 rounded-full" />
      <div className="flex-1 space-y-3">
        <div className="flex justify-between gap-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[80%]" />
      </div>
    </div>
  );
}

export function EmptyReviewsState({
  writeReviewHref = '#write-review',
}: {
  writeReviewHref?: string;
}) {
  return (
    <div
      className="flex flex-col items-center gap-4 rounded-[1.5rem] border border-dashed border-border bg-card/50 px-4 py-12 text-center backdrop-blur-md"
      role="status"
      aria-live="polite"
    >
      <div className="flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
        <MessageSquareDashed className="size-6" aria-hidden />
      </div>
      <div className="space-y-1">
        <p className="font-editorial text-3xl font-medium tracking-[-0.03em]">
          No Reviews Yet
        </p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Jadilah yang pertama menulis ulasan untuk produk ini.
        </p>
      </div>
      <Button asChild variant="outline" size="sm" className="rounded-full px-4">
        <a href={writeReviewHref}>Tulis ulasan</a>
      </Button>
    </div>
  );
}

export function QueryErrorState({
  message,
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-3 py-8" role="alert">
      <p className="text-sm text-destructive">
        {message || 'Gagal memuat data.'}
      </p>
      {onRetry ? (
        <Button type="button" variant="outline" size="sm" className="rounded-full" onClick={onRetry}>
          Coba Lagi
        </Button>
      ) : null}
    </div>
  );
}

export function NextPageSpinner() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 py-8"
      role="status"
      aria-live="polite"
      aria-label="Memuat ulasan berikutnya"
    >
      <Loader2 className="size-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">Memuat ulasan…</p>
    </div>
  );
}

export function InfiniteScrollFooter({
  state,
  onRetry,
}: {
  state: 'loading' | 'end' | 'error';
  onRetry?: () => void;
}) {
  if (state === 'loading') {
    return <NextPageSpinner />;
  }

  if (state === 'error') {
    return (
      <QueryErrorState message="Gagal memuat ulasan." onRetry={onRetry} />
    );
  }

  return (
    <p className="py-8 text-center font-editorial text-lg italic text-muted-foreground">
      Semua ulasan telah ditampilkan
    </p>
  );
}
