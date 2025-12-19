// Exhibitor Hub Types

export type Locale = 'en-GB' | 'fr-FR' | 'ja-JP';

export type SectionStatus = 'empty' | 'partial' | 'complete';

export type SectionGroup = 'A' | 'B';

export interface ProfileSection {
  id: string;
  name: string;
  group: SectionGroup;
  status: SectionStatus;
  isNotRelevant: boolean;
  isMandatory: boolean;
  description?: string;
  localeData: Record<Locale, {
    status: SectionStatus;
    value: string | string[] | null;
  }>;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  categories: string[];
  images: string[];
  videoUrl?: string;
  documents: ProductDocument[];
  status: 'draft' | 'published';
  localeData: Record<Locale, {
    name: string;
    description: string;
  }>;
}

export interface ProductDocument {
  id: string;
  name: string;
  type: 'brochure' | 'case-study' | 'white-paper' | 'press-release' | 'other';
  url: string;
}

export interface Session {
  id: string;
  title: string;
  speakers: string[];
  location: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
}

export interface ExhibitorProfile {
  id: string;
  companyName: string;
  primaryLocale: Locale;
  secondaryLocales: Locale[];
  packageType: 'bronze' | 'silver' | 'gold';
  sections: ProfileSection[];
  products: Product[];
  sessions: Session[];
}

// Section IDs for the profile
export const SECTION_IDS = {
  // Group A - High Impact (80% weight)
  LOGO: 'logo',
  DESCRIPTION: 'description',
  FILTERS: 'filters',
  MATCHMAKING: 'matchmaking',
  BRANDS: 'brands',
  WEBSITE: 'website',
  EMAIL: 'email',
  PHONE: 'phone',
  PRODUCTS: 'products',
  DOCUMENTS: 'documents',
  SPONSORED_CATEGORY: 'sponsored-category',
  DELEGATES: 'delegates',
  
  // Group B - Lower Impact (20% weight)
  SOCIAL_MEDIA: 'social-media',
  COVER_IMAGE: 'cover-image',
  WHY_VISIT: 'why-visit',
  SESSIONS: 'sessions',
  OFFERS: 'offers',
  PRIVACY_POLICY: 'privacy-policy',
} as const;

export type SectionId = typeof SECTION_IDS[keyof typeof SECTION_IDS];

// Wizard step definition
export interface WizardStep {
  sectionId: SectionId;
  name: string;
  group: SectionGroup;
  isComplete: boolean;
}
