# Simple UI - React Component Library

A modern, accessible, and highly customizable React component library built with TypeScript, Tailwind CSS, and Class Variance Authority (CVA).

## 🚀 Features

- **🎨 Modern Design System** - Clean, professional components with consistent styling
- **♿ Accessibility First** - WCAG compliant components with proper ARIA attributes
- **🔧 Highly Customizable** - Built with CVA for easy variant and style management
- **📱 Responsive** - Mobile-first design with responsive breakpoints
- **🎭 Dark Mode Ready** - Support for light and dark themes
- **📚 Storybook Integration** - Interactive component documentation and testing
- **🧪 Comprehensive Testing** - Unit tests with Vitest and Testing Library
- **📦 TypeScript Support** - Full type safety and IntelliSense support

## 📦 Installation

```bash
npm install cockroach-ui
# or
yarn add cockroach-ui
# or
pnpm add cockroach-ui
```

### Peer Dependencies

```bash
npm install react react-dom tailwindcss
```

## 🛠️ Setup

### 1. Configure Tailwind CSS

Add the library's paths to your `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/cockroach-ui/**/*.{js,ts,jsx,tsx}", // Add this line
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### 2. Import Global Styles

Import the necessary CSS in your main file:

```tsx
// main.tsx or App.tsx
import "cockroach-ui/dist/style.css";
```

## 🎯 Quick Start

```tsx
import { Button, Badge, Chip } from "cockroach-ui";

function App() {
  return (
    <div>
      <Button variant="primary" size="lg">
        Get Started
      </Button>

      <Badge variant="blue">New</Badge>

      <Chip variant="outline" onClose={() => console.log("Chip closed")}>
        Removable
      </Chip>
    </div>
  );
}
```

## 📚 Component Categories

### UI Components

- **Button** - Primary action component with multiple variants
- **Badge** - Status indicators and labels
- **Chip** - Interactive tags with optional close functionality
- **Avatar** - User profile pictures and initials
- **Progress** - Progress bars and loading indicators
- **Rating** - Star rating component
- **Skeleton** - Loading placeholders
- **Tabs** - Tab navigation component
- **Stepper** - Step-by-step progress indicator
- **Icon Button** - Compact button for icons
- **Squircle** - Rounded square container

### Form Components

- **Input** - Text input with validation
- **Textarea** - Multi-line text input
- **Phone Input** - International phone number input
- **Date Time** - Date and time picker
- **File Upload** - File upload with drag and drop
- **Number Counter** - Numeric input with increment/decrement

### Feedback Components

- **Alert** - Contextual feedback messages
- **Popover** - Floating content containers
- **Tag** - Label and categorization component

### Data Display

- **Table** - Data table with sorting and filtering

### Layout Components

- **Layout** - Page layout utilities and containers

### Modal System

- **Modal Manager** - Comprehensive modal system with multiple variants
- **Action Modals** - Confirmation, alert, success, error, warning
- **Launch Modals** - Custom component containers
- **Modal Variants** - Center, bottom sheet, fullscreen, side panel

## 🎨 Design System

### Color Variants

- **Primary**: Blue theme for main actions
- **Secondary**: Gray theme for secondary actions
- **Success**: Green theme for positive actions
- **Danger/Error**: Red theme for destructive actions
- **Warning**: Yellow/Orange theme for cautionary actions
- **Dark**: Dark theme variant

### Size Variants

- **sm**: Small size for compact layouts
- **md**: Medium size (default)
- **lg**: Large size for prominent elements

### Component Variants

Each component supports multiple visual variants:

- **Solid**: Filled background (default)
- **Outline**: Border-only style
- **Ghost**: Transparent background
- **Dark**: Dark theme versions

## 🧪 Testing

Run the test suite:

```bash
# Run tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 📖 Storybook

Launch Storybook for interactive component documentation:

```bash
npm run storybook
```

This will start Storybook on `http://localhost:6006` where you can:

- Browse all components and their variants
- Test component interactions
- View component documentation
- Test accessibility features

## 🔧 Development

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm

### Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
cd cockroach-ui
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

4. Run Storybook:

```bash
npm run storybook
```

### Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build
npm run storybook    # Start Storybook
npm run test         # Run tests
npm run test:coverage # Run tests with coverage
npm run type-check   # TypeScript type checking
```

## 🏗️ Architecture

### Tech Stack

- **React 19** - Component framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Class Variance Authority (CVA)** - Variant management
- **Storybook** - Component documentation
- **Vitest** - Testing framework
- **Testing Library** - Component testing utilities

### Project Structure

```
src/
├── components/
│   ├── ui/              # Basic UI components
│   ├── form/            # Form-related components
│   ├── feedback/        # Feedback components
│   ├── data-display/    # Data visualization components
│   ├── layout/          # Layout components
│   └── modals/          # Modal system
├── test/                # Test utilities and setup
├── utils/               # Utility functions
└── stories/             # Storybook stories
```

### Component Design Patterns

1. **CVA-based Variants**: All components use CVA for consistent variant management
2. **Compound Components**: Complex components use compound patterns for flexibility
3. **ForwardRef**: All components properly forward refs for integration
4. **Accessibility**: ARIA attributes and proper semantic HTML
5. **TypeScript**: Full type safety with proper prop interfaces

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-component`
3. Make your changes
4. Add tests for new functionality
5. Run the test suite: `npm run test`
6. Update documentation if needed
7. Submit a pull request

### Component Guidelines

- Follow existing code patterns and conventions
- Include comprehensive tests
- Add Storybook stories for new components
- Ensure accessibility compliance
- Update TypeScript interfaces
- Follow the CVA pattern for variants

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🆘 Support

- **Documentation**: [Storybook Documentation](http://localhost:6006)
- **Issues**: [GitHub Issues](https://github.com/your-org/cockroach-ui/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/cockroach-ui/discussions)

## 🔄 Changelog

See [CHANGELOG.md](CHANGELOG.md) for release notes and breaking changes.

---

Built with ❤️ by Oluwaferanmi
