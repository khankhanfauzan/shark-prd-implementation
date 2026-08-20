'use client';

import Link from 'next/link';

import { ProductGallery } from '@/components/product/ProductGallery';
import { ReviewSection } from '@/components/reviews/ReviewSection';
import { QueryErrorState } from '@/components/reviews/ReviewStates';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useProducts } from '@/hooks/use-product-queries';
import { formatPrice } from '@/lib/format';

export function ProductDetail() {
  const { data, isPending, isError, error, refetch } = useProducts();
  const product = data?.[0];

  if (isPending) {
    return (
      <section className="grid gap-8 border-b border-border pb-10 lg:grid-cols-[1.1fr_0.9fr]">
        <Skeleton className="aspect-square w-full rounded-xl" />
        <div className="flex flex-col justify-center gap-4">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-8 w-32" />
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
      <section className="animate-fade-up grid gap-8 border-b border-border pb-10 lg:grid-cols-[1.1fr_0.9fr]">
        <ProductGallery images={product.images ?? []} alt={product.name} />
        <div className="flex flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            Product Detail
          </p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 max-w-prose leading-relaxed text-muted-foreground">
            {product.description}
          </p>
          <p className="mt-6 font-serif text-3xl">
            {formatPrice(product.price)}
          </p>
          <Button asChild variant="link" className="mt-4 h-auto w-fit px-0">
            <a href="#reviews">Lihat ulasan ↓</a>
          </Button>
        </div>
      </section>

      <div className="mt-10">
        <ReviewSection reviews={product.reviews ?? []} />
      </div>
    </>
  );
}

export function ProductBreadcrumb() {
  return (
    <nav className="mb-8 text-sm text-muted-foreground">
      <Link href="/" className="hover:text-foreground">
        SHARK
      </Link>
      <span className="mx-2">/</span>
      <span>Produk</span>
    </nav>
  );
}
