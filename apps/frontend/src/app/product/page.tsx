import Link from 'next/link';

import { ReviewSection } from '@/components/mock/ReviewSection';
import { Button } from '@/components/ui/button';
import { MOCK_PRODUCT, MOCK_REVIEWS } from '@/lib/mock-data';

export default function ProductPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[var(--max)] px-4 py-8 sm:px-6 sm:py-12">
      <nav className="mb-8 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          SHARK
        </Link>
        <span className="mx-2">/</span>
        <span>Produk</span>
      </nav>

      <section className="animate-fade-up grid gap-8 border-b border-border pb-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div
          className="aspect-[4/3] w-full rounded-xl bg-[linear-gradient(145deg,oklch(0.82_0.03_240)_0%,oklch(0.72_0.05_165)_48%,oklch(0.55_0.06_165)_100%)]"
          role="img"
          aria-label="Gambar produk placeholder"
        />
        <div className="flex flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            Product Detail
          </p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl">
            {MOCK_PRODUCT.name}
          </h1>
          <p className="mt-4 max-w-prose leading-relaxed text-muted-foreground">
            {MOCK_PRODUCT.description}
          </p>
          <p className="mt-6 font-serif text-3xl">
            ${MOCK_PRODUCT.price.toFixed(2)}
          </p>
          <Button asChild variant="link" className="mt-4 h-auto w-fit px-0">
            <a href="#reviews">Lihat ulasan ↓</a>
          </Button>
        </div>
      </section>

      <div className="mt-10">
        <ReviewSection
          average={MOCK_PRODUCT.averageRating}
          totalReviews={MOCK_PRODUCT.totalReviews}
          preview={MOCK_REVIEWS.slice(0, 2)}
        />
      </div>
    </main>
  );
}
