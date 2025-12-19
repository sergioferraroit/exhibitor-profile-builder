import { useState, useCallback } from 'react';

type AIGenerationType = 
  | 'company-description'
  | 'why-visit'
  | 'product-name'
  | 'product-description'
  | 'product-categories'
  | 'filter-tags'
  | 'matchmaking-tags'
  | 'social-links'
  | 'logo-suggestions'
  | 'cover-suggestions';

interface AISimulationResult {
  type: AIGenerationType;
  content: string | string[];
  isLoading: boolean;
}

const MOCK_RESPONSES: Record<AIGenerationType, string | string[]> = {
  'company-description': 'Acme Corporation is a pioneering leader in sustainable technology solutions, dedicated to transforming industries through innovative products and services. With over 20 years of experience, we specialize in delivering cutting-edge solutions that drive efficiency, reduce environmental impact, and create lasting value for our partners worldwide.',
  'why-visit': 'Discover groundbreaking innovations and exclusive product launches. Meet our expert team and explore partnership opportunities that will transform your business.',
  'product-name': 'EcoSmart Pro X500',
  'product-description': 'The EcoSmart Pro X500 represents the next generation of sustainable technology. Featuring advanced energy-saving capabilities, intuitive controls, and seamless integration with existing systems, this product delivers exceptional performance while minimizing environmental impact.',
  'product-categories': ['Sustainable Technology', 'Energy Solutions', 'Smart Systems', 'Industrial Equipment'],
  'filter-tags': ['Sustainability', 'Innovation', 'B2B Solutions', 'Technology', 'Manufacturing'],
  'matchmaking-tags': ['Looking for Distributors', 'Partnership Opportunities', 'Technology Integration', 'Sustainability Focus'],
  'social-links': ['https://linkedin.com/company/acme', 'https://twitter.com/acmecorp', 'https://facebook.com/acmecorporation'],
  'logo-suggestions': ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
  'cover-suggestions': ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
};

export function useAISimulation() {
  const [results, setResults] = useState<Map<AIGenerationType, AISimulationResult>>(new Map());
  const [typewriterText, setTypewriterText] = useState<string>('');
  const [isTyping, setIsTyping] = useState(false);

  const generateContent = useCallback(async (
    type: AIGenerationType,
    useTypewriter: boolean = false
  ): Promise<string | string[]> => {
    // Set loading state
    setResults(prev => new Map(prev).set(type, {
      type,
      content: '',
      isLoading: true,
    }));

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockContent = MOCK_RESPONSES[type];

    if (useTypewriter && typeof mockContent === 'string') {
      setIsTyping(true);
      setTypewriterText('');
      
      // Typewriter effect
      for (let i = 0; i <= mockContent.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 20));
        setTypewriterText(mockContent.slice(0, i));
      }
      
      setIsTyping(false);
    }

    // Set final result
    setResults(prev => new Map(prev).set(type, {
      type,
      content: mockContent,
      isLoading: false,
    }));

    return mockContent;
  }, []);

  const regenerate = useCallback(async (type: AIGenerationType, useTypewriter: boolean = false) => {
    return generateContent(type, useTypewriter);
  }, [generateContent]);

  const isLoading = useCallback((type: AIGenerationType) => {
    return results.get(type)?.isLoading ?? false;
  }, [results]);

  const getResult = useCallback((type: AIGenerationType) => {
    return results.get(type)?.content;
  }, [results]);

  const clearResult = useCallback((type: AIGenerationType) => {
    setResults(prev => {
      const next = new Map(prev);
      next.delete(type);
      return next;
    });
  }, []);

  return {
    generateContent,
    regenerate,
    isLoading,
    getResult,
    clearResult,
    typewriterText,
    isTyping,
  };
}
