import { describe, expect, it } from "vitest";
import { cn } from "../index";

describe("cn utility function", () => {
  it("should merge classes correctly", () => {
    const result = cn("bg-red-500", "text-white");
    expect(result).toBe("bg-red-500 text-white");
  });

  it("should handle conditional classes", () => {
    const isActive = true;
    const isDisabled = false;
    const result = cn(
      "base-class",
      isActive && "conditional-class",
      isDisabled && "hidden-class"
    );
    expect(result).toBe("base-class conditional-class");
  });

  it("should handle undefined and null values", () => {
    const result = cn("base-class", undefined, null, "other-class");
    expect(result).toBe("base-class other-class");
  });

  it("should merge conflicting tailwind classes correctly", () => {
    const result = cn("p-4 p-2", "p-6");
    expect(result).toBe("p-6");
  });

  it("should handle empty input", () => {
    const result = cn();
    expect(result).toBe("");
  });

  it("should handle array of classes", () => {
    const result = cn(["class1", "class2"], "class3");
    expect(result).toBe("class1 class2 class3");
  });

  it("should handle object notation", () => {
    const result = cn({
      active: true,
      disabled: false,
      primary: true,
    });
    expect(result).toBe("active primary");
  });
});
