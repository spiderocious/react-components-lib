import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, useEffect, useState, type ComponentProps } from "react";
import { cn } from "../../../utils";

const phoneInputStyles = cva(
  [
    "w-full",
    "rounded-md",
    "border",
    "bg-white",
    "text-sm",
    "transition-all",
    "duration-200",
    "placeholder:text-gray-400",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-1",
    "disabled:cursor-not-allowed",
    "disabled:bg-gray-50",
    "disabled:text-gray-500",
    "flex",
    "items-center",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-gray-200",
          "focus-within:border-blue-500",
          "focus-within:ring-blue-500/20",
        ],
        error: [
          "border-red-500",
          "focus-within:border-red-500",
          "focus-within:ring-red-500/20",
        ],
      },
      size: {
        sm: "px-2 py-1.5 text-xs",
        md: "px-3 py-2 text-sm",
        lg: "px-4 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const countrySelectStyles = cva([
  "flex",
  "items-center",
  "gap-1",
  "border-r",
  "border-gray-200",
  "pr-2",
  "mr-2",
  "cursor-pointer",
  "hover:bg-gray-50",
  "transition-colors",
  "flex-shrink-0",
]);

const inputFieldStyles = cva([
  "flex-1",
  "border-0",
  "bg-transparent",
  "p-0",
  "focus:outline-none",
  "focus:ring-0",
]);

// Sample country data
const countries = [
  { code: "NG", dialCode: "+234", flag: "🇳🇬", name: "Nigeria" },
  { code: "US", dialCode: "+1", flag: "🇺🇸", name: "United States" },
  { code: "GB", dialCode: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "FR", dialCode: "+33", flag: "🇫🇷", name: "France" },
  { code: "DE", dialCode: "+49", flag: "🇩🇪", name: "Germany" },
];

export type PhoneNumberInputProps = Omit<ComponentProps<"input">, "size"> &
  VariantProps<typeof phoneInputStyles> & {
    value?: string;
    onChange?: (value: string, country?: (typeof countries)[0]) => void;
    defaultCountry?: string;
    errorMessage?: string;
    regex?: RegExp;
    validateOnBlur?: boolean;
    countries?: typeof countries;
    showDropdown?: boolean;
  };

export const PhoneNumberInput = forwardRef<
  HTMLInputElement,
  PhoneNumberInputProps
>(
  (
    {
      variant,
      size,
      className,
      value = "",
      onChange,
      defaultCountry = "NG",
      errorMessage,
      regex,
      validateOnBlur = false,
      countries: customCountries = countries,
      showDropdown = true,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [selectedCountry, setSelectedCountry] = useState(
      () =>
        customCountries.find((c) => c.code === defaultCountry) ||
        customCountries[0]
    );
    const [phoneNumber, setPhoneNumber] = useState("");
    const [internalError, setInternalError] = useState<string>("");
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);

    // Parse initial value
    useEffect(() => {
      if (value) {
        // Try to extract country code and number
        const country = customCountries.find((c) =>
          value.startsWith(c.dialCode)
        );
        if (country) {
          setSelectedCountry(country);
          setPhoneNumber(value.substring(country.dialCode.length).trim());
        } else {
          setPhoneNumber(value);
        }
      }
    }, [value, customCountries]);

    // Determine if we should show error state
    const hasError = Boolean(errorMessage || internalError);
    const currentVariant = hasError ? "error" : variant;

    // Validation function
    const validatePhone = (number: string) => {
      if (!regex || !number) {
        setInternalError("");
        return;
      }

      const fullNumber = selectedCountry.dialCode + number;
      if (!regex.test(fullNumber)) {
        setInternalError(errorMessage || "Invalid phone number");
      } else {
        setInternalError("");
      }
    };

    // Handle phone number change
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newNumber = e.target.value;
      setPhoneNumber(newNumber);

      const fullNumber = selectedCountry.dialCode + newNumber;
      onChange?.(fullNumber, selectedCountry);

      if (!validateOnBlur) {
        validatePhone(newNumber);
      }
    };

    // Handle country selection
    const handleCountrySelect = (country: (typeof countries)[0]) => {
      setSelectedCountry(country);
      setShowCountryDropdown(false);

      const fullNumber = country.dialCode + phoneNumber;
      onChange?.(fullNumber, country);
    };

    // Handle blur
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(e);

      if (validateOnBlur) {
        validatePhone(phoneNumber);
      }
    };

    const ChevronDownIcon = () => (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    );

    return (
      <div className="w-full">
        <div className="relative">
          <div
            className={cn(
              phoneInputStyles({ variant: currentVariant, size }),
              className
            )}
          >
            {/* Country Selector */}
            <div className="relative">
              <button
                type="button"
                className={countrySelectStyles()}
                onClick={() =>
                  showDropdown && setShowCountryDropdown(!showCountryDropdown)
                }
                disabled={!showDropdown}
              >
                <span className="text-base">{selectedCountry.flag}</span>
                <span className="text-sm font-medium">
                  {selectedCountry.dialCode}
                </span>
                {showDropdown && <ChevronDownIcon />}
              </button>

              {/* Country Dropdown */}
              {showCountryDropdown && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                  {customCountries.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-sm"
                      onClick={() => handleCountrySelect(country)}
                    >
                      <span>{country.flag}</span>
                      <span className="font-medium">{country.dialCode}</span>
                      <span className="text-gray-600">{country.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Phone Input */}
            <input
              ref={ref}
              type="tel"
              className={inputFieldStyles()}
              value={phoneNumber}
              onChange={handlePhoneChange}
              onBlur={handleBlur}
              {...props}
            />
          </div>

          {/* Click outside handler */}
          {showCountryDropdown && (
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowCountryDropdown(false)}
            />
          )}
        </div>

        {(errorMessage || internalError) && (
          <p className="mt-1 text-xs text-red-500 animate-in slide-in-from-top-1 duration-200">
            {errorMessage || internalError}
          </p>
        )}
      </div>
    );
  }
);

PhoneNumberInput.displayName = "PhoneNumberInput";
