import { useState, useCallback } from 'react';
import { 
  ExhibitorProfile, 
  ProfileSection, 
  Product, 
  Session,
  CompanyDocument,
  Locale, 
  SectionStatus,
  SECTION_IDS 
} from '@/types/exhibitor';

// Initial mock data for the prototype
const createInitialProfile = (): ExhibitorProfile => ({
  id: '1',
  companyName: 'Acme Corporation',
  primaryLocale: 'en-GB',
  secondaryLocales: ['fr-FR', 'ja-JP'],
  packageType: 'gold',
  sections: [
    // Group A - High Impact
    {
      id: SECTION_IDS.LOGO,
      name: 'Company Logo',
      group: 'A',
      status: 'complete',
      isNotRelevant: false,
      isMandatory: true,
      description: 'Upload your company logo (180x180px recommended)',
      localeData: {
        'en-GB': { status: 'complete', value: '/placeholder.svg' },
        'fr-FR': { status: 'complete', value: '/placeholder.svg' },
        'ja-JP': { status: 'complete', value: '/placeholder.svg' },
      },
    },
    {
      id: SECTION_IDS.DESCRIPTION,
      name: 'Company Description',
      group: 'A',
      status: 'partial',
      isNotRelevant: false,
      isMandatory: true,
      description: 'Describe what your company does (max 600 characters)',
      localeData: {
        'en-GB': { status: 'complete', value: 'Acme Corporation is a leading provider of innovative solutions...' },
        'fr-FR': { status: 'empty', value: null },
        'ja-JP': { status: 'empty', value: null },
      },
    },
    {
      id: SECTION_IDS.FILTERS,
      name: 'Filters',
      group: 'A',
      status: 'empty',
      isNotRelevant: false,
      isMandatory: true,
      description: 'Select items that best represent your company',
      localeData: {
        'en-GB': { status: 'empty', value: null },
        'fr-FR': { status: 'empty', value: null },
        'ja-JP': { status: 'empty', value: null },
      },
    },
    {
      id: SECTION_IDS.MATCHMAKING,
      name: 'Matchmaking Filters',
      group: 'A',
      status: 'empty',
      isNotRelevant: false,
      isMandatory: false,
      description: 'Help visitors find you through recommendations',
      localeData: {
        'en-GB': { status: 'empty', value: null },
        'fr-FR': { status: 'empty', value: null },
        'ja-JP': { status: 'empty', value: null },
      },
    },
    {
      id: SECTION_IDS.BRANDS,
      name: 'Brands',
      group: 'A',
      status: 'empty',
      isNotRelevant: false,
      isMandatory: false,
      description: 'Tell visitors all the brands your company represents',
      localeData: {
        'en-GB': { status: 'empty', value: null },
        'fr-FR': { status: 'empty', value: null },
        'ja-JP': { status: 'empty', value: null },
      },
    },
    {
      id: SECTION_IDS.WEBSITE,
      name: 'Company Website',
      group: 'A',
      status: 'complete',
      isNotRelevant: false,
      isMandatory: false,
      description: 'Your company website URL',
      localeData: {
        'en-GB': { status: 'complete', value: 'https://www.acme.com' },
        'fr-FR': { status: 'complete', value: 'https://www.acme.com' },
        'ja-JP': { status: 'complete', value: 'https://www.acme.com' },
      },
    },
    {
      id: SECTION_IDS.EMAIL,
      name: 'Company Email',
      group: 'A',
      status: 'complete',
      isNotRelevant: false,
      isMandatory: true,
      description: 'Your company contact email',
      localeData: {
        'en-GB': { status: 'complete', value: 'info@acme.com' },
        'fr-FR': { status: 'complete', value: 'info@acme.com' },
        'ja-JP': { status: 'complete', value: 'info@acme.com' },
      },
    },
    {
      id: SECTION_IDS.PHONE,
      name: 'Company Phone',
      group: 'A',
      status: 'empty',
      isNotRelevant: false,
      isMandatory: false,
      description: 'Your company contact phone',
      localeData: {
        'en-GB': { status: 'empty', value: null },
        'fr-FR': { status: 'empty', value: null },
        'ja-JP': { status: 'empty', value: null },
      },
    },
    {
      id: SECTION_IDS.PRODUCTS,
      name: 'Products & Services',
      group: 'A',
      status: 'empty',
      isNotRelevant: false,
      isMandatory: false,
      description: 'Showcase your products and services',
      localeData: {
        'en-GB': { status: 'empty', value: null },
        'fr-FR': { status: 'empty', value: null },
        'ja-JP': { status: 'empty', value: null },
      },
    },
    {
      id: SECTION_IDS.DOCUMENTS,
      name: 'Documents',
      group: 'A',
      status: 'empty',
      isNotRelevant: false,
      isMandatory: false,
      description: 'Upload brochures, case studies, and more',
      localeData: {
        'en-GB': { status: 'empty', value: null },
        'fr-FR': { status: 'empty', value: null },
        'ja-JP': { status: 'empty', value: null },
      },
    },
    {
      id: SECTION_IDS.SPONSORED_CATEGORY,
      name: 'Sponsored Category',
      group: 'A',
      status: 'empty',
      isNotRelevant: false,
      isMandatory: false,
      description: 'Select one category to sponsor (Gold package)',
      localeData: {
        'en-GB': { status: 'empty', value: null },
        'fr-FR': { status: 'empty', value: null },
        'ja-JP': { status: 'empty', value: null },
      },
    },
    {
      id: SECTION_IDS.DELEGATES,
      name: 'Delegate List',
      group: 'A',
      status: 'empty',
      isNotRelevant: false,
      isMandatory: false,
      description: 'Add your team members attending the event',
      localeData: {
        'en-GB': { status: 'empty', value: null },
        'fr-FR': { status: 'empty', value: null },
        'ja-JP': { status: 'empty', value: null },
      },
    },
    // Group B - Lower Impact
    {
      id: SECTION_IDS.SOCIAL_MEDIA,
      name: 'Social Media',
      group: 'B',
      status: 'empty',
      isNotRelevant: false,
      isMandatory: false,
      description: 'Add your social media links',
      localeData: {
        'en-GB': { status: 'empty', value: null },
        'fr-FR': { status: 'empty', value: null },
        'ja-JP': { status: 'empty', value: null },
      },
    },
    {
      id: SECTION_IDS.COVER_IMAGE,
      name: 'Cover Image',
      group: 'B',
      status: 'empty',
      isNotRelevant: false,
      isMandatory: false,
      description: 'Upload a cover image (1400x350px minimum)',
      localeData: {
        'en-GB': { status: 'empty', value: null },
        'fr-FR': { status: 'empty', value: null },
        'ja-JP': { status: 'empty', value: null },
      },
    },
    {
      id: SECTION_IDS.WHY_VISIT,
      name: 'Why Visit Our Stand',
      group: 'B',
      status: 'empty',
      isNotRelevant: false,
      isMandatory: false,
      description: 'Tell visitors why they should visit (max 200 characters)',
      localeData: {
        'en-GB': { status: 'empty', value: null },
        'fr-FR': { status: 'empty', value: null },
        'ja-JP': { status: 'empty', value: null },
      },
    },
    {
      id: SECTION_IDS.SESSIONS,
      name: 'At-Stand Sessions',
      group: 'B',
      status: 'empty',
      isNotRelevant: false,
      isMandatory: false,
      description: 'Schedule sessions at your stand',
      localeData: {
        'en-GB': { status: 'empty', value: null },
        'fr-FR': { status: 'empty', value: null },
        'ja-JP': { status: 'empty', value: null },
      },
    },
    {
      id: SECTION_IDS.OFFERS,
      name: 'Special Offers',
      group: 'B',
      status: 'empty',
      isNotRelevant: false,
      isMandatory: false,
      description: 'Add special offers for visitors',
      localeData: {
        'en-GB': { status: 'empty', value: null },
        'fr-FR': { status: 'empty', value: null },
        'ja-JP': { status: 'empty', value: null },
      },
    },
    {
      id: SECTION_IDS.PRIVACY_POLICY,
      name: 'Privacy Policy',
      group: 'B',
      status: 'empty',
      isNotRelevant: false,
      isMandatory: false,
      description: 'Link to your privacy policy',
      localeData: {
        'en-GB': { status: 'empty', value: null },
        'fr-FR': { status: 'empty', value: null },
        'ja-JP': { status: 'empty', value: null },
      },
    },
  ],
  products: [
    {
      id: '1',
      name: '1-Day Hop-On Hop-Off Bus + Harbour Cruise Pass',
      description: "Explore the city's top landmarks with the 1-Day Hop-On Hop-Off Bus and Harbour Cruise pass! Ride both the North (Blue Line) and South (Red Line) routes, with stops near iconic attractions like the Opera House, Bondi Beach, and Darling Harbour.",
      categories: ['Tours', 'Attractions'],
      images: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=300&fit=crop',
      ],
      videoUrl: 'https://example.com/video1.mp4',
      documents: [
        { id: 'd1', name: 'Tour Brochure', type: 'brochure', url: '#' },
        { id: 'd2', name: 'Route Map', type: 'other', url: '#' },
      ],
      status: 'published',
      localeData: {
        'en-GB': { name: '1-Day Hop-On Hop-Off Bus + Harbour Cruise Pass', description: "Explore the city's top landmarks with the 1-Day Hop-On Hop-Off Bus and Harbour Cruise pass!" },
        'fr-FR': { name: 'Pass Bus Hop-On Hop-Off + Croisière 1 Jour', description: "Explorez les principaux monuments de la ville avec le pass Bus Hop-On Hop-Off et Croisière!" },
        'ja-JP': { name: '1日乗り降り自由バス + ハーバークルーズパス', description: '1日乗り降り自由バスとハーバークルーズパスで、街の主要なランドマークを探索しましょう！' },
      },
    },
    {
      id: '2',
      name: 'Premium City Walking Tour',
      description: 'Discover hidden gems and local secrets on our premium guided walking tour. Expert guides share fascinating stories about the city\'s history, culture, and architecture.',
      categories: ['Tours', 'Experiences'],
      images: [
        'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop',
      ],
      documents: [
        { id: 'd3', name: 'Tour Guide', type: 'brochure', url: '#' },
      ],
      status: 'published',
      localeData: {
        'en-GB': { name: 'Premium City Walking Tour', description: 'Discover hidden gems and local secrets on our premium guided walking tour.' },
        'fr-FR': { name: 'Visite Guidée Premium', description: 'Découvrez des joyaux cachés et des secrets locaux lors de notre visite guidée premium.' },
        'ja-JP': { name: 'プレミアムシティウォーキングツアー', description: 'プレミアムガイドウォーキングツアーで、隠れた名所や地元の秘密を発見しましょう。' },
      },
    },
    {
      id: '3',
      name: 'Adventure Package - Coming Soon',
      description: 'An exciting new adventure package featuring exclusive experiences. Stay tuned for more details!',
      categories: ['Adventure'],
      images: [],
      documents: [],
      status: 'draft',
      localeData: {
        'en-GB': { name: 'Adventure Package - Coming Soon', description: 'An exciting new adventure package featuring exclusive experiences.' },
        'fr-FR': { name: 'Forfait Aventure - Bientôt', description: 'Un nouveau forfait aventure passionnant avec des expériences exclusives.' },
        'ja-JP': { name: 'アドベンチャーパッケージ - 近日公開', description: 'エキサイティングな新しいアドベンチャーパッケージが間もなく登場！' },
      },
    },
  ],
  sessions: [],
  companyDocuments: [
    {
      id: 'doc-1',
      name: 'Company Brochure 2024',
      description: 'Our latest company brochure with product overview',
      category: 'brochure',
      fileUrl: '#',
      fileName: 'company-brochure-2024.pdf',
    },
    {
      id: 'doc-2',
      name: 'Sustainability Case Study',
      description: 'How we reduced carbon footprint by 50%',
      category: 'case-study',
      fileUrl: '#',
      fileName: 'sustainability-case-study.pdf',
    },
    {
      id: 'doc-3',
      name: 'Product Technical Specifications',
      description: 'Technical specs for all our products',
      category: 'white-paper',
      fileUrl: '#',
      fileName: 'product-specs.pdf',
    },
    {
      id: 'doc-4',
      name: 'Press Release - Q4 2024',
      description: 'Latest press release announcing new partnerships',
      category: 'press-release',
      fileUrl: '#',
      fileName: 'press-release-q4-2024.pdf',
    },
  ],
});

export function useExhibitorProfile() {
  const [profile, setProfile] = useState<ExhibitorProfile>(createInitialProfile);
  const [selectedLocale, setSelectedLocale] = useState<Locale>('en-GB');

  const updateSection = useCallback((
    sectionId: string, 
    locale: Locale, 
    value: string | string[] | null,
    status: SectionStatus
  ) => {
    setProfile(prev => ({
      ...prev,
      sections: prev.sections.map(section => {
        if (section.id !== sectionId) return section;
        
        const newLocaleData = {
          ...section.localeData,
          [locale]: { status, value },
        };
        
        // Determine overall section status
        const locales = [prev.primaryLocale, ...prev.secondaryLocales];
        const statuses = locales.map(l => newLocaleData[l]?.status || 'empty');
        const allComplete = statuses.every(s => s === 'complete');
        const anyComplete = statuses.some(s => s === 'complete' || s === 'partial');
        
        return {
          ...section,
          status: allComplete ? 'complete' : anyComplete ? 'partial' : 'empty',
          localeData: newLocaleData,
        };
      }),
    }));
  }, []);

  const toggleNotRelevant = useCallback((sectionId: string) => {
    setProfile(prev => ({
      ...prev,
      sections: prev.sections.map(section => {
        if (section.id !== sectionId) return section;
        // Cannot mark mandatory fields as not relevant
        if (section.isMandatory) return section;
        // Can only mark as not relevant if section is empty
        if (section.status !== 'empty' && !section.isNotRelevant) return section;
        
        return {
          ...section,
          isNotRelevant: !section.isNotRelevant,
        };
      }),
    }));
  }, []);

  const addProduct = useCallback((product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
    };
    setProfile(prev => ({
      ...prev,
      products: [...prev.products, newProduct],
    }));
    return newProduct.id;
  }, []);

  const updateProduct = useCallback((productId: string, updates: Partial<Product>) => {
    setProfile(prev => ({
      ...prev,
      products: prev.products.map(p => 
        p.id === productId ? { ...p, ...updates } : p
      ),
    }));
  }, []);

  const deleteProduct = useCallback((productId: string) => {
    setProfile(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== productId),
    }));
  }, []);

  const reorderProducts = useCallback((productIds: string[]) => {
    setProfile(prev => {
      const productMap = new Map(prev.products.map(p => [p.id, p]));
      const reorderedProducts = productIds
        .map(id => productMap.get(id))
        .filter((p): p is Product => p !== undefined);
      
      return {
        ...prev,
        products: reorderedProducts,
      };
    });
  }, []);

  const getIncompleteSections = useCallback(() => {
    return profile.sections.filter(
      s => !s.isNotRelevant && s.status !== 'complete'
    );
  }, [profile.sections]);

  const getWizardSteps = useCallback(() => {
    const incompleteSections = getIncompleteSections();
    const steps = incompleteSections.map(s => ({
      sectionId: s.id as any,
      name: s.name,
      group: s.group,
      isComplete: s.status === 'complete',
    }));
    
    // Add product step if no products exist
    if (profile.products.length === 0) {
      const productsSection = profile.sections.find(s => s.id === SECTION_IDS.PRODUCTS);
      if (productsSection && !productsSection.isNotRelevant) {
        // Ensure products step is at the end
        const filtered = steps.filter(s => s.sectionId !== SECTION_IDS.PRODUCTS);
        filtered.push({
          sectionId: SECTION_IDS.PRODUCTS,
          name: 'Add Your First Product',
          group: 'A',
          isComplete: false,
        });
        return filtered;
      }
    }
    
    return steps;
  }, [profile, getIncompleteSections]);

  const updateCompanyName = useCallback((name: string) => {
    setProfile(prev => ({
      ...prev,
      companyName: name,
    }));
  }, []);

  return {
    profile,
    selectedLocale,
    setSelectedLocale,
    updateSection,
    toggleNotRelevant,
    addProduct,
    updateProduct,
    deleteProduct,
    reorderProducts,
    getIncompleteSections,
    getWizardSteps,
    updateCompanyName,
  };
}
