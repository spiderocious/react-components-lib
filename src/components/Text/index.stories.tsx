import type { Meta, StoryObj } from "@storybook/react";
import { Text } from ".";

const meta: Meta<typeof Text> = {
  title: "Components/Text",
  component: Text,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Default Button",
    as: "h1",
  },
};

export const Italic: Story = {
  args: {
    children: "Italic Text",
    italic: true,
  },
};

export const Underline: Story = {
  args: {
    children: "Underlined Text",
    underline: true,
  },
};
