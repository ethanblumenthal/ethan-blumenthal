import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './utils';

const cardVariants = cva(
  'rounded-lg border transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground shadow-sm border-border',
        perplexity: 'bg-gray-900/50 backdrop-blur-sm text-white border-gray-800 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10',
        metric: 'bg-gray-900/50 backdrop-blur-sm text-white border-gray-800 hover:border-cyan-500/30 relative overflow-hidden group',
        outline: 'border-gray-600 bg-transparent text-gray-300 hover:bg-gray-900/30 hover:border-cyan-500/50',
      },
      size: {
        default: 'p-6',
        sm: 'p-4',
        lg: 'p-8',
        xl: 'p-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, size, className }))}
      {...props}
    />
  )
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

// Metric Card Components
interface MetricCardProps extends CardProps {
  title: string;
  value: string | number;
  change?: {
    value: string;
    isPositive?: boolean;
  };
  icon?: React.ReactNode;
  subtitle?: string;
}

const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(
  ({ title, value, change, icon, subtitle, className, ...props }, ref) => (
    <Card ref={ref} variant="metric" className={cn('group', className)} {...props}>      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm text-gray-400 mb-1">{title}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">{value}</span>
              {change && (
                <span
                  className={cn(
                    'text-sm font-medium',
                    change.isPositive ? 'text-green-400' : 'text-red-400'
                  )}
                >
                  {change.isPositive ? '+' : ''}{change.value}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
          {icon && (
            <div className="text-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity duration-200">
              {icon}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
);
MetricCard.displayName = 'MetricCard';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  MetricCard,
  cardVariants,
};