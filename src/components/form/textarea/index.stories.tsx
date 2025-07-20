import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { TextArea } from ".";

const meta: Meta<typeof TextArea> = {
  title: "Components/TextArea",
  component: TextArea,
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
    validateOnBlur: {
      control: { type: "boolean" },
    },
    showCharacterCount: {
      control: { type: "boolean" },
    },
    autoResize: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Controlled component wrapper
const ControlledTextArea = (props: any) => {
  const [value, setValue] = useState(props.value || "");

  return (
    <TextArea
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const Default: Story = {
  render: () => <ControlledTextArea placeholder="Business description" />,
};

export const WithContent: Story = {
  render: () => (
    <ControlledTextArea
      placeholder="Business description"
      value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in..."
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <TextArea
      placeholder="Business description"
      value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in..."
      disabled
    />
  ),
};

export const WithError: Story = {
  render: () => (
    <ControlledTextArea
      placeholder="Business description"
      errorMessage="This field is required"
    />
  ),
};

export const WithCharacterCount: Story = {
  render: () => (
    <ControlledTextArea
      placeholder="Enter your message"
      showCharacterCount={true}
      value="Sample text"
    />
  ),
};

export const WithMaxLength: Story = {
  render: () => (
    <ControlledTextArea
      placeholder="Enter description (max 200 characters)"
      maxLength={200}
      value="This is a sample description that shows character counting."
    />
  ),
};

export const AutoResize: Story = {
  render: () => (
    <ControlledTextArea
      placeholder="This textarea will grow as you type..."
      autoResize={true}
    />
  ),
};

export const WithValidation: Story = {
  render: () => (
    <ControlledTextArea
      placeholder="Enter at least 10 characters"
      regex={/.{10,}/}
      errorMessage="Please enter at least 10 characters"
    />
  ),
};

export const ValidateOnBlur: Story = {
  render: () => (
    <ControlledTextArea
      placeholder="Enter at least 10 characters"
      regex={/.{10,}/}
      validateOnBlur={true}
      errorMessage="Please enter at least 10 characters"
    />
  ),
};

// Size variations
export const Small: Story = {
  render: () => <ControlledTextArea placeholder="Small textarea" size="sm" />,
};

export const Large: Story = {
  render: () => <ControlledTextArea placeholder="Large textarea" size="lg" />,
};

// Recreating the exact layouts from the image
export const BusinessDescriptionStates: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Empty placeholder */}
      <ControlledTextArea placeholder="Business description" />

      {/* With content */}
      <ControlledTextArea
        placeholder="Business description"
        value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in..."
      />

      {/* Disabled state */}
      <TextArea
        placeholder="Business description"
        value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in..."
        disabled
      />
    </div>
  ),
};

export const AllFeatures: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
      <div className="space-y-4">
        <h3 className="font-medium text-sm text-gray-700">Basic States</h3>
        <ControlledTextArea placeholder="Default textarea" />
        <ControlledTextArea
          placeholder="With error"
          errorMessage="This field is required"
        />
        <TextArea
          placeholder="Disabled textarea"
          value="Cannot edit this content"
          disabled
        />
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-sm text-gray-700">Advanced Features</h3>
        <ControlledTextArea
          placeholder="With character limit (100)"
          maxLength={100}
          value="This textarea has a character limit."
        />
        <ControlledTextArea
          placeholder="Auto-resize textarea"
          autoResize={true}
        />
        <ControlledTextArea
          placeholder="With validation"
          regex={/.{20,}/}
          errorMessage="Minimum 20 characters required"
        />
      </div>
    </div>
  ),
};
