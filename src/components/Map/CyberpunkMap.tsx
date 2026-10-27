import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useTokyoTrek } from '../../context/AppContext';
import { Spot, City } from '../../types';

// City center coordinates and zoom levels
const CITY_COORDINATES: Record<City, { center: [number, number]; zoom: number }> = {
  Tokyo: { center: [35.6660, 139.7050], zoom: 14 },
  Kyoto: { center: [35.0000, 135.7720], zoom: 14 },
  Osaka: { center: [34.6687, 135.5030], zoom: 14 },
};

export const CyberpunkMap: React.FC = () => {
  const {
    spots,
    activeCity,
    activeNeighborhood,
    activeSpot,
    setActiveSpot,
    isVisited,
  } = useTokyoTrek();

  const [mapStyle, setMapStyle] = useState<'cyberpunk' | 'streets'>('cyberpunk');
  const [showLayerMenu, setShowLayerMenu] = useState<boolean>(false);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const { center, zoom } = CITY_COORDINATES[activeCity];

    const map = L.map(mapContainerRef.current, {
      center,
      zoom,
      zoomControl: false,
      attributionControl: true
    });

    // Live OpenStreetMap Basemap - 100% Free, NO API KEY REQUIRED
    const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      subdomains: ['a', 'b', 'c'],
      attribution: '&copy; OpenStreetMap',
      className: mapStyle === 'cyberpunk' ? 'cyberpunk-dark-tiles' : ''
    }).addTo(map);

    tileLayerRef.current = tileLayer;

    // Zoom control on top right
    L.control.zoom({ position: 'topright' }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    // Invalidate size after mount to prevent grey tiles
    setTimeout(() => {
      map.invalidateSize();
    }, 250);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update tile style when mapStyle toggles
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    if (tileLayerRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
    }

    const newTileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      subdomains: ['a', 'b', 'c'],
      attribution: '&copy; OpenStreetMap',
      className: mapStyle === 'cyberpunk' ? 'cyberpunk-dark-tiles' : ''
    }).addTo(mapInstanceRef.current);

    tileLayerRef.current = newTileLayer;
  }, [mapStyle]);

  // Update map center when activeCity changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const { center, zoom } = CITY_COORDINATES[activeCity];
    mapInstanceRef.current.flyTo(center, zoom, {
      duration: 1.2,
      easeLinearity: 0.25
    });
  }, [activeCity]);

  // Recenter when activeSpot changes
  useEffect(() => {
    if (!mapInstanceRef.current || !activeSpot) return;
    if (activeSpot.city === activeCity) {
      mapInstanceRef.current.panTo([activeSpot.lat, activeSpot.lng], {
        animate: true,
        duration: 0.8
      });
    }
  }, [activeSpot, activeCity]);

  // Filter spots by city, neighborhood, and render pins
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;
    markersLayerRef.current.clearLayers();

    const filteredSpots = spots.filter(spot => {
      if (spot.city !== activeCity) return false;
      if (activeNeighborhood !== 'all' && spot.neighborhood !== activeNeighborhood) return false;
      return true;
    });

    filteredSpots.forEach(spot => {
      const visited = isVisited(spot.id);
      const isSelected = activeSpot?.id === spot.id;

      // Color scheme according to Stitch spec
      let ringColorHex = '#00E676'; // cheap
      let ringGlow = 'rgba(0,230,118,0.5)';
      if (spot.budgetTier === 'mid') {
        ringColorHex = '#FFB300';
        ringGlow = 'rgba(255,179,0,0.5)';
      } else if (spot.budgetTier === 'splurge') {
        ringColorHex = '#FF3D00';
        ringGlow = 'rgba(255,61,0,0.6)';
      }

      // Icon symbol based on category
      let iconSymbol = 'restaurant';
      if (spot.category === 'shopping') iconSymbol = 'shopping_bag';
      if (spot.category === 'photo') iconSymbol = 'photo_camera';

      let pinHtml = '';

      if (visited) {
        // Visited State: Opacity 45%, muted grey, checkmark badge, strikethrough label
        pinHtml = `
          <div class="flex flex-col items-center cursor-pointer transition-transform hover:scale-110 opacity-50">
            <div class="px-2 py-0.5 rounded-full bg-[#1e2023]/90 text-[#8A8F99] text-[10px] font-mono shadow-sm mb-1 whitespace-nowrap flex items-center gap-1 line-through border border-[#333538]">
              <span class="material-symbols-outlined text-[11px] text-[#00e475]">check_circle</span>
              <span class="truncate max-w-[90px]">${spot.title.split(' ')[0]}</span>
            </div>
            <div class="w-7 h-7 rounded-full bg-[#1a1c1f] border border-[#333538] flex items-center justify-center text-[#8A8F99] shadow-md">
              <span class="material-symbols-outlined text-[14px]">done</span>
            </div>
          </div>
        `;
      } else if (isSelected) {
        // Active Selected Pin: Pulsing Radar Halo, bright neon border, pin pointer triangle
        pinHtml = `
          <div class="flex flex-col items-center cursor-pointer z-30 transition-transform scale-110">
            <div class="px-2 py-0.5 rounded-full bg-[#1e2023] text-white text-[11px] font-bold font-mono mb-1 whitespace-nowrap flex items-center gap-1 border" style="box-shadow: 0 0 12px ${ringGlow}; border-color: ${ringColorHex};">
              <span class="w-2 h-2 rounded-full" style="background-color: ${ringColorHex}; box-shadow: 0 0 6px ${ringColorHex};"></span>
              <span class="text-white">${spot.priceEstimate}</span>
            </div>
            <div class="relative flex items-center justify-center">
              <span class="animate-ping absolute w-9 h-9 rounded-full opacity-60" style="background-color: ${ringColorHex};"></span>
              <div class="w-8 h-8 rounded-full flex items-center justify-center p-0.5" style="background-color: ${ringColorHex}; box-shadow: 0 0 16px ${ringGlow};">
                <div class="w-7 h-7 rounded-full bg-[#111317] flex items-center justify-center text-white">
                  <span class="material-symbols-outlined text-[15px]" style="color: ${ringColorHex};">${iconSymbol}</span>
                </div>
              </div>
            </div>
            <div class="w-2 h-2.5 [clip-path:polygon(0_0,100%_0,50%_100%)] -mt-0.5" style="background-color: ${ringColorHex};"></div>
          </div>
        `;
      } else {
        // Default Unvisited Pin: Concentric ring halo with budget color
        pinHtml = `
          <div class="flex flex-col items-center cursor-pointer transition-transform hover:scale-110">
            <div class="px-1.5 py-0.5 rounded-full bg-[#161920]/90 backdrop-blur-sm text-[#e2e2e6] text-[10px] font-mono shadow-md mb-1 whitespace-nowrap flex items-center gap-1 border border-[#282a2d]">
              <span class="w-1.5 h-1.5 rounded-full" style="background-color: ${ringColorHex};"></span>
              <span class="truncate max-w-[85px]">${spot.title.split(' ')[0]}</span>
            </div>
            <div class="w-7 h-7 rounded-full flex items-center justify-center" style="background-color: ${ringGlow};">
              <div class="w-5 h-5 rounded-full bg-[#1e2023] flex items-center justify-center text-white border" style="border-color: ${ringColorHex}; box-shadow: 0 0 8px ${ringGlow};">
                <span class="material-symbols-outlined text-[11px]" style="color: ${ringColorHex};">${iconSymbol}</span>
              </div>
            </div>
          </div>
        `;
      }

      const customIcon = L.divIcon({
        className: 'custom-tokyo-pin',
        html: pinHtml,
        iconSize: [80, 56],
        iconAnchor: [40, 56],
      });

      const marker = L.marker([spot.lat, spot.lng], { icon: customIcon });
      marker.on('click', () => {
        setActiveSpot(spot);
      });

      markersLayerRef.current?.addLayer(marker);
    });
  }, [spots, activeCity, activeNeighborhood, activeSpot, isVisited]);

  const handleRecenter = () => {
    if (!mapInstanceRef.current) return;
    const { center, zoom } = CITY_COORDINATES[activeCity];
    mapInstanceRef.current.flyTo(center, zoom, { duration: 0.8 });
  };

  return (
    <div className="relative w-full h-[360px] rounded-lg overflow-hidden bg-surface-container-lowest shadow-2xl border border-surface-container-high">
      {/* Leaflet Live Map DOM Node */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Top Left Budget HUD Legend Pill */}
      <div className="absolute top-3 left-3 z-[400] flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-low/95 backdrop-blur-md shadow-md border border-white/10 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-tertiary shadow-[0_0_6px_#00e475]"></span>
        <span className="font-label-data-sm text-[10px] text-on-surface">Cheap</span>
        <span className="text-outline-variant font-label-data-sm text-[10px] mx-0.5">•</span>
        <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]"></span>
        <span className="font-label-data-sm text-[10px] text-on-surface">Mid</span>
        <span className="text-outline-variant font-label-data-sm text-[10px] mx-0.5">•</span>
        <span className="w-2 h-2 rounded-full bg-primary-container shadow-[0_0_6px_#ff5070]"></span>
        <span className="font-label-data-sm text-[10px] text-on-surface">Splurge</span>
      </div>

      {/* Top Right Floating HUD Map Controls */}
      <div className="absolute top-3 right-3 z-[400] flex flex-col gap-1.5">
        <button
          onClick={handleRecenter}
          aria-label="Center GPS Location"
          className="w-8 h-8 rounded-full bg-surface-container-low/95 backdrop-blur-md shadow-md border border-white/10 flex items-center justify-center text-tertiary active:scale-95 transition-transform"
          type="button"
          title="Recenter City Viewport"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-tertiary"></span>
          </span>
        </button>

        {/* Map Style / Layer Switcher */}
        <button
          onClick={() => setShowLayerMenu(!showLayerMenu)}
          aria-label="Layer Settings"
          className={`w-8 h-8 rounded-full backdrop-blur-md shadow-md border transition-transform active:scale-95 flex items-center justify-center ${
            showLayerMenu
              ? 'bg-primary-container text-white border-primary'
              : 'bg-surface-container-low/95 text-on-surface border-white/10'
          }`}
          type="button"
          title="Toggle Map Style"
        >
          <span className="material-symbols-outlined text-[17px]">layers</span>
        </button>

        {/* Layer Dropdown Menu */}
        {showLayerMenu && (
          <div className="absolute top-18 right-0 rounded-xl bg-surface-container-low/95 backdrop-blur-xl border border-white/10 p-1.5 shadow-2xl flex flex-col gap-1 w-36 z-[500]">
            <button
              onClick={() => {
                setMapStyle('cyberpunk');
                setShowLayerMenu(false);
              }}
              className={`px-2.5 py-1.5 rounded-lg text-left text-[11px] font-mono flex items-center justify-between ${
                mapStyle === 'cyberpunk'
                  ? 'bg-primary-container/20 text-primary font-bold border border-primary/30'
                  : 'text-on-surface hover:bg-surface-container'
              }`}
            >
              <span>🌙 Cyberpunk</span>
              {mapStyle === 'cyberpunk' && <span className="text-tertiary">✓</span>}
            </button>
            <button
              onClick={() => {
                setMapStyle('streets');
                setShowLayerMenu(false);
              }}
              className={`px-2.5 py-1.5 rounded-lg text-left text-[11px] font-mono flex items-center justify-between ${
                mapStyle === 'streets'
                  ? 'bg-primary-container/20 text-primary font-bold border border-primary/30'
                  : 'text-on-surface hover:bg-surface-container'
              }`}
            >
              <span>🗺️ Vibrant Live</span>
              {mapStyle === 'streets' && <span className="text-tertiary">✓</span>}
            </button>
          </div>
        )}

        <button
          onClick={() => {
            if (mapInstanceRef.current) {
              mapInstanceRef.current.setZoom(mapInstanceRef.current.getZoom() + 1);
            }
          }}
          aria-label="Zoom In"
          className="w-8 h-8 rounded-full bg-surface-container-low/95 backdrop-blur-md shadow-md border border-white/10 flex items-center justify-center text-on-surface active:scale-95 transition-transform"
          type="button"
          title="Zoom In"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
        </button>

        <button
          onClick={() => {
            if (mapInstanceRef.current) {
              mapInstanceRef.current.setZoom(mapInstanceRef.current.getZoom() - 1);
            }
          }}
          aria-label="Zoom Out"
          className="w-8 h-8 rounded-full bg-surface-container-low/95 backdrop-blur-md shadow-md border border-white/10 flex items-center justify-center text-on-surface active:scale-95 transition-transform"
          type="button"
          title="Zoom Out"
        >
          <span className="material-symbols-outlined text-[18px]">remove</span>
        </button>
      </div>

      {/* Map Bottom Status Bar */}
      <div className="absolute bottom-2 left-3 right-3 z-[400] pointer-events-none flex items-center justify-between text-[10px] font-mono text-[#8A8F99]">
        <span className="bg-[#0D0F12]/85 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/5 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
          <span>Live OpenStreetMap • {activeCity}</span>
        </span>
        <span className="bg-[#0D0F12]/85 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/5">
          Tap Pin to Inspect
        </span>
      </div>
    </div>
  );
};
