import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-button-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-dark disabled:pointer-events-none disabled:opacity-50 disabled:grayscale active:scale-[0.97]';
  
  const variants = {
    primary: 'bg-button-primary text-white hover:bg-button-hover shadow-[0_4px_14px_0_rgba(47,128,237,0.39)] hover:shadow-[0_0_20px_rgba(97,255,209,0.4)]',
    secondary: 'border-2 border-card-border bg-transparent text-text-primary hover:bg-bg-secondary hover:border-brand-accent-neon/50 hover:shadow-[0_0_15px_rgba(97,255,209,0.1)]',
    outline: 'border-2 border-brand-azul-brillante/30 bg-transparent text-brand-azul-neon hover:bg-brand-accent-neon/10 hover:border-brand-accent-neon/50 hover:text-brand-accent-neon hover:shadow-[0_0_15px_rgba(97,255,209,0.2)]',
    ghost: 'text-text-secondary hover:text-brand-accent-neon hover:bg-brand-accent-neon/5',
  };

  const sizes = {
    sm: 'h-9 px-4 text-sm',           
    md: 'h-11 px-8 text-base',        
    lg: 'h-14 px-10 text-lg',         
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </button>
  );
};
