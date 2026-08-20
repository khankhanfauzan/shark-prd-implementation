import type { ReactNode } from 'react';

import { EditorialNav } from '@/components/layout/EditorialNav';
import { cn } from '@/lib/utils';

export function EditorialShell({
  children,
  wide = false,
}: {
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="relative isolate min-h-screen overflow-hidden">
      <div className="editorial-grain" aria-hidden />
      <div
        className={cn(
          'relative z-10 mx-auto flex min-h-screen w-full flex-col px-5 py-5 sm:px-8 sm:py-6',
          wide ? 'max-w-[86rem]' : 'max-w-[46rem]'
        )}
      >
        <EditorialNav />
        <div className="flex-1 pt-8 sm:pt-10">{children}</div>
      </div>
    </div>
  );
}
