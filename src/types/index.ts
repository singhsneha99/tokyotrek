export type City = 'Tokyo' | 'Kyoto' | 'Osaka';

export type Category = 'all' | 'food' | 'shopping' | 'photo';

export type BudgetTier = 'cheap' | 'mid' | 'splurge';

export interface Spot {
  id: string;
  city: City;
  neighborhood: string;
  title: string;
  titleJa: string;
  category: 'food' | 'shopping' | 'photo';
  budgetTier: BudgetTier;
  priceEstimate: string;
  lat: number;
  lng: number;
  address: string;
  addressEn: string;
  walkingTime: string;
  nearestStation: string;
  openingHours: string;
  soloRating: string;
  image: string;
  description: string;
  photoTip: string;
  subwayLine: string;
  taxiPhrase: string;
  soloDineTip?: string;
  isMustVisit?: boolean;
}

export interface ItineraryItem {
  id: string;
  spotId?: string;
  time: string;
  title: string;
  titleJa?: string;
  category: 'food' | 'shopping' | 'photo' | 'transit' | 'rest';
  budgetTier: BudgetTier;
  priceEstimate: string;
  address: string;
  description: string;
  subwaySnippet: string;
  proTip: string;
  image?: string;
  badgeLabel?: string;
  fastPacedDurationMinutes: number;
  slowRoamDurationMinutes: number;
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  city: City;
  neighborhoods: string;
  summary: string;
  totalDistanceKm: number;
  targetSteps: number;
  mainSubwayLine: string;
  items: ItineraryItem[];
}

export interface VisaDocumentItem {
  id: string;
  title: string;
  subtitle: string;
  required: boolean;
  notes: string;
  category: 'id' | 'finance' | 'travel' | 'work';
}
