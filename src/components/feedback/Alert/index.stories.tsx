import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from ".";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["info", "success", "warning", "error", "neutral"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    layout: {
      control: { type: "select" },
      options: ["inline", "block"],
    },
    hideIcon: {
      control: { type: "boolean" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Action components for examples
const ActionButton = ({
  children,
  variant = "primary",
}: {
  children: React.ReactNode;
  variant?: string;
}) => (
  <button
    className={cn(
      "px-3 py-1 text-xs font-medium rounded transition-colors",
      variant === "primary"
        ? "text-blue-600 hover:text-blue-700"
        : "text-gray-600 hover:text-gray-700"
    )}
  >
    {children}
  </button>
);

const ActionLink = ({ children }: { children: React.ReactNode }) => (
  <a href="#" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
    {children}
  </a>
);

// Simple alerts (Image 1 style)
export const SimpleInfo: Story = {
  args: {
    variant: "info",
    children: "Didn't get the code? Dial *5573*63#",
  },
};

export const SimpleError: Story = {
  args: {
    variant: "error",
    children: "Didn't get the code? Dial *5573*63#",
  },
};

export const SimpleWarning: Story = {
  args: {
    variant: "warning",
    children: "Didn't get the code? Dial *5573*63#",
  },
};

export const SimpleSuccess: Story = {
  args: {
    variant: "success",
    children: "Didn't get the code? Dial *5573*63#",
  },
};

export const SimpleNeutral: Story = {
  args: {
    variant: "neutral",
    children: "Didn't get the code? Dial *5573*63#",
  },
};

// Alerts with title and description (Image 2 style)
export const WithTitleAndDescription: Story = {
  args: {
    variant: "error",
    title: "What we need",
    description:
      "Your proof of address must clearly indicate your name and address. You'll have to re-upload if it doesn't.",
  },
};

export const InfoWithDescription: Story = {
  args: {
    variant: "info",
    title: "What we need",
    description:
      "Your proof of address must clearly indicate your name and address. You'll have to re-upload if it doesn't.",
  },
};

export const WarningWithDescription: Story = {
  args: {
    variant: "warning",
    title: "What we need",
    description:
      "Your proof of address must clearly indicate your name and address. You'll have to re-upload if it doesn't.",
  },
};

export const SuccessWithDescription: Story = {
  args: {
    variant: "success",
    title: "What we need",
    description:
      "Your proof of address must clearly indicate your name and address. You'll have to re-upload if it doesn't.",
  },
};

// Compact alerts with actions (Image 3 style)
export const CompactWithAction: Story = {
  args: {
    variant: "error",
    title: "A Very Short Alert Title",
    action: <ActionLink>Action</ActionLink>,
    layout: "inline",
  },
};

export const CompactWarningWithAction: Story = {
  args: {
    variant: "warning",
    title: "A Very Short Alert Title",
    action: <ActionLink>Action</ActionLink>,
    layout: "inline",
  },
};

export const CompactSuccessWithAction: Story = {
  args: {
    variant: "success",
    title: "A Very Short Alert Title",
    action: <ActionLink>Action</ActionLink>,
    layout: "inline",
  },
};

export const CompactInfoWithAction: Story = {
  args: {
    variant: "info",
    title: "A Very Short Alert Title",
    action: <ActionLink>Action</ActionLink>,
    layout: "inline",
  },
};

// Full alerts with description and action (Image 4 style)
export const FullWithAction: Story = {
  args: {
    variant: "error",
    title: "What we need",
    description:
      "Your proof of address must clearly indicate your name and address. You'll have to re-upload if it doesn't.",
    action: <ActionLink>Action</ActionLink>,
    layout: "block",
  },
};

export const FullWarningWithAction: Story = {
  args: {
    variant: "warning",
    title: "What we need",
    description:
      "Your proof of address must clearly indicate your name and address. You'll have to re-upload if it doesn't.",
    action: <ActionLink>Action</ActionLink>,
    layout: "block",
  },
};

export const FullSuccessWithAction: Story = {
  args: {
    variant: "success",
    title: "What we need",
    description:
      "Your proof of address must clearly indicate your name and address. You'll have to re-upload if it doesn't.",
    action: <ActionLink>Action</ActionLink>,
    layout: "block",
  },
};

export const FullInfoWithAction: Story = {
  args: {
    variant: "info",
    title: "What we need",
    description:
      "Your proof of address must clearly indicate your name and address. You'll have to re-upload if it doesn't.",
    action: <ActionLink>Action</ActionLink>,
    layout: "block",
  },
};

// Custom examples
export const WithCustomIcon: Story = {
  args: {
    variant: "warning",
    title: "Custom Icon Alert",
    description: "This alert uses a custom icon instead of the default one.",
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22,4 12,14.01 9,11.01" />
      </svg>
    ),
  },
};

export const WithoutIcon: Story = {
  args: {
    variant: "info",
    title: "No Icon Alert",
    description: "This alert doesn't show any icon.",
    hideIcon: true,
  },
};

export const WithComplexAction: Story = {
  args: {
    variant: "warning",
    title: "Complex Action",
    description: "This alert has multiple action buttons.",
    action: (
      <div className="flex gap-2">
        <ActionButton>Cancel</ActionButton>
        <ActionButton>Confirm</ActionButton>
      </div>
    ),
    layout: "block",
  },
};

// Size variations
export const SmallSize: Story = {
  args: {
    variant: "info",
    size: "sm",
    title: "Small Alert",
    description: "This is a small sized alert component.",
    action: <ActionLink>Action</ActionLink>,
  },
};

export const LargeSize: Story = {
  args: {
    variant: "success",
    size: "lg",
    title: "Large Alert",
    description:
      "This is a large sized alert component with more spacing and larger text.",
    action: <ActionLink>Action</ActionLink>,
  },
};

// Recreating exact layouts from images
export const SimpleAlerts: Story = {
  render: () => (
    <div className="space-y-4 max-w-lg">
      <Alert variant="info">
        Didn't get the code? Dial{" "}
        <span className="font-medium text-blue-600">*5573*63#</span>
      </Alert>
      <Alert variant="error">
        Didn't get the code? Dial{" "}
        <span className="font-medium text-red-600">*5573*63#</span>
      </Alert>
      <Alert variant="warning">
        Didn't get the code? Dial{" "}
        <span className="font-medium text-orange-600">*5573*63#</span>
      </Alert>
      <Alert variant="success">
        Didn't get the code? Dial{" "}
        <span className="font-medium text-green-600">*5573*63#</span>
      </Alert>
      <Alert variant="neutral">
        Didn't get the code? Dial{" "}
        <span className="font-medium text-gray-600">*5573*63#</span>
      </Alert>
    </div>
  ),
};

export const AlertsWithDescriptions: Story = {
  render: () => (
    <div className="space-y-4 max-w-lg">
      <Alert
        variant="error"
        title="What we need"
        description="Your proof of address must clearly indicate your name and address. You'll have to re-upload if it doesn't."
      />
      <Alert
        variant="warning"
        title="What we need"
        description="Your proof of address must clearly indicate your name and address. You'll have to re-upload if it doesn't."
      />
      <Alert
        variant="success"
        title="What we need"
        description="Your proof of address must clearly indicate your name and address. You'll have to re-upload if it doesn't."
      />
      <Alert
        variant="info"
        title="What we need"
        description="Your proof of address must clearly indicate your name and address. You'll have to re-upload if it doesn't."
      />
    </div>
  ),
};

export const CompactAlertsWithActions: Story = {
  render: () => (
    <div className="space-y-4 max-w-lg">
      <Alert
        variant="error"
        title="A Very Short Alert Title"
        action={<ActionLink>Action</ActionLink>}
        layout="inline"
      />
      <Alert
        variant="warning"
        title="A Very Short Alert Title"
        action={<ActionLink>Action</ActionLink>}
        layout="inline"
      />
      <Alert
        variant="success"
        title="A Very Short Alert Title"
        action={<ActionLink>Action</ActionLink>}
        layout="inline"
      />
      <Alert
        variant="info"
        title="A Very Short Alert Title"
        action={<ActionLink>Action</ActionLink>}
        layout="inline"
      />
    </div>
  ),
};

export const FullAlertsWithActions: Story = {
  render: () => (
    <div className="space-y-4 max-w-lg">
      <Alert
        variant="error"
        title="What we need"
        description="Your proof of address must clearly indicate your name and address. You'll have to re-upload if it doesn't."
        action={<ActionLink>Action</ActionLink>}
        layout="block"
      />
      <Alert
        variant="warning"
        title="What we need"
        description="Your proof of address must clearly indicate your name and address. You'll have to re-upload if it doesn't."
        action={<ActionLink>Action</ActionLink>}
        layout="block"
      />
      <Alert
        variant="success"
        title="What we need"
        description="Your proof of address must clearly indicate your name and address. You'll have to re-upload if it doesn't."
        action={<ActionLink>Action</ActionLink>}
        layout="block"
      />
      <Alert
        variant="info"
        title="What we need"
        description="Your proof of address must clearly indicate your name and address. You'll have to re-upload if it doesn't."
        action={<ActionLink>Action</ActionLink>}
        layout="block"
      />
    </div>
  ),
};

// Helper function (should be imported from utils in real implementation)
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
