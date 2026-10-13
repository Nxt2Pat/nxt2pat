import React from 'react';
import { cn } from '@/lib/utils';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn('max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full', className)} {...props}>
      {children}
    </div>
  );
};
