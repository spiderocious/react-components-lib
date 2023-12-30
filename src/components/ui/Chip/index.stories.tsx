import type { Meta, StoryObj } from "@storybook/react-vite";
import { Chip } from ".";

const meta: Meta<typeof Chip> = {
  title: "Components/Chip",
  component: Chip,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "blue",
        "red",
        "green",
        "orange",
        "gray",
        "purple",
        "cyan",
        "yellow",
        "pink",
        "indigo",
      ],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    closePosition: {
      control: { type: "select" },
      options: ["left", "right"],
    },
    clickable: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Basic chips
export const Default: Story = {
  args: {
    children: "Chip",
    variant: "blue",
    size: "md",
  },
};

export const WithClose: Story = {
  args: {
    children: "Chip",
    variant: "blue",
    size: "md",
    onClose: () => console.log("Chip closed"),
  },
};

export const WithCloseLeft: Story = {
  args: {
    children: "Chip",
    variant: "blue",
    size: "md",
    onClose: () => console.log("Chip closed"),
    closePosition: "left",
  },
};

export const Clickable: Story = {
  args: {
    children: "Chip",
    variant: "blue",
    size: "md",
    clickable: true,
    onClick: () => console.log("Chip clicked"),
  },
};

export const WithIcon: Story = {
  args: {
    children: "Chip",
    variant: "green",
    size: "md",
    icon: (
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M20 6L9 17l-5-5" />
      </svg>
    ),
  },
};

export const Disabled: Story = {
  args: {
    children: "Chip",
    variant: "gray",
    size: "md",
    disabled: true,
    onClose: () => console.log("Chip closed"),
  },
};

// Size variations
export const Small: Story = {
  args: {
    children: "Small Chip",
    variant: "purple",
    size: "sm",
    onClose: () => console.log("Small chip closed"),
  },
};

export const Large: Story = {
  args: {
    children: "Large Chip",
    variant: "orange",
    size: "lg",
    onClose: () => console.log("Large chip closed"),
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Chip variant="blue">Blue</Chip>
      <Chip variant="red">Red</Chip>
      <Chip variant="green">Green</Chip>
      <Chip variant="orange">Orange</Chip>
      <Chip variant="gray">Gray</Chip>
      <Chip variant="purple">Purple</Chip>
      <Chip variant="cyan">Cyan</Chip>
      <Chip variant="yellow">Yellow</Chip>
      <Chip variant="pink">Pink</Chip>
      <Chip variant="indigo">Indigo</Chip>
    </div>
  ),
};

export const WithCloseButtons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Chip variant="blue" onClose={() => console.log("Blue closed")}>
        Blue
      </Chip>
      <Chip variant="red" onClose={() => console.log("Red closed")}>
        Red
      </Chip>
      <Chip variant="green" onClose={() => console.log("Green closed")}>
        Green
      </Chip>
      <Chip variant="orange" onClose={() => console.log("Orange closed")}>
        Orange
      </Chip>
      <Chip variant="gray" onClose={() => console.log("Gray closed")}>
        Gray
      </Chip>
      <Chip variant="purple" onClose={() => console.log("Purple closed")}>
        Purple
      </Chip>
      <Chip variant="cyan" onClose={() => console.log("Cyan closed")}>
        Cyan
      </Chip>
    </div>
  ),
};

export const CloseOnLeft: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Chip
        variant="blue"
        onClose={() => console.log("Blue closed")}
        closePosition="left"
      >
        Blue
      </Chip>
      <Chip
        variant="red"
        onClose={() => console.log("Red closed")}
        closePosition="left"
      >
        Red
      </Chip>
      <Chip
        variant="green"
        onClose={() => console.log("Green closed")}
        closePosition="left"
      >
        Green
      </Chip>
      <Chip
        variant="orange"
        onClose={() => console.log("Orange closed")}
        closePosition="left"
      >
        Orange
      </Chip>
      <Chip
        variant="gray"
        onClose={() => console.log("Gray closed")}
        closePosition="left"
      >
        Gray
      </Chip>
      <Chip
        variant="purple"
        onClose={() => console.log("Purple closed")}
        closePosition="left"
      >
        Purple
      </Chip>
      <Chip
        variant="cyan"
        onClose={() => console.log("Cyan closed")}
        closePosition="left"
      >
        Cyan
      </Chip>
    </div>
  ),
};

// Recreating the exact layout from Image 1
export const ImageLayout: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      {/* Row 1: Basic chips */}
      <div className="flex flex-wrap gap-4">
        <Chip variant="blue">Chip</Chip>
        <Chip variant="red">Chip</Chip>
        <Chip variant="green">Chip</Chip>
        <Chip variant="orange">Chip</Chip>
        <Chip variant="gray">Chip</Chip>
        <Chip variant="purple">Chip</Chip>
        <Chip variant="cyan">Chip</Chip>
      </div>

      {/* Row 2: Chips with close button on right */}
      <div className="flex flex-wrap gap-4">
        <Chip variant="blue" onClose={() => {}}>
          Chip
        </Chip>
        <Chip variant="red" onClose={() => {}}>
          Chip
        </Chip>
        <Chip variant="green" onClose={() => {}}>
          Chip
        </Chip>
        <Chip variant="orange" onClose={() => {}}>
          Chip
        </Chip>
        <Chip variant="gray" onClose={() => {}}>
          Chip
        </Chip>
        <Chip variant="purple" onClose={() => {}}>
          Chip
        </Chip>
        <Chip variant="cyan" onClose={() => {}}>
          Chip
        </Chip>
      </div>

      {/* Row 3: Chips with close button on left */}
      <div className="flex flex-wrap gap-4">
        <Chip variant="blue" onClose={() => {}} closePosition="left">
          Chip
        </Chip>
        <Chip variant="red" onClose={() => {}} closePosition="left">
          Chip
        </Chip>
        <Chip variant="green" onClose={() => {}} closePosition="left">
          Chip
        </Chip>
        <Chip variant="orange" onClose={() => {}} closePosition="left">
          Chip
        </Chip>
        <Chip variant="gray" onClose={() => {}} closePosition="left">
          Chip
        </Chip>
        <Chip variant="purple" onClose={() => {}} closePosition="left">
          Chip
        </Chip>
        <Chip variant="cyan" onClose={() => {}} closePosition="left">
          Chip
        </Chip>
      </div>

      {/* Repeat pattern for additional rows as shown in image */}
      <div className="flex flex-wrap gap-4">
        <Chip variant="blue">Chip</Chip>
        <Chip variant="red">Chip</Chip>
        <Chip variant="green">Chip</Chip>
        <Chip variant="orange">Chip</Chip>
        <Chip variant="gray">Chip</Chip>
        <Chip variant="purple">Chip</Chip>
        <Chip variant="cyan">Chip</Chip>
      </div>

      <div className="flex flex-wrap gap-4">
        <Chip variant="blue" onClose={() => {}}>
          Chip
        </Chip>
        <Chip variant="red" onClose={() => {}}>
          Chip
        </Chip>
        <Chip variant="green" onClose={() => {}}>
          Chip
        </Chip>
        <Chip variant="orange" onClose={() => {}}>
          Chip
        </Chip>
        <Chip variant="gray" onClose={() => {}}>
          Chip
        </Chip>
        <Chip variant="purple" onClose={() => {}}>
          Chip
        </Chip>
        <Chip variant="cyan" onClose={() => {}}>
          Chip
        </Chip>
      </div>

      <div className="flex flex-wrap gap-4">
        <Chip variant="blue" onClose={() => {}} closePosition="left">
          Chip
        </Chip>
        <Chip variant="red" onClose={() => {}} closePosition="left">
          Chip
        </Chip>
        <Chip variant="green" onClose={() => {}} closePosition="left">
          Chip
        </Chip>
        <Chip variant="orange" onClose={() => {}} closePosition="left">
          Chip
        </Chip>
        <Chip variant="gray" onClose={() => {}} closePosition="left">
          Chip
        </Chip>
        <Chip variant="purple" onClose={() => {}} closePosition="left">
          Chip
        </Chip>
        <Chip variant="cyan" onClose={() => {}} closePosition="left">
          Chip
        </Chip>
      </div>
    </div>
  ),
};

// Status/Category chips
export const StatusChips: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Transaction Types</h3>
        <div className="flex flex-wrap gap-2">
          <Chip
            variant="red"
            icon={
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M7 17L17 7M7 7l10 10" />
              </svg>
            }
          >
            DEBIT
          </Chip>
          <Chip
            variant="green"
            icon={
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            }
          >
            CREDIT
          </Chip>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Payment Status</h3>
        <div className="flex flex-wrap gap-2">
          <Chip variant="green">Successful</Chip>
          <Chip variant="orange">Pending</Chip>
          <Chip variant="cyan">Reversed</Chip>
          <Chip variant="red">Failed</Chip>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Payment Methods</h3>
        <div className="flex flex-wrap gap-2">
          <Chip variant="green">Auto Payment</Chip>
          <Chip variant="cyan">Manual Payment</Chip>
        </div>
      </div>
    </div>
  ),
};

// Interactive chips
export const InteractiveChips: Story = {
  render: () => {
    const handleChipClick = (chip: string) => {
      console.log(`${chip} chip clicked`);
    };

    const handleChipClose = (chip: string) => {
      console.log(`${chip} chip closed`);
    };

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Clickable Chips</h3>
          <div className="flex flex-wrap gap-2">
            <Chip
              variant="blue"
              clickable
              onClick={() => handleChipClick("Tag 1")}
            >
              Tag 1
            </Chip>
            <Chip
              variant="green"
              clickable
              onClick={() => handleChipClick("Category")}
            >
              Category
            </Chip>
            <Chip
              variant="purple"
              clickable
              onClick={() => handleChipClick("Filter")}
            >
              Filter
            </Chip>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Removable Chips</h3>
          <div className="flex flex-wrap gap-2">
            <Chip variant="blue" onClose={() => handleChipClose("JavaScript")}>
              JavaScript
            </Chip>
            <Chip variant="red" onClose={() => handleChipClose("React")}>
              React
            </Chip>
            <Chip variant="green" onClose={() => handleChipClose("TypeScript")}>
              TypeScript
            </Chip>
            <Chip variant="orange" onClose={() => handleChipClose("Tailwind")}>
              Tailwind
            </Chip>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">
            Clickable + Removable
          </h3>
          <div className="flex flex-wrap gap-2">
            <Chip
              variant="purple"
              clickable
              onClose={() => handleChipClose("Design")}
              onClick={() => handleChipClick("Design")}
            >
              Design
            </Chip>
            <Chip
              variant="cyan"
              clickable
              onClose={() => handleChipClose("Development")}
              onClick={() => handleChipClick("Development")}
            >
              Development
            </Chip>
          </div>
        </div>
      </div>
    );
  },
};

// Size comparison
export const SizeComparison: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Chip variant="blue" size="sm">
          Small
        </Chip>
        <Chip variant="blue" size="md">
          Medium
        </Chip>
        <Chip variant="blue" size="lg">
          Large
        </Chip>
      </div>

      <div className="flex items-center gap-4">
        <Chip variant="green" size="sm" onClose={() => {}}>
          Small
        </Chip>
        <Chip variant="green" size="md" onClose={() => {}}>
          Medium
        </Chip>
        <Chip variant="green" size="lg" onClose={() => {}}>
          Large
        </Chip>
      </div>
    </div>
  ),
};
