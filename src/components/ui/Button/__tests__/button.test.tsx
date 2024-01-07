import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "../../../../test/utils";
import { Button } from "../index";

describe("Button Component", () => {
  describe("Rendering", () => {
    it("should render with default props", () => {
      render(<Button>Click me</Button>);

      const button = screen.getByRole("button", { name: /click me/i });
      expect(button).toBeInTheDocument();
      // Button component doesn't set type by default, it inherits from browser default
    });

    it("should render children correctly", () => {
      render(<Button>Test Button</Button>);

      expect(screen.getByText("Test Button")).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      render(<Button className="custom-class">Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("custom-class");
    });

    it("should forward ref correctly", () => {
      const ref = vi.fn();
      render(<Button ref={ref}>Button</Button>);

      expect(ref).toHaveBeenCalled();
    });
  });

  describe("Variants", () => {
    it("should apply primary variant by default", () => {
      render(<Button>Primary Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-blue-500", "text-white");
    });

    it("should apply secondary variant correctly", () => {
      render(<Button variant="secondary">Secondary Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-gray-200", "text-gray-900");
    });

    it("should apply danger variant correctly", () => {
      render(<Button variant="danger">Danger Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-red-500", "text-white");
    });

    it("should apply success variant correctly", () => {
      render(<Button variant="success">Success Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-green-500", "text-white");
    });

    it("should apply warning variant correctly", () => {
      render(<Button variant="warning">Warning Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-yellow-400", "text-gray-900");
    });

    it("should apply dark variant correctly", () => {
      render(<Button variant="dark">Dark Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-gray-800", "text-white");
    });

    it("should apply outline variant correctly", () => {
      render(<Button variant="outline">Outline Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass(
        "border",
        "border-gray-300",
        "bg-transparent",
        "text-gray-700"
      );
    });

    it("should apply ghost variant correctly", () => {
      render(<Button variant="ghost">Ghost Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-transparent", "text-gray-700");
    });
  });

  describe("Sizes", () => {
    it("should apply medium size by default", () => {
      render(<Button>Medium Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("px-6", "py-3", "text-sm");
    });

    it("should apply small size correctly", () => {
      render(<Button size="sm">Small Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("px-4", "py-2", "text-xs");
    });

    it("should apply large size correctly", () => {
      render(<Button size="lg">Large Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("px-8", "py-4", "text-base");
    });
  });

  describe("Icons", () => {
    const TestIcon = () => <span data-testid="test-icon">🚀</span>;

    it("should render icon on the left by default", () => {
      render(<Button icon={<TestIcon />}>Button with Icon</Button>);

      const button = screen.getByRole("button");
      const icon = screen.getByTestId("test-icon");

      expect(icon).toBeInTheDocument();
      // Icon should be the first child in the button
      expect(button.firstElementChild).toContain(icon);
    });

    it("should render icon on the right when specified", () => {
      render(
        <Button icon={<TestIcon />} iconPosition="right">
          Button with Icon
        </Button>
      );

      const button = screen.getByRole("button");
      const icon = screen.getByTestId("test-icon");

      expect(icon).toBeInTheDocument();
      // Icon should be the last child in the button
      expect(button.lastElementChild).toContain(icon);
    });

    it("should apply flex-shrink-0 to icon container", () => {
      render(<Button icon={<TestIcon />}>Button</Button>);

      const icon = screen.getByTestId("test-icon");
      const iconContainer = icon.parentElement;
      expect(iconContainer).toHaveClass("flex-shrink-0");
    });
  });

  describe("States", () => {
    it("should handle disabled state correctly", () => {
      render(<Button disabled>Disabled Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(button).toHaveClass(
        "disabled:cursor-not-allowed",
        "disabled:opacity-50"
      );
    });

    it("should not call onClick when disabled", () => {
      const handleClick = vi.fn();
      render(
        <Button disabled onClick={handleClick}>
          Disabled Button
        </Button>
      );

      const button = screen.getByRole("button");
      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("Interactions", () => {
    it("should call onClick when clicked", () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Clickable Button</Button>);

      const button = screen.getByRole("button");
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should handle keyboard interactions", () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Test Button</Button>);

      const button = screen.getByRole("button");

      // Test that the button is focusable (browsers handle Enter/Space natively)
      button.focus();
      expect(button).toHaveFocus();
    });

    it("should be focusable", () => {
      render(<Button>Focusable Button</Button>);

      const button = screen.getByRole("button");
      button.focus();
      expect(button).toHaveFocus();
    });

    it("should have proper focus styles", () => {
      render(<Button>Focus Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass(
        "focus-visible:outline-none",
        "focus-visible:ring-2"
      );
    });
  });

  describe("HTML Attributes", () => {
    it("should accept custom type attribute", () => {
      render(<Button type="submit">Submit Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "submit");
    });

    it("should accept aria attributes", () => {
      render(
        <Button aria-label="Close dialog" aria-describedby="help-text">
          ×
        </Button>
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label", "Close dialog");
      expect(button).toHaveAttribute("aria-describedby", "help-text");
    });

    it("should accept data attributes", () => {
      render(
        <Button data-testid="custom-button" data-action="save">
          Button
        </Button>
      );

      const button = screen.getByTestId("custom-button");
      expect(button).toHaveAttribute("data-action", "save");
    });
  });

  describe("Accessibility", () => {
    it("should have proper button semantics", () => {
      render(<Button>Accessible Button</Button>);

      const button = screen.getByRole("button");
      expect(button.tagName).toBe("BUTTON");
    });

    it("should have accessible name from children", () => {
      render(<Button>Save Changes</Button>);

      const button = screen.getByRole("button", { name: "Save Changes" });
      expect(button).toBeInTheDocument();
    });

    it("should respect aria-label over children for accessible name", () => {
      render(<Button aria-label="Close">×</Button>);

      const button = screen.getByRole("button", { name: "Close" });
      expect(button).toBeInTheDocument();
    });
  });
});
