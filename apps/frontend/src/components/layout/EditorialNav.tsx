'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

const links = [
  { href: '/product', label: 'Produk' },
  { href: '/product/reviews', label: 'Ulasan' },
];

export function EditorialNav() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between gap-4">
      <Link href="/" className="flex items-baseline gap-3">
        <span className="text-[0.72rem] font-bold uppercase tracking-[0.28em]">
          Shark
        </span>
        <span className="hidden text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground sm:inline">
          Review issue 01
        </span>
      </Link>
      <nav className="flex gap-1" aria-label="Utama">
        {links.map((link) => {
          const active =
            link.href === '/product'
              ? pathname === '/product'
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-full px-3 py-1.5 text-sm transition-colors',
                active
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
