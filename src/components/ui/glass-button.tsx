import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "large" | "small";
  children: React.ReactNode;
}

const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "px-6 py-2.5 text-sm rounded-full",
      large: "px-14 py-5 text-base rounded-full",
      small: "px-4 py-2 text-xs rounded-full",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "liquid-glass-btn text-white font-body font-medium cursor-pointer",
          "transition-all duration-300 ease-out",
          "hover:scale-[1.03] hover:-translate-y-0.5",
          "active:scale-[0.98]",
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

GlassButton.displayName = "GlassButton";

export { GlassButton };