import React from 'react';

export default function Button({ children, onClick = () => {}, className = '', type = 'button', disabled = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-[466px] h-[43px] bg-primary flex justify-center items-center rounded-[12px] font-semibold ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}