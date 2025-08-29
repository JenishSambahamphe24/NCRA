import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { typographyVariants } from "./typography";

const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center gap-2 rounded-sm ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    typographyVariants({
      variant: "subtleSemibold",
    }),
  ),
  {
    variants: {
      variant: {
        default: cn(
          "bg-primary !text-white",
          "[&>p]:!text-white [&>svg]:!text-white",
          "hover:bg-primary-600",
        ),
        destructive: cn(
          "bg-red-500 text-white",
          "hover:border-none hover:bg-red-600",
        ),
        outline: cn(
          "border border-neutral-300 bg-white text-neutral-900",
          "hover:bg-neutral-100",
        ),
        secondary: cn(
          "border border-neutral-200 bg-neutral-50 text-neutral-900",
          "hover:bg-neutral-100",
        ),
        ghost: cn("text-neutral-900", "hover:bg-neutral-100"),
        link: cn(
          "text-neutral-700 underline underline-offset-4 hover:text-neutral-900",
        ),
        icon: "bg-transparent hover:bg-transparent",
        // custom added
        tertiary: cn(
          "border border-neutral-700 bg-neutral-950 text-white",
          "hover:bg-neutral-800",
        ),
        primaryOutline: cn(
          "border border-primary bg-white text-primary",
          "hover:bg-primary hover:text-white focus-visible:text-neutral-900 focus-visible:hover:text-white",
        ),

        subtle:
          "bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600",
        brandSecondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        brandSecondaryOutlined:
          "border border-secondary bg-secondary/5 text-secondary hover:bg-secondary/10",
        secondaryGhost: "text-secondary hover:bg-secondary/50",
        outlinedSubtle: "border border-gray-300 bg-background hover:bg-gray-50",
        underlined: "underline",
        ghostSlate: "hover:bg-slate-100 hover:text-accent-foreground",
        subtlePill:
          "!rounded-full ring-1 ring-neutral-200 ring-offset-2 ring-offset-background hover:bg-neutral-100",
        subtlePillActive:
          "!rounded-full bg-neutral-100  ring-1 ring-neutral-200 ring-offset-2 ring-offset-background hover:bg-neutral-200",
      },
      size: {
        default: "h-10 rounded-sm p-4",
        sm: "h-9 rounded-sm p-3",
        lg: "h-12 !rounded-md px-8",
        icon: "size-fit p-0",
        xl: "h-[52px] rounded-lg p-4 px-7 !text-base font-semibold leading-6",
      },
    },
    compoundVariants: [
      {
        variant: "link",
        class: "!size-fit !p-0",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      children,
      loading,
      disabled,
      type,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        type={type ?? "button"}
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        disabled={loading || disabled}
        {...props}
      >
        {loading && <Loader2 className="animate-spin" />}
        {children}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
