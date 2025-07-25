import * as React from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { cn } from './utils';

interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
  showClear?: boolean;
  icon?: React.ReactNode;
}

const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  ({ className, onClear, showClear = true, icon, value, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(value || '');
    const hasValue = Boolean(internalValue);

    const handleClear = () => {
      setInternalValue('');
      onClear?.();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.value);
      props.onChange?.(e);
    };

    return (
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          {icon || <SearchIcon className="h-4 w-4" />}
        </div>
        <input
          ref={ref}
          value={value !== undefined ? value : internalValue}
          onChange={handleChange}
          className={cn(
            'flex h-12 w-full rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-700 pl-10 pr-10 py-3 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200 hover:border-gray-600',
            className
          )}
          {...props}
        />
        {showClear && hasValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);
Search.displayName = 'Search';

export { Search };