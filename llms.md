# LLM Integration Guide - Simple UI

This guide provides comprehensive information for Language Learning Models (LLMs) to effectively understand, use, and generate code with the Simple UI component library.

## Library Overview

Simple UI is a modern React component library built with TypeScript, Tailwind CSS, and Class Variance Authority (CVA). It provides a comprehensive set of accessible, customizable components for building modern web applications.

### Core Technologies

- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **Class Variance Authority (CVA)** for variant management
- **Vite** for build tooling
- **Storybook** for documentation
- **Vitest + Testing Library** for testing

### Architecture Patterns

1. **CVA-based Variants**: All components use CVA for type-safe variant management
2. **Forward Refs**: Components properly forward refs for React integration
3. **Compound Components**: Complex components use compound patterns
4. **Accessibility First**: WCAG compliance with proper ARIA attributes
5. **TypeScript Native**: Full type safety and IntelliSense support

## Component Categories and Import Patterns

### Basic Import Structure

```tsx
// Named imports from main package
import { Button, Badge, Chip, Input, Modal } from "simple-ui";

// Category-specific imports (if available)
import { Button } from "simple-ui/ui";
import { Input } from "simple-ui/form";
import { Alert } from "simple-ui/feedback";
```

### Component Organization

```
Components/
├── ui/              # Basic UI elements
├── form/            # Form controls and inputs
├── feedback/        # User feedback components
├── data-display/    # Data visualization
├── layout/          # Layout and structure
└── modals/          # Modal system
```

## LLM Code Generation Guidelines

### 1. Component Variant Patterns

When generating component code, follow these CVA-based patterns:

```tsx
// ✅ Correct: Use defined variants
<Button variant="primary" size="lg">Submit</Button>
<Badge variant="blue" size="md">Status</Badge>
<Chip variant="outline" color="green">Tag</Chip>

// ❌ Incorrect: Don't use undefined variants
<Button variant="custom" size="xl">Submit</Button>
<Badge variant="rainbow">Status</Badge>
```

### 2. TypeScript Interface Patterns

All components extend their base HTML element props:

```tsx
// Button extends ComponentProps<"button">
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
}

// Badge extends ComponentProps<"span">
interface BadgeProps extends ComponentProps<"span"> {
  variant?: "blue" | "red" | "green" | /* ... */ "outline-blue";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  children: ReactNode;
}
```

### 3. Event Handling Patterns

Components support standard React event handlers:

```tsx
<Button
  onClick={(e) => handleClick(e)}
  onMouseEnter={() => setHovered(true)}
  disabled={loading}
>
  Action
</Button>

<Input
  onChange={(e) => setValue(e.target.value)}
  onBlur={() => setTouched(true)}
  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
/>
```

### 4. Accessibility Integration

Always include proper accessibility attributes:

```tsx
// Icon buttons must have aria-label
<IconButton
  icon={<CloseIcon />}
  ariaLabel="Close dialog"
  onClick={handleClose}
/>

// Form inputs should have proper labeling
<Input
  label="Email Address"
  aria-describedby="email-help"
  helperText="Enter a valid email address"
  required
/>

// Modals need proper ARIA attributes
<Modal
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">Confirmation</h2>
  <p id="modal-description">Are you sure you want to proceed?</p>
</Modal>
```

## Common Code Generation Scenarios

### 1. Form Creation

When generating forms, use these patterns:

```tsx
function UserForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Full Name"
        value={formData.name}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, name: e.target.value }))
        }
        error={errors.name}
        required
      />

      <Input
        type="email"
        label="Email Address"
        value={formData.email}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, email: e.target.value }))
        }
        error={errors.email}
        leftIcon={<EmailIcon />}
        required
      />

      <PhoneInput
        value={formData.phone}
        onChange={(value) => setFormData((prev) => ({ ...prev, phone: value }))}
        country="US"
      />

      <Textarea
        label="Message"
        value={formData.message}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, message: e.target.value }))
        }
        rows={4}
        maxLength={500}
        showCount
      />

      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </div>
    </form>
  );
}
```

### 2. Data Display Patterns

For displaying data with badges, chips, and status indicators:

```tsx
function UserCard({ user }: { user: User }) {
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center gap-3 mb-3">
        <Avatar
          src={user.avatar}
          initials={user.initials}
          size="lg"
          status={user.isOnline ? "online" : "offline"}
        />
        <div>
          <h3 className="font-medium">{user.name}</h3>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
        <Badge variant={user.role === "admin" ? "blue" : "gray"} size="sm">
          {user.role}
        </Badge>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {user.skills.map((skill) => (
          <Chip key={skill} variant="outline" size="sm" color="blue">
            {skill}
          </Chip>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <IconButton
            icon={<EditIcon />}
            ariaLabel="Edit user"
            variant="outline"
            size="sm"
          />
          <IconButton
            icon={<DeleteIcon />}
            ariaLabel="Delete user"
            variant="outline"
            color="danger"
            size="sm"
          />
        </div>

        <Progress
          value={user.completionRate}
          variant="success"
          size="sm"
          showLabel
        />
      </div>
    </div>
  );
}
```

### 3. Modal System Usage

The modal system has specific patterns for different use cases:

```tsx
function useUserActions() {
  const modal = useModal();

  const confirmDelete = (user: User) => {
    modal.confirm({
      title: "Delete User",
      description: `Are you sure you want to delete ${user.name}? This action cannot be undone.`,
      confirmButtonText: "Delete",
      confirmButtonType: "danger",
      icon: (
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
          <TrashIcon className="h-6 w-6 text-red-600" />
        </div>
      ),
      onConfirm: async () => {
        try {
          await deleteUser(user.id);
          modal.success({
            title: "User Deleted",
            description: "The user has been successfully deleted.",
          });
        } catch (error) {
          modal.error({
            title: "Delete Failed",
            description: "Failed to delete user. Please try again.",
          });
        }
      },
    });
  };

  const editUser = (user: User) => {
    modal.launch(
      <UserEditForm
        user={user}
        onSave={(updatedUser) => {
          // Handle save
          modal.close();
        }}
        onCancel={() => modal.close()}
      />,
      {
        variant: "sidePanel",
        sidePanelPosition: "right",
        showCloseButton: true,
      }
    );
  };

  return { confirmDelete, editUser };
}
```

### 4. Layout and Navigation

For creating layouts with navigation:

```tsx
function AppLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Layout variant="sidebar">
      <Header>
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <IconButton
              icon={<MenuIcon />}
              ariaLabel="Toggle sidebar"
              variant="ghost"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            />
            <h1 className="text-xl font-bold">Dashboard</h1>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="red" size="sm">
              3 New
            </Badge>
            <Avatar src="/user.jpg" size="sm" status="online" />
          </div>
        </div>
      </Header>

      <Sidebar className={sidebarOpen ? "block" : "hidden md:block"}>
        <nav className="p-4">
          <Tabs orientation="vertical" defaultValue="dashboard">
            <TabsList className="flex-col">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
          </Tabs>
        </nav>
      </Sidebar>

      <Main>
        <div className="p-6">{children}</div>
      </Main>
    </Layout>
  );
}
```

## Component-Specific LLM Guidelines

### Button Component

- Always consider the semantic meaning when choosing variants
- Use `type="submit"` for form submissions, `type="button"` for actions
- Include `disabled` state for loading/processing states
- Use icon buttons for space-constrained layouts

```tsx
// Form submission
<Button type="submit" variant="primary" disabled={loading}>
  {loading ? 'Saving...' : 'Save Changes'}
</Button>

// Destructive action
<Button variant="danger" onClick={handleDelete}>
  Delete Account
</Button>

// Secondary action
<Button variant="outline" onClick={handleCancel}>
  Cancel
</Button>
```

### Input Components

- Always provide labels for accessibility
- Use appropriate input types (`email`, `tel`, `password`, etc.)
- Include validation feedback with error states
- Consider helper text for user guidance

```tsx
<Input
  type="email"
  label="Email Address"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={emailError}
  helperText="We'll send verification to this email"
  leftIcon={<EmailIcon />}
  required
/>
```

### Badge and Chip Components

- Use badges for status indicators, counts, and labels
- Use chips for removable/interactive tags
- Consider color semantics (green for success, red for error, etc.)

```tsx
// Status badge
<Badge variant={status === 'active' ? 'green' : 'gray'}>
  {status}
</Badge>

// Interactive chip
<Chip
  closable
  onClose={() => removeTag(tag.id)}
  variant="outline"
>
  {tag.name}
</Chip>
```

### Modal System

- Use appropriate modal types for different contexts
- Consider mobile UX with bottomSheet variant
- Always provide clear action buttons
- Include proper loading states

```tsx
// Confirmation modal
modal.confirm({
  title: "Confirm Action",
  description: "This action cannot be undone.",
  confirmButtonText: "Continue",
  confirmButtonType: "danger",
  onConfirm: handleAction,
});

// Mobile-friendly modal
modal.launch(<Component />, {
  variant: "bottomSheet", // Better on mobile
});
```

## Testing Patterns for LLMs

When generating tests, follow these patterns:

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../Button";

describe("Button Component", () => {
  it("should render with correct variant classes", () => {
    render(<Button variant="primary">Test</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-blue-500", "text-white");
  });

  it("should handle click events", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should be accessible", () => {
    render(<Button aria-label="Custom action">Action</Button>);

    const button = screen.getByRole("button", { name: "Custom action" });
    expect(button).toBeInTheDocument();
  });
});
```

## Error Prevention Guidelines

### Common Mistakes to Avoid

1. **Invalid Variants**

```tsx
// ❌ Wrong
<Button variant="custom">Button</Button>

// ✅ Correct
<Button variant="primary">Button</Button>
```

2. **Missing Required Props**

```tsx
// ❌ Wrong - missing children
<Badge variant="blue" />

// ✅ Correct
<Badge variant="blue">Status</Badge>
```

3. **Accessibility Oversights**

```tsx
// ❌ Wrong - no aria-label for icon button
<IconButton icon={<CloseIcon />} />

// ✅ Correct
<IconButton icon={<CloseIcon />} ariaLabel="Close" />
```

4. **Event Handler Types**

```tsx
// ❌ Wrong - incorrect event type
<Button onClick={(e: ChangeEvent) => {}}>Button</Button>

// ✅ Correct
<Button onClick={(e: MouseEvent<HTMLButtonElement>) => {}}>Button</Button>
```

5. **Modal System Misuse**

```tsx
// ❌ Wrong - not using modal hook
<Modal>Content</Modal>;

// ✅ Correct
const modal = useModal();
modal.launch(<Content />);
```

## Integration Patterns

### With State Management

```tsx
// Redux/Zustand integration
function ConnectedUserList() {
  const { users, loading, error } = useUserStore();
  const modal = useModal();

  if (loading) {
    return <Skeleton variant="rectangular" height={200} />;
  }

  if (error) {
    return (
      <Alert
        variant="error"
        action={
          <Button size="sm" onClick={refetch}>
            Retry
          </Button>
        }
      >
        Failed to load users
      </Alert>
    );
  }

  return (
    <Table
      data={users}
      columns={userColumns}
      onRowClick={(user) => modal.launch(<UserDetails user={user} />)}
    />
  );
}
```

### With React Hook Form

```tsx
function FormWithValidation() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("email", { required: "Email is required" })}
        label="Email"
        error={errors.email?.message}
        type="email"
      />

      <Button type="submit">Submit</Button>
    </form>
  );
}
```

### With React Query

```tsx
function DataWithLoading() {
  const { data, isLoading, error, refetch } = useQuery("users", fetchUsers);

  if (isLoading) return <Skeleton variant="rectangular" height={300} />;

  if (error) {
    return (
      <Alert
        variant="error"
        action={<Button onClick={() => refetch()}>Retry</Button>}
      >
        Failed to load data
      </Alert>
    );
  }

  return <UserList users={data} />;
}
```

## Performance Considerations

### Lazy Loading Components

```tsx
// Lazy load heavy components
const HeavyModal = lazy(() => import("./HeavyModal"));

function App() {
  const modal = useModal();

  const openHeavyModal = () => {
    modal.launch(
      <Suspense fallback={<Skeleton height={400} />}>
        <HeavyModal />
      </Suspense>
    );
  };
}
```

### Memoization Patterns

```tsx
// Memoize expensive component renders
const UserCard = memo(({ user }: { user: User }) => {
  return (
    <div className="p-4 border rounded-lg">
      <Avatar src={user.avatar} size="md" />
      <Badge variant={user.status === "active" ? "green" : "gray"}>
        {user.status}
      </Badge>
    </div>
  );
});
```

This guide should help LLMs understand the patterns, constraints, and best practices for working with the Simple UI component library effectively.
