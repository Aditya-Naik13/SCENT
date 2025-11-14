export interface Fragrance {
  id: string;
  name: string;
  brand: string;
  image: string;
  gender: string;
  rating: number;
  votes: number;
  accords: string[];
  description: string;
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
  longevity: LongevityData;
  sillage: SillageData;
  priceValue: PriceValueData;
}

export interface LongevityData {
  'very weak'?: number;
  'weak'?: number;
  'moderate'?: number;
  'long lasting'?: number;
  'eternal'?: number;
}

export interface SillageData {
  'intimate'?: number;
  'moderate'?: number;
  'strong'?: number;
  'enormous'?: number;
}

export interface PriceValueData {
  'way overpriced'?: number;
  'overpriced'?: number;
  'ok'?: number;
  'good value'?: number;
  'great value'?: number;
}

export interface SearchFilters {
  query?: string;
  notes?: string[];
  gender?: string[];
  minRating?: number;
  brand?: string[];
  priceValue?: string[];
  sortBy?: 'rating' | 'votes' | 'name' | 'similarity';
  sortOrder?: 'asc' | 'desc';
}

export interface FragranceSimilarity {
  fragrance: Fragrance;
  similarity: number;
  matchingNotes: {
    top: string[];
    middle: string[];
    base: string[];
  };
}
