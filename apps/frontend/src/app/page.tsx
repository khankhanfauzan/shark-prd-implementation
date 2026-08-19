import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Index() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[var(--max)] flex-col justify-center px-4 py-16 sm:px-6">
      <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.16em] text-primary">
        SHARK · Product Reviews
      </p>
      <h1 className="animate-fade-up mt-3 max-w-xl font-serif text-4xl sm:text-5xl">
        Product Review & Rating
      </h1>
      <p className="animate-fade-up-delay mt-4 max-w-lg leading-relaxed text-muted-foreground">
        Halaman produk dan ulasan terhubung ke API NestJS: list review,
        infinite scroll, dan form submit ulasan.
      </p>

      <div className="animate-fade-up-delay mt-10 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/product">Buka halaman produk</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/product/reviews">Semua ulasan</Link>
        </Button>
      </div>

      <section className="animate-fade-up-delay mt-14 grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-lg">
              US-01 · Overall Rating
            </CardTitle>
            <CardDescription>
              Ringkasan rating dari API, star visual, empty & loading state.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-lg">
              US-02 · Review List
            </CardTitle>
            <CardDescription>
              Preview di PDP, halaman penuh dengan infinite scroll, dan form
              ulasan.
            </CardDescription>
          </CardHeader>
        </Card>
      </section>
    </main>
  );
}
