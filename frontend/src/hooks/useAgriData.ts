import { useState, useEffect } from 'react';
import { getAllRecords, addRecord, deleteRecord, clearRecords, seedDatabaseIfEmpty } from '../utils/db';
import type { RegionRecord } from '../types';

export function calculateOveruse(record: RegionRecord) {
  return Math.max(0, Number(record.fertiliser) - Number(record.recommended));
}

export function calculateRisk(record: RegionRecord, rainfall: number = 0) {
  const overuse = calculateOveruse(record);
  const overuseScore = Math.min(70, overuse * 0.75);
  const waterScore = Number(record.water) * 0.3;
  
  let totalScore = overuseScore + waterScore;
  if (rainfall > 20) {
    totalScore += 25; // Significant penalty for high rainfall
  }
  
  return Math.round(Math.min(100, totalScore));
}

export function riskLevel(score: number, rainfall: number = 0) {
  if (rainfall > 20) return "critical-leaching";
  if (score >= 62) return "high";
  if (score >= 34) return "medium";
  return "low";
}

export function priorityText(score: number, rainfall: number = 0) {
  if (rainfall > 20) return "Leaching Critical";
  if (score >= 62) return "Critical";
  if (score >= 34) return "Watch";
  return "Balanced";
}

export function useAgriData() {
  const [records, setRecords] = useState<RegionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [weatherMap, setWeatherMap] = useState<Record<number, number>>({});

  const fetchWeatherForRecords = async (currentRecords: RegionRecord[]) => {
    const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
    if (!API_KEY) return;

    const newWeatherMap: Record<number, number> = {};
    
    // Fetch live weather for each region
    for (const record of currentRecords) {
      if (!record.id) continue;
      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${record.lat}&lon=${record.lng}&appid=${API_KEY}&units=metric`);
        if (res.ok) {
          const data = await res.json();
          // Extract rain in last 1h if available, otherwise default to 0
          const rainMm = data.rain ? data.rain['1h'] || 0 : 0;
          newWeatherMap[record.id] = rainMm;
        } else {
          newWeatherMap[record.id] = 0;
        }
      } catch (err) {
        console.error("Failed to fetch weather for", record.region, err);
        newWeatherMap[record.id] = 0;
      }
    }
    
    setWeatherMap(newWeatherMap);
  };

  useEffect(() => {
    seedDatabaseIfEmpty().then((data) => {
      setRecords(data);
      setLoading(false);
      fetchWeatherForRecords(data);
    });
  }, []);

  const handleAddRecord = async (record: RegionRecord) => {
    await addRecord(record);
    const updated = await getAllRecords();
    setRecords(updated);
    fetchWeatherForRecords(updated);
  };

  const handleDeleteRecord = async (id: number) => {
    await deleteRecord(id);
    setRecords(await getAllRecords());
  };

  const handleResetData = async () => {
    await clearRecords();
    const seeded = await seedDatabaseIfEmpty();
    setRecords(seeded);
    fetchWeatherForRecords(seeded);
  };

  return { 
    records, 
    loading, 
    weatherMap,
    handleAddRecord, 
    handleDeleteRecord, 
    handleResetData 
  };
}
