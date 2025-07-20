import type { Meta, StoryObj } from "@storybook/react";
import { Button } from ".";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Solid: Story = {
  args: {
    children: "Solid Button",
    variant: "solid",
    size: "md",
    colorscheme: "primary",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline Button",
    variant: "outline",
    size: "md",
    colorscheme: "primary",
  },
};
