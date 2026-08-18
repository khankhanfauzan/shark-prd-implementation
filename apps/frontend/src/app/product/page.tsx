import {
  ProductBreadcrumb,
  ProductDetail,
} from '@/components/product/ProductDetail';

export default function ProductPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[var(--max)] px-4 py-8 sm:px-6 sm:py-12">
      <ProductBreadcrumb />
      <ProductDetail />
    </main>
  );
}
