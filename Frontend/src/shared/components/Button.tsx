import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'secondary',
  size = 'md',
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none rounded cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1 gap-1.5 h-7',
    md: 'text-xs px-3.5 py-1.5 gap-2 h-8.5',
    lg: 'text-sm px-4 py-2 gap-2 h-10',
  };

  const variantStyles = {
    primary:
      'bg-[#006194] text-white hover:bg-[#007bb9] active:bg-[#004e76] shadow-xs',
    secondary:
      'bg-white text-[#0f172a] border border-[#e2e8f0] hover:bg-[#f8fafc] hover:border-[#cbd5e1] shadow-xs',
    outline:
      'bg-transparent text-[#006194] border border-[#006194] hover:bg-[#f0f9ff]',
    danger:
      'bg-[#fee2e2] text-[#dc2626] border border-[#fecaca] hover:bg-[#dc2626] hover:text-white',
    ghost:
      'bg-transparent text-[#475569] hover:bg-[#f1f5f9] hover:text-[#0f172a]',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
};
