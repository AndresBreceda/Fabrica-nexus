import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  title,
  subtitle,
  headerAction,
}) => {
  return (
    <div
      className={`bg-white rounded-lg border border-[#e2e8f0] shadow-xs overflow-hidden ${className}`}
    >
      {(title || headerAction) && (
        <div className="px-4 py-3.5 border-b border-[#e2e8f0] flex items-center justify-between">
          <div>
            {title && (
              <h3 className="text-sm font-semibold text-[#0f172a] tracking-tight">{title}</h3>
            )}
            {subtitle && <p className="text-xs text-[#64748b] mt-0.5">{subtitle}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
};
