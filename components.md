# Components Documentation

Complete reference for all Simple UI components, their props, variants, and usage examples.

## Table of Contents

- [UI Components](#ui-components)
  - [Button](#button)
  - [Badge](#badge)
  - [Chip](#chip)
  - [Avatar](#avatar)
  - [Progress](#progress)
  - [Rating](#rating)
  - [Skeleton](#skeleton)
  - [Tabs](#tabs)
  - [Stepper](#stepper)
  - [Icon Button](#icon-button)
  - [Squircle](#squircle)
- [Form Components](#form-components)
  - [Input](#input)
  - [Textarea](#textarea)
  - [Phone Input](#phone-input)
  - [Date Time](#date-time)
  - [File Upload](#file-upload)
  - [Number Counter](#number-counter)
- [Feedback Components](#feedback-components)
  - [Alert](#alert)
  - [Popover](#popover)
  - [Tag](#tag)
- [Data Display](#data-display)
  - [Table](#table)
- [Layout Components](#layout-components)
  - [Layout](#layout)
- [Modal System](#modal-system)
  - [Modal Manager](#modal-manager)

---

## UI Components

### Button

Primary action component with multiple variants and sizes.

#### Props

```tsx
interface ButtonProps extends ComponentProps<"button"> {
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "warning"
    | "dark"
    | "outline"
    | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  children: ReactNode;
}
```

#### Variants

- **primary** (default): Blue background, white text
- **secondary**: Gray background, dark text
- **danger**: Red background, white text
- **success**: Green background, white text
- **warning**: Yellow background, dark text
- **dark**: Dark background, white text
- **outline**: Transparent background, border, colored text
- **ghost**: Transparent background, colored text

#### Sizes

- **sm**: `px-4 py-2 text-xs`
- **md** (default): `px-6 py-3 text-sm`
- **lg**: `px-8 py-4 text-base`

#### Examples

```tsx
// Basic usage
<Button>Click me</Button>

// With variant and size
<Button variant="danger" size="lg">Delete</Button>

// With icon
<Button icon={<PlusIcon />} iconPosition="left">
  Add Item
</Button>

// Custom props
<Button
  type="submit"
  disabled
  className="w-full"
  onClick={() => console.log('clicked')}
>
  Submit Form
</Button>
```

---

### Badge

Status indicators and labels for categorization.

#### Props

```tsx
interface BadgeProps extends ComponentProps<"span"> {
  variant?:
    | "blue"
    | "red"
    | "green"
    | "orange"
    | "gray"
    | "purple"
    | "cyan"
    | "yellow"
    | "blue-dark"
    | "red-dark"
    | "green-dark"
    | "orange-dark"
    | "gray-dark"
    | "purple-dark"
    | "cyan-dark"
    | "yellow-dark"
    | "black"
    | "outline"
    | "outline-blue";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  children: ReactNode;
}
```

#### Variants

**Light Variants:**

- **blue** (default): Light blue background
- **red**: Light red background
- **green**: Light green background
- **orange**: Light orange background
- **gray**: Light gray background
- **purple**: Light purple background
- **cyan**: Light cyan background
- **yellow**: Light yellow background

**Dark Variants:**

- **blue-dark**: Solid blue background
- **red-dark**: Solid red background
- **green-dark**: Solid green background
- **black**: Dark gray background

**Outline Variants:**

- **outline**: Gray border, transparent background
- **outline-blue**: Blue border, transparent background

#### Sizes

- **sm**: `px-2 py-0.5 text-xs`
- **md** (default): `px-2.5 py-1 text-xs`
- **lg**: `px-3 py-1.5 text-sm`

#### Examples

```tsx
// Basic usage
<Badge>New</Badge>

// With variant
<Badge variant="red">Error</Badge>

// With icon
<Badge variant="green" icon={<CheckIcon />}>
  Verified
</Badge>

// Custom styling
<Badge
  variant="outline-blue"
  size="lg"
  className="font-bold"
>
  Premium
</Badge>
```

---

### Chip

Interactive tags with optional close functionality.

#### Props

```tsx
interface ChipProps extends ComponentProps<"div"> {
  variant?: "solid" | "outline" | "ghost";
  color?: "blue" | "red" | "green" | "orange" | "purple" | "gray";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  closable?: boolean;
  onClose?: () => void;
  disabled?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  children: ReactNode;
}
```

#### Variants

- **solid** (default): Filled background
- **outline**: Border with transparent background
- **ghost**: Subtle background

#### Colors

- **blue** (default)
- **red**
- **green**
- **orange**
- **purple**
- **gray**

#### Sizes

- **sm**: `px-2 py-1 text-xs`
- **md** (default): `px-3 py-1.5 text-sm`
- **lg**: `px-4 py-2 text-base`

#### Examples

```tsx
// Basic usage
<Chip>Technology</Chip>

// Closable chip
<Chip
  closable
  onClose={() => console.log('closed')}
>
  Remove me
</Chip>

// Clickable chip
<Chip
  clickable
  onClick={() => console.log('clicked')}
  variant="outline"
  color="blue"
>
  Click me
</Chip>

// With icon
<Chip icon={<TagIcon />} variant="ghost">
  Tagged
</Chip>
```

---

### Avatar

User profile pictures and initials display.

#### Props

```tsx
interface AvatarProps extends ComponentProps<"div"> {
  src?: string;
  alt?: string;
  initials?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  variant?: "circular" | "rounded" | "square";
  fallbackIcon?: ReactNode;
  status?: "online" | "offline" | "away" | "busy";
}
```

#### Sizes

- **xs**: `h-6 w-6`
- **sm**: `h-8 w-8`
- **md** (default): `h-10 w-10`
- **lg**: `h-12 w-12`
- **xl**: `h-16 w-16`
- **2xl**: `h-20 w-20`

#### Variants

- **circular** (default): Fully rounded
- **rounded**: Slightly rounded corners
- **square**: No border radius

#### Examples

```tsx
// Image avatar
<Avatar src="/user.jpg" alt="John Doe" />

// Initials avatar
<Avatar initials="JD" />

// With status
<Avatar
  src="/user.jpg"
  status="online"
  size="lg"
/>

// Custom fallback
<Avatar
  fallbackIcon={<UserIcon />}
  variant="rounded"
/>
```

---

### Progress

Progress bars and loading indicators.

#### Props

```tsx
interface ProgressProps extends ComponentProps<"div"> {
  value: number;
  max?: number;
  variant?: "default" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
}
```

#### Variants

- **default**: Blue progress bar
- **success**: Green progress bar
- **warning**: Orange progress bar
- **error**: Red progress bar

#### Examples

```tsx
// Basic progress
<Progress value={65} />

// With label
<Progress
  value={75}
  showLabel
  label="Loading..."
/>

// Animated
<Progress
  value={45}
  animated
  variant="success"
/>
```

---

### Rating

Star rating component for feedback collection.

#### Props

```tsx
interface RatingProps extends ComponentProps<"div"> {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  readonly?: boolean;
  onChange?: (value: number) => void;
  allowHalf?: boolean;
  icon?: ReactNode;
  emptyIcon?: ReactNode;
}
```

#### Examples

```tsx
// Basic rating
<Rating value={4} />

// Interactive rating
<Rating
  value={rating}
  onChange={setRating}
  allowHalf
/>

// Read-only with custom size
<Rating
  value={4.5}
  readonly
  size="lg"
/>
```

---

### Skeleton

Loading placeholders for content.

#### Props

```tsx
interface SkeletonProps extends ComponentProps<"div"> {
  variant?: "text" | "rectangular" | "circular";
  width?: string | number;
  height?: string | number;
  animation?: "pulse" | "wave" | "none";
}
```

#### Examples

```tsx
// Text skeleton
<Skeleton variant="text" width="80%" />

// Avatar skeleton
<Skeleton variant="circular" width={40} height={40} />

// Card skeleton
<div>
  <Skeleton variant="rectangular" height={200} />
  <Skeleton variant="text" />
  <Skeleton variant="text" width="60%" />
</div>
```

---

### Tabs

Tab navigation component for organizing content.

#### Props

```tsx
interface TabsProps extends ComponentProps<"div"> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "pills" | "underline";
}

interface TabsListProps extends ComponentProps<"div"> {}

interface TabsTriggerProps extends ComponentProps<"button"> {
  value: string;
  disabled?: boolean;
}

interface TabsContentProps extends ComponentProps<"div"> {
  value: string;
}
```

#### Examples

```tsx
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Overview</TabsTrigger>
    <TabsTrigger value="tab2">Details</TabsTrigger>
    <TabsTrigger value="tab3">Settings</TabsTrigger>
  </TabsList>

  <TabsContent value="tab1">Overview content here</TabsContent>

  <TabsContent value="tab2">Details content here</TabsContent>

  <TabsContent value="tab3">Settings content here</TabsContent>
</Tabs>
```

---

### Stepper

Step-by-step progress indicator.

#### Props

```tsx
interface StepperProps extends ComponentProps<"div"> {
  currentStep: number;
  steps: Array<{
    id: string;
    title: string;
    description?: string;
    icon?: ReactNode;
  }>;
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "simple" | "dots";
  onStepClick?: (stepIndex: number) => void;
}
```

#### Examples

```tsx
const steps = [
  { id: "1", title: "Account", description: "Create your account" },
  { id: "2", title: "Profile", description: "Set up your profile" },
  { id: "3", title: "Verification", description: "Verify your email" },
]

<Stepper
  currentStep={1}
  steps={steps}
  onStepClick={(step) => setCurrentStep(step)}
/>
```

---

### Icon Button

Compact button component for icons.

#### Props

```tsx
interface IconButtonProps extends ComponentProps<"button"> {
  icon: ReactNode;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  color?: "default" | "primary" | "danger";
  ariaLabel: string;
}
```

#### Examples

```tsx
<IconButton
  icon={<SearchIcon />}
  ariaLabel="Search"
  variant="outline"
/>

<IconButton
  icon={<DeleteIcon />}
  ariaLabel="Delete"
  color="danger"
  onClick={handleDelete}
/>
```

---

### Squircle

Rounded square container component.

#### Props

```tsx
interface SquircleProps extends ComponentProps<"div"> {
  size?: number;
  cornerRadius?: number;
  children?: ReactNode;
}
```

#### Examples

```tsx
<Squircle size={60} cornerRadius={12}>
  <Icon />
</Squircle>
```

---

## Form Components

### Input

Text input component with validation support.

#### Props

```tsx
interface InputProps extends ComponentProps<"input"> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  variant?: "default" | "filled" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}
```

#### Examples

```tsx
<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  error={errors.email}
  leftIcon={<EmailIcon />}
/>
```

---

### Textarea

Multi-line text input component.

#### Props

```tsx
interface TextareaProps extends ComponentProps<"textarea"> {
  label?: string;
  error?: string;
  helperText?: string;
  resize?: "none" | "vertical" | "horizontal" | "both";
  rows?: number;
  maxLength?: number;
  showCount?: boolean;
}
```

#### Examples

```tsx
<Textarea
  label="Message"
  rows={4}
  maxLength={500}
  showCount
  placeholder="Enter your message"
/>
```

---

### Phone Input

International phone number input with country selection.

#### Props

```tsx
interface PhoneInputProps extends ComponentProps<"input"> {
  value: string;
  onChange: (value: string) => void;
  country?: string;
  onCountryChange?: (country: string) => void;
  placeholder?: string;
  disabled?: boolean;
}
```

#### Examples

```tsx
<PhoneInput
  value={phone}
  onChange={setPhone}
  country="US"
  placeholder="Enter phone number"
/>
```

---

### Date Time

Date and time picker component.

#### Props

```tsx
interface DateTimeProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  mode?: "date" | "time" | "datetime";
  format?: string;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
}
```

#### Examples

```tsx
<DateTime
  value={selectedDate}
  onChange={setSelectedDate}
  mode="datetime"
  placeholder="Select date and time"
/>
```

---

### File Upload

File upload component with drag and drop support.

#### Props

```tsx
interface FileUploadProps extends ComponentProps<"div"> {
  onFilesChange: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  disabled?: boolean;
  dragActive?: boolean;
}
```

#### Examples

```tsx
<FileUpload
  onFilesChange={setFiles}
  accept="image/*"
  multiple
  maxSize={5 * 1024 * 1024} // 5MB
  maxFiles={5}
/>
```

---

### Number Counter

Numeric input with increment/decrement controls.

#### Props

```tsx
interface NumberCounterProps extends ComponentProps<"input"> {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}
```

#### Examples

```tsx
<NumberCounter
  value={quantity}
  onChange={setQuantity}
  min={0}
  max={100}
  step={1}
/>
```

---

## Feedback Components

### Alert

Contextual feedback messages for users.

#### Props

```tsx
interface AlertProps extends ComponentProps<"div"> {
  variant?: "info" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  hideIcon?: boolean;
  action?: ReactNode;
  onClose?: () => void;
  closable?: boolean;
  children: ReactNode;
}
```

#### Examples

```tsx
<Alert variant="success" closable onClose={handleClose}>
  Operation completed successfully!
</Alert>

<Alert
  variant="error"
  action={<Button size="sm">Retry</Button>}
>
  Something went wrong. Please try again.
</Alert>
```

---

### Popover

Floating content containers triggered by user interaction.

#### Props

```tsx
interface PopoverProps extends ComponentProps<"div"> {
  trigger: ReactNode;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  triggerMode?: "click" | "hover";
  title?: string;
  description?: string;
  badge?: ReactNode;
  action?: ReactNode;
  ariaLabel?: string;
}
```

#### Examples

```tsx
<Popover
  trigger={<Button>Show Info</Button>}
  title="Information"
  description="This is additional information"
  side="top"
>
  <div>Custom content here</div>
</Popover>
```

---

### Tag

Label and categorization component.

#### Props

```tsx
interface TagProps extends ComponentProps<"span"> {
  variant?: "default" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  color?: "blue" | "green" | "red" | "yellow" | "purple";
  children: ReactNode;
}
```

#### Examples

```tsx
<Tag variant="outline" color="blue">
  React
</Tag>

<Tag variant="secondary" size="sm">
  TypeScript
</Tag>
```

---

## Data Display

### Table

Data table component with sorting and filtering capabilities.

#### Props

```tsx
interface TableProps extends ComponentProps<"table"> {
  data: any[];
  columns: Column[];
  sortable?: boolean;
  filterable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  loading?: boolean;
  emptyMessage?: string;
}

interface Column {
  key: string;
  title: string;
  dataIndex: string;
  render?: (value: any, record: any) => ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  width?: string | number;
}
```

#### Examples

```tsx
const columns = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    render: (status) => <Badge variant={status === 'active' ? 'green' : 'red'}>{status}</Badge>
  },
]

<Table
  data={users}
  columns={columns}
  sortable
  pagination
  pageSize={10}
/>
```

---

## Layout Components

### Layout

Page layout utilities and containers.

#### Props

```tsx
interface LayoutProps extends ComponentProps<"div"> {
  variant?: "default" | "centered" | "sidebar" | "split";
  children: ReactNode;
}

interface HeaderProps extends ComponentProps<"header"> {}
interface SidebarProps extends ComponentProps<"aside"> {}
interface MainProps extends ComponentProps<"main"> {}
interface FooterProps extends ComponentProps<"footer"> {}
```

#### Examples

```tsx
<Layout variant="sidebar">
  <Header>
    <nav>Navigation content</nav>
  </Header>

  <Sidebar>
    <aside>Sidebar content</aside>
  </Sidebar>

  <Main>
    <main>Main content</main>
  </Main>

  <Footer>
    <footer>Footer content</footer>
  </Footer>
</Layout>
```

---

## Modal System

### Modal Manager

Comprehensive modal system with multiple variants and interaction patterns.

#### Setup

```tsx
import { ModalProvider, useModal } from "simple-ui";

// Wrap your app
<ModalProvider>
  <App />
</ModalProvider>;

// Use in components
const modal = useModal();
```

#### Modal Methods

```tsx
interface ModalManager {
  // Action modals
  open(options: ActionModalOptions): string;
  confirm(options: ConfirmOptions): string;
  alert(options: AlertOptions): string;
  success(options: SuccessOptions): string;
  error(options: ErrorOptions): string;
  warning(options: WarningOptions): string;
  loading(options?: LoadingOptions): string;

  // Custom component modals
  launch(component: ReactNode, options?: LaunchOptions): string;

  // Control methods
  close(id?: string): void;
  closeAll(): void;
}
```

#### Modal Variants

- **center**: Default centered modal
- **bottomSheet**: Slides up from bottom on mobile, centered on desktop
- **fullscreen**: Full screen modal with responsive behavior
- **sidePanel**: Slides in from left or right side

#### Action Modal Options

```tsx
interface ActionModalOptions {
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  confirmButtonText?: string;
  confirmButtonType?:
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "warning";
  showConfirmButton?: boolean;
  cancelButtonText?: string;
  cancelButtonType?: "primary" | "secondary" | "danger" | "success" | "warning";
  showCancelButton?: boolean;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  allowOutsideClickClose?: boolean;
  variant?: "center" | "bottomSheet" | "fullscreen" | "sidePanel";
  sidePanelPosition?: "left" | "right";
  showCloseButton?: boolean;
  onClose?: () => void;
}
```

#### Launch Modal Options

```tsx
interface LaunchModalOptions {
  component: ReactNode;
  allowOutsideClickClose?: boolean;
  variant?: "center" | "bottomSheet" | "fullscreen" | "sidePanel";
  sidePanelPosition?: "left" | "right";
  showCloseButton?: boolean;
  onClose?: () => void;
}
```

#### Examples

```tsx
const modal = useModal();

// Confirmation modal
modal.confirm({
  title: "Delete Item",
  description:
    "Are you sure you want to delete this item? This action cannot be undone.",
  confirmButtonText: "Delete",
  confirmButtonType: "danger",
  onConfirm: () => handleDelete(),
});

// Success notification
modal.success({
  title: "Success!",
  description: "Your changes have been saved successfully.",
});

// Custom component modal
modal.launch(<CustomForm onSubmit={handleSubmit} />, {
  variant: "sidePanel",
  sidePanelPosition: "right",
});

// Loading modal
const loadingId = modal.loading({
  title: "Processing...",
  description: "Please wait while we process your request.",
});

// Close after operation
setTimeout(() => modal.close(loadingId), 3000);

// Bottom sheet on mobile
modal.launch(<MobileMenu />, {
  variant: "bottomSheet",
});

// Fullscreen modal
modal.launch(<FullEditor />, {
  variant: "fullscreen",
});
```

---

## Common Patterns

### Compound Components

Many components support compound patterns for flexibility:

```tsx
// Tabs
<Tabs>
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>

// Layout
<Layout>
  <Header />
  <Sidebar />
  <Main />
  <Footer />
</Layout>
```

### Controlled vs Uncontrolled

Components support both controlled and uncontrolled usage:

```tsx
// Uncontrolled
<Tabs defaultValue="tab1">
  {/* tabs content */}
</Tabs>

// Controlled
<Tabs value={activeTab} onValueChange={setActiveTab}>
  {/* tabs content */}
</Tabs>
```

### Custom Styling

All components accept className for custom styling:

```tsx
<Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600">
  Gradient Button
</Button>

<Badge className="animate-pulse">
  Animated Badge
</Badge>
```

### Event Handling

Components provide comprehensive event handling:

```tsx
<Button
  onClick={handleClick}
  onMouseEnter={handleHover}
  onFocus={handleFocus}
>
  Interactive Button
</Button>

<Input
  onChange={handleChange}
  onBlur={handleBlur}
  onKeyDown={handleKeyDown}
/>
```

---

## Accessibility

All components are built with accessibility in mind:

- **ARIA attributes**: Proper roles, labels, and descriptions
- **Keyboard navigation**: Full keyboard support
- **Focus management**: Logical tab order and focus indicators
- **Screen reader support**: Semantic HTML and ARIA labels
- **High contrast**: Support for high contrast mode
- **Reduced motion**: Respects prefers-reduced-motion

### Accessibility Examples

```tsx
// Button with aria-label
<IconButton
  icon={<CloseIcon />}
  ariaLabel="Close dialog"
/>

// Input with proper labeling
<Input
  label="Email Address"
  aria-describedby="email-help"
  helperText="We'll never share your email"
/>

// Modal with proper focus management
<Modal
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">Modal Title</h2>
  <p id="modal-description">Modal description</p>
</Modal>
```

---

For interactive examples and live demos, visit our [Storybook documentation](http://localhost:6006).
