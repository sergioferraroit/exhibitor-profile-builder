import * as React from "react";
import { cn } from "@/lib/utils";

interface CircularProgressRingProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showPercentage?: boolean;
}

const getColorClass = (percentage: number): string => {
  if (percentage >= 100) return "stroke-progress-ring-complete";
  if (percentage >= 67) return "stroke-progress-ring-high";
  if (percentage >= 34) return "stroke-progress-ring-medium";
  return "stroke-progress-ring-low";
};

const CircularProgressRing = React.forwardRef<
  HTMLDivElement,
  CircularProgressRingProps
>(({ value, size = 48, strokeWidth = 4, className, showPercentage = true }, ref) => {
  const normalizedValue = Math.min(100, Math.max(0, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedValue / 100) * circumference;
  const center = size / 2;

  return (
    <div
      ref={ref}
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Background track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          className="stroke-progress-ring-track"
          strokeWidth={strokeWidth}
        />
        {/* Progress arc */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          className={cn("transition-all duration-300 ease-out", getColorClass(normalizedValue))}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      {showPercentage && (
        <span className="absolute text-xs font-medium text-foreground">
          {Math.round(normalizedValue)}%
        </span>
      )}
    </div>
  );
});

CircularProgressRing.displayName = "CircularProgressRing";

export { CircularProgressRing };
