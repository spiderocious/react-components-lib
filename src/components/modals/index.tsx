import { cva } from "class-variance-authority";
import { forwardRef, useEffect, useState, type ComponentProps } from "react";
import { cn } from "../../utils";
import {
  type ActionModalOptions,
  type ButtonType,
  type LaunchModalOptions,
  type Modal,
} from "./Context";

const overlayStyles = cva(
  [
    "fixed",
    "inset-0",
    "z-50",
    "flex",
    "items-center",
    "justify-center",
    "bg-black/50",
    "backdrop-blur-sm",
    "transition-all",
    "duration-300",
  ],
  {
    variants: {
      variant: {
        center: "p-4",
        bottomSheet: "items-end p-0 md:items-center md:p-4",
        fullscreen: "p-0 md:p-4",
        sidePanel: "items-stretch p-0",
      },
      state: {
        entering: "opacity-0",
        entered: "opacity-100",
        exiting: "opacity-0",
      },
    },
    defaultVariants: {
      variant: "center",
      state: "entering",
    },
  }
);

const modalStyles = cva(
  [
    "relative",
    "bg-white",
    "shadow-xl",
    "max-h-full",
    "overflow-hidden",
    "transition-all",
    "duration-300",
    "transform",
  ],
  {
    variants: {
      variant: {
        center: ["rounded-lg", "w-full", "max-w-md", "mx-auto"],
        bottomSheet: [
          "w-full",
          "rounded-t-2xl",
          "md:rounded-lg",
          "md:w-full",
          "md:max-w-md",
          "md:mx-auto",
        ],
        fullscreen: [
          "w-full",
          "h-full",
          "md:rounded-lg",
          "md:w-full",
          "md:max-w-4xl",
          "md:max-h-[90vh]",
          "md:mx-auto",
        ],
        sidePanel: ["h-full", "w-full", "max-w-md", "md:max-w-lg"],
      },
      position: {
        left: "mr-auto",
        right: "ml-auto",
        center: "mx-auto",
      },
      state: {
        entering: "",
        entered: "",
        exiting: "",
      },
    },
    compoundVariants: [
      // Center modal animations
      {
        variant: "center",
        state: "entering",
        class: "scale-95 opacity-0",
      },
      {
        variant: "center",
        state: "entered",
        class: "scale-100 opacity-100",
      },
      {
        variant: "center",
        state: "exiting",
        class: "scale-95 opacity-0",
      },
      // Bottom sheet animations
      {
        variant: "bottomSheet",
        state: "entering",
        class: "translate-y-full md:scale-95 md:opacity-0 md:translate-y-0",
      },
      {
        variant: "bottomSheet",
        state: "entered",
        class: "translate-y-0 md:scale-100 md:opacity-100",
      },
      {
        variant: "bottomSheet",
        state: "exiting",
        class: "translate-y-full md:scale-95 md:opacity-0 md:translate-y-0",
      },
      // Fullscreen animations
      {
        variant: "fullscreen",
        state: "entering",
        class: "scale-105 opacity-0 md:scale-95",
      },
      {
        variant: "fullscreen",
        state: "entered",
        class: "scale-100 opacity-100",
      },
      {
        variant: "fullscreen",
        state: "exiting",
        class: "scale-105 opacity-0 md:scale-95",
      },
      // Side panel animations
      {
        variant: "sidePanel",
        position: "left",
        state: "entering",
        class: "-translate-x-full",
      },
      {
        variant: "sidePanel",
        position: "left",
        state: "entered",
        class: "translate-x-0",
      },
      {
        variant: "sidePanel",
        position: "left",
        state: "exiting",
        class: "-translate-x-full",
      },
      {
        variant: "sidePanel",
        position: "right",
        state: "entering",
        class: "translate-x-full",
      },
      {
        variant: "sidePanel",
        position: "right",
        state: "entered",
        class: "translate-x-0",
      },
      {
        variant: "sidePanel",
        position: "right",
        state: "exiting",
        class: "translate-x-full",
      },
    ],
    defaultVariants: {
      variant: "center",
      position: "center",
      state: "entering",
    },
  }
);

const buttonStyles = cva(
  [
    "px-4",
    "py-2",
    "rounded-md",
    "font-medium",
    "text-sm",
    "transition-colors",
    "duration-200",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed",
  ],
  {
    variants: {
      type: {
        primary: [
          "bg-blue-600",
          "text-white",
          "hover:bg-blue-700",
          "focus:ring-blue-500",
        ],
        secondary: [
          "bg-gray-200",
          "text-gray-900",
          "hover:bg-gray-300",
          "focus:ring-gray-500",
        ],
        success: [
          "bg-green-600",
          "text-white",
          "hover:bg-green-700",
          "focus:ring-green-500",
        ],
        danger: [
          "bg-red-600",
          "text-white",
          "hover:bg-red-700",
          "focus:ring-red-500",
        ],
        warning: [
          "bg-yellow-600",
          "text-white",
          "hover:bg-yellow-700",
          "focus:ring-yellow-500",
        ],
      },
    },
    defaultVariants: {
      type: "primary",
    },
  }
);

type AnimationState = "entering" | "entered" | "exiting";

export interface ModalComponentProps extends ComponentProps<"div"> {
  modal: Modal;
  onClose: (id: string) => void;
}

export const ModalComponent = forwardRef<HTMLDivElement, ModalComponentProps>(
  ({ modal, onClose, className, ...props }, ref) => {
    const [animationState, setAnimationState] =
      useState<AnimationState>("entering");
    const options = modal.options;

    // Determine if it's an action modal or launch modal
    const isActionModal = !("component" in options);
    const actionOptions = isActionModal
      ? (options as ActionModalOptions)
      : ({} as ActionModalOptions);
    const launchOptions = !isActionModal
      ? (options as LaunchModalOptions)
      : ({} as LaunchModalOptions);

    // Animation handling
    useEffect(() => {
      const enterTimer = setTimeout(() => setAnimationState("entered"), 50);
      return () => clearTimeout(enterTimer);
    }, []);

    const handleClose = () => {
      setAnimationState("exiting");
      setTimeout(() => {
        onClose(modal.id);
        options.onClose?.();
      }, 300);
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget && options.allowOutsideClickClose) {
        handleClose();
      }
    };

    const handleConfirm = async () => {
      if (actionOptions.onConfirm) {
        await actionOptions.onConfirm();
      }
      handleClose();
    };

    const handleCancel = () => {
      if (actionOptions.onCancel) {
        actionOptions.onCancel();
      }
      handleClose();
    };

    // Determine variant and position
    const variant = options.variant || "center";
    const position =
      variant === "sidePanel" ? options.sidePanelPosition || "right" : "center";

    const CloseIcon = () => (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    );

    const renderButton = (
      text: string,
      type: ButtonType,
      onClick: () => void,
      className?: string
    ) => (
      <button
        type="button"
        className={cn(buttonStyles({ type }), className)}
        onClick={onClick}
      >
        {text}
      </button>
    );

    return (
      <div
        className={cn(
          overlayStyles({ variant, state: animationState }),
          options.overlayClassName
        )}
        onClick={handleOverlayClick}
        {...props}
      >
        <div
          ref={ref}
          className={cn(
            modalStyles({ variant, position, state: animationState }),
            options.containerClassName,
            className
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby={options.title ? "modal-title" : undefined}
          aria-describedby={
            options.description ? "modal-description" : undefined
          }
        >
          {/* Close button */}
          {options.showCloseButton && (
            <button
              type="button"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
              onClick={handleClose}
              aria-label="Close modal"
            >
              <CloseIcon />
            </button>
          )}

          <div className={cn("p-6", options.contentClassName)}>
            {/* Launch modal content */}
            {!isActionModal && launchOptions.component}

            {/* Action modal content */}
            {isActionModal && (
              <>
                {/* Icon */}
                {options.icon && <div className="mb-4">{options.icon}</div>}

                {/* Title */}
                {options.title && (
                  <h3
                    id="modal-title"
                    className="text-lg font-medium text-gray-900 mb-2"
                  >
                    {options.title}
                  </h3>
                )}

                {/* Description */}
                {options.description && (
                  <div
                    id="modal-description"
                    className="text-sm text-gray-600 mb-6"
                  >
                    {options.description}
                  </div>
                )}

                {/* Action buttons */}
                {(actionOptions.showConfirmButton ||
                  actionOptions.showCancelButton) && (
                  <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                    {actionOptions.showCancelButton && (
                      <div className="flex-1 sm:flex-none">
                        {renderButton(
                          actionOptions.cancelButtonText || "Cancel",
                          actionOptions.cancelButtonType || "secondary",
                          handleCancel,
                          actionOptions.cancelButtonClassName
                        )}
                      </div>
                    )}
                    {actionOptions.showConfirmButton && (
                      <div className="flex-1 sm:flex-none">
                        {renderButton(
                          actionOptions.confirmButtonText || "Confirm",
                          actionOptions.confirmButtonType || "primary",
                          handleConfirm,
                          actionOptions.confirmButtonClassName
                        )}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
);

ModalComponent.displayName = "ModalComponent";
