import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Stepper } from ".";

const meta: Meta<typeof Stepper> = {
  title: "Components/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
    contentPosition: {
      control: { type: "select" },
      options: ["left", "right"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
    },
    currentStepStatus: {
      control: { type: "select" },
      options: ["pending", "active", "completed", "error", "warning"],
    },
    showContentOnVertical: {
      control: { type: "boolean" },
    },
    showContentOnHorizontal: {
      control: { type: "boolean" },
    },
    clickableSteps: {
      control: { type: "boolean" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Sample steps data
const basicSteps = [
  {
    id: "step1",
    label: "Personal Information",
    description: "Enter your basic details",
  },
  {
    id: "step2",
    label: "Account Setup",
    description: "Configure your account settings",
  },
  {
    id: "step3",
    label: "Verification",
    description: "Verify your identity",
  },
  {
    id: "step4",
    label: "Complete",
    description: "Finish the setup process",
  },
];

const iconSteps = [
  {
    id: "step1",
    label: "User Info",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    id: "step2",
    label: "Payment",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  {
    id: "step3",
    label: "Confirmation",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M20 6L9 17l-5-5" />
      </svg>
    ),
  },
];

// Sample content for different steps
const getStepContent = (currentStep: number) => {
  const contents = [
    <div className="p-6 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>
      </div>
    </div>,
    <div className="p-6 bg-blue-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Account Setup</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Choose a username"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Create a password"
          />
        </div>
      </div>
    </div>,
    <div className="p-6 bg-yellow-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Verification</h3>
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          We've sent a verification code to your email address. Please enter it
          below.
        </p>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Verification Code
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter verification code"
          />
        </div>
      </div>
    </div>,
    <div className="p-6 bg-green-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Setup Complete!</h3>
      <div className="text-center space-y-4">
        <div className="text-green-600 text-4xl">✓</div>
        <p className="text-sm text-gray-600">
          Your account has been successfully created and verified.
        </p>
        <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
          Get Started
        </button>
      </div>
    </div>,
  ];

  return contents[currentStep] || contents[0];
};

// Basic examples
export const Default: Story = {
  args: {
    steps: basicSteps,
    currentStep: 1,
    content: getStepContent(1),
  },
};

export const WithIcons: Story = {
  args: {
    steps: iconSteps,
    currentStep: 1,
    content: getStepContent(1),
  },
};

export const ContentOnLeft: Story = {
  args: {
    steps: basicSteps,
    currentStep: 1,
    contentPosition: "left",
    content: getStepContent(1),
  },
};

// Interactive example
export const Interactive: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = React.useState(1);

    const handleNext = () => {
      if (currentStep < basicSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    };

    const handlePrevious = () => {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
      }
    };

    const handleStepClick = (stepIndex: number) => {
      setCurrentStep(stepIndex);
    };

    return (
      <div className="space-y-6">
        <Stepper
          steps={basicSteps}
          currentStep={currentStep}
          content={
            <div className="space-y-4">
              {getStepContent(currentStep)}
              <div className="flex gap-3 justify-end">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentStep === basicSteps.length - 1}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentStep === basicSteps.length - 1 ? "Complete" : "Next"}
                </button>
              </div>
            </div>
          }
          clickableSteps
          onStepClick={handleStepClick}
        />
      </div>
    );
  },
};

// Status variations
export const StatusVariations: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-4">Active Status</h3>
        <Stepper
          steps={basicSteps}
          currentStep={1}
          currentStepStatus="active"
          showContentOnVertical={false}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-4">Error Status</h3>
        <Stepper
          steps={basicSteps}
          currentStep={1}
          currentStepStatus="error"
          showContentOnVertical={false}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-4">Warning Status</h3>
        <Stepper
          steps={basicSteps}
          currentStep={1}
          currentStepStatus="warning"
          showContentOnVertical={false}
        />
      </div>
    </div>
  ),
};

// Size variations
export const SizeVariations: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-4">Small</h3>
        <Stepper
          steps={iconSteps}
          currentStep={1}
          size="sm"
          showContentOnVertical={false}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-4">Medium</h3>
        <Stepper
          steps={iconSteps}
          currentStep={1}
          size="md"
          showContentOnVertical={false}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-4">Large</h3>
        <Stepper
          steps={iconSteps}
          currentStep={1}
          size="lg"
          showContentOnVertical={false}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-4">Extra Large</h3>
        <Stepper
          steps={iconSteps}
          currentStep={1}
          size="xl"
          showContentOnVertical={false}
        />
      </div>
    </div>
  ),
};

// Without content
export const WithoutContent: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-4">Vertical - No Content</h3>
        <Stepper
          steps={basicSteps}
          currentStep={2}
          showContentOnVertical={false}
        />
      </div>
    </div>
  ),
};

// Custom step statuses
export const CustomStatuses: Story = {
  render: () => {
    const customSteps = [
      {
        id: "step1",
        label: "Completed Step",
        description: "This step is done",
        status: "completed" as const,
      },
      {
        id: "step2",
        label: "Error Step",
        description: "This step has an error",
        status: "error" as const,
      },
      {
        id: "step3",
        label: "Warning Step",
        description: "This step has a warning",
        status: "warning" as const,
      },
      {
        id: "step4",
        label: "Pending Step",
        description: "This step is pending",
        status: "pending" as const,
      },
    ];

    return (
      <Stepper
        steps={customSteps}
        currentStep={1}
        content={
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Custom Step Statuses</h3>
            <p className="text-sm text-gray-600">
              Each step can have its own status independent of the current step
              position. This allows for complex workflows with different states.
            </p>
          </div>
        }
      />
    );
  },
};

// Simple stepper (just numbers)
export const SimpleNumbered: Story = {
  render: () => {
    const simpleSteps = [
      { id: "1", label: "Step 1" },
      { id: "2", label: "Step 2" },
      { id: "3", label: "Step 3" },
      { id: "4", label: "Step 4" },
    ];

    return (
      <Stepper
        steps={simpleSteps}
        currentStep={2}
        showContentOnVertical={false}
      />
    );
  },
};

// Progress-like stepper
export const ProgressLike: Story = {
  render: () => {
    const progressSteps = [
      { id: "1" },
      { id: "2" },
      { id: "3" },
      { id: "4" },
      { id: "5" },
    ];

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-4">Vertical Progress</h3>
          <Stepper
            steps={progressSteps}
            currentStep={2}
            size="sm"
            showContentOnVertical={false}
          />
        </div>
      </div>
    );
  },
};
