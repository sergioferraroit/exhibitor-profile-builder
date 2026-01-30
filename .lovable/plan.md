

# Plan: Add Section Fulfillment Support Text to Profile Header

## Overview
Add a support text below the page title in the Edit Company Profile page that displays "X of Y sections fulfilled" with an Info icon, matching the pattern used in the Home page task list.

## Changes Required

### 1. Update ProfileHeader Component Props
**File:** `src/components/exhibitor/ProfileHeader.tsx`

Add two new props to receive section counts:
- `fulfilledSections: number` - Count of sections with 'complete' status
- `totalSections: number` - Total count of relevant sections (excluding "not relevant")

### 2. Add Support Text with Info Icon
**File:** `src/components/exhibitor/ProfileHeader.tsx`

Below the page title `<h1>`, add a support text row that includes:
- An Info icon (from lucide-react) wrapped in a Tooltip
- Dynamic text: "{fulfilledSections} of {totalSections} sections fulfilled"
- Matching styling from Home page: `text-xs text-muted-foreground`

### 3. Calculate Section Counts in ExhibitorHub
**File:** `src/pages/ExhibitorHub.tsx`

Calculate and pass the section counts to ProfileHeader:
- `fulfilledSections`: Count sections where `localeData[primaryLocale].status === 'complete'` (for relevant sections)
- `totalSections`: Count all sections where `isNotRelevant === false`

### 4. Add Translation Keys
**File:** `src/contexts/LanguageContext.tsx`

Add new translation keys for all three languages:
- `profile.sectionsFulfilled` - "sections fulfilled" text
- `profile.sectionsFulfilledTooltip` - Tooltip explanation text

---

## Technical Details

### ProfileHeader Props Update
```typescript
interface ProfileHeaderProps {
  // ... existing props
  fulfilledSections: number;
  totalSections: number;
}
```

### Support Text Pattern (matching Home page)
```tsx
<div className="flex items-center gap-1 text-xs text-muted-foreground">
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Info className="h-3.5 w-3.5 text-muted-foreground cursor-pointer" />
      </TooltipTrigger>
      <TooltipContent className="max-w-[200px]">
        <p>{t("profile.sectionsFulfilledTooltip")}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  <span>{fulfilledSections} of {totalSections} {t("profile.sectionsFulfilled")}</span>
</div>
```

### Section Count Calculation in ExhibitorHub
```typescript
// Calculate section fulfillment counts
const relevantSections = profile.sections.filter(s => !s.isNotRelevant);
const fulfilledSections = relevantSections.filter(s => {
  if (s.id === 'products') return profile.products.length > 0;
  return s.localeData[profile.primaryLocale]?.status === 'complete';
}).length;
const totalSections = relevantSections.length;
```

### New Translation Keys
| Key | English | French | Japanese |
|-----|---------|--------|----------|
| profile.sectionsFulfilled | sections fulfilled | sections remplies | セクション完了 |
| profile.sectionsFulfilledTooltip | Complete all sections to maximize your profile visibility and attract more visitors. | Complétez toutes les sections pour maximiser la visibilité de votre profil et attirer plus de visiteurs. | すべてのセクションを完了して、プロフィールの可視性を最大化し、より多くの訪問者を引き付けましょう。 |

---

## Files to Modify

1. **src/components/exhibitor/ProfileHeader.tsx** - Add Info icon + support text, update props
2. **src/pages/ExhibitorHub.tsx** - Calculate and pass section counts to ProfileHeader
3. **src/contexts/LanguageContext.tsx** - Add new translation keys for EN/FR/JP

