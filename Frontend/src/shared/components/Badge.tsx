import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'primary';
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  dot = false,
  className = '',
}) => {
  const variantStyles = {
    success: 'bg-[#dcfce7] text-[#16a34a] border-[#bbf7d0]',
    warning: 'bg-[#fef3c7] text-[#d97706] border-[#fde68a]',
    danger: 'bg-[#fee2e2] text-[#dc2626] border-[#fecaca]',
    info: 'bg-[#dbeafe] text-[#2563eb] border-[#bfdbfe]',
    neutral: 'bg-[#f1f5f9] text-[#475569] border-[#e2e8f0]',
    primary: 'bg-[#e0f2fe] text-[#0284c7] border-[#bae6fd]',
  };

  const dotColors = {
    success: 'bg-[#16a34a]',
    warning: 'bg-[#d97706]',
    danger: 'bg-[#dc2626]',
    info: 'bg-[#2563eb]',
    neutral: 'bg-[#64748b]',
    primary: 'bg-[#0284c7]',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium border font-mono tracking-tight ${variantStyles[variant]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
      {children}
    </span>
  );
};
