import { cva, type VariantProps } from "class-variance-authority";
import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";
import { cn } from "../../../utils";

const tabsContainerStyles = cva(["relative", "w-full"]);

const tabsListStyles = cva(
  [
    "flex",
    "overflow-x-auto",
    "scrollbar-hide",
    "border-b",
    "border-gray-200",
    "bg-white",
  ],
  {
    variants: {
      variant: {
        default: "",
        pills: "border-0 bg-gray-100 p-1 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const tabStyles = cva(
  [
    "relative",
    "inline-flex",
    "items-center",
    "gap-2",
    "px-4",
    "py-2",
    "text-sm",
    "font-medium",
    "transition-all",
    "duration-200",
    "cursor-pointer",
    "select-none",
    "whitespace-nowrap",
    "border-b-2",
    "border-transparent",
  ],
  {
    variants: {
      variant: {
        default: [
          "hover:text-blue-600",
          "hover:border-blue-300",
          "data-[state=active]:text-blue-600",
          "data-[state=active]:border-blue-600",
        ],
        pills: [
          "border-0",
          "rounded-md",
          "hover:bg-white/60",
          "data-[state=active]:bg-white",
          "data-[state=active]:shadow-sm",
        ],
      },
      size: {
        sm: "px-3 py-1.5 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-5 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export type TabItem = {
  id: string;
  label: ReactNode;
  content?: ReactNode;
  disabled?: boolean;
  badge?: ReactNode;
  icon?: ReactNode;
};

export type TabsProps = ComponentProps<"div"> &
  VariantProps<typeof tabsListStyles> & {
    tabs: TabItem[];
    defaultTab?: string;
    activeTab?: string;
    onChange?: (tabId: string) => void;
    size?: "sm" | "md" | "lg";
    scrollable?: boolean;
    showContent?: boolean;
  };

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      tabs,
      defaultTab,
      activeTab: controlledActiveTab,
      onChange,
      variant = "default",
      size = "md",
      scrollable = true,
      showContent = true,
      className,
      ...props
    },
    ref
  ) => {
    const [internalActiveTab, setInternalActiveTab] = useState(
      defaultTab || tabs.find((tab) => !tab.disabled)?.id || tabs[0]?.id || ""
    );

    const isControlled = controlledActiveTab !== undefined;
    const activeTab = isControlled ? controlledActiveTab : internalActiveTab;

    const tabsListRef = useRef<HTMLDivElement>(null);

    const handleTabChange = (tabId: string) => {
      const tab = tabs.find((t) => t.id === tabId);
      if (tab?.disabled) return;

      if (!isControlled) {
        setInternalActiveTab(tabId);
      }
      onChange?.(tabId);
    };

    // Auto-scroll to active tab
    useEffect(() => {
      if (!scrollable || !tabsListRef.current) return;

      const activeTabElement = tabsListRef.current.querySelector(
        `[data-tab-id="${activeTab}"]`
      ) as HTMLElement;

      if (activeTabElement) {
        activeTabElement.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }, [activeTab, scrollable]);

    const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

    return (
      <div
        ref={ref}
        className={cn(tabsContainerStyles(), className)}
        {...props}
      >
        {/* Tabs List */}
        <div
          ref={tabsListRef}
          className={cn(
            tabsListStyles({ variant }),
            !scrollable && "overflow-x-hidden"
          )}
          role="tablist"
        >
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                data-tab-id={tab.id}
                data-state={isActive ? "active" : "inactive"}
                aria-selected={isActive}
                aria-disabled={tab.disabled}
                tabIndex={tab.disabled ? -1 : 0}
                className={cn(
                  tabStyles({ variant, size }),
                  tab.disabled &&
                    "opacity-50 cursor-not-allowed hover:text-current hover:border-transparent",
                  isActive &&
                    variant === "default" &&
                    "text-blue-600 border-blue-600",
                  !isActive && "text-gray-600"
                )}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}

                <span className="truncate">{tab.label}</span>

                {tab.badge && (
                  <span className="flex-shrink-0">{tab.badge}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {showContent && activeTabContent && (
          <div
            className="py-4"
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
          >
            {activeTabContent}
          </div>
        )}
      </div>
    );
  }
);

Tabs.displayName = "Tabs";
