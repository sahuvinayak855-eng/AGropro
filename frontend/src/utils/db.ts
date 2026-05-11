import type { RegionRecord } from '../types';

const STORAGE_KEY = 'AgroPro_regions_v1';

export const sampleRegions: RegionRecord[] = [
  { region: "Andaman and Nicobar", crop: "Rice", fertiliser: 110, recommended: 155, water: 80, lat: 11.7401, lng: 92.6586, timestamp: new Date().toISOString(), source_reliability: 91 },
  { region: "Andhra Pradesh", crop: "Chili", fertiliser: 220, recommended: 170, water: 65, lat: 15.9129, lng: 79.7400, timestamp: new Date().toISOString(), source_reliability: 96 },
  { region: "Arunachal Pradesh", crop: "Rice", fertiliser: 120, recommended: 155, water: 85, lat: 28.2180, lng: 94.7278, timestamp: new Date().toISOString(), source_reliability: 88 },
  { region: "Assam", crop: "Rice", fertiliser: 150, recommended: 155, water: 85, lat: 26.2006, lng: 92.9376, timestamp: new Date().toISOString(), source_reliability: 92 },
  { region: "Bihar", crop: "Wheat", fertiliser: 175, recommended: 165, water: 70, lat: 25.0961, lng: 85.3131, timestamp: new Date().toISOString(), source_reliability: 94 },
  { region: "Chandigarh", crop: "Wheat", fertiliser: 190, recommended: 165, water: 70, lat: 30.7333, lng: 76.7794, timestamp: new Date().toISOString(), source_reliability: 95 },
  { region: "Chhattisgarh", crop: "Rice", fertiliser: 160, recommended: 155, water: 85, lat: 21.2787, lng: 81.8661, timestamp: new Date().toISOString(), source_reliability: 96 },
  { region: "Dadra and Nagar Haveli", crop: "Rice", fertiliser: 130, recommended: 155, water: 85, lat: 20.1809, lng: 73.0169, timestamp: new Date().toISOString(), source_reliability: 90 },
  { region: "Delhi", crop: "Wheat", fertiliser: 150, recommended: 165, water: 70, lat: 28.7041, lng: 77.1025, timestamp: new Date().toISOString(), source_reliability: 92 },
  { region: "Goa", crop: "Rice", fertiliser: 140, recommended: 155, water: 85, lat: 15.2993, lng: 74.1240, timestamp: new Date().toISOString(), source_reliability: 93 },
  { region: "Gujarat", crop: "Cotton", fertiliser: 165, recommended: 160, water: 45, lat: 22.2587, lng: 71.1924, timestamp: new Date().toISOString(), source_reliability: 97 },
  { region: "Haryana", crop: "Rice", fertiliser: 195, recommended: 155, water: 80, lat: 29.0588, lng: 76.0856, timestamp: new Date().toISOString(), source_reliability: 98 },
  { region: "Himachal Pradesh", crop: "Wheat", fertiliser: 140, recommended: 165, water: 70, lat: 31.1048, lng: 77.1734, timestamp: new Date().toISOString(), source_reliability: 94 },
  { region: "Jammu and Kashmir", crop: "Wheat", fertiliser: 130, recommended: 165, water: 70, lat: 33.7782, lng: 76.5762, timestamp: new Date().toISOString(), source_reliability: 91 },
  { region: "Jharkhand", crop: "Rice", fertiliser: 145, recommended: 155, water: 85, lat: 23.6102, lng: 85.2799, timestamp: new Date().toISOString(), source_reliability: 93 },
  { region: "Karnataka", crop: "Sugarcane", fertiliser: 210, recommended: 205, water: 75, lat: 15.3173, lng: 75.7139, timestamp: new Date().toISOString(), source_reliability: 97 },
  { region: "Kerala", crop: "Rice", fertiliser: 160, recommended: 155, water: 85, lat: 10.8505, lng: 76.2711, timestamp: new Date().toISOString(), source_reliability: 96 },
  { region: "Ladakh", crop: "Wheat", fertiliser: 90, recommended: 165, water: 70, lat: 34.1526, lng: 77.5771, timestamp: new Date().toISOString(), source_reliability: 88 },
  { region: "Lakshadweep", crop: "Rice", fertiliser: 100, recommended: 155, water: 85, lat: 10.5667, lng: 72.6417, timestamp: new Date().toISOString(), source_reliability: 85 },
  { region: "Madhya Pradesh", crop: "Soybean", fertiliser: 140, recommended: 130, water: 55, lat: 22.9734, lng: 78.6569, timestamp: new Date().toISOString(), source_reliability: 95 },
  { region: "Maharashtra", crop: "Grapes", fertiliser: 180, recommended: 150, water: 45, lat: 19.7515, lng: 75.7139, timestamp: new Date().toISOString(), source_reliability: 98 },
  { region: "Manipur", crop: "Rice", fertiliser: 135, recommended: 155, water: 85, lat: 24.6637, lng: 93.9063, timestamp: new Date().toISOString(), source_reliability: 90 },
  { region: "Meghalaya", crop: "Rice", fertiliser: 125, recommended: 155, water: 85, lat: 25.4670, lng: 91.3662, timestamp: new Date().toISOString(), source_reliability: 89 },
  { region: "Mizoram", crop: "Rice", fertiliser: 130, recommended: 155, water: 85, lat: 23.1645, lng: 92.9376, timestamp: new Date().toISOString(), source_reliability: 91 },
  { region: "Nagaland", crop: "Rice", fertiliser: 140, recommended: 155, water: 85, lat: 26.1584, lng: 94.5624, timestamp: new Date().toISOString(), source_reliability: 92 },
  { region: "Odisha", crop: "Rice", fertiliser: 170, recommended: 155, water: 85, lat: 20.9517, lng: 85.0985, timestamp: new Date().toISOString(), source_reliability: 95 },
  { region: "Puducherry", crop: "Rice", fertiliser: 150, recommended: 155, water: 85, lat: 11.9416, lng: 79.8083, timestamp: new Date().toISOString(), source_reliability: 94 },
  { region: "Punjab", crop: "Wheat", fertiliser: 210, recommended: 165, water: 85, lat: 31.1471, lng: 75.3412, timestamp: new Date().toISOString(), source_reliability: 98 },
  { region: "Rajasthan", crop: "Wheat", fertiliser: 180, recommended: 165, water: 70, lat: 27.0238, lng: 74.2179, timestamp: new Date().toISOString(), source_reliability: 96 },
  { region: "Sikkim", crop: "Rice", fertiliser: 110, recommended: 155, water: 85, lat: 27.5330, lng: 88.5122, timestamp: new Date().toISOString(), source_reliability: 87 },
  { region: "Tamil Nadu", crop: "Rice", fertiliser: 185, recommended: 155, water: 85, lat: 11.1271, lng: 78.6569, timestamp: new Date().toISOString(), source_reliability: 97 },
  { region: "Telangana", crop: "Cotton", fertiliser: 175, recommended: 160, water: 45, lat: 18.1124, lng: 79.0193, timestamp: new Date().toISOString(), source_reliability: 96 },
  { region: "Tripura", crop: "Rice", fertiliser: 145, recommended: 155, water: 85, lat: 23.9408, lng: 91.9882, timestamp: new Date().toISOString(), source_reliability: 92 },
  { region: "Uttar Pradesh", crop: "Sugarcane", fertiliser: 260, recommended: 200, water: 90, lat: 26.8467, lng: 80.9462, timestamp: new Date().toISOString(), source_reliability: 97 },
  { region: "Uttarakhand", crop: "Wheat", fertiliser: 155, recommended: 165, water: 70, lat: 30.0668, lng: 79.0193, timestamp: new Date().toISOString(), source_reliability: 95 },
  { region: "West Bengal", crop: "Rice", fertiliser: 190, recommended: 155, water: 85, lat: 22.9868, lng: 87.8550, timestamp: new Date().toISOString(), source_reliability: 96 }
];

export async function getAllRecords(): Promise<RegionRecord[]> {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  return JSON.parse(data);
}

export async function addRecord(record: Omit<RegionRecord, 'id'>): Promise<number> {
  const records = await getAllRecords();
  const newId = Date.now();
  const newRecord = { ...record, id: newId };
  records.push(newRecord);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  return newId;
}

export async function deleteRecord(id: number): Promise<void> {
  let records = await getAllRecords();
  records = records.filter(r => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export async function clearRecords(): Promise<void> {
  localStorage.removeItem(STORAGE_KEY);
}

export async function seedDatabaseIfEmpty(): Promise<RegionRecord[]> {
  const records = await getAllRecords();
  if (records.length === 0) {
    const seeded = sampleRegions.map((r, i) => ({ ...r, id: Date.now() + i }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }
  return records;
}
