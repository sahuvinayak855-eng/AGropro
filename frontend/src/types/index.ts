export interface RegionRecord {
  id?: number;
  region: string;
  crop: string;
  fertiliser: number;
  recommended: number;
  water: number;
  lat: number;
  lng: number;
  timestamp: string;
  source_reliability: number;
}
