import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  Box,
  Column,
  DesktopOnly,
  Flex,
  Grid,
  Hidden,
  MobileOnly,
  ResponsiveSection,
  Row,
  Spacer,
  TabletOnly,
} from "./index";

const meta: Meta = {
  title: "Components/Layout",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj;

// Column Stories
export const ColumnBasic: Story = {
  render: () => (
    <div className="p-8 space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Column Layout</h3>
        <Column gap="16px" className="w-64">
          <Box color="blue">Item 1</Box>
          <Box color="green">Item 2</Box>
          <Box color="purple">Item 3</Box>
        </Column>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Column with Alignment</h3>
        <div className="flex gap-8">
          <div>
            <h4 className="text-sm font-medium mb-2">Align Start</h4>
            <Column
              align="start"
              gap="8px"
              className="w-64 h-48 bg-gray-50 p-4"
            >
              <Box color="blue" className="w-32">
                Short
              </Box>
              <Box color="green" className="w-48">
                Medium
              </Box>
              <Box color="purple" className="w-24">
                Tiny
              </Box>
            </Column>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Align Center</h4>
            <Column
              align="center"
              gap="8px"
              className="w-64 h-48 bg-gray-50 p-4"
            >
              <Box color="blue" className="w-32">
                Short
              </Box>
              <Box color="green" className="w-48">
                Medium
              </Box>
              <Box color="purple" className="w-24">
                Tiny
              </Box>
            </Column>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Align End</h4>
            <Column align="end" gap="8px" className="w-64 h-48 bg-gray-50 p-4">
              <Box color="blue" className="w-32">
                Short
              </Box>
              <Box color="green" className="w-48">
                Medium
              </Box>
              <Box color="purple" className="w-24">
                Tiny
              </Box>
            </Column>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Column with Justify</h3>
        <div className="flex gap-8">
          <div>
            <h4 className="text-sm font-medium mb-2">Justify Center</h4>
            <Column
              justify="center"
              gap="8px"
              className="w-64 h-64 bg-gray-50 p-4"
            >
              <Box color="blue">Item 1</Box>
              <Box color="green">Item 2</Box>
            </Column>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Justify Between</h4>
            <Column
              justify="between"
              gap="8px"
              className="w-64 h-64 bg-gray-50 p-4"
            >
              <Box color="blue">Item 1</Box>
              <Box color="green">Item 2</Box>
              <Box color="purple">Item 3</Box>
            </Column>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Row Stories
export const RowBasic: Story = {
  render: () => (
    <div className="p-8 space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Row Layout</h3>
        <Row gap="16px">
          <Box color="blue">Item 1</Box>
          <Box color="green">Item 2</Box>
          <Box color="purple">Item 3</Box>
        </Row>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Row with Wrapping</h3>
        <Row gap="16px" wrap className="max-w-md">
          <Box color="blue" className="w-32">
            Item 1
          </Box>
          <Box color="green" className="w-32">
            Item 2
          </Box>
          <Box color="purple" className="w-32">
            Item 3
          </Box>
          <Box color="red" className="w-32">
            Item 4
          </Box>
          <Box color="yellow" className="w-32">
            Item 5
          </Box>
        </Row>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Row with Alignment</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Align Center</h4>
            <Row align="center" gap="16px" className="h-24 bg-gray-50 p-4">
              <Box color="blue" className="h-8">
                Short
              </Box>
              <Box color="green" className="h-16">
                Medium
              </Box>
              <Box color="purple" className="h-12">
                Tall
              </Box>
            </Row>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Justify Between</h4>
            <Row justify="between" gap="16px" className="w-full bg-gray-50 p-4">
              <Box color="blue">Left</Box>
              <Box color="green">Center</Box>
              <Box color="purple">Right</Box>
            </Row>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Flex Stories
export const FlexAdvanced: Story = {
  render: () => (
    <div className="p-8 space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Flex Direction</h3>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="text-sm font-medium mb-2">Row (Default)</h4>
            <Flex direction="row" gap="8px" className="bg-gray-50 p-4">
              <Box color="blue">1</Box>
              <Box color="green">2</Box>
              <Box color="purple">3</Box>
            </Flex>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Column</h4>
            <Flex direction="column" gap="8px" className="bg-gray-50 p-4 h-48">
              <Box color="blue">1</Box>
              <Box color="green">2</Box>
              <Box color="purple">3</Box>
            </Flex>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Row Reverse</h4>
            <Flex direction="row-reverse" gap="8px" className="bg-gray-50 p-4">
              <Box color="blue">1</Box>
              <Box color="green">2</Box>
              <Box color="purple">3</Box>
            </Flex>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Column Reverse</h4>
            <Flex
              direction="column-reverse"
              gap="8px"
              className="bg-gray-50 p-4 h-48"
            >
              <Box color="blue">1</Box>
              <Box color="green">2</Box>
              <Box color="purple">3</Box>
            </Flex>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Flex Properties</h3>
        <Flex gap="8px" className="bg-gray-50 p-4">
          <Box color="blue" className="flex-shrink-0">
            Fixed
          </Box>
          <Box color="green" className="flex-1">
            Flexible (flex-1)
          </Box>
          <Box color="purple" className="flex-shrink-0">
            Fixed
          </Box>
        </Flex>
      </div>
    </div>
  ),
};

// Grid Stories
export const GridLayouts: Story = {
  render: () => (
    <div className="p-8 space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Grid</h3>
        <Grid cols={3} gap="16px" className="w-full">
          <Box color="blue">1</Box>
          <Box color="green">2</Box>
          <Box color="purple">3</Box>
          <Box color="red">4</Box>
          <Box color="yellow">5</Box>
          <Box color="gray">6</Box>
        </Grid>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Responsive Grid</h3>
        <Grid
          cols="repeat(auto-fit, minmax(200px, 1fr))"
          gap="16px"
          className="w-full"
        >
          <Box color="blue">Auto-fit 1</Box>
          <Box color="green">Auto-fit 2</Box>
          <Box color="purple">Auto-fit 3</Box>
          <Box color="red">Auto-fit 4</Box>
        </Grid>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Grid with Different Gaps</h3>
        <Grid cols={4} rowGap="8px" colGap="24px" className="w-full">
          <Box color="blue">1</Box>
          <Box color="green">2</Box>
          <Box color="purple">3</Box>
          <Box color="red">4</Box>
          <Box color="yellow">5</Box>
          <Box color="gray">6</Box>
          <Box color="blue">7</Box>
          <Box color="green">8</Box>
        </Grid>
      </div>
    </div>
  ),
};

// Spacer Stories
export const SpacerExamples: Story = {
  render: () => (
    <div className="p-8 space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Spacer Examples</h3>

        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-2">Horizontal Spacing</h4>
            <Row className="bg-gray-50 p-4">
              <Box color="blue">Left</Box>
              <Spacer width="32px" />
              <Box color="green">Middle</Box>
              <Spacer width="64px" />
              <Box color="purple">Right</Box>
            </Row>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Vertical Spacing</h4>
            <Column className="bg-gray-50 p-4 w-48">
              <Box color="blue">Top</Box>
              <Spacer height="24px" />
              <Box color="green">Middle</Box>
              <Spacer height="48px" />
              <Box color="purple">Bottom</Box>
            </Column>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Square Spacer</h4>
            <Row className="bg-gray-50 p-4">
              <Box color="blue">Before</Box>
              <Spacer
                space="40px"
                className="bg-red-200 border border-red-400"
              />
              <Box color="green">After</Box>
            </Row>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Mixed Spacers</h4>
            <Column className="bg-gray-50 p-4 w-64">
              <Box color="blue">Item 1</Box>
              <Spacer h="16px" />
              <Box color="green">Item 2</Box>
              <Spacer height="32px" />
              <Box color="purple">Item 3</Box>
            </Column>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Responsive Section Stories
export const ResponsiveSectionExamples: Story = {
  render: () => (
    <div className="p-8 space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Responsive Section</h3>
        <p className="text-sm text-gray-600 mb-4">
          Resize your browser to see the layout change: Mobile (Column) → Tablet
          (Grid) → Desktop (Row)
        </p>

        <ResponsiveSection
          mobile={Column}
          tablet={Grid}
          desktop={Row}
          gap="16px"
          cols={2}
          className="bg-gray-50 p-4"
        >
          <Box color="blue">Content 1</Box>
          <Box color="green">Content 2</Box>
          <Box color="purple">Content 3</Box>
          <Box color="red">Content 4</Box>
        </ResponsiveSection>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Custom Breakpoints</h3>
        <ResponsiveSection
          mobile={Column}
          desktop={Row}
          breakpoints={{ tablet: "600px", desktop: "900px" }}
          gap="12px"
          className="bg-blue-50 p-4"
        >
          <Box color="blue">Item A</Box>
          <Box color="green">Item B</Box>
          <Box color="purple">Item C</Box>
        </ResponsiveSection>
      </div>
    </div>
  ),
};

// Visibility Stories
export const VisibilityControls: Story = {
  render: () => {
    const [isHidden, setIsHidden] = useState(false);

    return (
      <div className="p-8 space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Hidden Component</h3>
          <div className="space-y-4">
            <Row gap="16px" align="center">
              <button
                onClick={() => setIsHidden(!isHidden)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {isHidden ? "Show" : "Hide"} Content
              </button>
              <span className="text-sm text-gray-600">
                Current state: {isHidden ? "Hidden" : "Visible"}
              </span>
            </Row>

            <Row gap="16px" className="bg-gray-50 p-4">
              <Box color="blue">Always Visible</Box>
              <Hidden when={isHidden}>
                <Box color="green">Conditionally Hidden</Box>
              </Hidden>
              <Box color="purple">Always Visible</Box>
            </Row>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Responsive Visibility</h3>
          <p className="text-sm text-gray-600 mb-4">
            Resize your browser to see different content on different screen
            sizes
          </p>

          <Column gap="16px">
            <MobileOnly>
              <Box color="blue">📱 Mobile Only Content</Box>
            </MobileOnly>

            <TabletOnly>
              <Box color="green">📱 Tablet Only Content</Box>
            </TabletOnly>

            <DesktopOnly>
              <Box color="purple">🖥️ Desktop Only Content</Box>
            </DesktopOnly>

            <Box color="gray">📺 Always Visible Content</Box>
          </Column>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">
            Custom Breakpoint Visibility
          </h3>
          <Column gap="16px">
            <MobileOnly breakpoint="500px">
              <Box color="red">Visible below 500px</Box>
            </MobileOnly>

            <DesktopOnly breakpoint="800px">
              <Box color="yellow">Visible above 800px</Box>
            </DesktopOnly>
          </Column>
        </div>
      </div>
    );
  },
};

// Spacing System Stories
export const SpacingSystem: Story = {
  render: () => (
    <div className="p-8 space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Spacing Props</h3>

        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-2">Padding</h4>
            <Row gap="16px">
              <Column p="16px" className="bg-blue-100 border border-blue-300">
                <Box color="blue">p="16px"</Box>
              </Column>
              <Column
                px="24px"
                py="8px"
                className="bg-green-100 border border-green-300"
              >
                <Box color="green">px="24px" py="8px"</Box>
              </Column>
              <Column
                pt="32px"
                pr="16px"
                pb="8px"
                pl="24px"
                className="bg-purple-100 border border-purple-300"
              >
                <Box color="purple">Individual padding</Box>
              </Column>
            </Row>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Margin</h4>
            <div className="bg-gray-100 p-4">
              <Row>
                <Column m="16px" className="bg-blue-100 border border-blue-300">
                  <Box color="blue">m="16px"</Box>
                </Column>
                <Column
                  mx="32px"
                  my="8px"
                  className="bg-green-100 border border-green-300"
                >
                  <Box color="green">mx="32px" my="8px"</Box>
                </Column>
              </Row>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Gap</h4>
            <Column gap="32px" className="bg-gray-50 p-4">
              <Box color="blue">Large gap</Box>
              <Box color="green">Between items</Box>
              <Box color="purple">32px spacing</Box>
            </Column>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Complex Layout Example
export const ComplexLayout: Story = {
  render: () => (
    <div className="p-8">
      <h3 className="text-lg font-semibold mb-4">Complex Layout Example</h3>

      <Column gap="24px" className="max-w-6xl mx-auto">
        {/* Header */}
        <ResponsiveSection
          mobile={Column}
          desktop={Row}
          justify="between"
          align="center"
          gap="16px"
          className="bg-white border border-gray-200 rounded-lg p-6"
        >
          <Box color="blue" className="text-xl font-bold">
            Logo
          </Box>
          <Row gap="16px">
            <Box color="gray">Nav 1</Box>
            <Box color="gray">Nav 2</Box>
            <Box color="gray">Nav 3</Box>
          </Row>
        </ResponsiveSection>

        {/* Main Content */}
        <ResponsiveSection
          mobile={Column}
          tablet={Grid}
          desktop={Row}
          cols={2}
          gap="24px"
        >
          {/* Sidebar */}
          <Column
            gap="16px"
            className="bg-white border border-gray-200 rounded-lg p-6"
          >
            <Box color="purple">Sidebar Title</Box>
            <Spacer height="8px" />
            <Box color="gray">Menu Item 1</Box>
            <Box color="gray">Menu Item 2</Box>
            <Box color="gray">Menu Item 3</Box>
            <Spacer height="16px" />
            <Box color="purple">Widget</Box>
          </Column>

          {/* Main Content Area */}
          <Column
            gap="16px"
            className="bg-white border border-gray-200 rounded-lg p-6"
          >
            <Box color="blue">Main Content Title</Box>
            <Grid cols={2} gap="16px">
              <Box color="green">Content Block 1</Box>
              <Box color="green">Content Block 2</Box>
            </Grid>
            <Spacer height="16px" />
            <Grid cols={3} gap="12px">
              <Box color="yellow">Feature 1</Box>
              <Box color="yellow">Feature 2</Box>
              <Box color="yellow">Feature 3</Box>
            </Grid>
          </Column>
        </ResponsiveSection>

        {/* Footer */}
        <ResponsiveSection
          mobile={Column}
          desktop={Row}
          justify="between"
          align="center"
          gap="16px"
          className="bg-gray-800 text-white rounded-lg p-6"
        >
          <Box color="gray">© 2024 Company</Box>
          <Row gap="16px">
            <Box color="gray">Privacy</Box>
            <Box color="gray">Terms</Box>
            <Box color="gray">Contact</Box>
          </Row>
        </ResponsiveSection>
      </Column>
    </div>
  ),
};
