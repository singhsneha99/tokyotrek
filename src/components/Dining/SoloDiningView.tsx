import React, { useState } from 'react';
import { useTokyoTrek } from '../../context/AppContext';
import { DINING_RULES, KONBINI_ITEMS, JAPANESE_DINING_PHRASES, KonbiniItem } from '../../data/diningData';

export const SoloDiningView: React.FC = () => {
  const { speakJapanese } = useTokyoTrek();

  const [activeRuleTab, setActiveRuleTab] = useState<'all' | 'ramen_machine' | 'ichiran_booth' | 'standing_sushi'>('all');
  const [selectedKonbiniStore, setSelectedKonbiniStore] = useState<'All' | '7-Eleven' | 'FamilyMart' | 'Lawson'>('All');
  const [selectedCombos, setSelectedCombos] = useState<string[]>(['711-egg-sando', 'familymart-famichiki']);

  // Filtered Konbini Items
  const filteredKonbini = selectedKonbiniStore === 'All'
    ? KONBINI_ITEMS
    : KONBINI_ITEMS.filter(k => k.store === selectedKonbiniStore);

  // Filtered Dining Rules
  const filteredRules = activeRuleTab === 'all'
    ? DINING_RULES
    : DINING_RULES.filter(r => r.category === activeRuleTab);

  // Toggle Combo Builder item
  const toggleComboItem = (id: string) => {
    setSelectedCombos(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Combo calculations
  const comboTotalYen = selectedCombos.reduce((acc, id) => {
    const item = KONBINI_ITEMS.find(k => k.id === id);
    return acc + (item ? item.priceYen : 0);
  }, 0);

  const comboTotalInr = Math.round(comboTotalYen * 0.55); // approx conversion 1 JPY ~ 0.55 INR

  return (
    <div className="flex flex-col w-full pb-8 gap-space-lg">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-surface-container-low via-surface-container to-surface-container-low p-space-md rounded-2xl border border-white/5 shadow-md flex items-center justify-between">
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5 text-primary font-label-data-sm text-[11px] uppercase tracking-wider mb-0.5">
            <span>🍜 Solo Gastronomy</span>
            <span className="text-[#5c3f41]">•</span>
            <span className="text-secondary font-mono">No Japanese Needed</span>
          </div>
          <h2 className="font-headline-sm text-[18px] text-white font-bold">
            Solo Counter Dining & Konbini Bible
          </h2>
          <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5">
            How to navigate ticket vending machines, Ichiran booths, and legendary convenience store food hacks.
          </p>
        </div>
        <div className="w-12 h-12 rounded-full bg-primary-container/20 border border-primary-container/40 flex items-center justify-center text-primary shrink-0">
          <span className="material-symbols-outlined text-[24px]">ramen_dining</span>
        </div>
      </div>

      {/* SECTION 1: Solo Dining Rules & Ticket Machines */}
      <section className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-headline-sm text-[16px] text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[18px]">menu_book</span>
            <span>Counter Dining Protocols</span>
          </h3>
          <span className="font-label-data-sm text-[10px] text-tertiary font-mono">
            Zero Awkwardness
          </span>
        </div>

        {/* Rule Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {[
            { id: 'all', label: 'All Guides' },
            { id: 'ramen_machine', label: 'Ticket Machine (Shokkenki)' },
            { id: 'ichiran_booth', label: 'Ichiran Booth Protocol' },
            { id: 'standing_sushi', label: 'Standing Sushi Bar' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveRuleTab(tab.id as any)}
              className={`shrink-0 px-3 py-1 rounded-full font-label-data-sm text-[11px] transition-all ${
                activeRuleTab === tab.id
                  ? 'bg-primary-container text-white font-bold shadow-sm'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Rules Cards */}
        <div className="space-y-4">
          {filteredRules.map(rule => (
            <div
              key={rule.id}
              className="rounded-2xl bg-surface-container-low p-space-md border border-white/5 shadow-md flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="px-2 py-0.5 rounded-full bg-secondary-container text-secondary font-label-data-sm text-[10px] font-medium">
                    {rule.badge}
                  </span>
                  <h4 className="font-headline-sm text-[15px] text-white font-bold mt-1">
                    {rule.title}
                  </h4>
                  <span className="font-label-data-sm text-[11px] text-on-surface-variant font-mono">
                    {rule.japanese}
                  </span>
                </div>
                <button
                  onClick={() => speakJapanese(rule.japanese)}
                  className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary active:scale-90 transition-transform shrink-0"
                  title="Listen to Japanese pronunciation"
                >
                  <span className="material-symbols-outlined text-[16px]">volume_up</span>
                </button>
              </div>

              {/* Step by step list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                {rule.steps.map(step => (
                  <div
                    key={step.stepNumber}
                    className="p-2.5 rounded-xl bg-surface-container border border-white/5 flex gap-2.5 items-start"
                  >
                    <span className="w-5 h-5 rounded-full bg-primary-container/30 text-primary font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {step.stepNumber}
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="font-label-data-sm text-[12px] text-white font-semibold">
                        {step.title}
                      </span>
                      <p className="font-body-sm text-[11px] text-on-surface-variant mt-0.5 leading-snug">
                        {step.instruction}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Warning/Pro Tip */}
              {rule.warningTip && (
                <div className="flex items-start gap-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300">
                  <span className="material-symbols-outlined text-[16px] shrink-0 mt-0.5">warning</span>
                  <p className="font-body-sm text-[11px] leading-tight">
                    <strong>Crucial Tip:</strong> {rule.warningTip}
                  </p>
                </div>
              )}

              {/* Kanji Cheat Sheet if present */}
              {rule.kanjiKeys && (
                <div className="mt-1 pt-2 border-t border-white/5">
                  <span className="font-label-data-sm text-[10px] text-outline uppercase font-mono block mb-1.5">
                    Ticket Machine Kanji Quick-Translator
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                    {rule.kanjiKeys.map(k => (
                      <div
                        key={k.kanji}
                        onClick={() => speakJapanese(k.kanji)}
                        className="p-1.5 rounded-lg bg-surface-container-lowest border border-white/5 flex flex-col cursor-pointer hover:border-primary/40 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[13px] text-white font-mono">{k.kanji}</span>
                          <span className="material-symbols-outlined text-[12px] text-primary">volume_up</span>
                        </div>
                        <span className="text-[10px] text-primary font-mono">{k.romaji}</span>
                        <span className="text-[10px] text-on-surface-variant truncate">{k.meaning}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: Konbini Bible & Convenience Store Food Hacks */}
      <section className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-headline-sm text-[16px] text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[18px]">storefront</span>
            <span>Konbini Bible & Hacks</span>
          </h3>
          <span className="font-label-data-sm text-[10px] text-primary font-mono">
            7-11 • FamilyMart • Lawson
          </span>
        </div>

        {/* Store Filter Chips */}
        <div className="flex items-center gap-2">
          {(['All', '7-Eleven', 'FamilyMart', 'Lawson'] as const).map(store => (
            <button
              key={store}
              onClick={() => setSelectedKonbiniStore(store)}
              className={`px-3 py-1 rounded-full font-label-data-sm text-[11px] transition-all ${
                selectedKonbiniStore === store
                  ? 'bg-secondary-container text-white font-bold shadow-sm border border-secondary/40'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {store}
            </button>
          ))}
        </div>

        {/* Konbini Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
          {filteredKonbini.map(item => {
            const isSelected = selectedCombos.includes(item.id);
            return (
              <div
                key={item.id}
                className="rounded-2xl bg-surface-container-low border border-white/5 overflow-hidden shadow-md flex flex-col"
              >
                <div className="relative h-32 w-full bg-surface-container-lowest">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-mono text-white font-bold">
                    {item.store}
                  </div>
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-primary-container text-white font-mono text-[11px] font-bold shadow-sm">
                    ¥{item.priceYen} (~₹{Math.round(item.priceYen * 0.55)})
                  </div>
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-surface-dim/80 backdrop-blur-md text-secondary font-label-data-sm text-[10px]">
                    {item.tag}
                  </div>
                </div>

                <div className="p-3 flex-1 flex flex-col justify-between gap-2">
                  <div>
                    <h4 className="font-headline-sm text-[14px] text-white font-bold leading-tight">
                      {item.name}
                    </h4>
                    <span className="font-label-data-sm text-[11px] text-on-surface-variant font-mono">
                      {item.nameJa} • {item.calories} kcal
                    </span>
                    <p className="font-body-sm text-[12px] text-on-surface-variant mt-1 leading-snug">
                      {item.description}
                    </p>
                  </div>

                  {/* Hack Tip Box */}
                  <div className="bg-surface-container p-2 rounded-xl border border-white/5 flex items-start gap-1.5 text-tertiary">
                    <span className="material-symbols-outlined text-[15px] shrink-0 mt-0.5">bolt</span>
                    <p className="font-body-sm text-[11px] leading-tight text-on-surface">
                      <strong className="text-tertiary">Viral Hack:</strong> {item.hackTip}
                    </p>
                  </div>

                  {/* Add to Combo Button */}
                  <button
                    onClick={() => toggleComboItem(item.id)}
                    className={`w-full py-1.5 rounded-xl font-label-data-sm text-[11px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? 'bg-tertiary/20 text-tertiary border border-tertiary/40'
                        : 'bg-surface-container hover:bg-surface-container-high text-on-surface border border-white/5'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {isSelected ? 'check_circle' : 'add'}
                    </span>
                    <span>{isSelected ? 'Selected in Combo' : 'Add to Food Run'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Konbini Combo Tray */}
        <div className="rounded-2xl bg-surface-container p-space-md border border-primary/20 shadow-xl flex items-center justify-between gap-3">
          <div className="flex flex-col min-w-0">
            <span className="font-label-data-sm text-[10px] text-primary uppercase font-mono tracking-wider">
              Konbini Meal Calculator ({selectedCombos.length} Items)
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="font-headline-sm text-[20px] text-white font-bold font-mono">
                ¥{comboTotalYen.toLocaleString()}
              </span>
              <span className="text-[12px] text-tertiary font-mono">
                (~₹{comboTotalInr.toLocaleString()} INR)
              </span>
            </div>
            <span className="text-[10px] text-on-surface-variant truncate">
              Under 1,000 Yen = Premium Solo Feast on a Budget!
            </span>
          </div>

          <button
            onClick={() => setSelectedCombos([])}
            className="px-3 py-1.5 rounded-full bg-surface-container-high text-on-surface-variant hover:text-white font-label-data-sm text-[10px] uppercase font-mono shrink-0"
          >
            Clear Tray
          </button>
        </div>
      </section>

      {/* SECTION 3: Essential Japanese Dining Audio Phrases */}
      <section className="flex flex-col gap-space-sm">
        <h3 className="font-headline-sm text-[16px] text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[18px]">record_voice_over</span>
          <span>Audio Phrasebook for Dining</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {JAPANESE_DINING_PHRASES.map(item => (
            <div
              key={item.phrase}
              onClick={() => speakJapanese(item.phrase)}
              className="p-3 rounded-2xl bg-surface-container-low border border-white/5 flex items-center justify-between cursor-pointer hover:border-primary/40 transition-all group"
            >
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-[14px] text-white font-mono group-hover:text-primary transition-colors">
                  {item.phrase}
                </span>
                <span className="font-mono text-[11px] text-primary">{item.romaji}</span>
                <span className="text-[11px] text-on-surface-variant truncate mt-0.5">
                  {item.meaning}
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-surface-container group-hover:bg-primary-container text-on-surface group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-sm">
                <span className="material-symbols-outlined text-[16px]">volume_up</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
