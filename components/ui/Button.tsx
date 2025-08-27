import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import Link from "next/link"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-bright-red text-white hover:bg-bright-red/90 shadow-lg hover:shadow-xl",
        primary: "bg-bright-red text-white hover:bg-bright-red/90 shadow-lg hover:shadow-xl",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-2 border-bright-red bg-transparent text-bright-red hover:bg-bright-red hover:text-white",
        secondary:
          "bg-medium-gray text-white hover:bg-medium-gray/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-bright-red underline-offset-4 hover:underline",
        accent: "bg-orange text-white hover:bg-orange/90 shadow-lg hover:shadow-xl",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 rounded-xl px-3",
        lg: "h-14 rounded-3xl px-8 text-base",
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
  href?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, href, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    if (href) {
      return (
        <Link href={href}>
          <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
          />
        </Link>
      )
    }
    
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
