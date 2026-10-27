import React, { useState } from 'react';
import { useTokyoTrek } from '../../context/AppContext';

export const Header: React.FC = () => {
  const { activeTab, stats } = useTokyoTrek();
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);

  let title = 'Map Explorer';
  if (activeTab === 'itinerary') title = 'Daily Itinerary';
  if (activeTab === 'dining') title = 'Solo Dining & Konbini';
  if (activeTab === 'logistics') title = 'Visa & Logistics';

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-[#111317]/85 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.3)] border-b border-white/5">
        <div className="h-16 px-margin flex items-center justify-between gap-space-sm max-w-2xl mx-auto">
          {/* Logo & Screen Title */}
          <div className="flex items-center gap-space-sm min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-container to-secondary flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(255,80,112,0.4)]">
              <span className="material-symbols-outlined text-white text-[20px]">explore</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-data-sm text-[10px] text-primary uppercase tracking-widest truncate font-mono">
                TokyoTrek &amp; Beyond
              </span>
              <h1 className="font-headline-sm text-[17px] text-on-surface tracking-tight truncate font-bold">
                {title}
              </h1>
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-space-sm shrink-0">
            {/* Travelled Tracker Counter Badge */}
            <button
              onClick={() => setShowStatsModal(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high border border-white/5 text-[11px] font-mono transition-transform active:scale-95"
              title="View Journey Progress"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary shadow-[0_0_6px_#00e475]"></span>
              <span className="text-white font-bold">{stats.visitedCount}</span>
              <span className="text-on-surface-variant">/{stats.totalSpots}</span>
            </button>

            {/* Offline Mode Status Indicator */}
            <button
              onClick={() => setIsOfflineMode(!isOfflineMode)}
              aria-label="Offline Mode Status"
              className={`w-9 h-9 flex items-center justify-center rounded-full transition-transform active:scale-95 border ${
                isOfflineMode
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                  : 'bg-surface-container text-tertiary border-white/5'
              }`}
              title={isOfflineMode ? 'Offline Mode Active' : 'Online / Live Telemetry Active'}
            >
              <span className="material-symbols-outlined text-[19px]">sensors</span>
            </button>

            {/* Profile Avatar */}
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Stats Modal */}
      {showStatsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-surface-container-low border border-tertiary/30 rounded-2xl p-5 max-w-sm w-full shadow-2xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-tertiary font-bold">
                <span className="material-symbols-outlined">analytics</span>
                <span className="font-headline-sm text-[16px]">Journey Completion</span>
              </div>
              <button
                onClick={() => setShowStatsModal(false)}
                className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-on-surface"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            <div className="p-3 rounded-xl bg-surface-container flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] text-on-surface-variant font-mono uppercase">
                  Travelled Spots
                </span>
                <span className="text-[22px] font-mono font-bold text-white">
                  {stats.visitedCount} <span className="text-sm text-on-surface-variant">/ {stats.totalSpots}</span>
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-tertiary font-mono uppercase">Progress</span>
                <div className="text-[22px] font-mono font-bold text-tertiary">
                  {stats.percentComplete}%
                </div>
              </div>
            </div>

            <div className="w-full h-2 bg-surface-container-lowest rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-container to-tertiary transition-all duration-300"
                style={{ width: `${stats.percentComplete}%` }}
              />
            </div>

            <p className="font-body-sm text-[12px] text-on-surface-variant leading-relaxed">
              Every marked spot persists automatically across app launches in your local device storage.
            </p>

            <button
              onClick={() => setShowStatsModal(false)}
              className="w-full py-2 rounded-full bg-surface-container-high text-white font-label-data-sm text-[12px] uppercase font-bold mt-1"
            >
              Continue Exploring
            </button>
          </div>
        </div>
      )}
    </>
  );
};
