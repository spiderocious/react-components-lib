import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "../../../../test/utils";
import { Chip } from "../index";

describe("Chip Component", () => {
  describe("Rendering", () => {
    it("should render with default props", () => {
      render(<Chip>Test Chip</Chip>);

      const chip = screen.getByText("Test Chip");
      expect(chip).toBeInTheDocument();
    });

    it("should render children correctly", () => {
      render(<Chip>Chip Content</Chip>);

      expect(screen.getByText("Chip Content")).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      render(<Chip className="custom-class">Chip</Chip>);

      const chip = screen.getByText("Chip").parentElement;
      expect(chip).toHaveClass("custom-class");
    });

    it("should forward ref correctly", () => {
      const ref = vi.fn();
      render(<Chip ref={ref}>Chip</Chip>);

      expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    });
  });

  describe("Variants", () => {
    it("should apply blue variant by default", () => {
      render(<Chip>Blue Chip</Chip>);

      const chip = screen.getByText("Blue Chip").parentElement;
      expect(chip).toHaveClass(
        "bg-blue-100",
        "text-blue-700",
        "border-blue-200"
      );
    });

    it("should apply red variant correctly", () => {
      render(<Chip variant="red">Red Chip</Chip>);

      const chip = screen.getByText("Red Chip").parentElement;
      expect(chip).toHaveClass("bg-red-100", "text-red-700", "border-red-200");
    });

    it("should apply green variant correctly", () => {
      render(<Chip variant="green">Green Chip</Chip>);

      const chip = screen.getByText("Green Chip").parentElement;
      expect(chip).toHaveClass(
        "bg-green-100",
        "text-green-700",
        "border-green-200"
      );
    });

    it("should apply gray variant correctly", () => {
      render(<Chip variant="gray">Gray Chip</Chip>);

      const chip = screen.getByText("Gray Chip").parentElement;
      expect(chip).toHaveClass(
        "bg-gray-100",
        "text-gray-700",
        "border-gray-200"
      );
    });
  });

  describe("Sizes", () => {
    it("should apply medium size by default", () => {
      render(<Chip>Medium Chip</Chip>);

      const chip = screen.getByText("Medium Chip").parentElement;
      expect(chip).toHaveClass("px-3", "py-1.5", "text-sm");
    });

    it("should apply small size correctly", () => {
      render(<Chip size="sm">Small Chip</Chip>);

      const chip = screen.getByText("Small Chip").parentElement;
      expect(chip).toHaveClass("px-2", "py-1", "text-xs");
    });

    it("should apply large size correctly", () => {
      render(<Chip size="lg">Large Chip</Chip>);

      const chip = screen.getByText("Large Chip").parentElement;
      expect(chip).toHaveClass("px-4", "py-2", "text-base");
    });
  });

  describe("Icons", () => {
    const TestIcon = () => <span data-testid="test-icon">🏷️</span>;

    it("should render icon when provided", () => {
      render(<Chip icon={<TestIcon />}>Chip with Icon</Chip>);

      const icon = screen.getByTestId("test-icon");
      expect(icon).toBeInTheDocument();
    });

    it("should position icon before text", () => {
      render(<Chip icon={<TestIcon />}>Chip Text</Chip>);

      const chip = screen.getByText("Chip Text").parentElement;
      const icon = screen.getByTestId("test-icon");
      const textElement = screen.getByText("Chip Text");

      // Check that icon comes before text in DOM order
      const children = Array.from(chip?.children || []);
      const iconIndex = children.findIndex((child) => child.contains(icon));
      const textIndex = children.findIndex((child) =>
        child.contains(textElement)
      );

      expect(iconIndex).toBeLessThan(textIndex);
    });
  });

  describe("Close functionality", () => {
    it("should render close button when onClose is provided", () => {
      const handleClose = vi.fn();
      render(<Chip onClose={handleClose}>Closable Chip</Chip>);

      const closeButton = screen.getByRole("button", { name: /remove/i });
      expect(closeButton).toBeInTheDocument();
    });

    it("should call onClose when close button is clicked", () => {
      const handleClose = vi.fn();
      render(<Chip onClose={handleClose}>Closable Chip</Chip>);

      const closeButton = screen.getByRole("button", { name: /remove/i });
      fireEvent.click(closeButton);

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it("should not render close button when onClose is not provided", () => {
      render(<Chip>Regular Chip</Chip>);

      const closeButton = screen.queryByRole("button", { name: /remove/i });
      expect(closeButton).not.toBeInTheDocument();
    });

    it("should position close button on right by default", () => {
      const handleClose = vi.fn();
      render(<Chip onClose={handleClose}>Chip</Chip>);

      const chip = screen.getByText("Chip").parentElement;
      const closeButton = screen.getByRole("button", { name: /remove/i });
      const textElement = screen.getByText("Chip");

      // Check that close button comes after text
      const children = Array.from(chip?.children || []);
      const textIndex = children.findIndex((child) =>
        child.contains(textElement)
      );
      const closeIndex = children.findIndex((child) =>
        child.contains(closeButton)
      );

      expect(closeIndex).toBeGreaterThan(textIndex);
    });

    it("should position close button on left when specified", () => {
      const handleClose = vi.fn();
      render(
        <Chip onClose={handleClose} closePosition="left">
          Chip
        </Chip>
      );

      const chip = screen.getByText("Chip").parentElement;
      const closeButton = screen.getByRole("button", { name: /remove/i });
      const textElement = screen.getByText("Chip");

      // Check that close button comes before text
      const children = Array.from(chip?.children || []);
      const textIndex = children.findIndex((child) =>
        child.contains(textElement)
      );
      const closeIndex = children.findIndex((child) =>
        child.contains(closeButton)
      );

      expect(closeIndex).toBeLessThan(textIndex);
    });

    it("should stop propagation when close button is clicked", () => {
      const handleClose = vi.fn();
      const handleChipClick = vi.fn();

      render(
        <Chip onClose={handleClose} onClick={handleChipClick}>
          Chip
        </Chip>
      );

      const closeButton = screen.getByRole("button", { name: /remove/i });
      fireEvent.click(closeButton);

      expect(handleClose).toHaveBeenCalledTimes(1);
      expect(handleChipClick).not.toHaveBeenCalled();
    });
  });

  describe("Clickable behavior", () => {
    it("should be clickable when onClick is provided", () => {
      const handleClick = vi.fn();
      render(<Chip onClick={handleClick}>Clickable Chip</Chip>);

      const chip = screen.getByText("Clickable Chip").parentElement;
      expect(chip).toHaveAttribute("role", "button");
      expect(chip).toHaveAttribute("tabIndex", "0");
      expect(chip).toHaveClass("cursor-pointer");
    });

    it("should be clickable when clickable prop is true", () => {
      render(<Chip clickable>Clickable Chip</Chip>);

      const chip = screen.getByText("Clickable Chip").parentElement;
      expect(chip).toHaveAttribute("role", "button");
      expect(chip).toHaveAttribute("tabIndex", "0");
    });

    it("should call onClick when clicked", () => {
      const handleClick = vi.fn();
      render(<Chip onClick={handleClick}>Clickable Chip</Chip>);

      const chip = screen.getByText("Clickable Chip").parentElement;
      fireEvent.click(chip!);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should not be clickable by default", () => {
      render(<Chip>Regular Chip</Chip>);

      const chip = screen.getByText("Regular Chip").parentElement;
      expect(chip).not.toHaveAttribute("role", "button");
      expect(chip).not.toHaveAttribute("tabIndex");
      expect(chip).toHaveClass("cursor-default");
    });
  });

  describe("Disabled state", () => {
    it("should apply disabled styles when disabled", () => {
      render(<Chip disabled>Disabled Chip</Chip>);

      const chip = screen.getByText("Disabled Chip").parentElement;
      expect(chip).toHaveClass("opacity-50", "cursor-not-allowed");
      expect(chip).toHaveAttribute("aria-disabled", "true");
    });

    it("should not call onClick when disabled and clicked", () => {
      const handleClick = vi.fn();
      render(
        <Chip disabled onClick={handleClick}>
          Disabled Chip
        </Chip>
      );

      const chip = screen.getByText("Disabled Chip").parentElement;
      fireEvent.click(chip!);

      expect(handleClick).not.toHaveBeenCalled();
    });

    it("should not call onClose when disabled and close button is clicked", () => {
      const handleClose = vi.fn();
      render(
        <Chip disabled onClose={handleClose}>
          Disabled Chip
        </Chip>
      );

      const closeButton = screen.getByRole("button", { name: /remove/i });
      fireEvent.click(closeButton);

      expect(handleClose).not.toHaveBeenCalled();
    });

    it("should disable close button when chip is disabled", () => {
      const handleClose = vi.fn();
      render(
        <Chip disabled onClose={handleClose}>
          Disabled Chip
        </Chip>
      );

      const closeButton = screen.getByRole("button", { name: /remove/i });
      expect(closeButton).toBeDisabled();
    });

    it("should not be focusable when disabled", () => {
      render(
        <Chip disabled clickable>
          Disabled Chip
        </Chip>
      );

      const chip = screen.getByText("Disabled Chip").parentElement;
      expect(chip).not.toHaveAttribute("tabIndex", "0");
    });
  });

  describe("Accessibility", () => {
    it("should have proper semantics for clickable chips", () => {
      render(<Chip clickable>Clickable</Chip>);

      const chip = screen.getByText("Clickable").parentElement;
      expect(chip).toHaveAttribute("role", "button");
      expect(chip).toHaveAttribute("tabIndex", "0");
    });

    it("should have proper semantics for non-clickable chips", () => {
      render(<Chip>Non-clickable</Chip>);

      const chip = screen.getByText("Non-clickable").parentElement;
      expect(chip).not.toHaveAttribute("role");
      expect(chip).not.toHaveAttribute("tabIndex");
    });

    it("should have proper aria-disabled attribute", () => {
      render(<Chip disabled>Disabled</Chip>);

      const chip = screen.getByText("Disabled").parentElement;
      expect(chip).toHaveAttribute("aria-disabled", "true");
    });

    it("should have proper close button accessibility", () => {
      const handleClose = vi.fn();
      render(<Chip onClose={handleClose}>Chip</Chip>);

      const closeButton = screen.getByRole("button", { name: /remove/i });
      expect(closeButton).toHaveAttribute("aria-label", "Remove");
      expect(closeButton).toHaveAttribute("type", "button");
    });
  });

  describe("Content truncation", () => {
    it("should apply truncate class to text content", () => {
      render(<Chip>Long text that should be truncated</Chip>);

      const textElement = screen.getByText(
        "Long text that should be truncated"
      );
      expect(textElement).toHaveClass("truncate");
    });
  });
});
