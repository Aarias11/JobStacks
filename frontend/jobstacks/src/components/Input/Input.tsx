import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  variant?: 'default' | 'password';
};

export default function Input({ label, variant = 'default', className = '', type, ...rest }: InputProps) {
  const [show, setShow] = useState(false);
  const isPassword = variant === 'password';
  const inputType = isPassword ? (show ? 'text' : 'password') : type || 'text';

  return (
    <div className="flex flex-col gap-2 relative">
      {label && <label className="text-sm text-secondary-text">{label}</label>}
      <div className="relative">
        <input
          type={inputType}
          className={`w-[466px] h-[43px] bg-background rounded-[12px] border border-[#272727] px-5 text-[14px] pr-12 ${className}`}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((prev) => !prev)}
            className="relative transform -translate-y-1/2 text-secondary-text"
          >
            {show ? <EyeOff className='absolute bottom-[-5] right-5' size={18} /> : <Eye className='absolute bottom-[-5] right-5' size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}