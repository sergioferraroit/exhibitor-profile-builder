import { useState, ReactNode } from 'react';
import { TopBar } from './TopBar';
import { MainNav } from './MainNav';
import { PageContainer } from '@/components/layout/LayoutGrid';

interface PageLayoutProps {
  children: ReactNode;
  /** If true, wraps children in PageContainer */
  withContainer?: boolean;
}

export function PageLayout({ children, withContainer = false }: PageLayoutProps) {
  const [language, setLanguage] = useState('en-GB');
  const [eventEdition, setEventEdition] = useState('2025');

  return (
    <div className="min-h-screen bg-background">
      <TopBar
        eventName="The London Book Fair"
        eventDates="8-10 April 2025"
        eventLocation="Olympia London"
        language={language}
        onLanguageChange={setLanguage}
        eventEdition={eventEdition}
        onEventEditionChange={setEventEdition}
      />
      <MainNav />
      {withContainer ? (
        <PageContainer className="py-6">{children}</PageContainer>
      ) : (
        children
      )}
    </div>
  );
}
