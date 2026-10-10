import React from 'react';

interface SectionTitleProps {
  badge?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}

export default function SectionTitle({
  badge,
  title,
  subtitle,
  center = true,
  className = '',
}: SectionTitleProps) {
  return (
    <div className={`section-header ${center ? '' : 'section-header-left'} ${className}`}>
      {badge && <span className="badge-sea">{badge}</span>}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle text-center-readable">{subtitle}</p>}
    </div>
  );
}
