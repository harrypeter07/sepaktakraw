import { TextareaHTMLAttributes, forwardRef } from "react";

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  rows?: number;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, helperText, required = false, rows = 4, className = '', ...props }, ref) => {
    const textareaClasses = `form-textarea ${error ? 'border-bright-red' : ''} ${className}`;
    
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-dark-gray">
            {label}
            {required && <span className="text-bright-red ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          rows={rows}
          className={textareaClasses}
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

FormTextarea.displayName = 'FormTextarea';
