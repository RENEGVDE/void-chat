"use client";

import clsx from "clsx";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type,
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        `
            flex 
            justify-center 
            rounded-md 
            px-3 
            py-2 
            text-sm 
            font-semibold 
            focus-visible:outline 
            focus-visible:outline-2 
            focus-visible:outline-offset-2 
            `,
        disabled && "opacity-50 cursor-default",
        fullWidth && "w-full",
        secondary ? "text-slate-600" : "text-slate-100",
        danger && "bg-red-500 hover:bg-red-600 focus-visible:outline-red-600",
        !secondary &&
          !danger &&
          "bg-cyan-900 hover:bg-cyan-600 focus-visible:outline-cyan-600"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
