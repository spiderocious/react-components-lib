import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Progress,
  ProgressError,
  ProgressGradient,
  ProgressSuccess,
  ProgressWarning,
} from ".";

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    shape: {
      control: { type: "select" },
      options: ["rounded", "square", "pill"],
    },
    variant: {
      control: { type: "select" },
      options: [
        "blue",
        "green",
        "red",
        "yellow",
        "orange",
        "purple",
        "gray",
        "gradient",
      ],
    },
    animated: {
      control: { type: "boolean" },
    },
    showLabel: {
      control: { type: "boolean" },
    },
    indeterminate: {
      control: { type: "boolean" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Basic examples
export const Default: Story = {
  args: {
    value: 60,
    max: 100,
  },
};

export const WithLabel: Story = {
  args: {
    value: 75,
    max: 100,
    showLabel: true,
  },
};

export const Indeterminate: Story = {
  args: {
    value: 0,
    indeterminate: true,
    showLabel: true,
  },
};

// Variant examples
export const Blue: Story = {
  args: {
    value: 60,
    variant: "blue",
  },
};

export const Green: Story = {
  args: {
    value: 80,
    variant: "green",
  },
};

export const Red: Story = {
  args: {
    value: 30,
    variant: "red",
  },
};

export const Yellow: Story = {
  args: {
    value: 45,
    variant: "yellow",
  },
};

export const Gradient: Story = {
  args: {
    value: 70,
    variant: "gradient",
  },
};

// Predefined variants
export const SuccessProgress: Story = {
  render: () => <ProgressSuccess value={85} showLabel />,
};

export const ErrorProgress: Story = {
  render: () => <ProgressError value={25} showLabel />,
};

export const WarningProgress: Story = {
  render: () => <ProgressWarning value={50} showLabel />,
};

export const GradientProgress: Story = {
  render: () => <ProgressGradient value={75} showLabel />,
};

// Size variations
export const SizeVariations: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <div>
        <h3 className="text-sm font-medium mb-2">Small</h3>
        <Progress value={60} size="sm" showLabel />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Medium</h3>
        <Progress value={60} size="md" showLabel />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Large</h3>
        <Progress value={60} size="lg" showLabel />
      </div>
    </div>
  ),
};

// Shape variations
export const ShapeVariations: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <div>
        <h3 className="text-sm font-medium mb-2">Rounded</h3>
        <Progress value={60} shape="rounded" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Square</h3>
        <Progress value={60} shape="square" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Pill</h3>
        <Progress value={60} shape="pill" />
      </div>
    </div>
  ),
};

// Vertical orientation
export const VerticalProgress: Story = {
  render: () => (
    <div className="flex gap-8 h-40">
      <div className="flex flex-col items-center">
        <Progress value={30} orientation="vertical" variant="red" showLabel />
        <span className="text-xs text-gray-600 mt-2">Low</span>
      </div>
      <div className="flex flex-col items-center">
        <Progress
          value={60}
          orientation="vertical"
          variant="yellow"
          showLabel
        />
        <span className="text-xs text-gray-600 mt-2">Medium</span>
      </div>
      <div className="flex flex-col items-center">
        <Progress value={85} orientation="vertical" variant="green" showLabel />
        <span className="text-xs text-gray-600 mt-2">High</span>
      </div>
    </div>
  ),
};

// Animated progress
export const AnimatedProgress: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <div>
        <h3 className="text-sm font-medium mb-2">Animated</h3>
        <Progress value={65} animated showLabel />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Indeterminate</h3>
        <Progress value={0} indeterminate showLabel />
      </div>
    </div>
  ),
};

// Recreating Image 7 layout (progress bars)
export const ImageLayout: Story = {
  render: () => (
    <div className="space-y-4 max-w-lg">
      {/* Blue progress */}
      <div className="flex gap-2 items-center">
        <Progress value={75} variant="blue" shape="pill" className="flex-1" />
        <Progress
          value={25}
          variant="blue"
          shape="pill"
          className="flex-1 opacity-30"
        />
      </div>

      {/* Yellow progress */}
      <div className="flex gap-2 items-center">
        <Progress value={60} variant="yellow" shape="pill" className="flex-1" />
        <Progress
          value={40}
          variant="yellow"
          shape="pill"
          className="flex-1 opacity-30"
        />
      </div>

      {/* Red progress */}
      <div className="flex gap-2 items-center">
        <Progress value={20} variant="red" shape="pill" className="flex-1" />
        <Progress
          value={80}
          variant="red"
          shape="pill"
          className="flex-1 opacity-30"
        />
      </div>

      {/* Green progress */}
      <div className="flex gap-2 items-center">
        <Progress value={90} variant="green" shape="pill" className="flex-1" />
        <Progress
          value={10}
          variant="green"
          shape="pill"
          className="flex-1 opacity-30"
        />
      </div>
    </div>
  ),
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <Progress value={60} variant="blue" showLabel label="Blue Progress" />
      <Progress value={75} variant="green" showLabel label="Green Progress" />
      <Progress value={45} variant="red" showLabel label="Red Progress" />
      <Progress value={30} variant="yellow" showLabel label="Yellow Progress" />
      <Progress value={85} variant="orange" showLabel label="Orange Progress" />
      <Progress value={55} variant="purple" showLabel label="Purple Progress" />
      <Progress value={70} variant="gray" showLabel label="Gray Progress" />
      <Progress
        value={80}
        variant="gradient"
        showLabel
        label="Gradient Progress"
      />
    </div>
  ),
};

// Different max values
export const DifferentMaxValues: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <Progress value={50} max={100} showLabel label="50/100" />
      <Progress value={3} max={5} showLabel label="3/5 Stars" />
      <Progress value={7} max={10} showLabel label="7/10 Rating" />
      <Progress value={15} max={20} showLabel label="15/20 Points" />
    </div>
  ),
};

// Loading simulation
export const LoadingSimulation: Story = {
  render: () => {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0; // Reset to simulate new loading
          }
          return prev + 1;
        });
      }, 100);

      return () => clearInterval(timer);
    }, []);

    return (
      <div className="space-y-4 max-w-md">
        <Progress
          value={progress}
          showLabel
          label="Loading..."
          variant="blue"
        />
        <Progress
          value={progress}
          showLabel
          label="Upload Progress"
          variant="green"
        />
      </div>
    );
  },
};

// Custom labels
export const CustomLabels: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <Progress value={25} showLabel label="Beginner Level" variant="red" />
      <Progress
        value={50}
        showLabel
        label="Intermediate Level"
        variant="yellow"
      />
      <Progress value={75} showLabel label="Advanced Level" variant="blue" />
      <Progress value={100} showLabel label="Expert Level" variant="green" />
    </div>
  ),
};

// Import React for useState and useEffect
import React from "react";
