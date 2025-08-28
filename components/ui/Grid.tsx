import { ReactNode } from "react";

interface GridProps {
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children: ReactNode;
}

export function Grid({
  cols = 3,
  gap = 'md',
  className = '',
  children
}: GridProps) {
  const baseClasses = 'grid';
  
  const colsClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2 md:grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6',
    12: 'grid-cols-1 lg:grid-cols-12'
  };
  
  const gapClasses = {
    sm: 'gap-2 sm:gap-4',
    md: 'gap-3 sm:gap-6',
    lg: 'gap-4 sm:gap-8',
    xl: 'gap-6 sm:gap-12'
  };
  
  const classes = `${baseClasses} ${colsClasses[cols]} ${gapClasses[gap]} ${className}`;
  
  return (
    <div className={classes}>
      {children}
    </div>
  );
}
