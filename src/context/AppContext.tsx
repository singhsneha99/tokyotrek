import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import { City, Spot } from '../types';
import spotsDataRaw from '../data/spots.json';

const allSpots: Spot[] = spotsDataRaw as Spot[];

interface AppContextType {
  spots: Spot[];
  visitedSpotIds: string[];
  toggleVisited: (spotId: string) => void;
  isVisited: (spotId: string) => boolean;
  activeCity: City;
  setActiveCity: (city: City) => void;
  activeNeighborhood: string;
  setActiveNeighborhood: (n: string) => void;
  activeSpot: Spot | null;
  setActiveSpot: (spot: Spot | null) => void;
  isFastPaced: boolean;
  setIsFastPaced: (fast: boolean) => void;
  activeTab: 'map' | 'itinerary' | 'dining' | 'logistics';
  setActiveTab: (tab: 'map' | 'itinerary' | 'dining' | 'logistics') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  completedDocIds: string[];
  toggleDocCompleted: (docId: string) => void;
  speakJapanese: (text: string) => void;
  stats: {
    totalSpots: number;
    visitedCount: number;
    remainingCount: number;
    percentComplete: number;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  VISITED: 'tokyotrek_visited_spots_v1',
  FAST_PACED: 'tokyotrek_pace_mode_v1',
  COMPLETED_DOCS: 'tokyotrek_visa_docs_v1',
  ACTIVE_CITY: 'tokyotrek_active_city_v1',
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [spots] = useState<Spot[]>(allSpots);
  
  // Visited state from localStorage
  const [visitedSpotIds, setVisitedSpotIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.VISITED);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error reading visited spots from localStorage', e);
    }
    // Default initial mock demo: Hachiko is visited as shown in Stitch design screen
    return ['hachiko-shibuya'];
  });

  // Fast-paced toggle
  const [isFastPaced, setIsFastPacedState] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAST_PACED);
      if (saved !== null) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return true;
  });

  // Completed Visa documents
  const [completedDocIds, setCompletedDocIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPLETED_DOCS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return ['doc-passport', 'doc-flights'];
  });

  const [activeCity, setActiveCityState] = useState<City>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_CITY) as City;
      if (saved && ['Tokyo', 'Kyoto', 'Osaka'].includes(saved)) return saved;
    } catch (e) {
      console.error(e);
    }
    return 'Tokyo';
  });

  const [activeNeighborhood, setActiveNeighborhood] = useState<string>('all');
  const [activeSpot, setActiveSpot] = useState<Spot | null>(() => {
    // Default active spot matching Stitch Screen 1: Chicago Thrift or Ichiran
    return allSpots.find(s => s.id === 'chicago-thrift-harajuku') || allSpots[0];
  });
  const [activeTab, setActiveTab] = useState<'map' | 'itinerary' | 'dining' | 'logistics'>('map');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.VISITED, JSON.stringify(visitedSpotIds));
    } catch (e) {
      console.error(e);
    }
  }, [visitedSpotIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FAST_PACED, JSON.stringify(isFastPaced));
    } catch (e) {
      console.error(e);
    }
  }, [isFastPaced]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMPLETED_DOCS, JSON.stringify(completedDocIds));
    } catch (e) {
      console.error(e);
    }
  }, [completedDocIds]);

  const setActiveCity = (city: City) => {
    setActiveCityState(city);
    setActiveNeighborhood('all');
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_CITY, city);
    } catch (e) {
      console.error(e);
    }
  };

  const setIsFastPaced = (fast: boolean) => {
    setIsFastPacedState(fast);
  };

  const isVisited = (spotId: string) => visitedSpotIds.includes(spotId);

  const toggleVisited = (spotId: string) => {
    setVisitedSpotIds(prev => {
      const isCurrentlyVisited = prev.includes(spotId);
      if (!isCurrentlyVisited) {
        // Trigger celebratory confetti effect
        try {
          confetti({
            particleCount: 45,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#FF2A5F', '#00E676', '#FFB7C5', '#FFB300']
          });
        } catch (e) {
          // ignore
        }
        return [...prev, spotId];
      } else {
        return prev.filter(id => id !== spotId);
      }
    });
  };

  const toggleDocCompleted = (docId: string) => {
    setCompletedDocIds(prev =>
      prev.includes(docId) ? prev.filter(id => id !== docId) : [...prev, docId]
    );
  };

  const speakJapanese = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    } else {
      console.log('Web Speech API not supported in browser');
    }
  };

  const citySpots = spots.filter(s => s.city === activeCity);
  const visitedInCity = citySpots.filter(s => visitedSpotIds.includes(s.id)).length;
  const totalInCity = citySpots.length;

  const stats = {
    totalSpots: totalInCity,
    visitedCount: visitedInCity,
    remainingCount: Math.max(0, totalInCity - visitedInCity),
    percentComplete: totalInCity > 0 ? Math.round((visitedInCity / totalInCity) * 100) : 0
  };

  return (
    <AppContext.Provider
      value={{
        spots,
        visitedSpotIds,
        toggleVisited,
        isVisited,
        activeCity,
        setActiveCity,
        activeNeighborhood,
        setActiveNeighborhood,
        activeSpot,
        setActiveSpot,
        isFastPaced,
        setIsFastPaced,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        completedDocIds,
        toggleDocCompleted,
        speakJapanese,
        stats
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useTokyoTrek = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useTokyoTrek must be used within an AppProvider');
  }
  return context;
};
