"use client";

import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-400">
        {label}
      </label>
      <div className="mt-1">
        <input
          {...register(id, { required })}
          type={type}
          name={id}
          id={id}
          autoComplete={id}
          className={clsx(
            `
          bg-neutral-300 
          form-input
          block
          w-full
          rounded-md
          border-0
          py-1.5
          text-slate-900
          shadow-sm
          rind-1
          ring-inset
          ring-slate-300
          placeholder:text-slate-200
          focus:ring-2
          focus:ring-inset
          focus:ring-slate-100
          focus:bg-neutral-100
          sm:text-sm
          sm:leading-6`,
            errors[id] && "focus:ring-red-500",
            disabled && "opacity-50 cursor-default"
          )}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default Input;
