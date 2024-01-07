import { cva, type VariantProps } from "class-variance-authority";
import {
  forwardRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";
import { cn } from "../../../utils";
import { Squircle } from "../squircle";

const avatarStyles = cva(
  [
    "relative",
    "inline-flex",
    "items-center",
    "justify-center",
    "font-medium",
    "select-none",
    "shrink-0",
  ],
  {
    variants: {
      size: {
        xs: "h-6 w-6 text-xs",
        sm: "h-8 w-8 text-sm",
        md: "h-10 w-10 text-base",
        lg: "h-12 w-12 text-lg",
        xl: "h-16 w-16 text-xl",
        "2xl": "h-20 w-20 text-2xl",
      },
      variant: {
        blue: "bg-blue-500 text-white",
        gray: "bg-gray-400 text-white",
        green: "bg-green-500 text-white",
        red: "bg-red-500 text-white",
        yellow: "bg-yellow-500 text-white",
        purple: "bg-purple-500 text-white",
        pink: "bg-pink-500 text-white",
        indigo: "bg-indigo-500 text-white",
        primary: "bg-blue-500 text-white",
        secondary: "bg-gray-400 text-white",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "blue",
    },
  }
);

const badgeStyles = cva(
  [
    "absolute",
    "flex",
    "items-center",
    "justify-center",
    "font-medium",
    "text-white",
    "bg-blue-500",
    "border-2",
    "border-white",
    "z-10",
  ],
  {
    variants: {
      size: {
        xs: "h-3 w-3 text-[8px]",
        sm: "h-4 w-4 text-[10px]",
        md: "h-5 w-5 text-xs",
        lg: "h-6 w-6 text-sm",
        xl: "h-7 w-7 text-base",
        "2xl": "h-8 w-8 text-lg",
      },
      position: {
        "top-right": "-top-1 -right-1",
        "top-left": "-top-1 -left-1",
        "bottom-right": "-bottom-1 -right-1",
        "bottom-left": "-bottom-1 -left-1",
      },
      badgeVariant: {
        blue: "bg-blue-500",
        green: "bg-green-500",
        red: "bg-red-500",
        yellow: "bg-yellow-500",
        purple: "bg-purple-500",
        gray: "bg-gray-500",
      },
    },
    defaultVariants: {
      size: "md",
      position: "top-right",
      badgeVariant: "blue",
    },
  }
);

const getBadgeRounding = (size: string) => {
  switch (size) {
    case "xs":
      return "rounded-sm";
    case "sm":
      return "rounded-md";
    case "md":
      return "rounded-lg";
    case "lg":
      return "rounded-xl";
    case "xl":
      return "rounded-2xl";
    case "2xl":
      return "rounded-2xl";
    default:
      return "rounded-lg";
  }
};

export type AvatarType = "initials" | "image" | "icon";

export type AvatarProps = Omit<ComponentProps<"div">, "children"> &
  VariantProps<typeof avatarStyles> & {
    // Avatar content
    type: AvatarType;
    name?: string; // For initials type
    src?: string; // For image type
    alt?: string; // Alt text for image
    icon?: ReactNode; // For icon type
    fallback?: ReactNode; // Fallback content if image fails to load

    // Badge/indicator
    badge?: ReactNode;
    badgePosition?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
    badgeVariant?: "blue" | "green" | "red" | "yellow" | "purple" | "gray";

    // Styling
    variant?:
      | "blue"
      | "gray"
      | "green"
      | "red"
      | "yellow"
      | "purple"
      | "pink"
      | "indigo"
      | "primary"
      | "secondary";
  };

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      type,
      name,
      src,
      alt,
      icon,
      fallback,
      badge,
      badgePosition = "top-right",
      badgeVariant = "blue",
      size = "md",
      variant = "blue",
      className,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = useState(false);

    // Generate initials from name
    const getInitials = (name: string): string => {
      return name
        .split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .substring(0, 2)
        .toUpperCase();
    };

    // Default fallback icon
    const DefaultIcon = () => (
      <svg className="h-1/2 w-1/2" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    );

    // Render avatar content based on type
    const renderAvatarContent = () => {
      switch (type) {
        case "image":
          if (src && !imageError) {
            return (
              <img
                src={src}
                alt={alt || name || "Avatar"}
                className="h-full w-full object-cover"
                onError={() => setImageError(true)}
              />
            );
          }
          // Fall back to initials or fallback content
          if (name) {
            return getInitials(name);
          }
          return fallback || <DefaultIcon />;

        case "initials":
          if (name) {
            return getInitials(name);
          }
          return fallback || <DefaultIcon />;

        case "icon":
          return icon || <DefaultIcon />;

        default:
          return <DefaultIcon />;
      }
    };

    return (
      <div className="relative inline-block">
        <Squircle
          ref={ref}
          size={size}
          className={cn(avatarStyles({ size, variant }), className)}
          {...props}
        >
          {renderAvatarContent()}
        </Squircle>

        {badge && (
          <Squircle
            size={size}
            className={cn(
              badgeStyles({ size, position: badgePosition, badgeVariant }),
              getBadgeRounding(size ?? "md")
            )}
          >
            {badge}
          </Squircle>
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";
