import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <section
      className={cn('container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24', className)}
      {...props}
    >
      {children}
    </section>
  );
}
