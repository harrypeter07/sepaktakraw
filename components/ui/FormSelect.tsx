import { SelectHTMLAttributes, forwardRef } from "react";

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  options: Array<{ value: string; label: string }>;
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, error, helperText, required = false, options, className = '', ...props }, ref) => {
    const selectClasses = `form-select ${error ? 'border-bright-red' : ''} ${className}`;
    
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-dark-gray">
            {label}
            {required && <span className="text-bright-red ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          className={selectClasses}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
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

FormSelect.displayName = 'FormSelect';
