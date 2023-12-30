import { cva, type VariantProps } from "class-variance-authority";
import {
  forwardRef,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "../../../utils";

const stepperContainerStyles = cva(["flex"], {
  variants: {
    orientation: {
      horizontal: "flex-col",
      vertical: "flex-row",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

const stepsContainerStyles = cva(["flex"], {
  variants: {
    orientation: {
      horizontal: "flex-row items-start justify-center",
      vertical: "flex-col",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

const stepStyles = cva(["flex", "items-start", "relative"], {
  variants: {
    orientation: {
      horizontal: "flex-col text-center items-center",
      vertical: "flex-row w-full",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

const stepIndicatorStyles = cva(
  [
    "flex",
    "items-center",
    "justify-center",
    "rounded-full",
    "border-2",
    "font-medium",
    "transition-all",
    "duration-200",
    "flex-shrink-0",
    "relative",
    "z-10",
    "bg-white",
  ],
  {
    variants: {
      status: {
        pending: "border-gray-300 bg-white text-gray-500",
        active:
          "border-blue-500 bg-blue-500 text-white shadow-lg shadow-blue-500/25",
        completed:
          "border-green-500 bg-green-500 text-white shadow-lg shadow-green-500/25",
        error:
          "border-red-500 bg-red-500 text-white shadow-lg shadow-red-500/25",
        warning:
          "border-yellow-500 bg-yellow-500 text-white shadow-lg shadow-yellow-500/25",
      },
      size: {
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
        xl: "h-14 w-14 text-lg",
      },
    },
    defaultVariants: {
      status: "pending",
      size: "md",
    },
  }
);

const stepLabelStyles = cva(
  ["text-sm", "font-medium", "transition-colors", "duration-200"],
  {
    variants: {
      status: {
        pending: "text-gray-500",
        active: "text-blue-600",
        completed: "text-green-600",
        error: "text-red-600",
        warning: "text-yellow-600",
      },
      orientation: {
        horizontal: "mt-3",
        vertical: "ml-4",
      },
    },
    defaultVariants: {
      status: "pending",
      orientation: "vertical",
    },
  }
);

const stepConnectorStyles = cva(
  ["transition-colors", "duration-200", "absolute"],
  {
    variants: {
      orientation: {
        horizontal: "h-0.5 z-0",
        vertical: "w-0.5 transform -translate-x-1/2 z-0",
      },
      status: {
        pending: "bg-gray-300",
        completed: "bg-green-500",
        active: "bg-blue-500",
        error: "bg-red-500",
        warning: "bg-yellow-500",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
        xl: "",
      },
    },
    defaultVariants: {
      orientation: "vertical",
      status: "pending",
      size: "md",
    },
    compoundVariants: [
      // Vertical connector positioning based on size
      {
        orientation: "vertical",
        size: "sm",
        class: "left-4 top-8",
      },
      {
        orientation: "vertical",
        size: "md",
        class: "left-5 top-10",
      },
      {
        orientation: "vertical",
        size: "lg",
        class: "left-6 top-12",
      },
      {
        orientation: "vertical",
        size: "xl",
        class: "left-7 top-14",
      },
      // Horizontal connector positioning based on size
      {
        orientation: "horizontal",
        size: "sm",
        class: "top-4 left-1/2 transform -translate-x-1/2",
      },
      {
        orientation: "horizontal",
        size: "md",
        class: "top-5 left-1/2 transform -translate-x-1/2",
      },
      {
        orientation: "horizontal",
        size: "lg",
        class: "top-6 left-1/2 transform -translate-x-1/2",
      },
      {
        orientation: "horizontal",
        size: "xl",
        class: "top-7 left-1/2 transform -translate-x-1/2",
      },
    ],
  }
);

const contentStyles = cva(["transition-all", "duration-200"], {
  variants: {
    orientation: {
      horizontal: "mt-8 text-center",
      vertical: "ml-8",
    },
    position: {
      left: "order-first mr-8 ml-0",
      right: "order-last ml-8",
    },
  },
  defaultVariants: {
    orientation: "vertical",
    position: "right",
  },
});

export type StepStatus =
  | "pending"
  | "active"
  | "completed"
  | "error"
  | "warning";

export type Step = {
  id: string;
  label?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  status?: StepStatus;
};

export type StepperProps = ComponentProps<"div"> &
  VariantProps<typeof stepperContainerStyles> & {
    steps: Step[];
    currentStep: number;
    currentStepStatus?: StepStatus;
    content?:
      | ReactNode
      | Element
      | string
      | ReactElement
      | ReactElement<any>
      | ReactNode[]
      | any;
    orientation?: "horizontal" | "vertical";
    contentPosition?: "left" | "right";
    showContentOnVertical?: boolean;
    showContentOnHorizontal?: boolean;
    size?: "sm" | "md" | "lg" | "xl";
    onStepClick?: (stepIndex: number) => void;
    clickableSteps?: boolean;
  };

export const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      steps,
      currentStep,
      currentStepStatus = "active",
      content,
      orientation = "vertical",
      contentPosition = "right",
      showContentOnVertical = true,
      showContentOnHorizontal = true,
      size = "md",
      onStepClick,
      clickableSteps = false,
      className,
      ...props
    },
    ref
  ) => {
    const getStepStatus = (stepIndex: number): StepStatus => {
      const step = steps[stepIndex];

      // If step has explicit status, use it
      if (step?.status) return step.status;

      // Otherwise determine based on current step
      if (stepIndex < currentStep) return "completed";
      if (stepIndex === currentStep) return currentStepStatus;
      return "pending";
    };

    const getConnectorStatus = (stepIndex: number): StepStatus => {
      // The connector represents the line going INTO the NEXT step
      // So we check the status of the step we're connecting TO (stepIndex + 1)
      const nextStepIndex = stepIndex + 1;

      if (nextStepIndex < currentStep) return "completed";
      if (nextStepIndex === currentStep) return currentStepStatus;
      return "pending";
    };

    const handleStepClick = (stepIndex: number) => {
      if (clickableSteps && onStepClick) {
        onStepClick(stepIndex);
      }
    };

    const renderStepIndicator = (
      step: Step,
      stepIndex: number,
      status: StepStatus
    ) => {
      const isClickable = clickableSteps && onStepClick;

      const indicatorContent = step.icon ? (
        <span className="flex items-center justify-center">{step.icon}</span>
      ) : (
        <span>{stepIndex + 1}</span>
      );

      const IndicatorComponent = isClickable ? "button" : "div";

      return (
        <IndicatorComponent
          type={isClickable ? "button" : undefined}
          className={cn(
            stepIndicatorStyles({ status, size }),
            isClickable &&
              "cursor-pointer hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2",
            isClickable && status === "pending" && "hover:border-gray-400",
            isClickable && status === "active" && "focus:ring-blue-500",
            isClickable && status === "completed" && "focus:ring-green-500"
          )}
          onClick={isClickable ? () => handleStepClick(stepIndex) : undefined}
          disabled={isClickable ? false : undefined}
        >
          {indicatorContent}
        </IndicatorComponent>
      );
    };

    const getConnectorHeight = (_stepIndex: number) => {
      if (orientation === "horizontal") {
        // For horizontal, calculate width to next step
        const stepWidth = 100 / (steps.length - 1);
        return `${stepWidth}%`;
      } else {
        // For vertical, use fixed height between steps
        return "3rem";
      }
    };

    const renderStep = (step: Step, stepIndex: number) => {
      const status = getStepStatus(stepIndex);
      const isLast = stepIndex === steps.length - 1;

      return (
        <div
          key={step.id}
          className={cn(
            stepStyles({ orientation }),
            orientation === "horizontal" ? "flex-1 relative" : "pb-8 last:pb-0"
          )}
        >
          {/* Step indicator and label container */}
          <div
            className={cn(
              "flex items-start relative",
              orientation === "horizontal"
                ? "flex-col items-center w-full"
                : "flex-row w-full"
            )}
          >
            {renderStepIndicator(step, stepIndex, status)}

            {step.label && (
              <div className={stepLabelStyles({ status, orientation })}>
                <div className="font-medium leading-tight">{step.label}</div>
                {step.description && (
                  <div className="text-xs text-gray-500 mt-1 leading-relaxed">
                    {step.description}
                  </div>
                )}
              </div>
            )}

            {/* Connector line */}
            {!isLast && (
              <>
                {orientation === "horizontal" ? (
                  <div
                    className={cn(
                      stepConnectorStyles({
                        orientation,
                        status: getConnectorStatus(stepIndex),
                        size,
                      })
                    )}
                    style={{
                      width: `calc(100% + ${24}px)`, // 24px gap between steps
                      right: `-${12}px`, // Half the gap to center
                    }}
                  />
                ) : (
                  <div
                    className={cn(
                      stepConnectorStyles({
                        orientation,
                        status: getConnectorStatus(stepIndex),
                        size,
                      })
                    )}
                    style={{ height: getConnectorHeight(stepIndex) }}
                  />
                )}
              </>
            )}
          </div>
        </div>
      );
    };

    const showContent =
      orientation === "vertical"
        ? showContentOnVertical
        : showContentOnHorizontal;

    return (
      <div
        ref={ref}
        className={cn(stepperContainerStyles({ orientation }), className)}
        {...props}
      >
        {/* Content on left (vertical only) */}
        {orientation === "vertical" &&
          contentPosition === "left" &&
          showContent &&
          content && (
            <div className={contentStyles({ orientation, position: "left" })}>
              {content}
            </div>
          )}

        {/* Steps */}
        <div className={stepsContainerStyles({ orientation })}>
          {steps.map((step, index) => renderStep(step, index))}
        </div>

        {/* Content on right (vertical) or bottom (horizontal) */}
        {showContent && content && (
          <div
            className={cn(
              contentStyles({ orientation, position: contentPosition }),
              orientation === "horizontal" && "order-last"
            )}
          >
            {content}
          </div>
        )}
      </div>
    );
  }
);

Stepper.displayName = "Stepper";
