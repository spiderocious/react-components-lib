import type { Meta, StoryObj } from "@storybook/react-vite";
import { Squircle } from ".";

const meta: Meta<typeof Squircle> = {
  title: "Components/squircle",
  component: Squircle,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl", "2xl"],
    },
    variant: {
      control: { type: "select" },
      options: ["default", "bordered", "shadow", "bordered-shadow"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Basic squircle examples
export const Default: Story = {
  args: {
    size: "md",
    variant: "default",
    children: (
      <div className="h-16 w-16 bg-blue-500 flex items-center justify-center text-white font-medium">
        Content
      </div>
    ),
  },
};

export const WithBorder: Story = {
  args: {
    size: "md",
    variant: "bordered",
    children: (
      <div className="h-16 w-16 bg-blue-500 flex items-center justify-center text-white font-medium">
        Bordered
      </div>
    ),
  },
};

export const WithShadow: Story = {
  args: {
    size: "md",
    variant: "shadow",
    children: (
      <div className="h-16 w-16 bg-blue-500 flex items-center justify-center text-white font-medium">
        Shadow
      </div>
    ),
  },
};

export const BorderedShadow: Story = {
  args: {
    size: "md",
    variant: "bordered-shadow",
    children: (
      <div className="h-16 w-16 bg-blue-500 flex items-center justify-center text-white font-medium">
        Both
      </div>
    ),
  },
};

// Size variations
export const ExtraSmall: Story = {
  args: {
    size: "xs",
    variant: "default",
    children: (
      <div className="h-8 w-8 bg-purple-500 flex items-center justify-center text-white text-xs font-medium">
        XS
      </div>
    ),
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    variant: "default",
    children: (
      <div className="h-10 w-10 bg-green-500 flex items-center justify-center text-white text-sm font-medium">
        SM
      </div>
    ),
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    variant: "default",
    children: (
      <div className="h-20 w-20 bg-red-500 flex items-center justify-center text-white text-lg font-medium">
        LG
      </div>
    ),
  },
};

export const ExtraLarge: Story = {
  args: {
    size: "xl",
    variant: "default",
    children: (
      <div className="h-24 w-24 bg-orange-500 flex items-center justify-center text-white text-xl font-medium">
        XL
      </div>
    ),
  },
};

export const TwoExtraLarge: Story = {
  args: {
    size: "2xl",
    variant: "default",
    children: (
      <div className="h-32 w-32 bg-indigo-500 flex items-center justify-center text-white text-2xl font-medium">
        2XL
      </div>
    ),
  },
};

// Practical use cases
export const WithImage: Story = {
  render: () => (
    <Squircle size="lg" variant="bordered">
      <img
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
        alt="Profile"
        className="h-20 w-20 object-cover"
      />
    </Squircle>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Squircle size="md" variant="shadow">
      <div className="h-16 w-16 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
        <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
          <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 9.74s9-4.19 9-9.74V7l-10-5z" />
        </svg>
      </div>
    </Squircle>
  ),
};

export const WithText: Story = {
  render: () => (
    <Squircle size="xl" variant="bordered-shadow">
      <div className="h-24 w-24 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-lg font-bold">
        ABC
      </div>
    </Squircle>
  ),
};

export const ColorfulGrid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Squircle size="md" variant="default">
        <div className="h-16 w-16 bg-red-500 flex items-center justify-center text-white font-medium">
          Red
        </div>
      </Squircle>
      <Squircle size="md" variant="bordered">
        <div className="h-16 w-16 bg-green-500 flex items-center justify-center text-white font-medium">
          Green
        </div>
      </Squircle>
      <Squircle size="md" variant="shadow">
        <div className="h-16 w-16 bg-blue-500 flex items-center justify-center text-white font-medium">
          Blue
        </div>
      </Squircle>
      <Squircle size="md" variant="bordered-shadow">
        <div className="h-16 w-16 bg-yellow-500 flex items-center justify-center text-gray-800 font-medium">
          Yellow
        </div>
      </Squircle>
      <Squircle size="md" variant="default">
        <div className="h-16 w-16 bg-purple-500 flex items-center justify-center text-white font-medium">
          Purple
        </div>
      </Squircle>
      <Squircle size="md" variant="shadow">
        <div className="h-16 w-16 bg-pink-500 flex items-center justify-center text-white font-medium">
          Pink
        </div>
      </Squircle>
    </div>
  ),
};

// Card-like usage
export const AsCard: Story = {
  render: () => (
    <Squircle size="xl" variant="bordered-shadow" className="bg-white">
      <div className="h-32 w-32 p-4 flex flex-col justify-between">
        <div className="text-center">
          <div className="h-8 w-8 bg-blue-500 rounded-full mx-auto mb-2"></div>
          <h3 className="text-sm font-medium text-gray-900">Card Title</h3>
        </div>
        <p className="text-xs text-gray-500 text-center">Card content</p>
      </div>
    </Squircle>
  ),
};

// Logo container
export const LogoContainer: Story = {
  render: () => (
    <Squircle size="lg" variant="bordered" className="bg-gray-50">
      <div className="h-20 w-20 flex items-center justify-center">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-gray-700"
        >
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2,17 12,22 22,17" />
          <polyline points="2,12 12,17 22,12" />
        </svg>
      </div>
    </Squircle>
  ),
};

// App icon style
export const AppIcon: Story = {
  render: () => (
    <Squircle size="xl" variant="shadow">
      <div className="h-24 w-24 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="text-white text-2xl font-bold">A</div>
      </div>
    </Squircle>
  ),
};

// All sizes comparison
export const SizeComparison: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <div className="text-center">
        <Squircle size="xs" variant="default">
          <div className="h-6 w-6 bg-blue-500 flex items-center justify-center text-white text-xs font-medium">
            XS
          </div>
        </Squircle>
        <p className="text-xs mt-1 text-gray-600">XS</p>
      </div>
      <div className="text-center">
        <Squircle size="sm" variant="default">
          <div className="h-8 w-8 bg-blue-500 flex items-center justify-center text-white text-xs font-medium">
            SM
          </div>
        </Squircle>
        <p className="text-xs mt-1 text-gray-600">SM</p>
      </div>
      <div className="text-center">
        <Squircle size="md" variant="default">
          <div className="h-10 w-10 bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
            MD
          </div>
        </Squircle>
        <p className="text-xs mt-1 text-gray-600">MD</p>
      </div>
      <div className="text-center">
        <Squircle size="lg" variant="default">
          <div className="h-12 w-12 bg-blue-500 flex items-center justify-center text-white text-base font-medium">
            LG
          </div>
        </Squircle>
        <p className="text-xs mt-1 text-gray-600">LG</p>
      </div>
      <div className="text-center">
        <Squircle size="xl" variant="default">
          <div className="h-16 w-16 bg-blue-500 flex items-center justify-center text-white text-lg font-medium">
            XL
          </div>
        </Squircle>
        <p className="text-xs mt-1 text-gray-600">XL</p>
      </div>
      <div className="text-center">
        <Squircle size="2xl" variant="default">
          <div className="h-20 w-20 bg-blue-500 flex items-center justify-center text-white text-xl font-medium">
            2XL
          </div>
        </Squircle>
        <p className="text-xs mt-1 text-gray-600">2XL</p>
      </div>
    </div>
  ),
};

// Variant comparison
export const VariantComparison: Story = {
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <div className="text-center">
        <Squircle size="lg" variant="default">
          <div className="h-20 w-20 bg-blue-500 flex items-center justify-center text-white font-medium">
            Default
          </div>
        </Squircle>
        <p className="text-sm mt-2 text-gray-700">Default</p>
      </div>

      <div className="text-center">
        <Squircle size="lg" variant="bordered">
          <div className="h-20 w-20 bg-green-500 flex items-center justify-center text-white font-medium">
            Bordered
          </div>
        </Squircle>
        <p className="text-sm mt-2 text-gray-700">Bordered</p>
      </div>

      <div className="text-center">
        <Squircle size="lg" variant="shadow">
          <div className="h-20 w-20 bg-purple-500 flex items-center justify-center text-white font-medium">
            Shadow
          </div>
        </Squircle>
        <p className="text-sm mt-2 text-gray-700">Shadow</p>
      </div>

      <div className="text-center">
        <Squircle size="lg" variant="bordered-shadow">
          <div className="h-20 w-20 bg-orange-500 flex items-center justify-center text-white font-medium">
            Both
          </div>
        </Squircle>
        <p className="text-sm mt-2 text-gray-700">Bordered + Shadow</p>
      </div>
    </div>
  ),
};

// Interactive showcase
export const InteractiveShowcase: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Profile Pictures</h3>
        <div className="flex gap-4">
          <Squircle size="lg" variant="bordered">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
              alt="Profile 1"
              className="h-20 w-20 object-cover"
            />
          </Squircle>
          <Squircle size="lg" variant="bordered">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
              alt="Profile 2"
              className="h-20 w-20 object-cover"
            />
          </Squircle>
          <Squircle size="lg" variant="bordered">
            <img
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
              alt="Profile 3"
              className="h-20 w-20 object-cover"
            />
          </Squircle>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">App Icons</h3>
        <div className="flex gap-4">
          <Squircle size="xl" variant="shadow">
            <div className="h-24 w-24 bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-xl font-bold">
              📱
            </div>
          </Squircle>
          <Squircle size="xl" variant="shadow">
            <div className="h-24 w-24 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-xl font-bold">
              💬
            </div>
          </Squircle>
          <Squircle size="xl" variant="shadow">
            <div className="h-24 w-24 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl font-bold">
              📧
            </div>
          </Squircle>
        </div>
      </div>
    </div>
  ),
};
