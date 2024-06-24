import { ReactNode, LabelHTMLAttributes } from 'react';

interface InputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  value?: string;
  className?: string;
  children?: ReactNode;
}

export default function InputLabel({ value, className = '', children, ...props }: InputLabelProps): JSX.Element {
    return (
        <label {...props} className={`block font-medium text-sm text-gray-700 ${className}`}>
            {value ? value : children}
        </label>
    );
}