import Link from 'next/link';

import { RatingSummary } from '@/components/mock/RatingSummary';
import { ReviewCard } from '@/components/mock/ReviewCard';
import { InfiniteScrollFooter } from '@/components/mock/ReviewStates';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MOCK_PRODUCT, MOCK_REVIEWS } from '@/lib/mock-data';

/**
 * US-02 — Full Review Page (mock)
 * Infinite scroll digarap di task FE masing-masing.
 */
export default function ProductReviewsPage() {
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
        <h1 className="mt-2 font-serif text-3xl">{MOCK_PRODUCT.name}</h1>
      </header>

      <Card className="animate-fade-up-delay shadow-sm">
        <CardContent className="pt-6">
          <RatingSummary
            average={MOCK_PRODUCT.averageRating}
            totalReviews={MOCK_PRODUCT.totalReviews}
          />
          <div>
            {MOCK_REVIEWS.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
          <div data-scroll-sentinel>
            <InfiniteScrollFooter state="end" />
          </div>
        </CardContent>
      </Card>

      <Card className="mt-8 border-dashed shadow-none">
        <CardHeader>
          <CardTitle className="text-base">Slot FE (belum diikat API)</CardTitle>
          <CardDescription>Task lanjutan untuk anggota FE:</CardDescription>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>Infinite scroll + IntersectionObserver</li>
            <li>Cursor pagination dari BE</li>
            <li>State loading / error / retry di footer</li>
          </ul>
        </CardHeader>
      </Card>
    </main>
  );
}
