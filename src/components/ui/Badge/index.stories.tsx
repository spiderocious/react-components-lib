import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from ".";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
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
        "blue-dark",
        "red-dark",
        "green-dark",
        "orange-dark",
        "gray-dark",
        "purple-dark",
        "cyan-dark",
        "yellow-dark",
        "black",
        "outline",
        "outline-blue",
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
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Icons for examples
const PartyIcon = () => (
  <span role="img" aria-label="party">
    🎉
  </span>
);

const StarIcon = ({ filled = true }: { filled?: boolean }) => (
  <span style={{ color: filled ? "#fbbf24" : "#d1d5db" }}>⭐</span>
);

const CheckIcon = () => (
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
);

// Basic badges
export const Default: Story = {
  args: {
    children: "Badge",
    variant: "blue",
    size: "md",
  },
};

export const WithIcon: Story = {
  args: {
    children: "COMING SOON",
    variant: "blue",
    size: "md",
    icon: <PartyIcon />,
    iconPosition: "right",
  },
};

export const DarkVariant: Story = {
  args: {
    children: "COMING SOON",
    variant: "black",
    size: "md",
    icon: <PartyIcon />,
    iconPosition: "right",
  },
};

export const WithStars: Story = {
  args: {
    children: "MEGA STAR",
    variant: "blue",
    size: "md",
    icon: (
      <div className="flex">
        <StarIcon filled />
        <StarIcon filled />
        <StarIcon filled />
        <StarIcon filled={false} />
        <StarIcon filled={false} />
      </div>
    ),
    iconPosition: "right",
  },
};

export const DarkWithStars: Story = {
  args: {
    children: "MEGA STAR",
    variant: "black",
    size: "md",
    icon: (
      <div className="flex">
        <StarIcon filled />
        <StarIcon filled />
        <StarIcon filled />
        <StarIcon filled={false} />
        <StarIcon filled={false} />
      </div>
    ),
    iconPosition: "right",
  },
};

// Size variations
export const Small: Story = {
  args: {
    children: "Small Badge",
    variant: "green",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    children: "Large Badge",
    variant: "purple",
    size: "lg",
  },
};

// All light variants
export const LightVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="blue">Blue</Badge>
      <Badge variant="red">Red</Badge>
      <Badge variant="green">Green</Badge>
      <Badge variant="orange">Orange</Badge>
      <Badge variant="gray">Gray</Badge>
      <Badge variant="purple">Purple</Badge>
      <Badge variant="cyan">Cyan</Badge>
      <Badge variant="yellow">Yellow</Badge>
    </div>
  ),
};

// All dark variants
export const DarkVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="blue-dark">Blue Dark</Badge>
      <Badge variant="red-dark">Red Dark</Badge>
      <Badge variant="green-dark">Green Dark</Badge>
      <Badge variant="orange-dark">Orange Dark</Badge>
      <Badge variant="gray-dark">Gray Dark</Badge>
      <Badge variant="purple-dark">Purple Dark</Badge>
      <Badge variant="cyan-dark">Cyan Dark</Badge>
      <Badge variant="yellow-dark">Yellow Dark</Badge>
      <Badge variant="black">Black</Badge>
    </div>
  ),
};

// Outline variants
export const OutlineVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline">Outline</Badge>
      <Badge variant="outline-blue">Outline Blue</Badge>
    </div>
  ),
};

// Recreating Image 2 layout
export const ImageLayout: Story = {
  render: () => (
    <div className="space-y-4 max-w-sm">
      {/* Row 1: Light badges with icons */}
      <div className="space-y-2">
        <Badge variant="blue" icon={<PartyIcon />} iconPosition="right">
          COMING SOON
        </Badge>
        <Badge variant="black" icon={<PartyIcon />} iconPosition="right">
          COMING SOON
        </Badge>
      </div>

      {/* Row 2: Star ratings */}
      <div className="space-y-2">
        <Badge
          variant="blue"
          icon={
            <div className="flex">
              <StarIcon filled />
              <StarIcon filled />
              <StarIcon filled />
              <StarIcon filled={false} />
              <StarIcon filled={false} />
            </div>
          }
          iconPosition="right"
        >
          MEGA STAR
        </Badge>
        <Badge
          variant="black"
          icon={
            <div className="flex">
              <StarIcon filled />
              <StarIcon filled />
              <StarIcon filled />
              <StarIcon filled={false} />
              <StarIcon filled={false} />
            </div>
          }
          iconPosition="right"
        >
          MEGA STAR
        </Badge>
      </div>

      {/* Row 3: Repeat pattern */}
      <div className="space-y-2">
        <Badge variant="blue" icon={<PartyIcon />} iconPosition="right">
          COMING SOON
        </Badge>
        <Badge variant="black" icon={<PartyIcon />} iconPosition="right">
          COMING SOON
        </Badge>
      </div>

      {/* Row 4: More star ratings */}
      <div className="space-y-2">
        <Badge
          variant="blue"
          icon={
            <div className="flex">
              <StarIcon filled />
              <StarIcon filled />
              <StarIcon filled />
              <StarIcon filled={false} />
              <StarIcon filled={false} />
            </div>
          }
          iconPosition="right"
        >
          MEGA STAR
        </Badge>
        <Badge
          variant="black"
          icon={
            <div className="flex">
              <StarIcon filled />
              <StarIcon filled />
              <StarIcon filled />
              <StarIcon filled={false} />
              <StarIcon filled={false} />
            </div>
          }
          iconPosition="right"
        >
          MEGA STAR
        </Badge>
      </div>
    </div>
  ),
};

// Status badges
export const StatusBadges: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Order Status</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="green" icon={<CheckIcon />}>
            Completed
          </Badge>
          <Badge variant="orange">Pending</Badge>
          <Badge variant="blue">Processing</Badge>
          <Badge variant="red">Cancelled</Badge>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">User Roles</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="purple-dark">Admin</Badge>
          <Badge variant="blue-dark">Moderator</Badge>
          <Badge variant="green-dark">User</Badge>
          <Badge variant="gray-dark">Guest</Badge>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Priority Levels</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="red">High</Badge>
          <Badge variant="orange">Medium</Badge>
          <Badge variant="blue">Low</Badge>
          <Badge variant="gray">None</Badge>
        </div>
      </div>
    </div>
  ),
};

// Rating badges
export const RatingBadges: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Product Ratings</h3>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant="yellow"
            icon={
              <div className="flex">
                <StarIcon filled />
                <StarIcon filled />
                <StarIcon filled />
                <StarIcon filled />
                <StarIcon filled />
              </div>
            }
            iconPosition="right"
          >
            5 STARS
          </Badge>
          <Badge
            variant="blue"
            icon={
              <div className="flex">
                <StarIcon filled />
                <StarIcon filled />
                <StarIcon filled />
                <StarIcon filled />
                <StarIcon filled={false} />
              </div>
            }
            iconPosition="right"
          >
            4 STARS
          </Badge>
          <Badge
            variant="green"
            icon={
              <div className="flex">
                <StarIcon filled />
                <StarIcon filled />
                <StarIcon filled />
                <StarIcon filled={false} />
                <StarIcon filled={false} />
              </div>
            }
            iconPosition="right"
          >
            3 STARS
          </Badge>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">User Levels</h3>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant="yellow-dark"
            icon={
              <div className="flex">
                <StarIcon filled />
                <StarIcon filled />
                <StarIcon filled />
                <StarIcon filled />
                <StarIcon filled />
              </div>
            }
            iconPosition="left"
          >
            PREMIUM
          </Badge>
          <Badge
            variant="black"
            icon={
              <div className="flex">
                <StarIcon filled />
                <StarIcon filled />
                <StarIcon filled />
                <StarIcon filled={false} />
                <StarIcon filled={false} />
              </div>
            }
            iconPosition="left"
          >
            PRO
          </Badge>
          <Badge
            variant="blue-dark"
            icon={
              <div className="flex">
                <StarIcon filled />
                <StarIcon filled />
                <StarIcon filled={false} />
                <StarIcon filled={false} />
                <StarIcon filled={false} />
              </div>
            }
            iconPosition="left"
          >
            BASIC
          </Badge>
        </div>
      </div>
    </div>
  ),
};

// Notification badges
export const NotificationBadges: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Counts</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="red-dark">3</Badge>
          <Badge variant="blue-dark">12</Badge>
          <Badge variant="green-dark">99+</Badge>
          <Badge variant="orange-dark">NEW</Badge>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Features</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="purple" icon={<PartyIcon />} iconPosition="right">
            BETA
          </Badge>
          <Badge variant="green" icon={<PartyIcon />} iconPosition="right">
            NEW
          </Badge>
          <Badge variant="orange" icon={<PartyIcon />} iconPosition="right">
            SOON
          </Badge>
          <Badge variant="blue" icon={<PartyIcon />} iconPosition="right">
            UPDATED
          </Badge>
        </div>
      </div>
    </div>
  ),
};

// Size comparison
export const SizeComparison: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Badge variant="blue" size="sm">
          Small
        </Badge>
        <Badge variant="blue" size="md">
          Medium
        </Badge>
        <Badge variant="blue" size="lg">
          Large
        </Badge>
      </div>

      <div className="flex items-center gap-4">
        <Badge variant="purple-dark" size="sm" icon={<CheckIcon />}>
          Small
        </Badge>
        <Badge variant="purple-dark" size="md" icon={<CheckIcon />}>
          Medium
        </Badge>
        <Badge variant="purple-dark" size="lg" icon={<CheckIcon />}>
          Large
        </Badge>
      </div>

      <div className="flex items-center gap-4">
        <Badge
          variant="green"
          size="sm"
          icon={<StarIcon filled />}
          iconPosition="right"
        >
          Small
        </Badge>
        <Badge
          variant="green"
          size="md"
          icon={<StarIcon filled />}
          iconPosition="right"
        >
          Medium
        </Badge>
        <Badge
          variant="green"
          size="lg"
          icon={<StarIcon filled />}
          iconPosition="right"
        >
          Large
        </Badge>
      </div>
    </div>
  ),
};

// Interactive showcase
export const InteractiveShowcase: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-4">Badge Showcase</h3>
        <p className="text-gray-600 text-sm">
          Various badge styles and use cases
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h4 className="font-medium text-gray-800">Light Variants</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="blue">Info</Badge>
            <Badge variant="green">Success</Badge>
            <Badge variant="yellow">Warning</Badge>
            <Badge variant="red">Error</Badge>
            <Badge variant="gray">Neutral</Badge>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-gray-800">Dark Variants</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="blue-dark">Info</Badge>
            <Badge variant="green-dark">Success</Badge>
            <Badge variant="yellow-dark">Warning</Badge>
            <Badge variant="red-dark">Error</Badge>
            <Badge variant="black">Neutral</Badge>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-gray-800">With Icons</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="purple" icon={<PartyIcon />} iconPosition="left">
              Event
            </Badge>
            <Badge variant="green" icon={<CheckIcon />} iconPosition="left">
              Verified
            </Badge>
            <Badge
              variant="yellow"
              icon={<StarIcon filled />}
              iconPosition="right"
            >
              Featured
            </Badge>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-gray-800">Outline Style</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Default</Badge>
            <Badge variant="outline-blue">Blue</Badge>
          </div>
        </div>
      </div>
    </div>
  ),
};
