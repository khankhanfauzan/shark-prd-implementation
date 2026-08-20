import { ArrowUpRight, Star } from 'lucide-react';
import { Cormorant_Garamond } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import styles from './page.module.css';

const editorial = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const HERO_IMAGE =
  'https://cdn.shopify.com/s/files/1/0672/3806/8470/files/2_2de19f16-bf00-497e-993b-f5c41e95d530.jpg?v=1723706163';

export default function Index() {
  return (
    <main className={styles.page}>
      <div className={styles.grain} aria-hidden />

      <div className={styles.inner}>
        <header className={styles.nav}>
          <div className={styles.brand}>
            <span className={styles.mark}>Shark</span>
            <span className={styles.issue}>Review issue 01</span>
          </div>
          <nav className={styles.links} aria-label="Utama">
            <Button asChild variant="ghost" size="sm">
              <Link href="/product">Produk</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/product/reviews">Ulasan</Link>
            </Button>
          </nav>
        </header>

        <section className={styles.hero}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>Product reviews · rated in public</p>
            <h1 className={cn(styles.headline, editorial.className)}>
              The <em>verdict</em>
              <br />
              lives in
              <br />
              the stars.
            </h1>
            <p className={styles.lede}>
              Halaman produk yang diperlakukan seperti editorial: rating yang
              jujur, ulasan yang bisa dibaca, dan tipografi yang punya napas.
              Terhubung ke API NestJS — bukan mock.
            </p>

            <div className={styles.actions}>
              <Link href="/product" className={styles.primaryCta}>
                Buka halaman produk
                <ArrowUpRight aria-hidden />
              </Link>
              <Link href="/product/reviews" className={styles.ghostCta}>
                Semua ulasan
              </Link>
            </div>

            <dl className={styles.meta}>
              <div className={styles.stat}>
                <dt className={cn(styles.statValue, editorial.className)}>
                  4.8
                </dt>
                <dd className={styles.statLabel}>Average rating</dd>
              </div>
              <div className={styles.stat}>
                <dt className={cn(styles.statValue, editorial.className)}>
                  31
                </dt>
                <dd className={styles.statLabel}>Voices on record</dd>
              </div>
              <div className={styles.stat}>
                <dt className={cn(styles.statValue, editorial.className)}>
                  &lt;2s
                </dt>
                <dd className={styles.statLabel}>Review load SLA</dd>
              </div>
            </dl>
          </div>

          <div className={styles.stage}>
            <figure className={styles.frame}>
              <Image
                src={HERO_IMAGE}
                alt="Wireless noise-canceling headphones"
                fill
                priority
                className={styles.photo}
                sizes="(min-width: 1024px) 42vw, 100vw"
              />
              <figcaption className={styles.caption}>
                Still life · headphones, 2026
              </figcaption>
            </figure>

            <aside className={styles.ratingCard}>
              <span className={cn(styles.score, editorial.className)}>4.8</span>
              <div>
                <div className={styles.stars} aria-hidden>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} />
                  ))}
                </div>
                <p className={styles.ratingCopy}>Overall rating</p>
              </div>
            </aside>

            <blockquote className={styles.quoteCard}>
              <span className={cn(styles.quoteMark, editorial.className)}>
                “
              </span>
              <p className={cn(styles.quote, editorial.className)}>
                Amazing sound quality, and the cabin noise almost disappears.
              </p>
              <footer className={styles.quoteAuthor}>Alex Johnson · 5.0</footer>
            </blockquote>
          </div>
        </section>

        <section className={styles.stories} aria-label="User stories">
          <article className={styles.story}>
            <span className={styles.index}>US-01</span>
            <h2 className={cn(styles.storyTitle, editorial.className)}>
              Overall Rating
            </h2>
            <p className={styles.storyBody}>
              Ringkasan rating di puncak section: bintang, angka desimal, plus
              empty dan loading state yang tenang.
            </p>
          </article>
          <article className={styles.story}>
            <span className={styles.index}>US-02</span>
            <h2 className={cn(styles.storyTitle, editorial.className)}>
              Review List
            </h2>
            <p className={styles.storyBody}>
              Preview di PDP, halaman penuh dengan infinite scroll, dan form
              untuk menulis ulasan baru.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
