import React from "react";
import clsx from "clsx";

const Textbox = React.forwardRef(
  ({ type, placeholder, label, className, register, name, error }, ref) => {
    return (
      <div className='flex flex-col gap-1 w-full'>
        {label && (
          <label htmlFor={name} className='text-gray-800'>
            {label}
          </label>
        )}

        <input
          type={type}
          name={name}
          placeholder={placeholder}
          ref={ref}
          {...register}
          aria-invalid={error ? "true" : "false"}
          className={clsx(
            "border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 bg-transparent rounded-md outline-none focus:ring-2 focus:ring-blue-400",
            className
          )}
        />

        {error && (
          <p className='text-red-600 text-xs mt-1'>{error}</p>
        )}
      </div>
    );
  }
);

export default Textbox;