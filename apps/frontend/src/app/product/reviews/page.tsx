'use client';

import Link from 'next/link';

import { EditorialShell } from '@/components/layout/EditorialShell';
import { ReviewFeed } from '@/components/reviews/ReviewFeed';
import { Skeleton } from '@/components/ui/skeleton';
import { useProducts } from '@/hooks/use-product-queries';

export default function ProductReviewsPage() {
  const { data, isPending } = useProducts();
  const product = data?.[0];

  return (
    <EditorialShell>
      <header className="animate-fade-up mb-10">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary">
          Full reviews
        </p>
        <h1 className="mt-3 font-editorial text-[clamp(3rem,8vw,5.4rem)] font-medium leading-[0.88] tracking-[-0.045em]">
          Voices
          <br />
          <em className="italic text-primary">on record.</em>
        </h1>
        {isPending ? (
          <Skeleton className="mt-4 h-5 w-64" />
        ) : (
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Semua ulasan untuk{' '}
            <Link href="/product" className="text-foreground underline-offset-4 hover:underline">
              {product?.name ?? 'produk ini'}
            </Link>
            .
          </p>
        )}
      </header>

      <div className="animate-fade-up-delay">
        <ReviewFeed />
      </div>
    </EditorialShell>
  );
}
