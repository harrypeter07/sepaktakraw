import { ReactNode } from "react";

interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: ReactNode;
}

export function Badge({
  variant = 'primary',
  size = 'md',
  className = '',
  children
}: BadgeProps) {
  const baseClasses = 'inline-block font-medium rounded';
  
  const variantClasses = {
    primary: 'badge-primary',
    secondary: 'badge-secondary',
    neutral: 'badge-neutral'
  };
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  return (
    <span className={classes}>
      {children}
    </span>
  );
}
