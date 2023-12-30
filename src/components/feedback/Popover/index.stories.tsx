import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Popover } from ".";

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
  tags: ["autodocs"],
  argTypes: {
    side: {
      control: { type: "select" },
      options: ["top", "bottom", "left", "right"],
    },
    align: {
      control: { type: "select" },
      options: ["start", "center", "end"],
    },
    mode: {
      control: { type: "select" },
      options: ["hover", "click"],
    },
    closeOnClickOutside: {
      control: { type: "boolean" },
    },
    closeOnEscape: {
      control: { type: "boolean" },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center min-h-[400px] p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

// Sample components for actions and badges
const ActionButtons = () => (
  <>
    <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 transition-colors">
      Dismiss
    </button>
    <button className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
      Next
    </button>
  </>
);

const StepBadge = ({ current, total }: { current: number; total: number }) => (
  <div className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded">
    {current}/{total}
  </div>
);

const TriggerButton = ({ children }: { children: React.ReactNode }) => (
  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
    {children}
  </button>
);

// Basic examples
export const Default: Story = {
  args: {
    trigger: <TriggerButton>Click me</TriggerButton>,
    title: "Main Account",
    description:
      "Do you plan to use this business account outside of the stated Agriculture you plan to use this business account outside of the stated.",
    action: <ActionButtons />,
    badge: <StepBadge current={1} total={6} />,
    side: "bottom",
    align: "center",
    mode: "click",
  },
};

export const OnHover: Story = {
  args: {
    trigger: <TriggerButton>Hover me</TriggerButton>,
    title: "Hover Popover",
    description:
      "This popover appears on hover and disappears when you move away.",
    mode: "hover",
    side: "top",
  },
};

export const SimpleTooltip: Story = {
  args: {
    trigger: <TriggerButton>Simple tooltip</TriggerButton>,
    description: "This is a simple tooltip without title or actions.",
    mode: "hover",
    side: "top",
    align: "center",
  },
};

export const WithoutBadge: Story = {
  args: {
    trigger: <TriggerButton>No badge</TriggerButton>,
    title: "Account Settings",
    description:
      "Configure your account preferences and manage your profile information.",
    action: (
      <button className="px-3 py-1.5 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
        Configure
      </button>
    ),
    side: "right",
  },
};

export const OnlyTitle: Story = {
  args: {
    trigger: <TriggerButton>Title only</TriggerButton>,
    title: "Quick Info",
    side: "left",
    mode: "hover",
  },
};

// Positioning examples
export const TopPosition: Story = {
  args: {
    trigger: <TriggerButton>Top</TriggerButton>,
    title: "Top Popover",
    description: "This popover appears above the trigger element.",
    action: <ActionButtons />,
    side: "top",
    align: "center",
  },
};

export const BottomPosition: Story = {
  args: {
    trigger: <TriggerButton>Bottom</TriggerButton>,
    title: "Bottom Popover",
    description: "This popover appears below the trigger element.",
    action: <ActionButtons />,
    side: "bottom",
    align: "center",
  },
};

export const LeftPosition: Story = {
  args: {
    trigger: <TriggerButton>Left</TriggerButton>,
    title: "Left Popover",
    description: "This popover appears to the left of the trigger element.",
    action: <ActionButtons />,
    side: "left",
    align: "center",
  },
};

export const RightPosition: Story = {
  args: {
    trigger: <TriggerButton>Right</TriggerButton>,
    title: "Right Popover",
    description: "This popover appears to the right of the trigger element.",
    action: <ActionButtons />,
    side: "right",
    align: "center",
  },
};

// Alignment examples
export const AlignStart: Story = {
  args: {
    trigger: <TriggerButton>Align Start</TriggerButton>,
    title: "Start Aligned",
    description: "This popover is aligned to the start of the trigger element.",
    side: "bottom",
    align: "start",
  },
};

export const AlignEnd: Story = {
  args: {
    trigger: <TriggerButton>Align End</TriggerButton>,
    title: "End Aligned",
    description: "This popover is aligned to the end of the trigger element.",
    side: "bottom",
    align: "end",
  },
};

// Controlled example
export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="space-y-4">
        <div className="text-center">
          <button
            onClick={() => setOpen(!open)}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            {open ? "Close" : "Open"} Popover
          </button>
        </div>

        <Popover
          trigger={<TriggerButton>Controlled Trigger</TriggerButton>}
          title="Controlled Popover"
          description="This popover's open state is controlled externally."
          action={<ActionButtons />}
          open={open}
          onOpenChange={setOpen}
          side="bottom"
        />
      </div>
    );
  },
};

// Tutorial/Onboarding example (recreating the image)
export const TutorialStep: Story = {
  render: () => (
    <div className="relative">
      {/* Simulated interface element */}
      <div className="w-64 p-4 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
        <div className="space-y-3">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>

          {/* Account selection area - this is our trigger */}
          <Popover
            trigger={
              <div className="p-3 bg-white rounded border-2 border-blue-500 cursor-pointer">
                <div className="font-medium text-gray-900">Main Account</div>
                <div className="text-sm text-gray-600">Business Account</div>
              </div>
            }
            title="Main Account"
            description="Do you plan to use this business account outside of the stated Agriculture you plan to use this business account outside of the stated."
            action={<ActionButtons />}
            badge={<StepBadge current={1} total={6} />}
            side="right"
            align="start"
            defaultOpen={true}
            mode="click"
          />
        </div>
      </div>
    </div>
  ),
};

// Multiple steps example
export const MultipleSteps: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4;

    const steps = [
      {
        title: "Main Account",
        description:
          "Do you plan to use this business account outside of the stated Agriculture you plan to use this business account outside of the stated.",
      },
      {
        title: "Account Type",
        description:
          "Select the type of business account that best fits your needs and requirements.",
      },
      {
        title: "Verification",
        description:
          "Complete the verification process to secure your account and enable all features.",
      },
      {
        title: "Getting Started",
        description:
          "You're all set! Start using your new business account to manage your finances.",
      },
    ];

    const handleNext = () => {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    };

    const handlePrevious = () => {
      if (currentStep > 1) {
        setCurrentStep(currentStep - 1);
      }
    };

    return (
      <div className="space-y-4">
        <div className="text-center text-sm text-gray-600">
          Tutorial Demo - Step {currentStep} of {totalSteps}
        </div>

        <Popover
          trigger={<TriggerButton>Tutorial Step {currentStep}</TriggerButton>}
          title={steps[currentStep - 1].title}
          description={steps[currentStep - 1].description}
          action={
            <div className="flex gap-2">
              {currentStep > 1 && (
                <button
                  onClick={handlePrevious}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Previous
                </button>
              )}
              <button
                onClick={handleNext}
                className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                disabled={currentStep === totalSteps}
              >
                {currentStep === totalSteps ? "Finish" : "Next"}
              </button>
            </div>
          }
          badge={<StepBadge current={currentStep} total={totalSteps} />}
          side="bottom"
          defaultOpen={true}
          key={currentStep} // Force re-render for demo
        />
      </div>
    );
  },
};

// Custom styling example
export const CustomStyling: Story = {
  args: {
    trigger: <TriggerButton>Custom Style</TriggerButton>,
    title: "Custom Popover",
    description:
      "This popover has custom styling applied to demonstrate the flexibility of the component.",
    action: (
      <button className="px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors">
        Got it!
      </button>
    ),
    badge: (
      <div className="px-2 py-1 bg-purple-100 text-purple-600 text-xs font-bold rounded-full">
        NEW
      </div>
    ),
    contentClassName:
      "bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200",
    side: "top",
  },
};

// All positions showcase
export const AllPositions: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 w-full max-w-2xl">
      <Popover
        trigger={<TriggerButton>Top</TriggerButton>}
        title="Top Position"
        description="Popover positioned above the trigger."
        side="top"
        mode="hover"
      />

      <Popover
        trigger={<TriggerButton>Bottom</TriggerButton>}
        title="Bottom Position"
        description="Popover positioned below the trigger."
        side="bottom"
        mode="hover"
      />

      <Popover
        trigger={<TriggerButton>Left</TriggerButton>}
        title="Left Position"
        description="Popover positioned to the left of the trigger."
        side="left"
        mode="hover"
      />

      <Popover
        trigger={<TriggerButton>Right</TriggerButton>}
        title="Right Position"
        description="Popover positioned to the right of the trigger."
        side="right"
        mode="hover"
      />
    </div>
  ),
};

export const InteractiveDemo: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-4">Interactive Popover Demo</h3>
        <p className="text-gray-600 text-sm">
          Try clicking and hovering on different elements
        </p>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <Popover
          trigger={
            <div className="p-3 bg-blue-100 rounded-lg cursor-pointer hover:bg-blue-200 transition-colors">
              💡 Tip
            </div>
          }
          description="Click me for a helpful tip!"
          mode="click"
          side="top"
        />

        <Popover
          trigger={
            <div className="p-3 bg-green-100 rounded-lg cursor-pointer hover:bg-green-200 transition-colors">
              ⚡ Quick Info
            </div>
          }
          description="Hover over me for quick information."
          mode="hover"
          side="bottom"
        />

        <Popover
          trigger={
            <div className="p-3 bg-yellow-100 rounded-lg cursor-pointer hover:bg-yellow-200 transition-colors">
              🎯 Action
            </div>
          }
          title="Take Action"
          description="This popover includes action buttons for user interaction."
          action={
            <button className="px-3 py-1.5 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors">
              Do it!
            </button>
          }
          mode="click"
          side="left"
        />
      </div>
    </div>
  ),
};
