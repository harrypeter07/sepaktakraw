import { InputHTMLAttributes, forwardRef } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, helperText, required = false, className = '', ...props }, ref) => {
    const inputClasses = `form-input ${error ? 'border-bright-red' : ''} ${className}`;
    
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-dark-gray">
            {label}
            {required && <span className="text-bright-red ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={inputClasses}
          {...props}
        />
        {error && (
          <p className="text-sm text-bright-red">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-sm text-medium-gray">{helperText}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';
