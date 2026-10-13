import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverLift?: boolean;
  glow?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  className,
  hoverLift = true,
  glow = false,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'glass-panel rounded-2xl p-6 transition-all duration-300 relative overflow-hidden',
        hoverLift && 'hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5 hover:border-ink/30',
        glow && 'before:absolute before:inset-0 before:bg-radial before:from-ink/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:pointer-events-none',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const Container: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
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
