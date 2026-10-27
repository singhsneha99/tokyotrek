import React from 'react';
import { useTokyoTrek } from '../../context/AppContext';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useTokyoTrek();

  const navItems = [
    {
      id: 'map' as const,
      label: 'Map',
      icon: 'map',
    },
    {
      id: 'itinerary' as const,
      label: 'Itinerary',
      icon: 'checklist',
    },
    {
      id: 'dining' as const,
      label: 'Dining',
      icon: 'ramen_dining',
    },
    {
      id: 'logistics' as const,
      label: 'Logistics',
      icon: 'contactless',
    },
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 pb-safe pointer-events-none">
      <nav className="pointer-events-auto mx-margin mb-margin-mobile px-space-sm py-1.5 rounded-full bg-surface-container-low/95 backdrop-blur-xl shadow-[0_12px_32px_rgba(0,0,0,0.7)] flex items-center justify-around border border-white/10 max-w-md mx-auto">
        {navItems.map(item => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex-1 flex flex-col items-center justify-center min-h-[46px] py-1 transition-all active:scale-95 ${
                isActive
                  ? 'text-primary-container font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              <div className="relative flex flex-col items-center">
                <span
                  className="material-symbols-outlined text-[22px] transition-transform duration-200"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>

                <span className="font-label-data-sm text-[11px] tracking-wide mt-0.5 font-mono">
                  {item.label}
                </span>

                {/* Selected Underline Pip */}
                {isActive && (
                  <span className="absolute -bottom-1 w-3 h-0.5 rounded-full bg-primary-container shadow-[0_0_6px_#ff5070]" />
                )}
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
