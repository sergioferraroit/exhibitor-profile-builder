import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ProfileSection, Locale, SectionStatus } from '@/types/exhibitor';
import { Edit, CheckCircle2, AlertCircle, Circle, Image, FileText, Users, Globe, Phone, Mail, Tag, Handshake, Award, Calendar, Gift, Shield, MessageSquare, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionCardProps {
  section: ProfileSection;
  selectedLocale: Locale;
  isHighImpact: boolean;
  onEdit: () => void;
  onToggleNotRelevant: () => void;
  customStatus?: SectionStatus;
}

const SECTION_ICONS: Record<string, React.ElementType> = {
  'logo': Image,
  'description': FileText,
  'filters': Tag,
  'matchmaking': Handshake,
  'brands': Award,
  'website': Globe,
  'email': Mail,
  'phone': Phone,
  'products': Award,
  'documents': FileText,
  'sponsored-category': Award,
  'delegates': Users,
  'social-media': MessageSquare,
  'cover-image': Image,
  'why-visit': MessageSquare,
  'sessions': Calendar,
  'offers': Gift,
  'privacy-policy': Shield,
};

const STATUS_CONFIG: Record<SectionStatus, { icon: React.ElementType; color: string; label: string }> = {
  empty: { icon: Circle, color: 'text-status-empty', label: 'Empty' },
  partial: { icon: AlertCircle, color: 'text-status-partial', label: 'Incomplete' },
  complete: { icon: CheckCircle2, color: 'text-status-complete', label: 'Complete' },
};

export function SectionCard({
  section,
  selectedLocale,
  isHighImpact,
  onEdit,
  onToggleNotRelevant,
  customStatus,
}: SectionCardProps) {
  const SectionIcon = SECTION_ICONS[section.id] || FileText;
  const status = customStatus || section.localeData[selectedLocale]?.status || section.status;
  const statusConfig = STATUS_CONFIG[status];
  const StatusIcon = statusConfig.icon;

  const canMarkNotRelevant = !section.isMandatory && section.status === 'empty' && !section.isNotRelevant;
  const showNotRelevantCheckbox = !section.isMandatory && (section.status === 'empty' || section.isNotRelevant);
  const isWebsiteSection = section.id === 'website';

  return (
    <Card className={cn(
      "relative transition-all",
      section.isNotRelevant && "opacity-60",
      isWebsiteSection && "ring-2 ring-primary/50 bg-primary/5"
    )}>
      {isWebsiteSection && (
        <div className="absolute -top-3 left-4 flex items-center gap-1.5 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium shadow-sm">
          <Sparkles className="h-3 w-3" />
          AI Autofill Trigger
        </div>
      )}
      <CardHeader className={cn("pb-2", isWebsiteSection && "pt-6")}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-2 rounded-lg",
              isWebsiteSection ? "bg-primary/20" : isHighImpact ? "bg-high-impact/10" : "bg-muted"
            )}>
              <SectionIcon className={cn(
                "h-5 w-5",
                isWebsiteSection ? "text-primary" : isHighImpact ? "text-high-impact" : "text-muted-foreground"
              )} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-foreground">{section.name}</h3>
                {isHighImpact && (
                  <Badge variant="secondary" className="bg-high-impact/10 text-high-impact text-xs">
                    High Impact
                  </Badge>
                )}
                {section.isMandatory && (
                  <Badge variant="outline" className="text-xs">
                    Required
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1 mt-1">
                <StatusIcon className={cn("h-4 w-4", statusConfig.color)} />
                <span className={cn("text-xs", statusConfig.color)}>
                  {section.isNotRelevant ? 'Not relevant' : statusConfig.label}
                </span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onEdit}
            disabled={section.isNotRelevant}
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3">{section.description}</p>
        
        {isWebsiteSection && (
          <div className="flex items-start gap-2 p-3 bg-primary/10 rounded-lg mb-3 border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            <p className="text-xs text-primary">
              <span className="font-medium">Start here!</span> Adding your website URL enables AI to automatically suggest content for other sections.
            </p>
          </div>
        )}
        
        {showNotRelevantCheckbox && (
          <div className="flex items-center gap-2 pt-2 border-t">
            <Checkbox
              id={`not-relevant-${section.id}`}
              checked={section.isNotRelevant}
              onCheckedChange={onToggleNotRelevant}
              disabled={!canMarkNotRelevant && !section.isNotRelevant}
            />
            <label
              htmlFor={`not-relevant-${section.id}`}
              className="text-xs text-muted-foreground cursor-pointer"
            >
              Mark as not relevant (exclude from completion score)
            </label>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
