import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

/** US-01 / US-02 — loading & footer states */
export function RatingSkeleton() {
  return (
    <div className="flex gap-4 pb-6" aria-hidden>
      <Skeleton className="h-12 w-20" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
}

export function ReviewCardSkeleton() {
  return (
    <div className="space-y-3 py-5" aria-hidden>
      <div className="flex justify-between gap-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-[80%]" />
    </div>
  );
}

export function InfiniteScrollFooter({
  state,
}: {
  state: 'loading' | 'end' | 'error';
}) {
  if (state === 'loading') {
    return (
      <div className="flex flex-col items-center gap-3 py-8" aria-live="polite">
        <Loader2 className="size-6 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Memuat ulasan…</p>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className="flex flex-col items-center gap-3 py-8" role="alert">
        <p className="text-sm text-destructive">Gagal memuat ulasan.</p>
        <Button type="button" variant="outline" size="sm">
          Coba Lagi
        </Button>
      </div>
    );
  }

  return (
    <p className="py-8 text-center text-sm text-muted-foreground">
      Semua ulasan telah ditampilkan
    </p>
  );
}
