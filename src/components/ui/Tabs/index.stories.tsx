import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs } from ".";
import { Badge } from "../badge";
import { Chip } from "../chip";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "pills"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    scrollable: {
      control: { type: "boolean" },
    },
    showContent: {
      control: { type: "boolean" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Sample tabs data
const basicTabs = [
  {
    id: "tab1",
    label: "Tab Item",
    content: <div className="p-4">Content for Tab 1</div>,
  },
  {
    id: "tab2",
    label: "Tab Item",
    content: <div className="p-4">Content for Tab 2</div>,
  },
];

const tabsWithBadges = [
  {
    id: "tab1",
    label: "Tab Item",
    badge: (
      <Badge variant="gray-dark" size="sm">
        15
      </Badge>
    ),
    content: <div className="p-4">Content with 15 items</div>,
  },
  {
    id: "tab2",
    label: "Tab Item",
    badge: (
      <Badge variant="gray" size="sm">
        5
      </Badge>
    ),
    content: <div className="p-4">Content with 5 items</div>,
  },
  {
    id: "tab3",
    label: "Tab Item",
    badge: (
      <Badge variant="gray" size="sm">
        5
      </Badge>
    ),
    content: <div className="p-4">Content with 5 items</div>,
  },
  {
    id: "tab4",
    label: "Tab Item",
    content: <div className="p-4">Content without badge</div>,
  },
];

const tabsWithIcons = [
  {
    id: "home",
    label: "Home",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9,22 9,12 15,12 15,22" />
      </svg>
    ),
    content: <div className="p-4">Home content</div>,
  },
  {
    id: "settings",
    label: "Settings",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" />
      </svg>
    ),
    content: <div className="p-4">Settings content</div>,
  },
  {
    id: "profile",
    label: "Profile",
    icon: (
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
    ),
    content: <div className="p-4">Profile content</div>,
  },
];

const pillTabs = [
  {
    id: "all",
    label: "Tab Item",
    content: <div className="p-4">All items content</div>,
  },
  {
    id: "active",
    label: "Tab Item",
    badge: (
      <Badge variant="blue-dark" size="sm">
        5
      </Badge>
    ),
    content: <div className="p-4">Active items content</div>,
  },
  {
    id: "inactive",
    label: "Tab Item",
    badge: (
      <Badge variant="blue" size="sm">
        5
      </Badge>
    ),
    content: <div className="p-4">Inactive items content</div>,
  },
  {
    id: "disabled",
    label: "Tab Item",
    badge: (
      <Badge variant="blue" size="sm">
        5
      </Badge>
    ),
    disabled: true,
    content: <div className="p-4">Disabled content</div>,
  },
];

const manyTabs = Array.from({ length: 10 }, (_, i) => ({
  id: `tab-${i + 1}`,
  label: `Tab ${i + 1}`,
  content: <div className="p-4">Content for Tab {i + 1}</div>,
}));

// Basic examples
export const Default: Story = {
  args: {
    tabs: basicTabs,
    defaultTab: "tab1",
  },
};

export const WithBadges: Story = {
  args: {
    tabs: tabsWithBadges,
    defaultTab: "tab1",
  },
};

export const WithIcons: Story = {
  args: {
    tabs: tabsWithIcons,
    defaultTab: "home",
  },
};

export const PillVariant: Story = {
  args: {
    tabs: pillTabs,
    variant: "pills",
    defaultTab: "active",
  },
};

// Recreating Image 3 layout
export const ImageLayout: Story = {
  render: () => (
    <div className="space-y-8">
      {/* Row 1: Basic tabs with underline */}
      <Tabs
        tabs={[
          { id: "tab1", label: "Tab Item" },
          { id: "tab2", label: "Tab Item" },
        ]}
        defaultTab="tab1"
        showContent={false}
      />

      {/* Row 2: More tabs with different active states */}
      <Tabs
        tabs={[
          { id: "tab1", label: "Tab Item" },
          { id: "tab2", label: "Tab Item" },
          { id: "tab3", label: "Tab Item" },
        ]}
        defaultTab="tab1"
        showContent={false}
      />

      {/* Row 3: Four tabs */}
      <Tabs
        tabs={[
          { id: "tab1", label: "Tab Item" },
          { id: "tab2", label: "Tab Item" },
          { id: "tab3", label: "Tab Item" },
          { id: "tab4", label: "Tab Item" },
        ]}
        defaultTab="tab1"
        showContent={false}
      />

      {/* Row 4: Tabs with badges */}
      <Tabs
        tabs={[
          {
            id: "tab1",
            label: "Tab item",
            badge: (
              <Badge variant="gray-dark" size="sm">
                15
              </Badge>
            ),
          },
          {
            id: "tab2",
            label: "Tab Item",
            badge: (
              <Badge variant="gray" size="sm">
                5
              </Badge>
            ),
          },
          {
            id: "tab3",
            label: "Tab Item",
            badge: (
              <Badge variant="gray" size="sm">
                5
              </Badge>
            ),
          },
          {
            id: "tab4",
            label: "Tab",
          },
        ]}
        defaultTab="tab1"
        showContent={false}
      />
    </div>
  ),
};

// Recreating Image 4 layout (pill tabs)
export const PillLayout: Story = {
  render: () => (
    <div className="space-y-6">
      {/* Row 1: Light tabs */}
      <Tabs
        variant="pills"
        tabs={[
          { id: "tab1", label: "Tab Item" },
          { id: "tab2", label: "Tab Item" },
        ]}
        defaultTab="tab2"
        showContent={false}
      />

      {/* Row 2: With icons */}
      <Tabs
        variant="pills"
        tabs={[
          {
            id: "tab1",
            label: "Tab Item",
            icon: (
              <div className="h-4 w-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">
                i
              </div>
            ),
          },
          {
            id: "tab2",
            label: "Tab Item",
            icon: (
              <div className="h-4 w-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">
                i
              </div>
            ),
          },
        ]}
        defaultTab="tab2"
        showContent={false}
      />

      {/* Row 3: With badges */}
      <Tabs
        variant="pills"
        tabs={[
          {
            id: "tab1",
            label: "Tab Item",
            badge: (
              <Badge variant="gray" size="sm">
                5
              </Badge>
            ),
          },
          {
            id: "tab2",
            label: "Tab Item",
            badge: (
              <Badge variant="blue-dark" size="sm">
                5
              </Badge>
            ),
          },
        ]}
        defaultTab="tab2"
        showContent={false}
      />

      {/* Row 4: With icons and badges */}
      <Tabs
        variant="pills"
        tabs={[
          {
            id: "tab1",
            label: "Tab Item",
            icon: (
              <div className="h-4 w-4 rounded-full bg-gray-400 text-white flex items-center justify-center text-xs">
                i
              </div>
            ),
            badge: (
              <Badge variant="gray" size="sm">
                5
              </Badge>
            ),
          },
          {
            id: "tab2",
            label: "Tab Item",
            icon: (
              <div className="h-4 w-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">
                i
              </div>
            ),
            badge: (
              <Badge variant="blue-dark" size="sm">
                5
              </Badge>
            ),
          },
        ]}
        defaultTab="tab2"
        showContent={false}
      />
    </div>
  ),
};

// Scrollable tabs
export const ScrollableTabs: Story = {
  args: {
    tabs: manyTabs,
    defaultTab: "tab-3",
    scrollable: true,
  },
};

// Size variations
export const SizeVariations: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Small</h3>
        <Tabs
          tabs={tabsWithIcons}
          size="sm"
          defaultTab="home"
          showContent={false}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Medium</h3>
        <Tabs
          tabs={tabsWithIcons}
          size="md"
          defaultTab="home"
          showContent={false}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Large</h3>
        <Tabs
          tabs={tabsWithIcons}
          size="lg"
          defaultTab="home"
          showContent={false}
        />
      </div>
    </div>
  ),
};

// With disabled tabs
export const WithDisabledTabs: Story = {
  args: {
    tabs: [
      {
        id: "tab1",
        label: "Active Tab",
        content: <div className="p-4">This tab is active</div>,
      },
      {
        id: "tab2",
        label: "Normal Tab",
        content: <div className="p-4">This is a normal tab</div>,
      },
      {
        id: "tab3",
        label: "Disabled Tab",
        disabled: true,
        content: <div className="p-4">This tab is disabled</div>,
      },
      {
        id: "tab4",
        label: "Another Tab",
        content: <div className="p-4">Another normal tab</div>,
      },
    ],
    defaultTab: "tab1",
  },
};

// Complex content example
export const ComplexContent: Story = {
  args: {
    tabs: [
      {
        id: "overview",
        label: "Overview",
        icon: (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 3v18h18" />
            <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
          </svg>
        ),
        content: (
          <div className="p-4 space-y-4">
            <h2 className="text-lg font-semibold">Dashboard Overview</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-sm text-gray-600">Total Users</div>
                <div className="text-xl font-bold text-blue-600">1,234</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-sm text-gray-600">Revenue</div>
                <div className="text-xl font-bold text-green-600">$12,345</div>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="text-sm text-gray-600">Orders</div>
                <div className="text-xl font-bold text-purple-600">567</div>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "analytics",
        label: "Analytics",
        badge: (
          <Badge variant="blue" size="sm">
            New
          </Badge>
        ),
        content: (
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Analytics Dashboard</h2>
            <div className="space-y-4">
              <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                Chart Placeholder
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-20 bg-gray-100 rounded-lg"></div>
                <div className="h-20 bg-gray-100 rounded-lg"></div>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "reports",
        label: "Reports",
        content: (
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Reports</h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Monthly Report</span>
                <Chip variant="green" size="sm">
                  Ready
                </Chip>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Weekly Summary</span>
                <Chip variant="orange" size="sm">
                  Processing
                </Chip>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Daily Stats</span>
                <Chip variant="blue" size="sm">
                  Live
                </Chip>
              </div>
            </div>
          </div>
        ),
      },
    ],
    defaultTab: "overview",
  },
};
