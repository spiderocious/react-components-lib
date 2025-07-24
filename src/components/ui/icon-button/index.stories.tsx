import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconButton } from ".";

const ChevronDownIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const CalculatorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 2v4h10V4H7zm0 6v2h2v-2H7zm4 0v2h2v-2h-2zm4 0v2h2v-2h-2zm-8 4v2h2v-2H7zm4 0v2h2v-2h-2zm4 0v2h2v-2h-2zm-8 4v2h2v-2H7zm4 0v2h6v-2h-6z" />
  </svg>
);

const CreditCardIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const XIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="m18 6-12 12M6 6l12 12" />
  </svg>
);

const meta: Meta<typeof IconButton> = {
  title: "Components/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "purple",
        "white",
        "dark",
        "ghost",
      ],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    icon: <ChevronDownIcon />,
    variant: "primary",
    size: "md",
    "aria-label": "Expand menu",
  },
};

export const Secondary: Story = {
  args: {
    icon: <ChevronDownIcon />,
    variant: "secondary",
    size: "md",
    "aria-label": "Expand menu",
  },
};

export const Success: Story = {
  args: {
    icon: <ChevronDownIcon />,
    variant: "success",
    size: "md",
    "aria-label": "Confirm action",
  },
};

export const Danger: Story = {
  args: {
    icon: <XIcon />,
    variant: "danger",
    size: "md",
    "aria-label": "Delete item",
  },
};

export const Warning: Story = {
  args: {
    icon: <ChevronDownIcon />,
    variant: "warning",
    size: "md",
    "aria-label": "Warning action",
  },
};

export const Purple: Story = {
  args: {
    icon: <ChevronDownIcon />,
    variant: "purple",
    size: "md",
    "aria-label": "Purple action",
  },
};

export const White: Story = {
  args: {
    icon: <CalculatorIcon />,
    variant: "white",
    size: "md",
    "aria-label": "Open calculator",
  },
};

export const Dark: Story = {
  args: {
    icon: <CalculatorIcon />,
    variant: "dark",
    size: "md",
    "aria-label": "Open calculator",
  },
};

export const Ghost: Story = {
  args: {
    icon: <XIcon />,
    variant: "ghost",
    size: "md",
    "aria-label": "Close",
  },
};

// Size variations
export const Small: Story = {
  args: {
    icon: <XIcon />,
    variant: "primary",
    size: "sm",
    "aria-label": "Small button",
  },
};

export const Large: Story = {
  args: {
    icon: <CalculatorIcon />,
    variant: "primary",
    size: "lg",
    "aria-label": "Large button",
  },
};

export const ExtraLarge: Story = {
  args: {
    icon: <CalculatorIcon />,
    variant: "primary",
    size: "xl",
    "aria-label": "Extra large button",
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    icon: <XIcon />,
    variant: "primary",
    size: "md",
    disabled: true,
    "aria-label": "Disabled button",
  },
};

// Recreating Image 1: Color row
export const ColorRow: Story = {
  render: () => (
    <div className="flex gap-3">
      <IconButton
        variant="secondary"
        icon={<ChevronDownIcon />}
        aria-label="Gray action"
      />
      <IconButton
        variant="success"
        icon={<ChevronDownIcon />}
        aria-label="Green action"
      />
      <IconButton
        variant="danger"
        icon={<ChevronDownIcon />}
        aria-label="Red action"
      />
      <IconButton
        variant="warning"
        icon={<ChevronDownIcon />}
        aria-label="Orange action"
      />
      <IconButton
        variant="purple"
        icon={<ChevronDownIcon />}
        aria-label="Purple action"
      />
    </div>
  ),
};

// Recreating Image 2: White buttons with blue icons
export const WhiteButtonsStack: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <IconButton
        variant="white"
        icon={<CalculatorIcon />}
        aria-label="Calculator"
      />
      <IconButton
        variant="white"
        icon={<CreditCardIcon />}
        aria-label="Credit card"
      />
      <IconButton
        variant="white"
        icon={<CreditCardIcon />}
        aria-label="Credit card"
      />
      <IconButton variant="white" icon={<XIcon />} aria-label="Close" />
    </div>
  ),
};

// Recreating Image 3: Dark buttons with yellow icons
export const DarkButtonsStack: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <IconButton
        variant="dark"
        icon={<CalculatorIcon />}
        aria-label="Calculator"
      />
      <IconButton
        variant="dark"
        icon={<CreditCardIcon />}
        aria-label="Credit card"
      />
      <IconButton variant="dark" icon={<XIcon />} aria-label="Close" />
    </div>
  ),
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <IconButton
        variant="primary"
        icon={<ChevronDownIcon />}
        aria-label="Primary"
      />
      <IconButton
        variant="secondary"
        icon={<ChevronDownIcon />}
        aria-label="Secondary"
      />
      <IconButton
        variant="success"
        icon={<ChevronDownIcon />}
        aria-label="Success"
      />
      <IconButton variant="danger" icon={<XIcon />} aria-label="Danger" />
      <IconButton
        variant="warning"
        icon={<ChevronDownIcon />}
        aria-label="Warning"
      />
      <IconButton
        variant="purple"
        icon={<ChevronDownIcon />}
        aria-label="Purple"
      />
      <IconButton
        variant="white"
        icon={<CalculatorIcon />}
        aria-label="White"
      />
      <IconButton variant="dark" icon={<CalculatorIcon />} aria-label="Dark" />
      <IconButton variant="ghost" icon={<XIcon />} aria-label="Ghost" />
    </div>
  ),
};
