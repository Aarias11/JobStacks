import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  variant?: "default" | "password";
  error?: boolean;
  helperText?: string;
};

export default function Input({
  label,
  variant = "default",
  className = "",
  type,
  error = false,
  helperText,
  ...rest
}: InputProps) {
  const [show, setShow] = useState(false);
  const isPassword = variant === "password";
  const inputType = isPassword ? (show ? "text" : "password") : type || "text";

  return (
    <div className="flex flex-col gap-2 relative">
      {label && <label className="text-sm text-secondary-text">{label}</label>}

      <div className="relative">
        <input
          type={inputType}
          className={`w-[466px] h-[43px] bg-background rounded-[12px] border px-5 text-[14px] pr-12
            ${error ? "border-red-500" : "border-[#272727]"} 
            ${className}`}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((prev) => !prev)}
            className="absolute right-5 top-5 -translate-y-1/2 text-secondary-text"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && helperText && (
        <p className="text-xs text-red-500">{helperText}</p>
      )}
    </div>
  );
}
