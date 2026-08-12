import Link from 'next/link';
import { ReviewSection } from '../../../components/mock/ReviewSection';
import { MOCK_PRODUCT, MOCK_REVIEWS } from '../../../lib/mock-data';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const productId = id || MOCK_PRODUCT.id;

  return (
    <main className="mx-auto min-h-screen w-full max-w-[var(--max)] px-4 py-8 sm:px-6 sm:py-12">
      <nav className="mb-8 text-sm text-[var(--ink-muted)]">
        <Link href="/" className="hover:text-[var(--ink)]">
          SHARK
        </Link>
        <span className="mx-2">/</span>
        <span>Produk</span>
      </nav>

      {/* Product info — placeholder, di luar scope Review epic */}
      <section className="animate-fade-up grid gap-8 border-b border-[var(--line)] pb-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div
          className="aspect-[4/3] w-full bg-[linear-gradient(145deg,#c5d4df_0%,#9eb6a8_48%,#6f8f82_100%)]"
          role="img"
          aria-label="Gambar produk placeholder"
        />
        <div className="flex flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
            Product Detail
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl">{MOCK_PRODUCT.name}</h1>
          <p className="mt-4 max-w-prose leading-relaxed text-[var(--ink-muted)]">
            {MOCK_PRODUCT.description}
          </p>
          <p className="mt-6 font-[family-name:var(--font-display)] text-3xl">
            ${MOCK_PRODUCT.price.toFixed(2)}
          </p>
          <a
            href="#reviews"
            className="mt-6 inline-flex w-fit text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
          >
            Lihat ulasan ↓
          </a>
        </div>
      </section>

      <div className="mt-10">
        <ReviewSection
          productId={productId}
          average={MOCK_PRODUCT.averageRating}
          totalReviews={MOCK_PRODUCT.totalReviews}
          preview={MOCK_REVIEWS.slice(0, 2)}
        />
      </div>
    </main>
  );
}
