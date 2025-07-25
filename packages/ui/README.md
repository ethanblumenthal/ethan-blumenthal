# @cre-platform/ui

A comprehensive React component library built with Radix UI primitives and Tailwind CSS, providing consistent, accessible, and customizable UI components for the CRE Platform applications.

## Overview

This package provides a shared component library that ensures design consistency across the web and admin applications. Built on Radix UI's accessible primitives with custom styling and enhanced functionality.

## Architecture

```
packages/ui/
├── index.ts              # Component exports
├── utils.ts              # Utility functions for styling
├── package.json          # Package configuration
├── tsconfig.json         # TypeScript configuration
└── components/           # UI Components
    ├── accordion.tsx     # Collapsible content sections
    ├── avatar.tsx        # User profile images
    ├── button.tsx        # Interactive buttons with variants
    ├── checkbox.tsx      # Form checkboxes
    ├── dropdown-menu.tsx # Context menus and dropdowns
    ├── input.tsx         # Form input fields
    ├── label.tsx         # Form labels
    ├── select.tsx        # Dropdown select components
    ├── sheet.tsx         # Slide-out panels
    └── textarea.tsx      # Multi-line text inputs
```

## Technology Stack

### Core Dependencies
- **React 18/19**: Component framework with concurrent features
- **Radix UI**: Unstyled, accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Class Variance Authority (CVA)**: Component variant management
- **Lucide React**: Consistent icon system

### Styling System
- **Tailwind CSS**: Utility-first styling
- **tailwind-merge**: Intelligent class merging
- **tailwindcss-animate**: Animation utilities
- **clsx**: Conditional class management

## Component Library

### Button Component
Versatile button component with multiple variants and sizes.

```tsx
import { Button } from '@cre-platform/ui';

// Variants
<Button variant="default">Primary Action</Button>
<Button variant="destructive">Delete Item</Button>
<Button variant="outline">Secondary Action</Button>
<Button variant="secondary">Tertiary Action</Button>
<Button variant="ghost">Subtle Action</Button>
<Button variant="link">Link Style</Button>

// Sizes
<Button size="default">Regular Button</Button>
<Button size="sm">Small Button</Button>
<Button size="lg">Large Button</Button>
<Button size="icon">🔧</Button>

// States
<Button disabled>Disabled Button</Button>
<Button loading>Processing...</Button>
```

**Features:**
- Multiple visual variants (default, destructive, outline, secondary, ghost, link)
- Size variants (sm, default, lg, icon)
- Loading state with spinner
- Full accessibility support
- Keyboard navigation

### Input Component
Form input with enhanced functionality and validation styling.

```tsx
import { Input } from '@cre-platform/ui';

// Basic usage
<Input placeholder="Enter your email" />

// With error state
<Input 
  placeholder="Enter password" 
  type="password"
  error="Password must be at least 8 characters"
/>

// Disabled state
<Input placeholder="Read-only field" disabled />
```

**Features:**
- All HTML input types supported
- Error state styling
- Disabled state handling
- Consistent focus management
- Form integration ready

### Select Component
Accessible dropdown select with search capabilities.

```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@cre-platform/ui';

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select an option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
    <SelectItem value="option3">Option 3</SelectItem>
  </SelectContent>
</Select>
```

**Features:**
- Keyboard navigation support
- Search functionality
- Custom trigger styling
- Grouped options support
- Controlled and uncontrolled modes

### Textarea Component
Multi-line text input with auto-resize capabilities.

```tsx
import { Textarea } from '@cre-platform/ui';

// Basic usage
<Textarea placeholder="Enter your message..." />

// With character limit
<Textarea 
  placeholder="Brief description"
  maxLength={500}
  showCount
/>

// Auto-resize
<Textarea 
  placeholder="Content that grows..."
  autoResize
  minRows={3}
  maxRows={10}
/>
```

**Features:**
- Auto-resize functionality
- Character count display
- Min/max row constraints
- Error state styling
- Form validation ready

### Dropdown Menu Component
Context menus and action dropdowns with rich content support.

```tsx
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@cre-platform/ui';

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Actions</DropdownMenuLabel>
    <DropdownMenuItem onClick={handleEdit}>
      Edit Item
    </DropdownMenuItem>
    <DropdownMenuItem onClick={handleDuplicate}>
      Duplicate
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem 
      onClick={handleDelete}
      className="text-destructive"
    >
      Delete Item
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

**Features:**
- Rich content support (icons, descriptions)
- Keyboard navigation
- Nested menus
- Custom positioning
- Event handling

### Accordion Component
Collapsible content sections for organizing information.

```tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@cre-platform/ui';

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>
      Content for section 1...
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Section 2</AccordionTrigger>
    <AccordionContent>
      Content for section 2...
    </AccordionContent>
  </AccordionContent>
  </AccordionItem>
</Accordion>
```

**Features:**
- Single or multiple expansion modes
- Smooth animations
- Customizable triggers
- Nested content support
- Accessibility compliant

### Avatar Component
User profile image display with fallback support.

```tsx
import { Avatar, AvatarFallback, AvatarImage } from '@cre-platform/ui';

<Avatar>
  <AvatarImage src="/user-avatar.jpg" alt="User Name" />
  <AvatarFallback>UN</AvatarFallback>
</Avatar>

// With sizes
<Avatar size="sm">
  <AvatarImage src="/small-avatar.jpg" />
  <AvatarFallback>SM</AvatarFallback>
</Avatar>
```

**Features:**
- Multiple size variants
- Automatic fallback handling
- Loading state support
- Accessible alt text
- Custom fallback content

### Sheet Component
Slide-out panels for forms, details, and navigation.

```tsx
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@cre-platform/ui';

<Sheet>
  <SheetTrigger asChild>
    <Button>Open Panel</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Panel Title</SheetTitle>
      <SheetDescription>
        Panel description or subtitle
      </SheetDescription>
    </SheetHeader>
    <div className="py-4">
      Panel content goes here...
    </div>
  </SheetContent>
</Sheet>
```

**Features:**
- Multiple slide directions (top, right, bottom, left)
- Overlay backdrop
- Keyboard navigation (ESC to close)
- Focus management
- Custom sizing

### Checkbox Component
Form checkboxes with indeterminate state support.

```tsx
import { Checkbox } from '@cre-platform/ui';

// Basic checkbox
<Checkbox 
  id="terms" 
  checked={agreed}
  onCheckedChange={setAgreed}
/>

// With label
<div className="flex items-center space-x-2">
  <Checkbox id="newsletter" />
  <label htmlFor="newsletter">
    Subscribe to newsletter
  </label>
</div>

// Indeterminate state
<Checkbox 
  checked="indeterminate"
  onCheckedChange={handleBulkSelection}
/>
```

**Features:**
- Controlled and uncontrolled modes
- Indeterminate state support
- Custom styling options
- Form integration ready
- Accessible labeling

### Label Component
Accessible form labels with enhanced styling.

```tsx
import { Label } from '@cre-platform/ui';

<Label htmlFor="email">Email Address</Label>
<Input id="email" type="email" />

// With required indicator
<Label htmlFor="password" required>
  Password
</Label>
```

**Features:**
- Automatic focus association
- Required field indicators
- Consistent typography
- Error state styling
- Accessibility optimized

## Styling System

### Design Tokens
The UI library uses a consistent design token system:

```css
/* Colors */
--primary: 222.2 84% 4.9%;
--primary-foreground: 210 40% 98%;
--secondary: 210 40% 96%;
--secondary-foreground: 222.2 84% 4.9%;
--destructive: 0 84.2% 60.2%;
--destructive-foreground: 210 40% 98%;

/* Spacing */
--spacing-xs: 0.25rem;
--spacing-sm: 0.5rem;
--spacing-md: 1rem;
--spacing-lg: 1.5rem;
--spacing-xl: 2rem;

/* Typography */
--font-size-xs: 0.75rem;
--font-size-sm: 0.875rem;
--font-size-base: 1rem;
--font-size-lg: 1.125rem;
--font-size-xl: 1.25rem;
```

### Component Variants
Using Class Variance Authority for type-safe variant management:

```typescript
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary"
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
```

### Utility Functions (`utils.ts`)
Helper functions for consistent styling:

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Intelligent class merging
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Focus ring utilities
export const focusRing = "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2";

// Animation utilities
export const transitions = {
  fast: "transition-all duration-150 ease-in-out",
  normal: "transition-all duration-200 ease-in-out",
  slow: "transition-all duration-300 ease-in-out"
};
```

## Usage in Applications

### Installation & Setup
The UI package is automatically available in both web and admin applications:

```typescript
// In apps/web or apps/admin
import { Button, Input, Select } from '@cre-platform/ui';

export function MyForm() {
  return (
    <form className="space-y-4">
      <Input placeholder="Enter your name" />
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Choose option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
        </SelectContent>
      </Select>
      <Button>Submit</Button>
    </form>
  );
}
```

### Theming & Customization
Components support custom styling through className props:

```tsx
// Custom styling
<Button 
  variant="outline" 
  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
>
  Custom Gradient Button
</Button>

// Responsive design
<Input 
  className="w-full md:w-1/2 lg:w-1/3"
  placeholder="Responsive input"
/>
```

### Form Integration
Components work seamlessly with form libraries:

```tsx
import { useForm } from 'react-hook-form';
import { Button, Input, Label } from '@cre-platform/ui';

export function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          {...register('email', { required: true })}
          error={errors.email?.message}
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

## Development Guidelines

### Component Standards
- Follow Radix UI patterns for accessibility
- Use CVA for consistent variant management
- Implement proper TypeScript interfaces
- Include comprehensive prop documentation
- Support both controlled and uncontrolled modes

### Testing Approach
```typescript
// Component testing example
import { render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('renders with correct variant styles', () => {
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-destructive');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    screen.getByRole('button').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Accessibility Requirements
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Color contrast requirements
- Semantic HTML structure

## Performance Considerations

### Bundle Optimization
- Tree-shakeable component exports
- Minimal runtime dependencies
- Optimized CSS-in-JS usage
- Lazy loading for complex components

### Runtime Performance
- Efficient re-rendering patterns
- Memoization where appropriate
- Optimized event handling
- Minimal DOM manipulation

## Browser Support

- **Modern Browsers**: Chrome 88+, Firefox 85+, Safari 14+, Edge 88+
- **Mobile**: iOS Safari 14+, Chrome Mobile 88+
- **Feature Detection**: Graceful degradation for older browsers
- **Polyfills**: Automatic polyfill inclusion where needed

## Integration Examples

### CRE Platform Specific Usage
```tsx
// Contact form in web app
import { Button, Input, Textarea, Select } from '@cre-platform/ui';

export function ContactForm() {
  return (
    <div className="max-w-md mx-auto space-y-4">
      <Input placeholder="Company Name" />
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Property Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="office">Office</SelectItem>
          <SelectItem value="retail">Retail</SelectItem>
          <SelectItem value="industrial">Industrial</SelectItem>
        </SelectContent>
      </Select>
      <Textarea placeholder="Project details..." />
      <Button className="w-full">
        Get CRE Consultation
      </Button>
    </div>
  );
}
```

The UI package provides a solid foundation for building consistent, accessible, and performant user interfaces across the CRE Platform applications.