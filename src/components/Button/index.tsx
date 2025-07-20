import type { ComponentProps } from "react";

export type ButtonProps = ComponentProps<"button">;

export const Button = ({ ...props }: ButtonProps) => {
  return <button className="text-red-500" {...props} />;
};
