# 🌸 TokyoTrek & Beyond — Solo Travel Navigator

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-green?logo=leaflet)](https://leafletjs.com/)
[![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite)](https://vitejs.dev/)

> **A high-performance, mobile-first Web Application built for fast-paced solo travelers navigating Tokyo, Kyoto, and Osaka from Mumbai.**  
> Featuring interactive live maps with budget rings, completed-spot tracking, 7-day fast/slow itinerary paces, konbini food hacks, and a VFS Global Mumbai visa tracker.

---

## 🎨 Visual Design Reference (Google Stitch)

- **Stitch Design Spec:** [Google Stitch Project #8559052059869258998](https://stitch.withgoogle.com/projects/8559052059869258998?pli=1)
- **Theme:** Cyberpunk-Lite / Modern Tokyo Night (`#0D0F12` Obsidian Slate, `#161920` frosted drawers, `#FF2A5F` neon crimson, `#FFB7C5` sakura pink)
- **Budget Indicator System:**
  - 🟢 **Cheap / Budget:** `#00E676` (Convenience store meals, free shrines)
  - 🟠 **Mid-Range:** `#FFB300` (Vintage thrifting ¥3,000–¥7,000, casual ramen)
  - 🔴 **Splurge:** `#FF3D00` (Shibuya Sky 360° deck, teamLab Planets)

---

## 🚀 Key Features

### 1. 🗺️ Live Interactive Map Explorer (No API Key Required)
- Powered by live OpenStreetMap with GPU-accelerated Tokyo Night dark filter.
- Dynamic city switcher: **Tokyo**, **Kyoto**, and **Osaka**.
- Neighborhood filter chips: `Shibuya`, `Shimokitazawa`, `Harajuku`, `Shinjuku`, `Akihabara`, `Higashiyama`, `Dotonbori`, `Shinsekai`.
- Custom SVG pins with concentric halo rings matching budget tiers:
  - 🍴 Forks / ramen icon for food
  - 🛍️ Bag icon for thrifting & streetwear
  - 📸 Camera icon for photo ops & sakura spots
- Pin click opens the **Bottom Drawer Sheet** with Japanese taxi driver address block, audio speech pronunciation, budget badge, and travel status toggle.

### 2. 📋 7-Day Fast-Paced Daily Itinerary Tracker
- 7 curated daily schedules across Tokyo, Kyoto, and Osaka.
- Pace mode toggle: **"⚡ Fast-Paced (20m)"** (Yamanote Line sync) vs **"☕ Slow Roam (60m)"**.
- Luminescent timeline runner with step counter (`14,820 stp`) and live remaining spots badge (`4 of 7 Spots Left`).
- Recommended subway line connections (Yamanote, Ginza, Keihan, Midosuji).

### 3. 🍜 Solo Dining Guide & Konbini Bible
- **Ticket Machine (Shokkenki) Guide:** 4-step ordering walkthrough with Kanji cheat-sheet.
- **Ichiran Booth Protocol:** Guide to the "Aji Shuuchuu" flavor concentration partition.
- **Standing Sushi Bar Rules:** Proper soy dipping technique & free hot green tea spigots.
- **Konbini Food Hacks:** Anthony Bourdain egg sando, Famichiki hot pancake slider hack, and interactive JPY to INR meal price calculator.

### 4. 🛂 Visa & Mumbai Logistics Hub
- **VFS Global Mumbai Countdown:** Submission tracker for Urmi Axis Building, Mahalaxmi West (5–7 working days target).
- **Interactive Document Checklist:** Track flights (BOM ➔ HND/NRT), hotel bookings, 6-month stamped bank statements, and ITR acknowledgement with persistence.
- **Mumbai Solo Travel Toolkit:** Digital Suica/ICOCA on Apple Wallet, eSIM (Ubigi/Airalo), SmartEX Shinkansen booking, and 100V Type A flat pin adaptor notes.

### 5. 💾 Persistent Visited State & Micro-Interactions
- Persistent tracking in `localStorage` (`visitedSpotIds`).
- Marking a spot as visited triggers celebratory confetti bursts, dims the card to `#161920`, adds a strikethrough, and drops pin opacity to 45% with a checkmark badge.

---

## 💻 Tech Stack

- **Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS + PostCSS
- **Mapping:** Leaflet + OpenStreetMap (No API key needed)
- **Animations & Effects:** Canvas Confetti + Custom CSS Keyframes
- **Icons:** Google Material Symbols Outlined + Lucide React
- **Audio:** Web Speech API (`SpeechSynthesis` with `ja-JP` localization)

---

## 🛠️ Local Development

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/tokyotrek.git
cd tokyotrek

# Install dependencies
npm install

# Start local development server
npm run dev

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Deploy to Free Live Hosting

### Deploy with Vercel (Recommended — 30 seconds)
```bash
npx vercel
```
Or import your GitHub repo directly at [vercel.com/new](https://vercel.com/new).

### Deploy with Netlify
```bash
npx netlify deploy --prod
```
Or drag and drop the `dist/` folder at [app.netlify.com/drop](https://app.netlify.com/drop).

---

## 📄 License
MIT License. Crafted for the PromptWars Challenge.
