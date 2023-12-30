import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Skeleton,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonCard,
  SkeletonCircle,
  SkeletonText,
} from ".";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  argTypes: {
    animation: {
      control: { type: "select" },
      options: ["pulse", "wave", "none"],
    },
    shape: {
      control: { type: "select" },
      options: ["rectangle", "circle", "rounded", "pill"],
    },
    variant: {
      control: { type: "select" },
      options: ["default", "light", "lighter"],
    },
    count: {
      control: { type: "number" },
      min: 1,
      max: 10,
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Basic examples
export const Default: Story = {
  args: {
    width: "200px",
    height: "20px",
  },
};

export const Circle: Story = {
  args: {
    width: "50px",
    height: "50px",
    shape: "circle",
  },
};

export const Multiple: Story = {
  args: {
    width: "100%",
    height: "20px",
    count: 3,
  },
};

// Animation variants
export const PulseAnimation: Story = {
  args: {
    width: "200px",
    height: "20px",
    animation: "pulse",
  },
};

export const WaveAnimation: Story = {
  args: {
    width: "200px",
    height: "20px",
    animation: "wave",
  },
};

export const NoAnimation: Story = {
  args: {
    width: "200px",
    height: "20px",
    animation: "none",
  },
};

// Shape variations
export const ShapeVariations: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton width="100px" height="20px" shape="rectangle" />
        <span className="text-sm text-gray-600">Rectangle</span>
      </div>
      <div className="flex items-center gap-4">
        <Skeleton width="100px" height="20px" shape="rounded" />
        <span className="text-sm text-gray-600">Rounded</span>
      </div>
      <div className="flex items-center gap-4">
        <Skeleton width="100px" height="20px" shape="pill" />
        <span className="text-sm text-gray-600">Pill</span>
      </div>
      <div className="flex items-center gap-4">
        <Skeleton width="40px" height="40px" shape="circle" />
        <span className="text-sm text-gray-600">Circle</span>
      </div>
    </div>
  ),
};

// Predefined components
export const TextSkeleton: Story = {
  render: () => (
    <div className="space-y-2 max-w-md">
      <SkeletonText width="100%" />
      <SkeletonText width="80%" />
      <SkeletonText width="60%" />
    </div>
  ),
};

export const AvatarSkeleton: Story = {
  render: () => (
    <div className="flex gap-3">
      <SkeletonAvatar />
      <SkeletonCircle width="60px" />
      <SkeletonCircle width="80px" />
    </div>
  ),
};

export const ButtonSkeleton: Story = {
  render: () => (
    <div className="flex gap-3">
      <SkeletonButton />
      <SkeletonButton width="100px" height="32px" />
      <SkeletonButton width="120px" height="40px" />
    </div>
  ),
};

// Card layouts (recreating Image 6)
export const CardLayouts: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-4 p-4 border rounded-lg"
        >
          {/* Left side - text skeleton */}
          <div className="flex-1">
            <Skeleton width="100%" height="16px" className="mb-2" />
          </div>
          {/* Right side - circle skeleton */}
          <Skeleton width="40px" height="40px" shape="circle" />
        </div>
      ))}
    </div>
  ),
};

// Progress-like skeletons (recreating Image 7)
export const ProgressSkeletons: Story = {
  render: () => (
    <div className="space-y-6 max-w-lg">
      {/* Blue progress-like */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <Skeleton
            width="60%"
            height="8px"
            className="bg-blue-400"
            shape="pill"
          />
          <Skeleton
            width="40%"
            height="8px"
            className="bg-blue-200"
            shape="pill"
          />
        </div>
      </div>

      {/* Yellow progress-like */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <Skeleton
            width="50%"
            height="8px"
            className="bg-yellow-400"
            shape="pill"
          />
          <Skeleton
            width="50%"
            height="8px"
            className="bg-yellow-200"
            shape="pill"
          />
        </div>
      </div>

      {/* Red progress-like */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <Skeleton
            width="20%"
            height="8px"
            className="bg-red-400"
            shape="pill"
          />
          <Skeleton
            width="80%"
            height="8px"
            className="bg-red-200"
            shape="pill"
          />
        </div>
      </div>

      {/* Green progress-like */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <Skeleton
            width="80%"
            height="8px"
            className="bg-green-400"
            shape="pill"
          />
          <Skeleton
            width="20%"
            height="8px"
            className="bg-green-200"
            shape="pill"
          />
        </div>
      </div>
    </div>
  ),
};

// Complex card layout
export const ComplexCard: Story = {
  render: () => <SkeletonCard className="max-w-sm" />,
};

// Loading states
export const LoadingStates: Story = {
  render: () => (
    <div className="space-y-6">
      {/* Article loading */}
      <div className="max-w-md">
        <h3 className="text-sm font-medium mb-3">Article Loading</h3>
        <div className="space-y-3">
          <SkeletonText height="24px" width="80%" />
          <SkeletonText height="16px" width="100%" />
          <SkeletonText height="16px" width="90%" />
          <SkeletonText height="16px" width="60%" />
        </div>
      </div>

      {/* Profile loading */}
      <div className="max-w-md">
        <h3 className="text-sm font-medium mb-3">Profile Loading</h3>
        <div className="flex items-start gap-4">
          <SkeletonCircle width="60px" />
          <div className="flex-1 space-y-2">
            <SkeletonText height="20px" width="40%" />
            <SkeletonText height="16px" width="60%" />
            <SkeletonText height="14px" width="30%" />
          </div>
        </div>
      </div>

      {/* List loading */}
      <div className="max-w-md">
        <h3 className="text-sm font-medium mb-3">List Loading</h3>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-center gap-3">
              <SkeletonCircle width="32px" />
              <div className="flex-1 space-y-1">
                <SkeletonText height="16px" width="70%" />
                <SkeletonText height="14px" width="50%" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

// Variant showcase
export const VariantShowcase: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-3">Default</h3>
        <div className="space-y-2">
          <Skeleton width="100%" height="16px" variant="default" />
          <Skeleton width="80%" height="16px" variant="default" />
          <Skeleton width="60%" height="16px" variant="default" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">Light</h3>
        <div className="space-y-2">
          <Skeleton width="100%" height="16px" variant="light" />
          <Skeleton width="80%" height="16px" variant="light" />
          <Skeleton width="60%" height="16px" variant="light" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">Lighter</h3>
        <div className="space-y-2">
          <Skeleton width="100%" height="16px" variant="lighter" />
          <Skeleton width="80%" height="16px" variant="lighter" />
          <Skeleton width="60%" height="16px" variant="lighter" />
        </div>
      </div>
    </div>
  ),
};

// Custom styles
export const CustomStyles: Story = {
  render: () => (
    <div className="space-y-4">
      <Skeleton
        width="200px"
        height="100px"
        className="bg-gradient-to-r from-purple-200 to-pink-200"
      />
      <Skeleton
        width="150px"
        height="150px"
        shape="circle"
        className="bg-gradient-to-br from-blue-200 to-cyan-200"
      />
      <div className="flex gap-2">
        <Skeleton
          width="60px"
          height="20px"
          className="bg-red-200"
          shape="pill"
        />
        <Skeleton
          width="80px"
          height="20px"
          className="bg-green-200"
          shape="pill"
        />
        <Skeleton
          width="70px"
          height="20px"
          className="bg-blue-200"
          shape="pill"
        />
      </div>
    </div>
  ),
};
