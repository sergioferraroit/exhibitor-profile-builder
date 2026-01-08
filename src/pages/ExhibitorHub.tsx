import { useState } from 'react';
import { TopBar } from '@/components/exhibitor/TopBar';
import { MainNav } from '@/components/exhibitor/MainNav';
import { TaskProgressCard } from '@/components/exhibitor/home/TaskProgressCard';
import { RecommendedActionsCard } from '@/components/exhibitor/home/RecommendedActionsCard';
import { PerformanceSnapshotCard } from '@/components/exhibitor/home/PerformanceSnapshotCard';
import { HomeFooter } from '@/components/exhibitor/home/HomeFooter';

const ExhibitorHub = () => {
  const [topBarLanguage, setTopBarLanguage] = useState('en-GB');
  const [eventEdition, setEventEdition] = useState('2025');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <TopBar
        eventName="The London Book Fair"
        eventDates="11 - 13 March 2025"
        eventLocation="Olympia London"
        language={topBarLanguage}
        onLanguageChange={setTopBarLanguage}
        eventEdition={eventEdition}
        onEventEditionChange={setEventEdition}
      />
      
      <MainNav />
      
      <main className="container mx-auto px-4 py-6 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Task Progress */}
          <div>
            <TaskProgressCard />
          </div>
          
          {/* Middle Column - Recommended Actions */}
          <div>
            <RecommendedActionsCard />
          </div>
          
          {/* Right Column - Performance Snapshot */}
          <div>
            <PerformanceSnapshotCard />
          </div>
        </div>
      </main>

      <HomeFooter />
    </div>
  );
};

export default ExhibitorHub;
