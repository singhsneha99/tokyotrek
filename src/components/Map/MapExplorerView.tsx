import React, { useState } from 'react';
import { useTokyoTrek } from '../../context/AppContext';
import { CyberpunkMap } from './CyberpunkMap';
import { SpotDetailDrawer } from './SpotDetailDrawer';
import { City } from '../../types';

interface NeighborhoodOption {
  id: string;
  label: string;
  city: City;
}

const NEIGHBORHOODS: NeighborhoodOption[] = [
  { id: 'all', label: 'All Districts', city: 'Tokyo' },
  { id: 'Shibuya', label: 'Shibuya 渋谷', city: 'Tokyo' },
  { id: 'Shimokitazawa', label: 'Shimokitazawa 下北沢', city: 'Tokyo' },
  { id: 'Harajuku', label: 'Harajuku 原宿', city: 'Tokyo' },
  { id: 'Shinjuku', label: 'Shinjuku 新宿', city: 'Tokyo' },
  { id: 'Akihabara', label: 'Akihabara 秋葉原', city: 'Tokyo' },
  { id: 'Ginza', label: 'Ginza 銀座', city: 'Tokyo' },
  { id: 'Ueno', label: 'Ueno/Asakusa 上野', city: 'Tokyo' },
  { id: 'all', label: 'All Districts', city: 'Kyoto' },
  { id: 'Higashiyama', label: 'Higashiyama 東山', city: 'Kyoto' },
  { id: 'Arashiyama', label: 'Arashiyama 嵐山', city: 'Kyoto' },
  { id: 'all', label: 'All Districts', city: 'Osaka' },
  { id: 'Dotonbori', label: 'Dotonbori 道頓堀', city: 'Osaka' },
  { id: 'Shinsekai', label: 'Shinsekai 新世界', city: 'Osaka' },
  { id: 'Umeda', label: 'Umeda 梅田', city: 'Osaka' },
];

export const MapExplorerView: React.FC = () => {
  const {
    activeCity,
    setActiveCity,
    activeNeighborhood,
    setActiveNeighborhood,
    searchQuery,
    setSearchQuery,
    spots,
    setActiveSpot
  } = useTokyoTrek();

  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showSakuraModal, setShowSakuraModal] = useState(false);

  // Available neighborhoods for currently selected city
  const cityNeighborhoods = NEIGHBORHOODS.filter(n => n.city === activeCity);

  // Filter spots if search query is present
  const searchedSpots = searchQuery.trim()
    ? spots.filter(
        s =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.address.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="flex flex-col w-full relative">
      {/* Top Segmented Controls & Live Sakura Radar */}
      <div className="flex flex-col gap-space-sm pb-space-sm">
        {/* City Segment Switcher & Search Bar */}
        <div className="flex items-center justify-between gap-space-sm">
          <div className="inline-flex p-1 rounded-full bg-surface-container-low shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)] border border-white/5">
            {(['Tokyo', 'Kyoto', 'Osaka'] as City[]).map(city => {
              const isActive = activeCity === city;
              return (
                <button
                  key={city}
                  onClick={() => setActiveCity(city)}
                  className={`px-3.5 py-1 rounded-full font-label-data-sm text-[12px] transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-container text-white font-bold shadow-[0_0_12px_rgba(255,80,112,0.45)]'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                  type="button"
                >
                  {city}
                </button>
              );
            })}
          </div>

          {/* Search Trigger Button */}
          <button
            onClick={() => setShowSearchInput(!showSearchInput)}
            aria-label="Search places and tags"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              showSearchInput
                ? 'bg-primary text-black'
                : 'bg-surface-container text-on-surface shadow-sm active:scale-95'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">
              {showSearchInput ? 'close' : 'search'}
            </span>
          </button>
        </div>

        {/* Expandable Search Input Bar */}
        {showSearchInput && (
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search spots, ramen, thrifting, stations..."
              className="w-full py-2 pl-9 pr-8 rounded-full bg-surface-container text-on-surface placeholder:text-on-surface-variant/60 font-body-sm text-[13px] border border-surface-container-high focus:outline-none focus:border-primary"
              autoFocus
            />
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant absolute left-3 top-2.5">
              search
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2 text-on-surface-variant hover:text-white"
              >
                <span className="material-symbols-outlined text-[16px]">cancel</span>
              </button>
            )}

            {/* Quick Search Results Dropdown */}
            {searchQuery.trim() && searchedSpots.length > 0 && (
              <div className="absolute top-11 inset-x-0 z-50 rounded-xl bg-surface-container-low border border-surface-container-high shadow-2xl p-2 max-h-52 overflow-y-auto">
                {searchedSpots.map(spot => (
                  <div
                    key={spot.id}
                    onClick={() => {
                      setActiveCity(spot.city);
                      setActiveSpot(spot);
                      setShowSearchInput(false);
                      setSearchQuery('');
                    }}
                    className="p-2 rounded-lg hover:bg-surface-container cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex flex-col min-w-0">
                      <span className="font-label-data-sm text-[12px] text-white truncate font-medium">
                        {spot.title}
                      </span>
                      <span className="text-[10px] text-on-surface-variant">
                        {spot.city} • {spot.neighborhood}
                      </span>
                    </div>
                    <span className="text-primary font-mono text-[11px] shrink-0 font-bold">
                      {spot.priceEstimate}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Live Sakura Bloom Radar Alert Pill */}
        <div
          onClick={() => setShowSakuraModal(true)}
          className="flex items-center justify-between px-space-md py-1.5 rounded-full bg-surface-container-low shadow-sm border border-white/5 cursor-pointer hover:border-primary/40 transition-colors"
        >
          <div className="flex items-center gap-space-xs min-w-0">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="font-label-data-sm text-[11px] text-primary tracking-wide truncate">
              🌸 SAKURA RADAR: 85% Full Bloom (Meguro & Kamo River Peak)
            </span>
          </div>
          <span className="material-symbols-outlined text-primary text-[15px] shrink-0">
            arrow_forward_ios
          </span>
        </div>

        {/* Neighborhood Horizontal Quick-Filters */}
        <div className="flex items-center gap-space-xs overflow-x-auto no-scrollbar py-0.5 -mx-margin-mobile px-margin-mobile">
          {cityNeighborhoods.map(item => {
            const isSelected = activeNeighborhood === item.id;
            return (
              <button
                key={`${item.city}-${item.id}-${item.label}`}
                onClick={() => setActiveNeighborhood(item.id)}
                type="button"
                className={`shrink-0 px-3.5 py-1.5 rounded-full font-label-data-sm text-[11px] transition-all ${
                  isSelected
                    ? 'bg-secondary-container text-white shadow-[0_0_10px_rgba(255,80,112,0.35)] border border-primary/40 font-bold'
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface border border-transparent'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Cyberpunk Vector / Leaflet Map Stage */}
      <CyberpunkMap />

      {/* Interactive Pin Inspector Drawer */}
      <SpotDetailDrawer />

      {/* Sakura Bloom Radar Modal */}
      {showSakuraModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-surface-container-low border border-primary/30 rounded-2xl p-5 max-w-sm w-full shadow-2xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary font-bold">
                <span className="material-symbols-outlined">filter_vintage</span>
                <span className="font-headline-sm text-[16px]">Sakura Bloom Radar 2026</span>
              </div>
              <button
                onClick={() => setShowSakuraModal(false)}
                className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-on-surface"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
            <p className="font-body-sm text-[13px] text-on-surface-variant leading-relaxed">
              Real-time telemetry from the Japan Meteorological Corporation (JMC). Peak bloom (Mankai 満開) reaches 85%–90% across Tokyo and Kansai this week.
            </p>
            <div className="space-y-2 font-mono text-[11px]">
              <div className="flex justify-between p-2 rounded-lg bg-surface-container">
                <span className="text-white">Meguro River (Tokyo)</span>
                <span className="text-primary font-bold">88% (Peak Tunnel)</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-surface-container">
                <span className="text-white">Philosopher's Path (Kyoto)</span>
                <span className="text-primary font-bold">82% (Full Canopy)</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-surface-container">
                <span className="text-white">Kema Sakuranomiya (Osaka)</span>
                <span className="text-primary font-bold">85% (Riverfront)</span>
              </div>
            </div>
            <button
              onClick={() => setShowSakuraModal(false)}
              className="w-full py-2 rounded-full bg-primary-container text-white font-label-data-sm text-[12px] uppercase font-bold mt-1"
            >
              Understood • Return to Map
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
