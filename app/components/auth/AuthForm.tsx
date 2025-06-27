interface FormFieldProps {
  id: string;
  label: string;
  type: string;
  autoComplete?: string;
  placeholder?: string;
  required?: boolean;
}

export function FormField({
  id,
  label,
  type,
  autoComplete,
  placeholder,
  required = false,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs sm:text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1">
        <input
          id={id}
          name={id}
          type={type}
          autoComplete={autoComplete}
          required={required}
          className="appearance-none block w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

export function Divider({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-2 bg-white text-gray-500">{children}</span>
      </div>
    </div>
  );
}
