'use client';

import Link from 'next/link';

import { ReviewFeed } from '@/components/reviews/ReviewFeed';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useProducts } from '@/hooks/use-product-queries';

export default function ProductReviewsPage() {
  const { data, isPending } = useProducts();
  const product = data?.[0];

  return (
    <main className="mx-auto min-h-screen w-full max-w-[42rem] px-4 py-8 sm:px-6 sm:py-12">
      <nav className="mb-8">
        <Button asChild variant="ghost" size="sm" className="-ml-2">
          <Link href="/product">← Kembali ke produk</Link>
        </Button>
      </nav>

      <header className="animate-fade-up mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          Full reviews
        </p>
        {isPending ? (
          <Skeleton className="mt-2 h-9 w-2/3" />
        ) : (
          <h1 className="mt-2 font-serif text-3xl">
            {product?.name ?? 'Produk'}
          </h1>
        )}
      </header>

      <Card className="animate-fade-up-delay shadow-sm">
        <CardContent className="pt-6">
          <ReviewFeed />
        </CardContent>
      </Card>
    </main>
  );
}
