import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = ({ className, icon, ...props }: InputProps) => {
  return (
    <div className="relative w-full">
      {icon && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A1A1A1]">
          {icon}
        </div>
      )}
      <input
        className={`w-full bg-white border border-[#F3F3F3] rounded-lg py-2 px-4 text-sm text-[#1C1C1C] placeholder:text-[#A1A1A1] focus:outline-none focus:border-[#3E421C] ${icon ? 'pr-10' : ''} ${className || ''}`}
        {...props}
      />
    </div>
  );
};

export default Input;