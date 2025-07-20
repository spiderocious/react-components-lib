import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { NumberCounter } from ".";

const meta: Meta<typeof NumberCounter> = {
  title: "Components/NumberCounter",
  component: NumberCounter,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "secondary", "outline"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    allowManualInput: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    min: {
      control: { type: "number" },
    },
    max: {
      control: { type: "number" },
    },
    step: {
      control: { type: "number" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Controlled component wrapper
const ControlledNumberCounter = (props: any) => {
  const [value, setValue] = useState(props.value || 0);

  return (
    <NumberCounter
      {...props}
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
        console.log("Counter value:", newValue);
      }}
    />
  );
};

export const Default: Story = {
  render: () => <ControlledNumberCounter value={0} min={0} max={10} />,
};

export const WithValue: Story = {
  render: () => <ControlledNumberCounter value={4} min={0} max={10} />,
};

export const Secondary: Story = {
  render: () => (
    <ControlledNumberCounter value={2} variant="secondary" min={0} max={10} />
  ),
};

export const Outline: Story = {
  render: () => (
    <ControlledNumberCounter value={3} variant="outline" min={0} max={10} />
  ),
};

export const WithLargeRange: Story = {
  render: () => (
    <ControlledNumberCounter value={50} min={0} max={100} step={5} />
  ),
};

export const Disabled: Story = {
  render: () => <NumberCounter value={4} min={0} max={10} disabled />,
};

export const ReadOnly: Story = {
  render: () => (
    <ControlledNumberCounter
      value={7}
      min={0}
      max={10}
      allowManualInput={false}
    />
  ),
};

export const WithError: Story = {
  render: () => (
    <ControlledNumberCounter
      value={15}
      min={0}
      max={10}
      errorMessage="Value exceeds maximum limit"
    />
  ),
};

// Size variations
export const Small: Story = {
  render: () => (
    <ControlledNumberCounter value={2} size="sm" min={0} max={10} />
  ),
};

export const Large: Story = {
  render: () => (
    <ControlledNumberCounter value={6} size="lg" min={0} max={10} />
  ),
};

// Different step sizes
export const CustomStep: Story = {
  render: () => (
    <ControlledNumberCounter value={10} min={0} max={100} step={10} />
  ),
};

export const DecimalStep: Story = {
  render: () => (
    <ControlledNumberCounter value={2.5} min={0} max={10} step={0.5} />
  ),
};

// Recreating the exact layout from the image
export const SimpleCounter: Story = {
  render: () => (
    <div className="flex items-center justify-center">
      <ControlledNumberCounter
        value={4}
        min={0}
        max={10}
        variant="default"
        size="md"
      />
    </div>
  ),
};

// Multiple counters showcase
export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
      <div className="space-y-4">
        <h3 className="font-medium text-sm text-gray-700">Variants</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <span className="text-sm w-20">Default:</span>
            <ControlledNumberCounter value={3} variant="default" />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm w-20">Secondary:</span>
            <ControlledNumberCounter value={5} variant="secondary" />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm w-20">Outline:</span>
            <ControlledNumberCounter value={2} variant="outline" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-sm text-gray-700">Sizes & States</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <span className="text-sm w-20">Small:</span>
            <ControlledNumberCounter value={1} size="sm" />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm w-20">Large:</span>
            <ControlledNumberCounter value={8} size="lg" />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm w-20">Disabled:</span>
            <NumberCounter value={4} disabled />
          </div>
        </div>
      </div>
    </div>
  ),
};

// Edge cases
export const EdgeCases: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <h3 className="font-medium text-sm text-gray-700">Edge Cases</h3>

      <div className="space-y-3">
        <div>
          <p className="text-xs text-gray-600 mb-1">At minimum (0)</p>
          <ControlledNumberCounter value={0} min={0} max={5} />
        </div>

        <div>
          <p className="text-xs text-gray-600 mb-1">At maximum (10)</p>
          <ControlledNumberCounter value={10} min={0} max={10} />
        </div>

        <div>
          <p className="text-xs text-gray-600 mb-1">Large numbers (step 100)</p>
          <ControlledNumberCounter value={500} min={0} max={1000} step={100} />
        </div>

        <div>
          <p className="text-xs text-gray-600 mb-1">Read-only display</p>
          <ControlledNumberCounter value={7} allowManualInput={false} />
        </div>
      </div>
    </div>
  ),
};
