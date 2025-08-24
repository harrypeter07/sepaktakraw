import { ReactNode } from "react";

interface SectionProps {
  title?: string;
  subtitle?: string;
  className?: string;
  children: ReactNode;
}

export function Section({
  title,
  subtitle,
  className = '',
  children
}: SectionProps) {
  return (
    <section className={`py-16 ${className}`}>
      <div className="container-content">
        {title && (
          <h2 className="section-header">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="text-subtitle text-center mb-8">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
