import { ReactNode } from "react";

interface CardProps {
  variant?: 'default' | 'hover' | 'elevated';
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
  children: ReactNode;
}

export function Card({
  variant = 'default',
  padding = 'md',
  className = '',
  children
}: CardProps) {
  const baseClasses = 'bg-white rounded-lg shadow-md';
  
  const variantClasses = {
    default: 'card',
    hover: 'card-hover',
    elevated: 'bg-white rounded-lg shadow-lg p-6'
  };
  
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`;
  
  return (
    <div className={classes}>
      {children}
    </div>
  );
}
