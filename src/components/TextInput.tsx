import  {
  forwardRef,
  useEffect,
  useRef,
  InputHTMLAttributes,
} from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isFocused?: boolean;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ type = "text", className = "", isFocused = false, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const effectiveRef = ref || inputRef;

    useEffect(() => {
      if (isFocused && effectiveRef.current) {
        effectiveRef.current.focus();
      }
    }, [isFocused, effectiveRef]);

    return (
      <input
        {...props}
        type={type}
        className={`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ${className}`}
        ref={effectiveRef}
      />
    );
  }
);

export default TextInput;
