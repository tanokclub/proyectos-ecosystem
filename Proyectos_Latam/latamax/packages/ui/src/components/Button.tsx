import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button = ({ variant = 'primary', className, ...props }: ButtonProps) => {
  const baseStyles = 'px-4 py-2 rounded-full font-bold transition';
  const variantStyles = variant === 'primary' ? 'bg-primary text-white hover:bg-primary/90' : 'border border-surface hover:bg-surface';
  
  return (
    <button 
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    />
  );
};
