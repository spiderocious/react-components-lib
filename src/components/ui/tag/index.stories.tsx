import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tag } from ".";

const meta: Meta<typeof Tag> = {
  title: "Components/Tag",
  component: Tag,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "purple",
        "blue",
        "cyan",
        "indigo",
        "green",
        "orange",
        "pink",
        "gray",
        "white",
      ],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    shape: {
      control: { type: "select" },
      options: ["rounded", "pill", "square"],
    },
    layout: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
    disabled: {
      control: { type: "boolean" },
    },
    selected: {
      control: { type: "boolean" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Icons for examples
const PhoneIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const PaymentIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const TransferIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7,10 12,15 17,10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const CashIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const MonifyBadge = () => (
  <div className="flex items-center text-xs font-medium text-cyan-600">
    <span className="mr-1">⚡</span>
    <span>monify</span>
  </div>
);

// Basic tags
export const Default: Story = {
  args: {
    children: "AIRTIME",
    variant: "purple",
    icon: <PhoneIcon />,
  },
};

export const WithBadge: Story = {
  args: {
    children: "COLLECTION",
    variant: "cyan",
    icon: <PaymentIcon />,
    badge: <MonifyBadge />,
  },
};

// Recreating Image 1 layout
export const ServiceTags: Story = {
  render: () => (
    <div className="space-y-3 max-w-md">
      <Tag variant="purple" icon={<PhoneIcon />}>
        AIRTIME
      </Tag>

      <Tag variant="blue" icon={<PaymentIcon />}>
        BILL PAYMENT
      </Tag>

      <Tag variant="cyan" icon={<PaymentIcon />}>
        CARD TRANSFER
      </Tag>

      <Tag variant="indigo" icon={<CashIcon />}>
        CASHOUT
      </Tag>

      <Tag variant="blue" icon={<TransferIcon />}>
        TRANSFER
      </Tag>

      <Tag
        variant="green"
        icon={
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 12l2 2 4-4" />
            <path d="M21 12c.552 0 1-.448 1-1V5c0-.552-.448-1-1-1H3c-.552 0-1 .448-1 1v6c0 .552.448 1 1 1h18z" />
          </svg>
        }
      >
        INSURANCE PREMIUM
      </Tag>

      <Tag variant="cyan" icon={<PaymentIcon />} badge={<MonifyBadge />}>
        COLLECTION
      </Tag>

      <Tag variant="cyan" icon={<PaymentIcon />} badge={<MonifyBadge />}>
        PAYCODE
      </Tag>

      <Tag
        variant="indigo"
        icon={
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 6h18l-2 13H5L3 6z" />
            <path d="M3 6L2.05 2H1" />
            <circle cx="9" cy="20" r="1" />
            <circle cx="20" cy="20" r="1" />
          </svg>
        }
      >
        WITHDRAWALS
      </Tag>

      <Tag
        variant="orange"
        icon={
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
          </svg>
        }
      >
        Chip TRANSFER WITHDRAWAL
      </Tag>

      <Tag
        variant="pink"
        icon={
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
            <line x1="7" y1="7" x2="7.01" y2="7" />
          </svg>
        }
      >
        PURCHASE
      </Tag>
    </div>
  ),
};

// Recreating Image 2 layout (simplified tags)
export const SimpleTags: Story = {
  render: () => (
    <div className="space-y-2 max-w-xs">
      <Tag variant="purple" shape="pill" size="sm">
        AIRTIME
      </Tag>
      <Tag variant="blue" shape="pill" size="sm">
        BILL PAYMENT
      </Tag>
      <Tag variant="cyan" shape="pill" size="sm">
        CARD TRANSFER
      </Tag>
      <Tag variant="indigo" shape="pill" size="sm">
        CASHOUT
      </Tag>
      <Tag variant="blue" shape="pill" size="sm">
        TRANSFER
      </Tag>
      <Tag variant="green" shape="pill" size="sm">
        INSURANCE PREMIUM
      </Tag>
      <Tag variant="cyan" shape="pill" size="sm">
        COLLECTION
      </Tag>
      <Tag variant="cyan" shape="pill" size="sm">
        PAYCODE
      </Tag>
      <Tag variant="indigo" shape="pill" size="sm">
        WITHDRAWALS
      </Tag>
    </div>
  ),
};

// All variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag variant="purple">Purple</Tag>
      <Tag variant="blue">Blue</Tag>
      <Tag variant="cyan">Cyan</Tag>
      <Tag variant="indigo">Indigo</Tag>
      <Tag variant="green">Green</Tag>
      <Tag variant="orange">Orange</Tag>
      <Tag variant="pink">Pink</Tag>
      <Tag variant="gray">Gray</Tag>
      <Tag variant="white">White</Tag>
    </div>
  ),
};

// Size variations
export const SizeVariations: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Tag variant="blue" size="sm" icon={<PhoneIcon />}>
          Small Tag
        </Tag>
        <Tag variant="blue" size="md" icon={<PhoneIcon />}>
          Medium Tag
        </Tag>
        <Tag variant="blue" size="lg" icon={<PhoneIcon />}>
          Large Tag
        </Tag>
      </div>
    </div>
  ),
};

// Shape variations
export const ShapeVariations: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <Tag variant="purple" shape="rounded">
          Rounded
        </Tag>
        <Tag variant="blue" shape="pill">
          Pill
        </Tag>
        <Tag variant="green" shape="square">
          Square
        </Tag>
      </div>
    </div>
  ),
};

// Interactive states
export const InteractiveStates: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <Tag variant="blue" onClick={() => console.log("Clicked")}>
          Clickable
        </Tag>
        <Tag variant="green" selected>
          Selected
        </Tag>
        <Tag variant="gray" disabled>
          Disabled
        </Tag>
        <Tag
          variant="purple"
          selected
          onClick={() => console.log("Selected & Clickable")}
        >
          Selected + Clickable
        </Tag>
      </div>
    </div>
  ),
};

// Layout variations
export const LayoutVariations: Story = {
  render: () => (
    <div className="flex gap-8">
      <div>
        <h3 className="text-sm font-medium mb-2">Horizontal Layout</h3>
        <Tag variant="blue" layout="horizontal" icon={<PaymentIcon />}>
          BILL PAYMENT
        </Tag>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Vertical Layout</h3>
        <Tag variant="green" layout="vertical" icon={<TransferIcon />}>
          TRANSFER
        </Tag>
      </div>
    </div>
  ),
};
