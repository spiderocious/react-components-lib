import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Input } from ".";

// Icon components for examples
const MailIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const UserIcon = () => (
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
);

const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "error"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    clearable: {
      control: { type: "boolean" },
    },
    validateOnBlur: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Controlled input wrapper for stories
const ControlledInput = (props: any) => {
  const [value, setValue] = useState(props.value || "");

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClear={() => setValue("")}
    />
  );
};

export const Default: Story = {
  render: () => <ControlledInput placeholder="Username" />,
};

export const WithLeftIcon: Story = {
  render: () => (
    <ControlledInput placeholder="Username" leftIcon={<UserIcon />} />
  ),
};

export const WithRightIcon: Story = {
  render: () => (
    <ControlledInput placeholder="Search..." rightIcon={<SearchIcon />} />
  ),
};

export const WithEmailIcon: Story = {
  render: () => (
    <ControlledInput
      placeholder="Username"
      leftIcon={<MailIcon />}
      value="Terry Pouke"
    />
  ),
};

export const Clearable: Story = {
  render: () => (
    <ControlledInput placeholder="Username" clearable value="Terry Pouke" />
  ),
};

export const ClearableWithIcon: Story = {
  render: () => (
    <ControlledInput
      placeholder="Username"
      leftIcon={<MailIcon />}
      clearable
      value="Terry Pouke"
    />
  ),
};

export const WithError: Story = {
  render: () => (
    <ControlledInput
      placeholder="Username"
      errorMessage="This field is required"
    />
  ),
};

export const WithValidation: Story = {
  render: () => (
    <ControlledInput
      placeholder="Enter email address"
      regex={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
      errorMessage="Please enter a valid email address"
    />
  ),
};

export const ValidateOnBlur: Story = {
  render: () => (
    <ControlledInput
      placeholder="Enter email address"
      regex={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
      validateOnBlur={true}
      errorMessage="Please enter a valid email address"
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <Input placeholder="Username" value="Disabled input" disabled />
  ),
};

export const DisabledWithIcon: Story = {
  render: () => (
    <Input
      placeholder="Username"
      leftIcon={<UserIcon />}
      value="Disabled input"
      disabled
    />
  ),
};

// Size variations
export const Small: Story = {
  render: () => (
    <ControlledInput
      placeholder="Small input"
      size="sm"
      leftIcon={<UserIcon />}
    />
  ),
};

export const Large: Story = {
  render: () => (
    <ControlledInput
      placeholder="Large input"
      size="lg"
      leftIcon={<UserIcon />}
    />
  ),
};

// Recreating the exact layouts from images
export const UsernameVariants: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <ControlledInput placeholder="Username" />
      <ControlledInput placeholder="Username" clearable />
      <ControlledInput
        placeholder="Username"
        leftIcon={<MailIcon />}
        value="Terry Pouke"
      />
      <Input placeholder="Username" value="Terry Pouke" disabled />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
      <div className="space-y-3">
        <h3 className="font-medium text-sm text-gray-700">Basic States</h3>
        <ControlledInput placeholder="Default" />
        <ControlledInput placeholder="With left icon" leftIcon={<UserIcon />} />
        <ControlledInput
          placeholder="With right icon"
          rightIcon={<SearchIcon />}
        />
        <ControlledInput placeholder="Clearable" clearable value="Clear me" />
      </div>

      <div className="space-y-3">
        <h3 className="font-medium text-sm text-gray-700">Error & Disabled</h3>
        <ControlledInput
          placeholder="Error state"
          errorMessage="This field is required"
        />
        <Input placeholder="Disabled" disabled value="Cannot edit" />
        <ControlledInput
          placeholder="Email validation"
          regex={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
          errorMessage="Invalid email format"
        />
      </div>
    </div>
  ),
};
