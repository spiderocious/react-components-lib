import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { PhoneNumberInput } from ".";

const meta: Meta<typeof PhoneNumberInput> = {
  title: "Components/PhoneNumberInput",
  component: PhoneNumberInput,
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
    defaultCountry: {
      control: { type: "select" },
      options: ["NG", "US", "GB", "FR", "DE"],
    },
    validateOnBlur: {
      control: { type: "boolean" },
    },
    showDropdown: {
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
const ControlledPhoneInput = (props: any) => {
  const [value, setValue] = useState(props.value || "");

  return (
    <PhoneNumberInput
      {...props}
      value={value}
      onChange={(newValue, country) => {
        setValue(newValue);
        console.log("Phone changed:", newValue, country);
      }}
    />
  );
};

export const Default: Story = {
  render: () => (
    <ControlledPhoneInput placeholder="Phone number" defaultCountry="NG" />
  ),
};

export const WithValue: Story = {
  render: () => (
    <ControlledPhoneInput
      placeholder="Phone number"
      value="+234 080 000 112 1126"
      defaultCountry="NG"
    />
  ),
};

export const WithoutDropdown: Story = {
  render: () => (
    <ControlledPhoneInput
      placeholder="Phone number"
      defaultCountry="NG"
      showDropdown={false}
    />
  ),
};

export const WithValidation: Story = {
  render: () => (
    <ControlledPhoneInput
      placeholder="Phone number"
      defaultCountry="NG"
      regex={/^\+234\d{10}$/}
      errorMessage="Please enter a valid Nigerian phone number"
    />
  ),
};

export const WithError: Story = {
  render: () => (
    <ControlledPhoneInput
      placeholder="Phone number"
      defaultCountry="NG"
      errorMessage="The phone number you entered is invalid."
      value="+234 123"
    />
  ),
};

export const ValidateOnBlur: Story = {
  render: () => (
    <ControlledPhoneInput
      placeholder="Phone number"
      defaultCountry="NG"
      regex={/^\+234\d{10}$/}
      validateOnBlur={true}
      errorMessage="Please enter a valid phone number"
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <PhoneNumberInput
      placeholder="Phone number"
      defaultCountry="NG"
      value="+234 080 000 112 1126"
      disabled
    />
  ),
};

export const USNumber: Story = {
  render: () => (
    <ControlledPhoneInput
      placeholder="Phone number"
      defaultCountry="US"
      regex={/^\+1\d{10}$/}
      errorMessage="Please enter a valid US phone number"
    />
  ),
};

// Size variations
export const Small: Story = {
  render: () => (
    <ControlledPhoneInput
      placeholder="Phone number"
      size="sm"
      defaultCountry="NG"
    />
  ),
};

export const Large: Story = {
  render: () => (
    <ControlledPhoneInput
      placeholder="Phone number"
      size="lg"
      defaultCountry="NG"
    />
  ),
};

// Recreating the exact layouts from the image
export const PhoneInputStates: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      {/* Empty state with dropdown */}
      <ControlledPhoneInput placeholder="Phone number" defaultCountry="NG" />

      {/* With number */}
      <ControlledPhoneInput
        placeholder="Phone number"
        value="+234 080 000 112 1126"
        defaultCountry="NG"
      />

      {/* Without dropdown - focused state */}
      <ControlledPhoneInput
        placeholder="Phone number"
        defaultCountry="NG"
        showDropdown={false}
      />

      {/* Error state */}
      <ControlledPhoneInput
        placeholder="Phone number"
        defaultCountry="NG"
        errorMessage="The phone number you entered is invalid."
        showDropdown={false}
      />
    </div>
  ),
};
