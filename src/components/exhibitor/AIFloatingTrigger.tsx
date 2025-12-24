import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AIFloatingTriggerProps {
  onClick: () => void;
  className?: string;
}

export function AIFloatingTrigger({ onClick, className }: AIFloatingTriggerProps) {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "fixed right-0 top-1/2 -translate-y-1/2 z-50",
        "h-12 w-12 rounded-l-xl rounded-r-none",
        "bg-[#F97316] hover:bg-[#EA580C] text-white",
        "shadow-lg hover:shadow-xl transition-all duration-200",
        "flex items-center justify-center",
        className
      )}
      size="icon"
      aria-label="AI Assistant"
    >
      <Sparkles className="h-5 w-5" />
    </Button>
  );
}
