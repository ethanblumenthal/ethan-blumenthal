import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from './utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-lg hover:shadow-xl hover:shadow-cyan-500/25 hover:from-cyan-400 hover:to-cyan-500 active:scale-95',
        destructive:
          'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl hover:shadow-red-500/25 hover:from-red-400 hover:to-red-500 active:scale-95',
        outline:
          'border border-gray-600 bg-transparent text-gray-300 shadow-sm hover:bg-gray-800 hover:text-white hover:border-cyan-500 active:scale-95',
        secondary:
          'bg-gray-800 text-gray-200 shadow-sm hover:bg-gray-700 hover:text-white active:scale-95',
        ghost: 'text-gray-300 hover:bg-gray-800 hover:text-white active:scale-95',
        link: 'text-cyan-400 underline-offset-4 hover:underline hover:text-cyan-300',
        pill: 'bg-gray-800 text-gray-300 border border-gray-600 rounded-full hover:bg-gray-700 hover:text-white hover:border-cyan-500 active:scale-95',
      },
      size: {
        default: 'h-10 px-6 py-2',
        sm: 'h-8 rounded-lg px-4 text-xs',
        lg: 'h-12 rounded-lg px-8 text-base',
        icon: 'h-10 w-10',
        pill: 'h-9 px-4 py-2 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
