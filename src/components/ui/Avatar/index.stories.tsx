import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from ".";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["initials", "image", "icon"],
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl", "2xl"],
    },
    variant: {
      control: { type: "select" },
      options: [
        "blue",
        "gray",
        "green",
        "red",
        "yellow",
        "purple",
        "pink",
        "indigo",
        "primary",
        "secondary",
      ],
    },
    badgePosition: {
      control: { type: "select" },
      options: ["top-right", "top-left", "bottom-right", "bottom-left"],
    },
    badgeVariant: {
      control: { type: "select" },
      options: ["blue", "green", "red", "yellow", "purple", "gray"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Custom icons for examples
const UserIcon = () => (
  <svg className="h-1/2 w-1/2" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const CompanyIcon = () => (
  <svg className="h-1/2 w-1/2" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
  </svg>
);

// Sample image URL for testing
const sampleImageUrl =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face";

// Basic avatar types
export const InitialsDefault: Story = {
  args: {
    type: "initials",
    name: "John Doe",
    variant: "blue",
    size: "md",
  },
};

export const ImageAvatar: Story = {
  args: {
    type: "image",
    src: sampleImageUrl,
    alt: "User avatar",
    name: "John Doe", // Fallback for initials
    size: "md",
  },
};

export const IconAvatar: Story = {
  args: {
    type: "icon",
    icon: <UserIcon />,
    variant: "gray",
    size: "md",
  },
};

// With badges
export const InitialsWithBadge: Story = {
  args: {
    type: "initials",
    name: "Michael Johnson",
    variant: "blue",
    size: "md",
    badge: "M",
    badgePosition: "top-right",
    badgeVariant: "blue",
  },
};

export const ImageWithBadge: Story = {
  args: {
    type: "image",
    src: sampleImageUrl,
    name: "John Doe",
    size: "md",
    badge: "5",
    badgePosition: "top-right",
    badgeVariant: "red",
  },
};

export const IconWithBadge: Story = {
  args: {
    type: "icon",
    icon: <CompanyIcon />,
    variant: "gray",
    size: "md",
    badge: "!",
    badgePosition: "top-right",
    badgeVariant: "yellow",
  },
};

// Different variants
export const BlueVariant: Story = {
  args: {
    type: "initials",
    name: "Blue Avatar",
    variant: "blue",
    size: "md",
  },
};

export const GrayVariant: Story = {
  args: {
    type: "initials",
    name: "Gray Avatar",
    variant: "gray",
    size: "md",
  },
};

export const GreenVariant: Story = {
  args: {
    type: "initials",
    name: "Green Avatar",
    variant: "green",
    size: "md",
  },
};

// Different sizes
export const ExtraSmall: Story = {
  args: {
    type: "initials",
    name: "XS",
    variant: "blue",
    size: "xs",
  },
};

export const Small: Story = {
  args: {
    type: "initials",
    name: "SM",
    variant: "blue",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    type: "initials",
    name: "LG",
    variant: "blue",
    size: "lg",
  },
};

export const ExtraLarge: Story = {
  args: {
    type: "initials",
    name: "XL",
    variant: "blue",
    size: "xl",
  },
};

// Badge positions
export const BadgeTopLeft: Story = {
  args: {
    type: "initials",
    name: "TL",
    variant: "blue",
    size: "lg",
    badge: "1",
    badgePosition: "top-left",
    badgeVariant: "red",
  },
};

export const BadgeBottomRight: Story = {
  args: {
    type: "initials",
    name: "BR",
    variant: "blue",
    size: "lg",
    badge: "2",
    badgePosition: "bottom-right",
    badgeVariant: "green",
  },
};

export const BadgeBottomLeft: Story = {
  args: {
    type: "initials",
    name: "BL",
    variant: "blue",
    size: "lg",
    badge: "3",
    badgePosition: "bottom-left",
    badgeVariant: "purple",
  },
};

// Recreating exact layouts from images
export const ProfileAvatars: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      {/* Image avatars with online indicator */}
      <Avatar
        type="image"
        src={sampleImageUrl}
        name="User"
        size="lg"
        badge={
          <div className="h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
        }
        badgePosition="bottom-right"
      />
      <Avatar
        type="image"
        src={sampleImageUrl}
        name="User"
        size="lg"
        badge={
          <div className="h-3 w-3 bg-gray-400 rounded-full border-2 border-white" />
        }
        badgePosition="bottom-right"
      />
    </div>
  ),
};

export const InitialsVariations: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4">
      {/* Blue variants */}
      <Avatar type="icon" icon={<UserIcon />} variant="blue" size="lg" />
      <Avatar
        type="icon"
        icon={<UserIcon />}
        variant="blue"
        size="lg"
        badge="M"
      />
      <Avatar type="initials" name="AA" variant="blue" size="lg" />
      <Avatar type="initials" name="AA" variant="blue" size="lg" badge="M" />

      {/* Gray variants */}
      <Avatar type="initials" name="AA" variant="gray" size="lg" />
      <Avatar type="initials" name="AA" variant="gray" size="lg" badge="M" />
      <Avatar type="icon" icon={<UserIcon />} variant="gray" size="lg" />
      <Avatar
        type="icon"
        icon={<UserIcon />}
        variant="gray"
        size="lg"
        badge="M"
      />
    </div>
  ),
};

export const OutlineVariations: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4 p-4 bg-gray-100 rounded-lg">
      {/* Outline/border style - simulated with ring */}
      <div className="relative">
        <Avatar
          type="initials"
          name="AA"
          variant="gray"
          size="lg"
          className="ring-2 ring-gray-300 ring-opacity-50"
        />
      </div>
      <div className="relative">
        <Avatar
          type="initials"
          name="AA"
          variant="gray"
          size="lg"
          badge="M"
          className="ring-2 ring-gray-300 ring-opacity-50"
        />
      </div>
      <div className="relative">
        <Avatar
          type="icon"
          icon={<UserIcon />}
          variant="gray"
          size="lg"
          className="ring-2 ring-gray-300 ring-opacity-50"
        />
      </div>
      <div className="relative">
        <Avatar
          type="icon"
          icon={<UserIcon />}
          variant="gray"
          size="lg"
          badge="M"
          className="ring-2 ring-gray-300 ring-opacity-50"
        />
      </div>
    </div>
  ),
};

export const LightVariations: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4 p-4 bg-blue-50 rounded-lg">
      {/* Light background variations */}
      <Avatar
        type="initials"
        name="AA"
        size="lg"
        className="bg-blue-100 text-blue-600"
      />
      <Avatar
        type="initials"
        name="AA"
        size="lg"
        badge="M"
        className="bg-blue-100 text-blue-600"
      />
      <Avatar
        type="icon"
        icon={<UserIcon />}
        size="lg"
        className="bg-blue-100 text-blue-600"
      />
      <Avatar
        type="icon"
        icon={<UserIcon />}
        size="lg"
        badge="M"
        className="bg-blue-100 text-blue-600"
      />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <div className="text-center">
        <Avatar type="initials" name="XS" variant="blue" size="xs" />
        <p className="text-xs mt-1">XS</p>
      </div>
      <div className="text-center">
        <Avatar type="initials" name="SM" variant="blue" size="sm" />
        <p className="text-xs mt-1">SM</p>
      </div>
      <div className="text-center">
        <Avatar type="initials" name="MD" variant="blue" size="md" />
        <p className="text-xs mt-1">MD</p>
      </div>
      <div className="text-center">
        <Avatar type="initials" name="LG" variant="blue" size="lg" />
        <p className="text-xs mt-1">LG</p>
      </div>
      <div className="text-center">
        <Avatar type="initials" name="XL" variant="blue" size="xl" />
        <p className="text-xs mt-1">XL</p>
      </div>
      <div className="text-center">
        <Avatar type="initials" name="2XL" variant="blue" size="2xl" />
        <p className="text-xs mt-1">2XL</p>
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-5 gap-4">
      <Avatar type="initials" name="BL" variant="blue" size="lg" />
      <Avatar type="initials" name="GR" variant="gray" size="lg" />
      <Avatar type="initials" name="GN" variant="green" size="lg" />
      <Avatar type="initials" name="RD" variant="red" size="lg" />
      <Avatar type="initials" name="YL" variant="yellow" size="lg" />
      <Avatar type="initials" name="PR" variant="purple" size="lg" />
      <Avatar type="initials" name="PK" variant="pink" size="lg" />
      <Avatar type="initials" name="IN" variant="indigo" size="lg" />
    </div>
  ),
};
