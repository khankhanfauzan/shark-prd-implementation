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
        SHARK · FE mockup · shadcn/ui
      </p>
      <h1 className="animate-fade-up mt-3 max-w-xl font-serif text-4xl sm:text-5xl">
        Product Review & Rating
      </h1>
      <p className="animate-fade-up-delay mt-4 max-w-lg leading-relaxed text-muted-foreground">
        Kerangka tampilan untuk PDP dan halaman ulasan memakai shadcn/ui.
        Tiap anggota FE mengisi slot fitur masing-masing.
      </p>

      <div className="animate-fade-up-delay mt-10 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/product">Buka PDP mockup</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/product/reviews">Full reviews</Link>
        </Button>
      </div>

      <section className="animate-fade-up-delay mt-14 grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-lg">
              US-01 · Overall Rating
            </CardTitle>
            <CardDescription>
              StarRating, angka desimal, empty/skeleton state di Review Section
              PDP.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-lg">
              US-02 · Review List
            </CardTitle>
            <CardDescription>
              View More, ReviewCard, infinite scroll, loading / end / retry.
            </CardDescription>
          </CardHeader>
        </Card>
      </section>
    </main>
  );
}
