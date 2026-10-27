import React, { useState } from 'react';
import { useTokyoTrek } from '../../context/AppContext';
import { ITINERARY_DAYS } from '../../data/itineraryData';
import { ItineraryItem } from '../../types';

export const DailyItineraryView: React.FC = () => {
  const {
    isVisited,
    toggleVisited,
    isFastPaced,
    setIsFastPaced,
    setActiveTab,
    setActiveSpot,
    setActiveCity,
    spots,
    speakJapanese
  } = useTokyoTrek();

  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const currentDay = ITINERARY_DAYS[activeDayIndex] || ITINERARY_DAYS[0];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Calculate day stats
  const dayItems = currentDay.items;
  const dayCompletedCount = dayItems.filter(item =>
    item.spotId ? isVisited(item.spotId) : false
  ).length;
  const dayRemainingCount = dayItems.length - dayCompletedCount;

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Status & Quick Switch Header Container */}
      <section className="flex flex-col gap-space-sm mb-space-lg">
        {/* Pace & Telemetry Badge Banner */}
        <div className="flex items-center justify-between gap-space-xs bg-surface-container-low px-space-md py-space-xs rounded-full border border-white/5">
          <div className="flex items-center gap-space-xs min-w-0">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isFastPaced ? 'bg-primary-container' : 'bg-tertiary'
              }`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${
                isFastPaced ? 'bg-primary-container' : 'bg-tertiary'
              }`}></span>
            </span>
            <span className="font-label-data-sm text-[11px] text-primary uppercase tracking-wider truncate">
              {isFastPaced ? '⚡ High Pace Walk Mode' : '☕ Slow Roam Discovery Mode'}
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0 bg-surface-container px-space-xs py-0.5 rounded-full border border-white/5">
            <span className="material-symbols-outlined text-primary text-[14px]">
              directions_walk
            </span>
            <span className="font-label-data-sm text-[11px] text-on-surface font-mono">
              {currentDay.targetSteps.toLocaleString()} stp
            </span>
          </div>
        </div>

        {/* Day Filter Bar (Horizontal Segmented Pills) */}
        <div className="flex items-center gap-space-xs overflow-x-auto no-scrollbar py-1 -mx-margin-mobile px-margin-mobile">
          {ITINERARY_DAYS.map((day, idx) => {
            const isSelected = activeDayIndex === idx;
            return (
              <button
                key={day.dayNumber}
                onClick={() => {
                  setActiveDayIndex(idx);
                  setActiveCity(day.city);
                }}
                className={`shrink-0 px-space-md py-space-xs rounded-full font-label-data-md text-[12px] transition-all active:scale-95 border ${
                  isSelected
                    ? 'bg-primary-container text-white font-bold shadow-[0_0_12px_rgba(255,80,112,0.45)] border-primary'
                    : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface border-transparent'
                }`}
              >
                {day.title}
              </button>
            );
          })}
        </div>

        {/* Pace Quick Toggle & Yamanote Telemetry */}
        <div className="flex flex-col gap-1 bg-surface-container-low p-space-sm rounded-2xl border border-white/5 shadow-md">
          <div className="grid grid-cols-2 p-0.5 bg-surface-container-lowest rounded-full text-center border border-white/5">
            <button
              onClick={() => setIsFastPaced(true)}
              className={`py-1.5 px-space-sm rounded-full font-label-data-sm text-[11px] transition-all flex items-center justify-center gap-1.5 ${
                isFastPaced
                  ? 'bg-secondary-container text-secondary font-bold shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">bolt</span>
              <span>Fast-Paced (~20m)</span>
            </button>
            <button
              onClick={() => setIsFastPaced(false)}
              className={`py-1.5 px-space-sm rounded-full font-label-data-sm text-[11px] transition-all flex items-center justify-center gap-1.5 ${
                !isFastPaced
                  ? 'bg-secondary-container text-secondary font-bold shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">local_cafe</span>
              <span>Slow Roam (~60m)</span>
            </button>
          </div>

          <div className="flex items-center justify-between px-space-xs pt-1">
            <span className="font-body-sm text-[12px] text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px] text-tertiary">train</span>
              {currentDay.mainSubwayLine}
            </span>
            <span className="font-label-data-sm text-[11px] text-tertiary font-mono font-bold">
              {isFastPaced ? '+18m Ahead' : 'Relaxed Pace'}
            </span>
          </div>
        </div>

        {/* Day Header Summary */}
        <div className="px-1">
          <h3 className="font-headline-sm text-[15px] text-white font-bold">
            {currentDay.neighborhoods}
          </h3>
          <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5 leading-snug">
            {currentDay.summary}
          </p>
        </div>
      </section>

      {/* Interactive Timeline Content */}
      <div className="relative flex flex-col">
        {/* Glowing Luminescent Timeline Runner Line */}
        <div className="absolute left-[19px] top-4 bottom-6 w-0.5 bg-gradient-to-b from-tertiary via-primary-container to-surface-container-highest pointer-events-none"></div>

        {/* Render Spot Cards */}
        {dayItems.map((item: ItineraryItem, index: number) => {
          const visited = item.spotId ? isVisited(item.spotId) : false;
          const isCurrentActive = index === 1 && !visited;

          // Budget badge color
          let budgetDotColor = '#00E676';
          let budgetLabelColor = 'text-tertiary';
          if (item.budgetTier === 'mid') {
            budgetDotColor = '#FFB300';
            budgetLabelColor = 'text-amber-400';
          } else if (item.budgetTier === 'splurge') {
            budgetDotColor = '#FF3D00';
            budgetLabelColor = 'text-primary-container';
          }

          // Link to spot in map
          const relatedSpot = spots.find(s => s.id === item.spotId);

          return (
            <div
              key={item.id}
              className={`relative flex gap-space-md mb-space-lg group transition-all duration-300 ${
                visited ? 'opacity-65 hover:opacity-90' : 'opacity-100'
              }`}
            >
              {/* Node Anchor */}
              <div className="relative z-10 flex flex-col items-center shrink-0">
                {visited ? (
                  <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-tertiary shadow-sm border border-tertiary/40">
                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  </div>
                ) : isCurrentActive ? (
                  <div className="relative w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-[0_0_16px_rgba(255,80,112,0.6)] border border-primary-container">
                    <span className="animate-ping absolute inset-0 rounded-full bg-primary-container opacity-40"></span>
                    <span className="w-4 h-4 rounded-full bg-primary-container flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                    </span>
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant shadow-sm border border-white/5">
                    <span className="material-symbols-outlined text-[18px]">
                      {item.budgetTier === 'splurge' ? 'stars' : 'adjust'}
                    </span>
                  </div>
                )}

                <span
                  className={`font-label-data-sm text-[11px] mt-1.5 font-mono ${
                    isCurrentActive ? 'text-primary font-bold' : 'text-on-surface-variant'
                  }`}
                >
                  {item.time}
                </span>

                {isCurrentActive && (
                  <span className="px-1.5 py-0.2 bg-primary-container/20 text-primary font-label-data-sm text-[9px] mt-0.5 rounded-full font-bold">
                    NOW
                  </span>
                )}
              </div>

              {/* Card Container */}
              <div
                className={`flex-1 rounded-2xl p-space-md shadow-md border transition-all duration-300 relative overflow-hidden ${
                  visited
                    ? 'bg-[#161920]/90 border-white/5'
                    : isCurrentActive
                    ? 'bg-surface-container border-primary/40 shadow-[0_8px_24px_rgba(0,0,0,0.5)]'
                    : 'bg-surface-container-low border-white/5'
                }`}
              >
                {/* Accent Top Bar on Active Current Spot */}
                {isCurrentActive && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary-container via-secondary to-primary-container"></div>
                )}

                {/* Card Header */}
                <div className="flex items-start justify-between gap-space-xs mb-1.5">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                      {item.badgeLabel && (
                        <span className="bg-secondary-container text-secondary px-2 py-0.5 rounded-full font-label-data-sm text-[10px] font-medium">
                          {item.badgeLabel}
                        </span>
                      )}
                      <span
                        className={`bg-surface-container-high ${budgetLabelColor} px-2 py-0.5 rounded-full font-label-data-sm text-[10px] font-mono`}
                      >
                        <span
                          className="inline-block w-1.5 h-1.5 rounded-full mr-1"
                          style={{ backgroundColor: budgetDotColor }}
                        ></span>
                        {item.priceEstimate}
                      </span>
                    </div>

                    <h2
                      className={`font-headline-sm text-[16px] leading-snug font-bold ${
                        visited
                          ? 'text-on-surface-variant line-through'
                          : isCurrentActive
                          ? 'text-white'
                          : 'text-on-surface'
                      }`}
                    >
                      {item.title}
                    </h2>
                  </div>

                  {/* Toggle Checkbox */}
                  <button
                    onClick={() => {
                      if (item.spotId) toggleVisited(item.spotId);
                    }}
                    aria-label="Toggle spot visited status"
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform active:scale-90 shadow-sm border ${
                      visited
                        ? 'bg-tertiary-container/30 text-tertiary border-tertiary/40'
                        : isCurrentActive
                        ? 'bg-surface-container-high text-primary hover:text-white border-primary/30'
                        : 'bg-surface-container text-on-surface-variant hover:text-white border-white/5'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {visited ? 'done_all' : 'radio_button_unchecked'}
                    </span>
                  </button>
                </div>

                {/* Visual Media Snapshot if available */}
                {item.image && (
                  <div className="relative w-full h-32 rounded-xl overflow-hidden my-space-xs bg-surface-container-lowest">
                    <img
                      src={item.image}
                      alt={item.title}
                      className={`w-full h-full object-cover transition-all ${
                        visited ? 'grayscale opacity-50' : ''
                      }`}
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-surface-dim/80 backdrop-blur-md font-label-data-sm text-[10px] text-primary">
                      {isFastPaced
                        ? `${item.fastPacedDurationMinutes}m fast pace`
                        : `${item.slowRoamDurationMinutes}m relaxed roam`}
                    </div>
                  </div>
                )}

                {/* Japanese Address Box with Tap to Copy */}
                <div className="flex items-center justify-between bg-surface-container-lowest px-space-sm py-1.5 rounded-lg my-space-xs gap-space-xs border border-white/5">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="material-symbols-outlined text-primary text-[15px] shrink-0">
                      pin_drop
                    </span>
                    <p className="font-label-data-sm text-[11px] text-on-surface truncate font-mono">
                      {item.address}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleCopy(item.id, item.address)}
                      className="text-secondary hover:text-white font-label-data-sm text-[10px] uppercase tracking-wider font-mono"
                    >
                      {copiedId === item.id ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                      onClick={() => speakJapanese(item.titleJa || item.address)}
                      className="text-primary hover:text-white p-0.5"
                      title="Audio Pronunciation"
                    >
                      <span className="material-symbols-outlined text-[14px]">volume_up</span>
                    </button>
                  </div>
                </div>

                {/* Description */}
                <p className="font-body-sm text-[12px] text-on-surface-variant my-1 leading-relaxed">
                  {item.description}
                </p>

                {/* Pro Tip Box */}
                {item.proTip && (
                  <div className="bg-surface-container-high/60 rounded-lg p-2 mt-2 flex items-start gap-2 border border-white/5">
                    <span className="material-symbols-outlined text-secondary text-[16px] shrink-0 mt-0.5">
                      tips_and_updates
                    </span>
                    <p className="font-body-sm text-[11px] text-on-surface leading-tight">
                      {item.proTip}
                    </p>
                  </div>
                )}

                {/* Transit Connection Footer */}
                <div className="flex items-center justify-between pt-2 mt-2 bg-surface-container-high/40 -mx-space-md -mb-space-md px-space-md py-space-xs rounded-b-2xl border-t border-white/5">
                  <span className="font-label-data-sm text-[11px] text-tertiary flex items-center gap-1 truncate">
                    <span className="material-symbols-outlined text-[15px]">directions_subway</span>
                    {item.subwaySnippet}
                  </span>

                  {relatedSpot && (
                    <button
                      onClick={() => {
                        setActiveSpot(relatedSpot);
                        setActiveTab('map');
                      }}
                      className="font-label-data-sm text-[10px] text-secondary hover:text-white shrink-0 uppercase tracking-wider font-mono flex items-center gap-0.5"
                    >
                      <span>Map Pin</span>
                      <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Interactive Floating Stat Banner */}
      <div className="sticky bottom-20 z-40 mt-space-md">
        <div className="bg-surface-container-low/95 backdrop-blur-xl rounded-full px-space-md py-space-sm shadow-[0_12px_32px_rgba(0,0,0,0.7)] flex items-center justify-between gap-space-sm border border-white/10">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-full bg-primary-container/20 text-primary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">route</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-data-sm text-[12px] text-on-surface truncate font-medium">
                {dayRemainingCount === 0
                  ? 'All Spots Completed! 🌸'
                  : `${dayRemainingCount} of ${dayItems.length} Spots Left`}
              </span>
              <span className="font-body-sm text-[11px] text-tertiary truncate font-mono">
                {currentDay.totalDistanceKm} km walk • {isFastPaced ? '+18m Ahead' : 'On Schedule'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('map')}
            className="shrink-0 px-space-md py-1.5 bg-primary-container hover:brightness-110 text-white font-label-data-sm text-[11px] uppercase tracking-wider rounded-full shadow-[0_0_12px_rgba(255,80,112,0.4)] transition-transform active:scale-95 font-bold"
          >
            Map Flow
          </button>
        </div>
      </div>
    </div>
  );
};
