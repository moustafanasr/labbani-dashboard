import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

// تعريف الـ variants عشان نقدر نغير لون وحجم الزر بسهولة
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-[#3E421C] text-white hover:bg-[#4E5323]",
        outline: "bg-transparent border border-[#F3F3F3] text-[#1C1C1C] hover:bg-[#F8F8F2]",
        danger: "bg-[#DC2626] text-white hover:bg-[#B91C1C]",
        ghost: "hover:bg-[#F8F8F2] text-[#666666]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'danger' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children: React.ReactNode;
}

const Button = ({ className, variant, size, children, ...props }: ButtonProps) => {
  return (
    <button 
      className={buttonVariants({ variant, size, className })} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;