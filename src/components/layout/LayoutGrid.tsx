import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface LayoutGridProps {
  children: ReactNode;
  className?: string;
}

/**
 * Full 12-column layout grid that follows the responsive grid system:
 * - Compact (< 600px): 4 columns
 * - Medium (600-839px): 8 columns
 * - Expanded (840-1199px): 12 columns
 * - Large (1200-1599px): 12 columns
 * - Extra-large (≥ 1600px): 12 columns
 * 
 * Uses 24px gutter (gap-gutter) across all breakpoints.
 */
export function LayoutGrid({ children, className }: LayoutGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-layout-4 sm:grid-cols-layout-8 md:grid-cols-layout-12 gap-gutter",
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardGridProps {
  children: ReactNode;
  className?: string;
}

/**
 * Card grid that follows the responsive column pattern:
 * - Compact (< 600px): 1 column
 * - Medium (600-839px): 2 columns
 * - Expanded (840-1199px): 3 columns
 * - Large/Extra-large (≥ 1200px): 4 columns
 * 
 * Uses 24px gutter (gap-gutter) across all breakpoints.
 */
export function CardGrid({ children, className }: CardGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-gutter",
        className
      )}
    >
      {children}
    </div>
  );
}

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Page container with responsive margins:
 * - Compact/Medium/Expanded: 16px margin
 * - Large/Extra-large: 60px margin
 * 
 * Centers content and applies max-width constraints.
 */
export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn("container mx-auto", className)}>
      {children}
    </div>
  );
}

interface GridColumnProps {
  children: ReactNode;
  span?: number | { default?: number; sm?: number; md?: number; lg?: number; xl?: number };
  start?: number | { default?: number; sm?: number; md?: number; lg?: number; xl?: number };
  className?: string;
}

/**
 * Grid column component for precise column control.
 * Supports responsive span and start values.
 */
export function GridColumn({ children, span, start, className }: GridColumnProps) {
  const getSpanClasses = () => {
    if (!span) return "";
    if (typeof span === "number") return `col-span-${span}`;
    
    const classes: string[] = [];
    if (span.default) classes.push(`col-span-${span.default}`);
    if (span.sm) classes.push(`sm:col-span-${span.sm}`);
    if (span.md) classes.push(`md:col-span-${span.md}`);
    if (span.lg) classes.push(`lg:col-span-${span.lg}`);
    if (span.xl) classes.push(`xl:col-span-${span.xl}`);
    return classes.join(" ");
  };

  const getStartClasses = () => {
    if (!start) return "";
    if (typeof start === "number") return `col-start-${start}`;
    
    const classes: string[] = [];
    if (start.default) classes.push(`col-start-${start.default}`);
    if (start.sm) classes.push(`sm:col-start-${start.sm}`);
    if (start.md) classes.push(`md:col-start-${start.md}`);
    if (start.lg) classes.push(`lg:col-start-${start.lg}`);
    if (start.xl) classes.push(`xl:col-start-${start.xl}`);
    return classes.join(" ");
  };

  return (
    <div className={cn(getSpanClasses(), getStartClasses(), className)}>
      {children}
    </div>
  );
}
