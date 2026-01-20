import { useState, ReactNode } from 'react';
import { TopBar } from './TopBar';
import { MainNav } from './MainNav';
import { PageContainer } from '@/components/layout/LayoutGrid';
import { Footer } from '@/components/Footer';

interface PageLayoutProps {
  children: ReactNode;
  /** If true, wraps children in PageContainer */
  withContainer?: boolean;
}

export function PageLayout({ children, withContainer = false }: PageLayoutProps) {
  const [eventEdition, setEventEdition] = useState('2025');

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar
        eventName="The London Book Fair"
        eventDates="8-10 April 2025"
        eventLocation="Olympia London"
        eventEdition={eventEdition}
        onEventEditionChange={setEventEdition}
      />
      <MainNav />
      <div className="flex-1">
        {withContainer ? (
          <PageContainer className="py-6">{children}</PageContainer>
        ) : (
          children
        )}
      </div>
      <Footer />
    </div>
  );
}
