import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { vi, expect } from 'vitest';

// Custom render function that includes providers if needed in the future
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { ...options });

// Re-export specific testing library functions
export {
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved as waitForRemoval,
  getByRole,
  getByText,
  getByLabelText,
  getByPlaceholderText,
  getByTestId,
  queryByRole,
  queryByText,
  queryByLabelText,
  queryByPlaceholderText,
  queryByTestId,
  findByRole,
  findByText,
  findByLabelText,
  findByPlaceholderText,
  findByTestId,
} from '@testing-library/react';
export { userEvent } from '@testing-library/user-event';
export { customRender as render };

// Common test utilities
export const createMockEvent = (overrides: Partial<Event> = {}): Event => ({
  preventDefault: vi.fn(),
  stopPropagation: vi.fn(),
  target: {},
  currentTarget: {},
  bubbles: false,
  cancelable: false,
  defaultPrevented: false,
  eventPhase: 0,
  isTrusted: false,
  timeStamp: Date.now(),
  type: 'click',
  ...overrides,
} as Event);

// Helper to create mock functions with better TypeScript support
export const createMockFn = <T extends (...args: any[]) => any>(
  implementation?: T
) => {
  return vi.fn(implementation);
};

// Helper for testing async components
export const waitForElementToBeRemoved = async (
  callback: () => HTMLElement | null
) => {
  return new Promise<void>((resolve) => {
    const check = () => {
      if (!callback()) {
        resolve();
      } else {
        setTimeout(check, 10);
      }
    };
    check();
  });
};

// Common assertions for accessibility
export const expectToBeAccessible = async (container: HTMLElement) => {
  // Basic accessibility checks
  const buttons = container.querySelectorAll('button');
  buttons.forEach((button) => {
    expect(button).toHaveAttribute('type');
  });

  const inputs = container.querySelectorAll('input');
  inputs.forEach((input) => {
    if (input.type !== 'hidden') {
      expect(input).toHaveAccessibleName();
    }
  });
};

// Helper for testing components with different viewport sizes
export const mockViewport = (width: number, height: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  });
  window.dispatchEvent(new Event('resize'));
};
