import React, { useState } from 'react';
import { useTokyoTrek } from '../../context/AppContext';
import { VISA_DOCUMENTS, MUMBAI_HUB_DETAILS, SOLO_TRAVEL_TOOLKIT } from '../../data/logisticsData';

export const VisaLogisticsView: React.FC = () => {
  const { completedDocIds, toggleDocCompleted } = useTokyoTrek();

  // Target submission date: default 7 days from now
  const [submissionDate, setSubmissionDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  });

  const [activeCategory, setActiveCategory] = useState<'all' | 'id' | 'finance' | 'travel' | 'work'>('all');

  const filteredDocs = activeCategory === 'all'
    ? VISA_DOCUMENTS
    : VISA_DOCUMENTS.filter(d => d.category === activeCategory);

  const completedCount = VISA_DOCUMENTS.filter(d => completedDocIds.includes(d.id)).length;
  const totalDocs = VISA_DOCUMENTS.length;
  const percentComplete = Math.round((completedCount / totalDocs) * 100);

  // Calculate days until submission
  const daysUntilSubmission = Math.max(
    0,
    Math.ceil((new Date(submissionDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  );

  return (
    <div className="flex flex-col w-full pb-8 gap-space-lg">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-surface-container-low via-surface-container to-surface-container-low p-space-md rounded-2xl border border-white/5 shadow-md flex items-center justify-between">
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5 text-primary font-label-data-sm text-[11px] uppercase tracking-wider mb-0.5">
            <span>🛂 Mumbai ➔ Japan Route</span>
            <span className="text-[#5c3f41]">•</span>
            <span className="text-secondary font-mono">BOM T2 ➔ HND/NRT</span>
          </div>
          <h2 className="font-headline-sm text-[18px] text-white font-bold">
            Visa & Mumbai Logistics Hub
          </h2>
          <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5">
            VFS Global Mahalaxmi submission tracker, Embassy document checklist, and Tokyo transit readiness.
          </p>
        </div>
        <div className="w-12 h-12 rounded-full bg-primary-container/20 border border-primary-container/40 flex items-center justify-center text-primary shrink-0">
          <span className="material-symbols-outlined text-[24px]">contactless</span>
        </div>
      </div>

      {/* SECTION 1: VFS Global Mumbai Visa Submission Countdown Widget */}
      <section className="rounded-2xl bg-surface-container-low p-space-md border border-white/5 shadow-md flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="px-2 py-0.5 rounded-full bg-primary-container/20 text-primary font-label-data-sm text-[10px] font-bold font-mono">
              Target 5–7 Working Days Turnaround
            </span>
            <h3 className="font-headline-sm text-[16px] text-white font-bold mt-1">
              VFS Global Mumbai Appointment Countdown
            </h3>
            <p className="font-body-sm text-[12px] text-on-surface-variant">
              {MUMBAI_HUB_DETAILS.vfsCenter}
            </p>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-[26px] font-bold font-mono text-tertiary leading-none">
              {daysUntilSubmission}d
            </span>
            <span className="font-label-data-sm text-[10px] text-on-surface-variant uppercase font-mono">
              Until Submission
            </span>
          </div>
        </div>

        {/* Date Selector & VFS Schedule */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
          <div className="p-2.5 rounded-xl bg-surface-container border border-white/5 flex flex-col justify-between">
            <span className="font-label-data-sm text-[10px] text-outline uppercase font-mono">
              Target Appointment Date
            </span>
            <input
              type="date"
              value={submissionDate}
              onChange={e => setSubmissionDate(e.target.value)}
              className="mt-1 bg-surface-container-lowest text-white font-mono text-[13px] px-2.5 py-1.5 rounded-lg border border-white/10 focus:outline-none focus:border-primary"
            />
          </div>

          <div className="p-2.5 rounded-xl bg-surface-container border border-white/5 flex flex-col justify-between">
            <span className="font-label-data-sm text-[10px] text-outline uppercase font-mono">
              Submission Window
            </span>
            <span className="font-mono text-[12px] text-white font-semibold mt-1">
              {MUMBAI_HUB_DETAILS.submissionHours}
            </span>
            <span className="text-[10px] text-on-surface-variant">
              Collection: {MUMBAI_HUB_DETAILS.collectionHours}
            </span>
          </div>
        </div>

        {/* VFS Physical Location & Taxi note */}
        <div className="p-2.5 rounded-xl bg-surface-container-lowest border border-white/5 flex items-start gap-2">
          <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
            location_on
          </span>
          <div className="flex flex-col min-w-0">
            <span className="font-label-data-sm text-[11px] text-white font-semibold">
              VFS Mahalaxmi Address
            </span>
            <p className="font-body-sm text-[11px] text-on-surface-variant leading-tight">
              {MUMBAI_HUB_DETAILS.vfsAddress}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: Interactive Document Checklist */}
      <section className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-headline-sm text-[16px] text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary text-[18px]">fact_check</span>
              <span>Visa Document Checklist</span>
            </h3>
            <p className="text-[11px] text-on-surface-variant">
              Tap documents as you assemble them into your physical dossier
            </p>
          </div>

          <div className="flex flex-col items-end">
            <span className="font-mono text-[13px] font-bold text-white">
              {completedCount}/{totalDocs} Ready
            </span>
            <span className="font-label-data-sm text-[10px] text-tertiary font-mono">
              {percentComplete}% Complete
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-container to-tertiary transition-all duration-300"
            style={{ width: `${percentComplete}%` }}
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {[
            { id: 'all', label: 'All Documents' },
            { id: 'id', label: 'Identity & Photos' },
            { id: 'travel', label: 'Flights & Stays' },
            { id: 'finance', label: 'Bank & ITR' },
            { id: 'work', label: 'Employment NOC' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`shrink-0 px-3 py-1 rounded-full font-label-data-sm text-[11px] transition-all ${
                activeCategory === tab.id
                  ? 'bg-primary-container text-white font-bold shadow-sm'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Documents List */}
        <div className="space-y-2">
          {filteredDocs.map(doc => {
            const isDone = completedDocIds.includes(doc.id);
            return (
              <div
                key={doc.id}
                onClick={() => toggleDocCompleted(doc.id)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                  isDone
                    ? 'bg-tertiary/10 border-tertiary/30 opacity-80'
                    : 'bg-surface-container-low border-white/5 hover:border-white/10'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isDone
                      ? 'bg-tertiary text-black'
                      : 'border border-surface-container-highest text-transparent'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4
                      className={`font-headline-sm text-[14px] font-semibold ${
                        isDone ? 'text-on-surface-variant line-through' : 'text-white'
                      }`}
                    >
                      {doc.title}
                    </h4>
                    {doc.required && (
                      <span className="px-1.5 py-0.5 rounded bg-primary-container/20 text-primary font-mono text-[9px] uppercase font-bold shrink-0">
                        Mandatory
                      </span>
                    )}
                  </div>
                  <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5">
                    {doc.subtitle}
                  </p>
                  <p className="font-body-sm text-[11px] text-outline mt-1 font-mono">
                    💡 {doc.notes}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: Essential Mumbai-to-Japan Solo Toolkit */}
      <section className="flex flex-col gap-space-sm">
        <h3 className="font-headline-sm text-[16px] text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[18px]">travel_explore</span>
          <span>Mumbai Solo Traveler Toolkit</span>
        </h3>

        <div className="space-y-3">
          {SOLO_TRAVEL_TOOLKIT.map(tool => (
            <div
              key={tool.title}
              className="p-3.5 rounded-2xl bg-surface-container-low border border-white/5 shadow-md flex flex-col gap-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-label-data-sm text-[10px] text-primary uppercase font-mono">
                  {tool.category}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-secondary-container text-secondary font-label-data-sm text-[10px] font-bold">
                  {tool.badge}
                </span>
              </div>
              <h4 className="font-headline-sm text-[14px] text-white font-bold">
                {tool.title}
              </h4>
              <p className="font-body-sm text-[12px] text-on-surface-variant leading-relaxed">
                {tool.tip}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: Direct Flight & Emergency Contacts Box */}
      <section className="rounded-2xl bg-surface-container p-space-md border border-white/5 shadow-md flex flex-col gap-2.5">
        <div className="flex items-center gap-2 text-white font-bold text-[14px]">
          <span className="material-symbols-outlined text-tertiary">emergency</span>
          <span>Emergency & Diplomatic Contacts in Japan</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
          <div className="p-2 rounded-xl bg-surface-container-lowest border border-white/5 flex flex-col">
            <span className="text-secondary font-bold">Embassy of India, Tokyo</span>
            <span className="text-on-surface">2-2-11 Kudan-Minami, Chiyoda-ku, Tokyo</span>
            <span className="text-tertiary mt-1">Tel: +81-3-3262-2391 (24/7 Helpline)</span>
          </div>

          <div className="p-2 rounded-xl bg-surface-container-lowest border border-white/5 flex flex-col">
            <span className="text-secondary font-bold">Japan National Emergency</span>
            <span className="text-on-surface">Police: 110 • Ambulance / Fire: 119</span>
            <span className="text-tertiary mt-1">Japan Tourist Helpline: 050-3816-2720 (English)</span>
          </div>
        </div>
      </section>
    </div>
  );
};
