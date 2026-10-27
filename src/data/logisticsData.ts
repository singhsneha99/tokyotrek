import { VisaDocumentItem } from '../types';

export const VISA_DOCUMENTS: VisaDocumentItem[] = [
  {
    id: "doc-passport",
    title: "Original Passport & Old Passports",
    subtitle: "Valid for at least 6 months with 2 blank pages",
    required: true,
    category: "id",
    notes: "Must have physical copies of old passports showing travel history (especially Schengen, UK, US or prior East Asia stamps)."
  },
  {
    id: "doc-visa-form",
    title: "Japan Visa Application Form with Photo",
    subtitle: "2x2 inch (45mm x 35mm or 50mm x 50mm) on matte white background",
    required: true,
    category: "id",
    notes: "Photo must be taken within last 3 months with 80% face coverage. Do not staple; use glue stick."
  },
  {
    id: "doc-flights",
    title: "Round-Trip Flight Tickets (BOM ➔ HND/NRT)",
    subtitle: "Confirmed PNR itinerary from Chhatrapati Shivaji Maharaj Int'l Airport (BOM)",
    required: true,
    category: "travel",
    notes: "Direct flights on ANA (All Nippon Airways) from BOM Terminal 2 or transit via Singapore/Bangkok/Kuala Lumpur."
  },
  {
    id: "doc-hotels",
    title: "Confirmed Hotel Booking Vouchers",
    subtitle: "Tokyo, Kyoto, and Osaka accommodations matching daily itinerary dates",
    required: true,
    category: "travel",
    notes: "Solo capsule or business hotels (APA, Sotetsu Fresa Inn, Richmond Hotel). Applicant name must appear on voucher."
  },
  {
    id: "doc-daily-plan",
    title: "Schedule of Stay (Teishutsusho / Daily Itinerary)",
    subtitle: "Official Embassy of Japan tabular format listing daily dates, spots, and contacts",
    required: true,
    category: "travel",
    notes: "Our 7-Day Itinerary tab maps directly into the official Japan Ministry of Foreign Affairs schedule template!"
  },
  {
    id: "doc-bank-statements",
    title: "Original 6-Month Bank Statements with Seal",
    subtitle: "Original bank stamp and signature on every page (or official digital statement with verification QR)",
    required: true,
    category: "finance",
    notes: "Minimum closing balance of ₹2.5 Lakhs recommended for solo travelers for 7–10 days."
  },
  {
    id: "doc-itr",
    title: "Latest 2–3 Years ITR-V (Income Tax Returns)",
    subtitle: "ITR Acknowledgement forms verified with Central Processing Centre (CPC)",
    required: true,
    category: "finance",
    notes: "Essential financial proof for Mumbai consulate visa issuance."
  },
  {
    id: "doc-employment",
    title: "Employment Letter / NOC / Company ID",
    subtitle: "Leave sanction letter on company letterhead or business registration proof",
    required: true,
    category: "work",
    notes: "Must state date of joining, designation, monthly CTC, and approved holiday dates."
  }
];

export const MUMBAI_HUB_DETAILS = {
  vfsCenter: "VFS Global Japan Visa Application Centre, Mumbai",
  vfsAddress: "Urmi Axis Building, 1st Floor, Behind Famous Studio, Opp. Moses Road, Mahalaxmi West, Mumbai 400011",
  submissionHours: "Monday to Friday: 08:00 AM – 14:00 PM",
  collectionHours: "Monday to Friday: 14:00 PM – 16:30 PM",
  processingWorkingDays: 6,
  consulateLocation: "Consulate-General of Japan in Mumbai (No.1, M.L. Dahanukar Marg, Cumballa Hill)",
  airportDeparture: "Chhatrapati Shivaji Maharaj International Airport (BOM) Terminal 2",
  recommendedAirlines: ["ANA NH830 (Direct BOM ➔ NRT)", "Singapore Airlines (BOM ➔ SIN ➔ HND)", "Cathay Pacific (BOM ➔ HKG ➔ NRT)"]
};

export const SOLO_TRAVEL_TOOLKIT = [
  {
    title: "Apple Wallet Digital Suica / ICOCA",
    category: "Transit IC Card",
    badge: "Must-Have",
    tip: "You do NOT need a plastic card. On iPhone: Settings ➔ Wallet ➔ Add Card ➔ Transit Cards ➔ Search 'Suica' or 'PASMO' ➔ Top up using Mastercard or Amex (Visa may have 3D-Secure issues on foreign gateways)."
  },
  {
    title: "eSIM vs Pocket WiFi at BOM/HND",
    category: "Connectivity",
    badge: "Essential",
    tip: "Buy a Ubigi or Airalo Japan eSIM (10GB for ~$17 USD). Activate while waiting at BOM Terminal 2 gate; when you touch down at Haneda/Narita, turn data roaming ON for instant 5G SoftBank/Docomo speeds."
  },
  {
    title: "SmartEX Shinkansen App for Tokaido Train",
    category: "High-Speed Rail",
    badge: "Tokyo ➔ Kyoto",
    tip: "Download the SmartEX App to book Nozomi Shinkansen seats between Tokyo and Kyoto (2 hours 15 mins). Select 'Seat with Oversized Baggage Area' if your suitcase exceeds 160cm total dimensions."
  },
  {
    title: "Cash & 7-Bank / Japan Post ATMs",
    category: "Currency & Forex",
    badge: "Cash is King",
    tip: "Bring a Niyo Global or Scapia zero-forex card. Japanese 7-Eleven ATMs (Seven Bank) and Lawson Bank accept foreign chip cards with zero local ATM surcharges. Always choose 'Withdraw in JPY' (not INR)."
  },
  {
    title: "Power & Plug Adaptors (100V Type A)",
    category: "Hardware",
    badge: "Important",
    tip: "Japan uses 100V 50/60Hz with two flat parallel pins (US Type A without round ground pin). Indian 3-pin plugs will NOT fit without a 2-pin flat adaptor."
  }
];
