import React, { useState } from 'react';
import { Eye, EyeOff, type LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', icon: Icon, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-sm font-medium text-text-secondary ml-1">
            {label}
          </label>
        )}
        <div className="relative flex items-center group">
          {Icon && (
            <div className="absolute left-4 text-text-muted group-focus-within:text-brand-accent-neon transition-colors duration-200">
              <Icon size={18} />
            </div>
          )}
          <input
            ref={ref}
            type={inputType}
            className={`
              flex h-11 w-full rounded-lg border border-card-border bg-bg-secondary px-4 py-2 text-sm 
              text-text-primary ring-offset-bg-dark file:border-0 file:bg-transparent 
              file:text-sm file:font-medium placeholder:text-text-muted 
              focus-visible:outline-none focus-visible:ring-2 
              focus-visible:ring-brand-accent-neon/50 focus-visible:ring-offset-2 
              disabled:cursor-not-allowed disabled:opacity-50
              transition-all duration-200
              ${Icon ? 'pl-11' : ''}
              ${isPassword ? 'pr-11' : ''}
              ${error ? 'border-red-500 focus-visible:ring-red-500' : ''}
              ${className}
            `}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 p-1 text-text-muted hover:text-brand-accent-neon transition-colors focus:outline-none"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
        {error && (
          <span className="text-xs text-red-500 ml-1">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
