import { cva, type VariantProps } from "class-variance-authority";
import {
  forwardRef,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";
import { cn } from "../../../utils";

const fileUploadStyles = cva(
  [
    "relative",
    "w-full",
    "rounded-lg",
    "border-2",
    "transition-all",
    "duration-300",
    "cursor-pointer",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
  ],
  {
    variants: {
      state: {
        idle: [
          "border-dashed",
          "border-blue-300",
          "bg-blue-50/30",
          "hover:border-blue-400",
          "hover:bg-blue-50/50",
          "focus:ring-blue-500/20",
        ],
        uploading: [
          "border-dashed",
          "border-blue-400",
          "bg-blue-50/50",
          "cursor-wait",
        ],
        success: [
          "border-solid",
          "border-green-400",
          "bg-green-50/50",
          "cursor-default",
        ],
        error: [
          "border-solid",
          "border-red-400",
          "bg-red-50/50",
          "cursor-default",
        ],
      },
      size: {
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
      },
    },
    defaultVariants: {
      state: "idle",
      size: "md",
    },
  }
);

const contentStyles = cva(["flex", "items-center", "gap-3", "w-full"]);

const iconContainerStyles = cva(
  ["flex", "items-center", "justify-center", "rounded-full", "flex-shrink-0"],
  {
    variants: {
      state: {
        idle: "bg-blue-100 text-blue-600",
        uploading: "bg-blue-100 text-blue-600",
        success: "bg-green-100 text-green-600",
        error: "bg-red-100 text-red-600",
      },
      size: {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
      },
    },
    defaultVariants: {
      state: "idle",
      size: "md",
    },
  }
);

const textStyles = cva(["flex-1", "min-w-0"], {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type FileUploadState = "idle" | "uploading" | "success" | "error";

export type FileUploadProps = Omit<ComponentProps<"div">, "onError"> &
  VariantProps<typeof fileUploadStyles> & {
    // Required props
    title: string;
    acceptedFiles: string[];
    uploadFn: (file: File) => Promise<any>;
    onRemove?: () => void;
    onUploadComplete?: (data: any, file: File) => void;
    onDelete?: () => void;

    // Optional props
    maxUploadSize?: number; // in bytes
    onFileSelected?: (file: File) => void;
    onUploadFailed?: (error: any, file: File) => void;

    // Icon customization
    uploadIcon?: ReactNode;
    successIcon?: ReactNode;
    errorIcon?: ReactNode;
    loadingIcon?: ReactNode;

    // UI customization
    size?: "sm" | "md" | "lg";
    showFileSize?: boolean;
    disabled?: boolean;
  };

export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      title,
      acceptedFiles,
      uploadFn,
      onRemove,
      onUploadComplete,
      onDelete,
      maxUploadSize = 2 * 1024 * 1024, // 2MB default
      onFileSelected,
      onUploadFailed,
      uploadIcon,
      successIcon,
      errorIcon,
      loadingIcon,
      size = "md",
      showFileSize = true,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const [state, setState] = useState<FileUploadState>("idle");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [_uploadData, setUploadData] = useState<any>(null);
    const [error, setError] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Default icons
    const DefaultUploadIcon = () => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17,8 12,3 7,8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    );

    const DefaultSuccessIcon = () => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M20 6L9 17l-5-5" />
      </svg>
    );

    const DefaultErrorIcon = () => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    );

    const DefaultLoadingIcon = () => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="animate-spin"
      >
        <path d="M21 12a9 9 0 11-6.219-8.56" />
      </svg>
    );

    const TrashIcon = () => (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline points="3,6 5,6 21,6" />
        <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2" />
      </svg>
    );

    // File validation
    const validateFile = (file: File): string | null => {
      // Check file type
      const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;
      const mimeType = file.type.toLowerCase();

      const isValidType = acceptedFiles.some(
        (accept) =>
          accept === fileExtension ||
          accept === mimeType ||
          (accept.endsWith("/*") &&
            mimeType.startsWith(accept.replace("/*", "")))
      );

      if (!isValidType) {
        return `File type not accepted. Accepted: ${acceptedFiles.join(", ")}`;
      }

      // Check file size
      if (file.size > maxUploadSize) {
        const maxSizeMB = (maxUploadSize / (1024 * 1024)).toFixed(1);
        return `File size exceeds ${maxSizeMB}MB limit`;
      }

      return null;
    };

    // Format file size
    const formatFileSize = (bytes: number): string => {
      if (bytes < 1024) return `${bytes}B`;
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
      return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
    };

    // Handle file selection
    const handleFileSelect = async (file: File) => {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        setState("error");
        setSelectedFile(file);
        onUploadFailed?.(validationError, file);
        return;
      }

      setSelectedFile(file);
      setError("");
      setState("uploading");
      onFileSelected?.(file);

      try {
        const result = await uploadFn(file);

        if (result) {
          setUploadData(result);
          setState("success");
          onUploadComplete?.(result, file);
        } else {
          throw new Error("Upload failed");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Upload failed";
        setError(errorMessage);
        setState("error");
        onUploadFailed?.(err, file);
      }
    };

    // Handle file input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFileSelect(file);
      }
    };

    // Handle click
    const handleClick = () => {
      if (disabled || state === "uploading") return;

      if (state === "idle") {
        fileInputRef.current?.click();
      }
    };

    // Handle retry
    const handleRetry = () => {
      setState("idle");
      setSelectedFile(null);
      setUploadData(null);
      setError("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    // Handle delete
    const handleDelete = () => {
      onDelete?.();
      handleRetry();
    };

    // Get current icon
    const getCurrentIcon = () => {
      switch (state) {
        case "uploading":
          return loadingIcon || <DefaultLoadingIcon />;
        case "success":
          return successIcon || <DefaultSuccessIcon />;
        case "error":
          return errorIcon || <DefaultErrorIcon />;
        default:
          return uploadIcon || <DefaultUploadIcon />;
      }
    };

    // Get display text
    const getDisplayText = () => {
      switch (state) {
        case "uploading":
          return "Uploading...";
        case "success":
          return selectedFile?.name || "Upload Successful";
        case "error":
          return selectedFile?.name || "Failed to Upload";
        default:
          return title;
      }
    };

    // Get subtitle text
    const getSubtitle = () => {
      if (state === "idle") {
        const maxSizeMB = (maxUploadSize / (1024 * 1024)).toFixed(0);
        return `${acceptedFiles.join(", ")} • Max. ${maxSizeMB}MB`;
      }

      if (state === "error" && error) {
        return error;
      }

      if (selectedFile && showFileSize) {
        return formatFileSize(selectedFile.size);
      }

      return "";
    };

    return (
      <div className="w-full">
        <div
          ref={ref}
          className={cn(
            fileUploadStyles({ state, size }),
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          onClick={handleClick}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
          {...props}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedFiles.join(",")}
            onChange={handleInputChange}
            disabled={disabled}
            className="hidden"
          />

          <div className={contentStyles()}>
            {/* Icon */}
            <div className={iconContainerStyles({ state, size })}>
              {getCurrentIcon()}
            </div>

            {/* Text Content */}
            <div className={cn(textStyles({ size }), "flex-1")}>
              <div
                className={cn(
                  "font-medium",
                  state === "error"
                    ? "text-red-700"
                    : state === "success"
                    ? "text-green-700"
                    : "text-gray-900"
                )}
              >
                {getDisplayText()}
              </div>

              {getSubtitle() && (
                <div
                  className={cn(
                    "mt-1",
                    size === "sm" ? "text-xs" : "text-xs",
                    state === "error" ? "text-red-600" : "text-gray-500"
                  )}
                >
                  {getSubtitle()}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {state === "success" && onDelete && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                className="flex-shrink-0 p-1 text-red-500 hover:text-red-700 hover:bg-red-100 rounded transition-colors"
                aria-label="Delete file"
              >
                <TrashIcon />
              </button>
            )}

            {state === "error" && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRetry();
                }}
                className="flex-shrink-0 px-3 py-1 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
              >
                Retry
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
);

FileUpload.displayName = "FileUpload";
