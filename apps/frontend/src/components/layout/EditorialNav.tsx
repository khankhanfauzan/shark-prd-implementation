'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

const links = [
  { href: '/product', label: 'Produk' },
  { href: '/product/reviews', label: 'Ulasan' },
];

export function EditorialNav({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <header
      className={cn('flex items-center justify-between gap-4', className)}
    >
      <Link href="/" className="flex items-baseline gap-3">
        <span className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-foreground">
          Shark
        </span>
        <span className="hidden text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground sm:inline">
          Review issue 01
        </span>
      </Link>
      <nav
        className="flex rounded-full border border-border bg-background/80 p-1 backdrop-blur-md"
        aria-label="Utama"
      >
        {links.map((link) => {
          const active =
            link.href === '/product'
              ? pathname === '/product'
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'inline-flex h-8 min-w-[5.5rem] items-center justify-center rounded-full px-3.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground/70 hover:bg-accent hover:text-foreground'
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
