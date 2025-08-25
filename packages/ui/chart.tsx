'use client';

import * as React from 'react';
import { cn } from './utils';

// Simple bar chart component
interface BarChartData {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: BarChartData[];
  height?: number;
  className?: string;
}

export function BarChart({ data, height = 200, className }: BarChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-end justify-between gap-2" style={{ height }}>
        {data.map((item, index) => {
          const heightPercentage = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
          return (
            <div key={index} className="flex flex-col items-center flex-1 gap-2">
              <div className="flex flex-col items-center justify-end flex-1 w-full">
                <span className="text-xs font-medium text-foreground mb-1">{item.value}</span>
                <div
                  className={cn(
                    'w-full rounded-t transition-all duration-300',
                    item.color || 'bg-primary'
                  )}
                  style={{ height: `${heightPercentage}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground text-center px-1">{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Simple line chart component (simplified visualization)
interface LineChartData {
  label: string;
  value: number;
}

interface LineChartProps {
  data: LineChartData[];
  height?: number;
  className?: string;
}

export function LineChart({ data, height = 200, className }: LineChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1;

  return (
    <div className={cn('space-y-4', className)}>
      <div className="relative" style={{ height }}>
        <svg className="w-full h-full" preserveAspectRatio="none">
          <polyline
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            points={data
              .map((item, index) => {
                const x = (index / (data.length - 1)) * 100;
                const y = 100 - ((item.value - minValue) / range) * 100;
                return `${x},${y}`;
              })
              .join(' ')}
          />
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = 100 - ((item.value - minValue) / range) * 100;
            return (
              <circle key={index} cx={`${x}%`} cy={`${y}%`} r="3" fill="hsl(var(--primary))" />
            );
          })}
        </svg>
      </div>
      <div className="flex justify-between">
        {data.map((item, index) => (
          <div key={index} className="text-center">
            <div className="text-sm font-medium text-foreground">{item.value}</div>
            <div className="text-xs text-muted-foreground">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Progress ring component
interface ProgressRingProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  children?: React.ReactNode;
}

export function ProgressRing({
  value,
  max,
  size = 120,
  strokeWidth = 8,
  className,
  children,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = max > 0 ? (value / max) * 100 : 0;
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="hsl(var(--primary))"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeLinecap="round"
          className="transition-all duration-300 ease-in-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children || (
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">{Math.round(percentage)}%</div>
            <div className="text-xs text-muted-foreground">
              {value}/{max}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
