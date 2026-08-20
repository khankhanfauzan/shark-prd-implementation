import './global.css';
import { Cormorant_Garamond, Literata, Manrope } from 'next/font/google';

import { Providers } from './providers';

const display = Literata({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const editorial = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-editorial-face',
  display: 'swap',
});

const body = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  title: 'SHARK · Product Reviews',
  description: 'Product Detail Page & Review System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${display.variable} ${editorial.variable} ${body.variable}`}
    >
      <body className="min-h-screen antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
