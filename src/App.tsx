import React from 'react';
import { AppProvider, useTokyoTrek } from './context/AppContext';
import { Header } from './components/Navigation/Header';
import { BottomNav } from './components/Navigation/BottomNav';
import { MapExplorerView } from './components/Map/MapExplorerView';
import { DailyItineraryView } from './components/Itinerary/DailyItineraryView';
import { SoloDiningView } from './components/Dining/SoloDiningView';
import { VisaLogisticsView } from './components/Logistics/VisaLogisticsView';

const MainContent: React.FC = () => {
  const { activeTab } = useTokyoTrek();

  return (
    <main className="flex-1 flex flex-col relative w-full pt-20 pb-28 bg-[#0D0F12] px-margin-mobile max-w-2xl mx-auto">
      {activeTab === 'map' && <MapExplorerView />}
      {activeTab === 'itinerary' && <DailyItineraryView />}
      {activeTab === 'dining' && <SoloDiningView />}
      {activeTab === 'logistics' && <VisaLogisticsView />}
    </main>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="bg-[#0D0F12] text-[#e2e2e6] font-body-md antialiased min-h-screen flex flex-col selection:bg-primary-container selection:text-white">
        <Header />
        <MainContent />
        <BottomNav />
      </div>
    </AppProvider>
  );
};

export default App;
