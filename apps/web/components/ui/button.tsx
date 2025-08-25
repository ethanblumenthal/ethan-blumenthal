import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-background-main border-primary hover:bg-primary/90 hover:border-primary/90',
        secondary:
          'bg-secondary text-text-primary border-secondary hover:bg-secondary/90 hover:border-secondary/90',
        outline:
          'bg-primary/10 text-primary border border-primary/30 backdrop-blur-sm hover:bg-primary/20 hover:text-primary',
        ghost:
          'bg-transparent text-text-primary border-transparent hover:bg-background-hover hover:border-border-default',
        destructive:
          'bg-destructive text-destructive-foreground border-destructive hover:bg-destructive/90 hover:border-destructive/90',
        success:
          'bg-success text-success-foreground border-success hover:bg-success/90 hover:border-success/90',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
        xl: 'px-8 py-4 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, href, children, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size, className }));

    const content = <>{children}</>;

    if (href) {
      return (
        <Link href={href} className={classes}>
          {content}
        </Link>
      );
    }

    if (asChild) {
      return React.cloneElement(children as React.ReactElement, {
        className: classes,
        ref,
        ...props,
      });
    }

    return (
      <button className={classes} ref={ref} {...props}>
        {content}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
