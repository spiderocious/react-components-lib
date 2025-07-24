import { describe, expect, it, vi } from "vitest";
import { render, screen } from "../../../../test/utils";
import { Badge } from "../index";

describe("Badge Component", () => {
  describe("Rendering", () => {
    it("should render with default props", () => {
      render(<Badge>Badge</Badge>);

      const badge = screen.getByText("Badge");
      expect(badge).toBeInTheDocument();
    });

    it("should render children correctly", () => {
      render(<Badge>Test Badge</Badge>);

      expect(screen.getByText("Test Badge")).toBeInTheDocument();
    });

    it("should apply custom className to container", () => {
      render(<Badge className="custom-class">Badge</Badge>);

      const badge = screen.getByText("Badge").parentElement;
      expect(badge).toHaveClass("custom-class");
    });

    it("should forward ref correctly", () => {
      const ref = vi.fn();
      render(<Badge ref={ref}>Badge</Badge>);

      expect(ref).toHaveBeenCalled();
    });

    it("should render as span element", () => {
      render(<Badge>Badge</Badge>);

      const container = screen.getByText("Badge").parentElement;
      expect(container?.tagName).toBe("SPAN");
    });
  });

  describe("Variants", () => {
    it("should apply blue variant by default", () => {
      render(<Badge>Blue Badge</Badge>);

      const container = screen.getByText("Blue Badge").parentElement;
      expect(container).toHaveClass("bg-blue-100", "text-blue-700");
    });

    it("should apply red variant correctly", () => {
      render(<Badge variant="red">Red Badge</Badge>);

      const container = screen.getByText("Red Badge").parentElement;
      expect(container).toHaveClass("bg-red-100", "text-red-700");
    });

    it("should apply green variant correctly", () => {
      render(<Badge variant="green">Green Badge</Badge>);

      const container = screen.getByText("Green Badge").parentElement;
      expect(container).toHaveClass("bg-green-100", "text-green-700");
    });

    it("should apply orange variant correctly", () => {
      render(<Badge variant="orange">Orange Badge</Badge>);

      const container = screen.getByText("Orange Badge").parentElement;
      expect(container).toHaveClass("bg-orange-100", "text-orange-700");
    });

    it("should apply gray variant correctly", () => {
      render(<Badge variant="gray">Gray Badge</Badge>);

      const container = screen.getByText("Gray Badge").parentElement;
      expect(container).toHaveClass("bg-gray-100", "text-gray-700");
    });

    it("should apply purple variant correctly", () => {
      render(<Badge variant="purple">Purple Badge</Badge>);

      const container = screen.getByText("Purple Badge").parentElement;
      expect(container).toHaveClass("bg-purple-100", "text-purple-700");
    });

    it("should apply cyan variant correctly", () => {
      render(<Badge variant="cyan">Cyan Badge</Badge>);

      const container = screen.getByText("Cyan Badge").parentElement;
      expect(container).toHaveClass("bg-cyan-100", "text-cyan-700");
    });

    it("should apply yellow variant correctly", () => {
      render(<Badge variant="yellow">Yellow Badge</Badge>);

      const container = screen.getByText("Yellow Badge").parentElement;
      expect(container).toHaveClass("bg-yellow-100", "text-yellow-700");
    });
  });

  describe("Dark Variants", () => {
    it("should apply blue-dark variant correctly", () => {
      render(<Badge variant="blue-dark">Blue Dark Badge</Badge>);

      const container = screen.getByText("Blue Dark Badge").parentElement;
      expect(container).toHaveClass("bg-blue-600", "text-white");
    });

    it("should apply red-dark variant correctly", () => {
      render(<Badge variant="red-dark">Red Dark Badge</Badge>);

      const container = screen.getByText("Red Dark Badge").parentElement;
      expect(container).toHaveClass("bg-red-600", "text-white");
    });

    it("should apply green-dark variant correctly", () => {
      render(<Badge variant="green-dark">Green Dark Badge</Badge>);

      const container = screen.getByText("Green Dark Badge").parentElement;
      expect(container).toHaveClass("bg-green-600", "text-white");
    });

    it("should apply black variant correctly", () => {
      render(<Badge variant="black">Black Badge</Badge>);

      const container = screen.getByText("Black Badge").parentElement;
      expect(container).toHaveClass("bg-gray-900", "text-white");
    });
  });

  describe("Outline Variants", () => {
    it("should apply outline variant correctly", () => {
      render(<Badge variant="outline">Outline Badge</Badge>);

      const container = screen.getByText("Outline Badge").parentElement;
      expect(container).toHaveClass(
        "border",
        "border-gray-300",
        "text-gray-700",
        "bg-transparent"
      );
    });

    it("should apply outline-blue variant correctly", () => {
      render(<Badge variant="outline-blue">Outline Blue Badge</Badge>);

      const container = screen.getByText("Outline Blue Badge").parentElement;
      expect(container).toHaveClass(
        "border",
        "border-blue-300",
        "text-blue-700",
        "bg-transparent"
      );
    });
  });

  describe("Sizes", () => {
    it("should apply medium size by default", () => {
      render(<Badge>Medium Badge</Badge>);

      const container = screen.getByText("Medium Badge").parentElement;
      expect(container).toHaveClass("px-2.5", "py-1", "text-xs");
    });

    it("should apply small size correctly", () => {
      render(<Badge size="sm">Small Badge</Badge>);

      const container = screen.getByText("Small Badge").parentElement;
      expect(container).toHaveClass("px-2", "py-0.5", "text-xs");
    });

    it("should apply large size correctly", () => {
      render(<Badge size="lg">Large Badge</Badge>);

      const container = screen.getByText("Large Badge").parentElement;
      expect(container).toHaveClass("px-3", "py-1.5", "text-sm");
    });
  });

  describe("Icons", () => {
    const TestIcon = () => <span data-testid="test-icon">🏆</span>;

    it("should render icon on the left by default", () => {
      render(<Badge icon={<TestIcon />}>Badge with Icon</Badge>);

      const icon = screen.getByTestId("test-icon");
      const badgeText = screen.getByText("Badge with Icon");

      expect(icon).toBeInTheDocument();

      // Check that icon comes before text in DOM order
      const badge = badgeText.parentElement;
      const children = Array.from(badge?.children || []);
      const iconIndex = children.findIndex((child) => child.contains(icon));
      const textIndex = children.findIndex((child) =>
        child.contains(badgeText)
      );

      expect(iconIndex).toBeLessThan(textIndex);
    });

    it("should render icon on the right when specified", () => {
      render(
        <Badge icon={<TestIcon />} iconPosition="right">
          Badge with Icon
        </Badge>
      );

      const icon = screen.getByTestId("test-icon");
      const badgeText = screen.getByText("Badge with Icon");

      expect(icon).toBeInTheDocument();

      // Check that icon comes after text in DOM order
      const badge = badgeText.parentElement;
      const children = Array.from(badge?.children || []);
      const iconIndex = children.findIndex((child) => child.contains(icon));
      const textIndex = children.findIndex((child) =>
        child.contains(badgeText)
      );

      expect(iconIndex).toBeGreaterThan(textIndex);
    });

    it("should not render icon when not provided", () => {
      render(<Badge>Badge without Icon</Badge>);

      const icon = screen.queryByTestId("test-icon");
      expect(icon).not.toBeInTheDocument();
    });

    it("should apply proper icon container classes", () => {
      render(<Badge icon={<TestIcon />}>Badge</Badge>);

      const icon = screen.getByTestId("test-icon");
      const iconContainer = icon.parentElement;

      expect(iconContainer).toHaveClass(
        "flex",
        "items-center",
        "justify-center"
      );
    });
  });

  describe("Content truncation", () => {
    it("should apply truncate class to text content", () => {
      render(<Badge>Long badge text that should be truncated</Badge>);

      const textElement = screen.getByText(
        "Long badge text that should be truncated"
      );
      expect(textElement).toHaveClass("truncate");
    });

    it("should wrap text content in span with truncate class", () => {
      render(<Badge>Badge Text</Badge>);

      const textElement = screen.getByText("Badge Text");
      expect(textElement.tagName).toBe("SPAN");
      expect(textElement).toHaveClass("truncate");
    });
  });

  describe("HTML Attributes", () => {
    it("should accept custom HTML attributes", () => {
      render(
        <Badge data-testid="custom-badge" title="Badge tooltip">
          Badge
        </Badge>
      );

      const badge = screen.getByTestId("custom-badge");
      expect(badge).toHaveAttribute("title", "Badge tooltip");
    });

    it("should accept aria attributes", () => {
      render(
        <Badge aria-label="Status badge" aria-describedby="status-help">
          Active
        </Badge>
      );

      const container = screen.getByText("Active").parentElement;
      expect(container).toHaveAttribute("aria-label", "Status badge");
      expect(container).toHaveAttribute("aria-describedby", "status-help");
    });

    it("should accept style attribute", () => {
      render(<Badge style={{ margin: "10px" }}>Styled Badge</Badge>);

      const container = screen.getByText("Styled Badge").parentElement;
      expect(container).toHaveStyle({ margin: "10px" });
    });
  });

  describe("Common styling", () => {
    it("should have base badge styles", () => {
      render(<Badge>Base Badge</Badge>);

      const container = screen.getByText("Base Badge").parentElement;
      expect(container).toHaveClass(
        "inline-flex",
        "items-center",
        "gap-1.5",
        "rounded-full",
        "font-medium",
        "transition-all",
        "duration-200",
        "select-none"
      );
    });

    it("should be non-interactive by default", () => {
      render(<Badge>Static Badge</Badge>);

      const container = screen.getByText("Static Badge").parentElement;
      expect(container).toHaveClass("select-none");
      expect(container).not.toHaveAttribute("role");
      expect(container).not.toHaveAttribute("tabIndex");
    });
  });

  describe("Accessibility", () => {
    it("should be accessible as a span element", () => {
      render(<Badge>Status</Badge>);

      const container = screen.getByText("Status").parentElement;
      expect(container?.tagName).toBe("SPAN");
    });

    it("should support aria-label for screen readers", () => {
      render(<Badge aria-label="Current status">Active</Badge>);

      const container = screen.getByText("Active").parentElement;
      expect(container).toHaveAttribute("aria-label", "Current status");
    });

    it("should support custom roles when needed", () => {
      render(
        <Badge role="status" aria-live="polite">
          Updated
        </Badge>
      );

      const container = screen.getByText("Updated").parentElement;
      expect(container).toHaveAttribute("role", "status");
      expect(container).toHaveAttribute("aria-live", "polite");
    });
  });

  describe("Complex content", () => {
    it("should handle complex children content", () => {
      render(
        <Badge>
          <span>Count: </span>
          <strong>42</strong>
        </Badge>
      );

      expect(screen.getByText("Count:")).toBeInTheDocument();
      expect(screen.getByText("42")).toBeInTheDocument();
    });

    it("should handle numeric children", () => {
      render(<Badge>{99}</Badge>);

      expect(screen.getByText("99")).toBeInTheDocument();
    });

    it("should handle icon and complex content together", () => {
      const TestIcon = () => <span data-testid="test-icon">🔔</span>;

      render(
        <Badge icon={<TestIcon />}>
          <span>Notifications: </span>
          <strong>5</strong>
        </Badge>
      );

      expect(screen.getByTestId("test-icon")).toBeInTheDocument();
      expect(screen.getByText("Notifications:")).toBeInTheDocument();
      expect(screen.getByText("5")).toBeInTheDocument();
    });
  });
});
