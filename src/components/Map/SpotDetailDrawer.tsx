import React, { useState } from 'react';
import { useTokyoTrek } from '../../context/AppContext';
import { Spot } from '../../types';

export const SpotDetailDrawer: React.FC = () => {
  const {
    activeSpot,
    isVisited,
    toggleVisited,
    speakJapanese,
    setActiveTab,
    spots,
    visitedSpotIds
  } = useTokyoTrek();

  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  if (!activeSpot) return null;

  const visited = isVisited(activeSpot.id);

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Find a visited spot for the demonstration card
  const lastVisitedSpot = spots.find(s => visitedSpotIds.includes(s.id) && s.id !== activeSpot.id);

  // Budget ring colors
  let budgetColor = '#00E676';
  let budgetLabel = 'Cheap (Free / under ¥1k)';
  if (activeSpot.budgetTier === 'mid') {
    budgetColor = '#FFB300';
    budgetLabel = `Mid (${activeSpot.priceEstimate})`;
  } else if (activeSpot.budgetTier === 'splurge') {
    budgetColor = '#FF3D00';
    budgetLabel = `Splurge (${activeSpot.priceEstimate})`;
  }

  // Category Icon & Label
  let categoryLabel = '🍜 Solo Dining';
  if (activeSpot.category === 'shopping') categoryLabel = '🛍️ Thrifting & Fashion';
  if (activeSpot.category === 'photo') categoryLabel = '📸 Photo Op & Vista';

  // Navigation URLs
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    activeSpot.title + ' ' + activeSpot.address
  )}`;

  return (
    <div className="mt-space-sm flex flex-col gap-space-sm">
      {/* Active Spot Detailed Card */}
      <div className={`rounded-2xl p-space-md shadow-xl flex flex-col gap-space-sm transition-all duration-300 border ${
        visited 
          ? 'bg-[#161920]/95 border-[#282a2d]' 
          : 'bg-surface-container-low border-surface-container-high'
      }`}>
        {/* Sheet Drag Indicator */}
        <div className="w-10 h-1 bg-surface-container-highest rounded-full self-center mb-0.5"></div>

        {/* Header: Title and Category Badge */}
        <div className="flex items-start justify-between gap-space-sm">
          <div className="flex flex-col min-w-0">
            <div className="inline-flex items-center gap-1.5 text-primary font-label-data-sm text-[11px] uppercase tracking-wider mb-0.5">
              <span>{categoryLabel}</span>
              <span className="text-[#5c3f41]">•</span>
              <span className="text-secondary font-medium">{activeSpot.neighborhood}</span>
            </div>
            <h2 className={`font-headline-sm text-headline-sm tracking-tight truncate ${
              visited ? 'text-[#8A8F99] line-through' : 'text-on-surface'
            }`}>
              {activeSpot.title}
            </h2>
            <span className="font-body-sm text-[13px] text-on-surface-variant">
              {activeSpot.nearestStation}
            </span>
          </div>

          <button
            onClick={() => setBookmarked(!bookmarked)}
            aria-label="Bookmark Spot"
            className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary shrink-0 active:scale-95 transition-all"
            type="button"
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: bookmarked ? "'FILL' 1" : "'FILL' 0" }}
            >
              bookmark
            </span>
          </button>
        </div>

        {/* Spot Image Preview if available */}
        {activeSpot.image && (
          <div className="relative w-full h-36 rounded-xl overflow-hidden bg-surface-container-lowest my-0.5">
            <img
              src={activeSpot.image}
              alt={activeSpot.title}
              className={`w-full h-full object-cover transition-all duration-300 ${visited ? 'grayscale opacity-60' : ''}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111317]/90 via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-xs">
              <span className="font-label-data-sm text-[11px] bg-surface-container-lowest/80 px-2 py-0.5 rounded backdrop-blur-md">
                {activeSpot.priceEstimate}
              </span>
              <span className="font-label-data-sm text-[10px] bg-primary-container px-2 py-0.5 rounded-full font-bold">
                {activeSpot.subwayLine.split('(')[0].trim()}
              </span>
            </div>
          </div>
        )}

        {/* Quick Japanese Taxi / Local Pronunciation Block */}
        <div className="rounded-xl bg-surface-container-lowest p-3 flex items-center justify-between gap-space-sm shadow-inner border border-white/5">
          <div className="flex flex-col min-w-0 pr-1">
            <div className="flex items-center gap-1.5">
              <span className="font-label-data-sm text-[10px] text-outline uppercase tracking-wider font-mono">
                Show Taxi Driver / 住所
              </span>
              <span className="text-[10px] text-tertiary font-mono">● Tap to Listen</span>
            </div>
            <span className="font-body-md text-[13px] text-on-surface font-semibold truncate mt-0.5">
              {activeSpot.address}
            </span>
            <span className="font-label-data-sm text-[11px] text-on-surface-variant truncate">
              {activeSpot.addressEn}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => handleCopy(activeSpot.address)}
              aria-label="Copy Address"
              className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface active:scale-95 transition-transform"
              type="button"
              title="Copy Japanese Address"
            >
              <span className="material-symbols-outlined text-[16px]">
                {copied ? 'done' : 'content_copy'}
              </span>
            </button>
            <button
              onClick={() => speakJapanese(activeSpot.taxiPhrase || activeSpot.address)}
              aria-label="Speak Japanese pronunciation"
              className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-primary active:scale-95 transition-transform"
              type="button"
              title="Play Japanese Audio Pronunciation"
            >
              <span className="material-symbols-outlined text-[17px]">volume_up</span>
            </button>
          </div>
        </div>

        {/* Description & Photo/Solo Tip */}
        <p className="font-body-sm text-[13px] text-on-surface-variant leading-relaxed">
          {activeSpot.description}
        </p>

        {activeSpot.photoTip && (
          <div className="flex items-start gap-2 p-2 rounded-lg bg-surface-container/60 border border-white/5">
            <span className="material-symbols-outlined text-secondary text-[16px] shrink-0 mt-0.5">
              tips_and_updates
            </span>
            <p className="font-body-sm text-[12px] text-on-surface leading-tight">
              <strong className="text-secondary">Photo Tip:</strong> {activeSpot.photoTip}
            </p>
          </div>
        )}

        {/* Metadata Badges Grid */}
        <div className="grid grid-cols-2 gap-space-xs">
          <div className="flex items-center gap-2 p-2 rounded-xl bg-surface-container border border-white/5">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: budgetColor, boxShadow: `0 0 8px ${budgetColor}` }}
            ></span>
            <div className="flex flex-col min-w-0">
              <span className="font-label-data-sm text-[10px] text-on-surface-variant uppercase font-mono">
                Budget Tier
              </span>
              <span className="font-label-data-sm text-[11px] text-on-surface truncate font-semibold">
                {budgetLabel}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-xl bg-surface-container border border-white/5">
            <span className="material-symbols-outlined text-tertiary text-[17px] shrink-0">bolt</span>
            <div className="flex flex-col min-w-0">
              <span className="font-label-data-sm text-[10px] text-on-surface-variant uppercase font-mono">
                Transit Walk
              </span>
              <span className="font-label-data-sm text-[11px] text-on-surface truncate font-semibold">
                {activeSpot.walkingTime}
              </span>
            </div>
          </div>
        </div>

        {/* Crowds & Status Info */}
        <div className="flex items-center justify-between font-label-data-sm text-[11px] text-on-surface-variant pt-0.5">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary shadow-[0_0_4px_#00e475]"></span>
            {activeSpot.openingHours}
          </span>
          <span className="text-secondary font-semibold">{activeSpot.soloRating}</span>
        </div>

        {/* Mark As Travelled iOS-Style Neon Toggle Control */}
        <div
          onClick={() => toggleVisited(activeSpot.id)}
          className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-300 border ${
            visited
              ? 'bg-tertiary/10 border-tertiary/40 shadow-[0_0_15px_rgba(0,230,118,0.15)]'
              : 'bg-surface-container border-white/5 hover:border-white/10'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span
              className={`material-symbols-outlined text-[20px] transition-colors ${
                visited ? 'text-tertiary' : 'text-on-surface-variant'
              }`}
            >
              {visited ? 'task_alt' : 'radio_button_unchecked'}
            </span>
            <div className="flex flex-col">
              <span className="font-label-data-sm text-[12px] text-on-surface tracking-wide font-medium">
                {visited ? 'Travelled & Completed ✓' : 'Mark as Travelled / Done'}
              </span>
              <span className="text-[10px] text-on-surface-variant font-mono">
                {visited ? 'Recorded in your journey log' : 'Tap to mark visited & trigger confetti'}
              </span>
            </div>
          </div>

          <div
            className={`w-12 h-6.5 rounded-full p-0.5 transition-colors relative flex items-center ${
              visited ? 'bg-tertiary' : 'bg-surface-container-highest'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                visited ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </div>
        </div>

        {/* CTA Action Row */}
        <div className="grid grid-cols-2 gap-space-sm pt-1">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-data-sm text-[12px] tracking-wide shadow-sm active:scale-95 transition-all border border-white/5"
          >
            <span className="material-symbols-outlined text-[16px]">navigation</span>
            <span>Google Maps</span>
          </a>

          <button
            onClick={() => setActiveTab('itinerary')}
            type="button"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-primary-container hover:brightness-110 text-white font-label-data-sm text-[12px] tracking-wide shadow-[0_0_16px_rgba(255,80,112,0.4)] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">calendar_month</span>
            <span>View Itinerary</span>
          </button>
        </div>
      </div>

      {/* Secondary Demonstration Mini-Card: Completed / Travelled State */}
      {lastVisitedSpot && (
        <div className="rounded-xl bg-surface-container-low/60 border border-white/5 p-space-sm flex items-center justify-between gap-space-sm shadow-sm opacity-75">
          <div className="flex items-center gap-space-sm min-w-0">
            <div className="w-8 h-8 rounded-full bg-tertiary/20 flex items-center justify-center text-tertiary shrink-0">
              <span className="material-symbols-outlined text-[18px]">verified</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-data-sm text-[10px] text-tertiary uppercase tracking-wider font-mono">
                Travelled Spot
              </span>
              <span className="font-body-md text-[13px] text-on-surface line-through truncate font-medium">
                {lastVisitedSpot.title}
              </span>
              <span className="font-label-data-sm text-[10px] text-on-surface-variant truncate">
                {lastVisitedSpot.addressEn}
              </span>
            </div>
          </div>

          <button
            onClick={() => toggleVisited(lastVisitedSpot.id)}
            aria-label="Revisit / Undo details"
            className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-white shrink-0 active:scale-90 transition-all"
            type="button"
            title="Mark as unvisited"
          >
            <span className="material-symbols-outlined text-[16px]">undo</span>
          </button>
        </div>
      )}
    </div>
  );
};
