import React, {
  useState,
  useId,
  createContext,
  useContext,
  ReactNode,
  FC,
  useMemo,
} from "react";
import { Text } from "lucide-react"; // Generic Text icon as default, others for specific types
import { cn } from "/imports/utils";

// 1. Define TypeScript Interfaces for Props and Context
interface InputContextType {
  inputId: string;
  type: "text" | "email" | "password" | "tel";
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onChange?: (newValue: string) => void;
  isRequired: boolean;
  formatBrazilianPhone: (val: string) => string;
}

// 1. Create a Context for the Input Components
// This context will pass down common props and state management functions
// from Input.Root to its children, making them truly "headless" in terms of prop drilling.
const InputContext = createContext<InputContextType | null>(null);

// Helper function to format phone numbers to Brazilian standard (XX) XXXXX-XXXX or (XX) XXXX-XXXX
const formatBrazilianPhone = (val: string): string => {
  if (!val) return "";
  const digitsOnly = val.replace(/\D/g, ""); // Remove all non-digit characters

  // Apply mask based on the number of digits
  if (digitsOnly.length <= 2) {
    return `(${digitsOnly}`;
  }
  if (digitsOnly.length <= 6) {
    return `(${digitsOnly.substring(0, 2)}) ${digitsOnly.substring(2)}`;
  }
  if (digitsOnly.length <= 10) {
    // Handles (XX) XXXX-XXXX (8 digits after DDD)
    return `(${digitsOnly.substring(0, 2)}) ${digitsOnly.substring(
      2,
      6
    )}-${digitsOnly.substring(6)}`;
  }
  // Handles (XX) XXXXX-XXXX (9 digits after DDD)
  return `(${digitsOnly.substring(0, 2)}) ${digitsOnly.substring(
    2,
    7
  )}-${digitsOnly.substring(7, 11)}`;
};

interface InputRootProps {
  children: ReactNode;
  type?: "text" | "email" | "password" | "tel";
  initialValue?: string;
  onChange?: (newValue: string) => void;
  required?: boolean;
}

// Input.Root Component: The main container and state manager for the input field.
// It uses React Context to pass down necessary values to its sub-components.
const InputRoot: FC<InputRootProps> = ({
  children,
  type = "text",
  initialValue = "",
  onChange,
  required,
}) => {
  const inputId = useId(); // Unique ID for accessibility
  const [value, setValue] = useState<string>(initialValue);

  // Determine if the input is required: use provided 'required' prop or a default based on 'type'.
  const isRequired =
    required !== undefined
      ? required
      : type === "email" || type === "password" || type === "tel";

  // Value provided to the context
  const contextValue: InputContextType = {
    inputId,
    type,
    value,
    setValue,
    onChange,
    isRequired,
    formatBrazilianPhone, // Provide the phone formatting function
  };

  return (
    <InputContext.Provider value={contextValue}>
      <div className={"relative mb-4"}>{children}</div>
    </InputContext.Provider>
  );
};

interface InputLabelProps {
  children: ReactNode;
}

// Input.Label Component: Renders the label for the input field.
// It consumes the inputId from the context to link with the Input.Field.
const InputLabel: FC<InputLabelProps> = ({ children }) => {
  const context = useContext(InputContext);
  if (!context) {
    console.error("Input.Label must be used inside Input.Root.");
    return null;
  }
  const { inputId } = context;

  return (
    <label
      htmlFor={inputId}
      className="block text-sm font-medium text-slate-700 mb-2"
    >
      {children}
    </label>
  );
};

interface InputIconProps {
  IconComponent?: FC<any>; // Type for a React functional component
}

// Input.Icon Component: Renders an icon inside the input container.
const InputIcon: FC<InputIconProps> = ({ IconComponent }) => {
  // Use a generic Text icon as default if no specific IconComponent is provided.
  const ResolvedIconComponent = useMemo(
    () => IconComponent || Text,
    [IconComponent]
  );
  return (
    <ResolvedIconComponent
      className="absolute left-3 transform -translate-y-1/2 top-1/2  text-slate-400 z-10"
      size={18}
    />
  );
};

interface InputFieldProps {
  placeholder?: string;
  error?: string;
}

// Input.Field Component: Renders the actual input element.
// It consumes necessary props (value, setValue, type, id, isRequired) from the context.
const InputField: FC<InputFieldProps> = ({ placeholder, error }) => {
  const context = useContext(InputContext);
  if (!context) {
    console.error("Input.Field must be used inside Input.Root.");
    return null;
  }
  const {
    inputId,
    type,
    value,
    setValue,
    onChange,
    isRequired,
    formatBrazilianPhone,
  } = context;

  // Determine the placeholder text: use provided 'placeholder' prop or a default based on 'type'.
  const resolvedPlaceholder =
    placeholder ||
    (() => {
      switch (type) {
        case "email":
          return "seu@email.com";
        case "tel":
          return "(XX) XXXXX-XXXX";
        case "password":
          return "••••••••";
        default:
          return "Digite aqui...";
      }
    })();

  // Handler for when the input value changes.
  // It updates the internal state and applies specific formatting if needed.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    if (type === "tel") {
      newValue = formatBrazilianPhone(newValue);
    }

    setValue(newValue);
    // Call the external onChange handler if provided, passing the new value.
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="relative">
      {/* The actual input field */}
      <input
        id={inputId} // Unique ID for accessibility
        type={type} // HTML input type
        value={value}
        onChange={handleChange}
        className={cn(
          "w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200",
          error && "border-danger"
        )}
        placeholder={resolvedPlaceholder}
        required={isRequired} // Set required attribute
      />
      {error && (
        <p className="absolute -bottom-6 left-0 text-sm text-danger">{error}</p>
      )}
    </div>
  );
};

// Assign sub-components to the Input object for compound component pattern
const Input = {
  Root: InputRoot,
  Label: InputLabel,
  Icon: InputIcon,
  Field: InputField,
};
export default Input;
