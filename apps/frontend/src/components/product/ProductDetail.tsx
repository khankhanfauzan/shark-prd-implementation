'use client';

import Link from 'next/link';

import { ProductGallery } from '@/components/product/ProductGallery';
import { ReviewSection } from '@/components/reviews/ReviewSection';
import { QueryErrorState } from '@/components/reviews/ReviewStates';
import { StarRating } from '@/components/reviews/StarRating';
import { Skeleton } from '@/components/ui/skeleton';
import { useProducts, useRatingSummary } from '@/hooks/use-product-queries';
import { formatPrice } from '@/lib/format';

export function ProductDetail() {
  const { data, isPending, isError, error, refetch } = useProducts();
  const summaryQuery = useRatingSummary();
  const product = data?.[0];
  const summary = summaryQuery.data;

  if (isPending) {
    return (
      <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <Skeleton className="aspect-square w-full rounded-[2rem_0.75rem_2rem_0.75rem]" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-10 w-32" />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <QueryErrorState message={error.message} onRetry={() => void refetch()} />
    );
  }

  if (!product) {
    return (
      <p className="py-16 text-center text-muted-foreground">
        Produk belum tersedia. Jalankan seed database terlebih dahulu.
      </p>
    );
  }

  return (
    <>
      <section className="animate-fade-up grid gap-10 pb-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <ProductGallery images={product.images ?? []} alt={product.name} />
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary">
            Still life · product 01
          </p>
          <h1 className="mt-3 font-editorial text-[clamp(2.6rem,5.4vw,4.6rem)] font-medium leading-[0.9] tracking-[-0.045em]">
            {product.name}
          </h1>
          {product.description ? (
            <p className="mt-5 max-w-md text-[1.02rem] leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          ) : null}

          <div className="mt-8 flex flex-wrap items-end gap-6">
            <p className="font-editorial text-4xl font-medium italic tracking-[-0.03em] text-primary">
              {formatPrice(product.price)}
            </p>
            {summary && summary.totalReviews > 0 ? (
              <a
                href="#reviews"
                className="inline-flex items-center gap-3 rounded-2xl border border-white/60 bg-card/70 px-3 py-2 shadow-sm backdrop-blur-md"
              >
                <span className="font-editorial text-3xl leading-none tracking-[-0.04em]">
                  {summary.averageRating.toFixed(1)}
                </span>
                <span>
                  <StarRating value={summary.averageRating} size="sm" />
                  <span className="mt-0.5 block text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
                    {summary.totalReviews} ulasan
                  </span>
                </span>
              </a>
            ) : null}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#reviews"
              className="inline-flex h-12 items-center rounded-full bg-foreground px-5 text-sm font-semibold text-background transition hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
            >
              Lihat ulasan
            </a>
            <Link
              href="/product/reviews"
              className="inline-flex h-12 items-center rounded-full border border-border bg-background/50 px-5 text-sm font-semibold backdrop-blur-md transition hover:-translate-y-0.5 hover:border-foreground"
            >
              Semua ulasan
            </Link>
          </div>
        </div>
      </section>

      <div className="mt-8 border-t border-border/70 pt-12 sm:mt-12">
        <ReviewSection />
      </div>
    </>
  );
}
