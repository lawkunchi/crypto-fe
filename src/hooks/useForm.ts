import { useState } from 'react';

interface ValidationRules {
  required?: boolean;
  pattern?: RegExp;
  custom?: (value: string) => boolean;
}

interface UseFormOptions {
  validations: { [key: string]: ValidationRules };
  initialValues: { [key: string]: any };
  onSubmit: () => void;
}

export const useForm = ({ validations, initialValues, onSubmit }: UseFormOptions) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setValues({ ...values, [name]: newValue });
    validateField(name, newValue);
  };

  const validateField = (name: string, value: any) => {
    let newError = '';
    if (validations[name]?.required && !value) {
      newError = 'This field is required';
    } else if (validations[name]?.pattern && !validations[name].pattern.test(value)) {
      newError = 'Format is incorrect';
    } else if (validations[name]?.custom && !validations[name].custom(value)) {
      newError = 'Custom validation failed';
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: newError }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Form Submitted', values);
      setIsSubmitting(false);
      onSubmit();
    }, 2000);
  };

  return { values, errors, handleChange, handleSubmit, isSubmitting };
};