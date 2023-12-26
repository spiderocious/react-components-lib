import type { Meta, StoryObj } from "@storybook/react";
import { Button } from ".";

// Plus icon component for examples
const PlusIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "primary",
        "secondary",
        "danger",
        "success",
        "warning",
        "dark",
        "outline",
        "ghost",
      ],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    iconPosition: {
      control: { type: "select" },
      options: ["left", "right"],
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
    children: "New Transaction",
    variant: "primary",
    size: "md",
    icon: <PlusIcon />,
  },
};

export const Secondary: Story = {
  args: {
    children: "New Transaction",
    variant: "secondary",
    size: "md",
    icon: <PlusIcon />,
  },
};

export const Danger: Story = {
  args: {
    children: "Delete Item",
    variant: "danger",
    size: "md",
    icon: <PlusIcon />,
  },
};

export const Success: Story = {
  args: {
    children: "Save Changes",
    variant: "success",
    size: "md",
    icon: <PlusIcon />,
  },
};

export const Warning: Story = {
  args: {
    children: "New Transaction",
    variant: "warning",
    size: "md",
    icon: <PlusIcon />,
  },
};

export const Dark: Story = {
  args: {
    children: "New Transaction",
    variant: "dark",
    size: "md",
    icon: <PlusIcon />,
  },
};

export const Outline: Story = {
  args: {
    children: "Cancel",
    variant: "outline",
    size: "md",
    icon: <PlusIcon />,
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost Button",
    variant: "ghost",
    size: "md",
    icon: <PlusIcon />,
  },
};

// Size variations
export const Small: Story = {
  args: {
    children: "Small Button",
    variant: "primary",
    size: "sm",
    icon: <PlusIcon />,
  },
};

export const Large: Story = {
  args: {
    children: "Large Button",
    variant: "primary",
    size: "lg",
    icon: <PlusIcon />,
  },
};

// Icon position variations
export const IconRight: Story = {
  args: {
    children: "Icon Right",
    variant: "primary",
    size: "md",
    icon: <PlusIcon />,
    iconPosition: "right",
  },
};

export const NoIcon: Story = {
  args: {
    children: "No Icon",
    variant: "primary",
    size: "md",
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    variant: "primary",
    size: "md",
    icon: <PlusIcon />,
    disabled: true,
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary" icon={<PlusIcon />}>
        Primary
      </Button>
      <Button variant="secondary" icon={<PlusIcon />}>
        Secondary
      </Button>
      <Button variant="danger" icon={<PlusIcon />}>
        Danger
      </Button>
      <Button variant="success" icon={<PlusIcon />}>
        Success
      </Button>
      <Button variant="warning" icon={<PlusIcon />}>
        Warning
      </Button>
      <Button variant="dark" icon={<PlusIcon />}>
        Dark
      </Button>
      <Button variant="outline" icon={<PlusIcon />}>
        Outline
      </Button>
      <Button variant="ghost" icon={<PlusIcon />}>
        Ghost
      </Button>
    </div>
  ),
};
