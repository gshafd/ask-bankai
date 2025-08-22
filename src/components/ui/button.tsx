import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        
        // Modern Banking Variants
        "banking-primary": "bg-gradient-primary text-white hover:shadow-banking hover:scale-105 transition-bounce glow-pulse",
        "banking-secondary": "bg-gradient-secondary text-white hover:shadow-accent hover:scale-105 transition-bounce",
        "banking-accent": "bg-gradient-accent text-white hover:shadow-glow hover:scale-105 transition-bounce",
        "banking-outline": "border-2 border-primary/50 bg-transparent text-primary hover:bg-primary/10 hover:border-primary transition-smooth",
        "banking-ghost": "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-md transition-glass",
        "banking-glass": "glass-button text-foreground hover:text-primary transition-glass",
        
        // Status Variants
        success: "bg-gradient-to-r from-success to-success/80 text-success-foreground hover:from-success/90 hover:to-success/70 shadow-lg hover:shadow-xl transition-all",
        warning: "bg-gradient-to-r from-warning to-warning/80 text-warning-foreground hover:from-warning/90 hover:to-warning/70 shadow-lg hover:shadow-xl transition-all",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-12 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }