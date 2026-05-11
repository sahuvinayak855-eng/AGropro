import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import type { RegionRecord } from '../types';
import { calculateRisk, riskLevel, calculateOveruse } from '../hooks/useAgriData';

export function InteractiveMap({ records, avgRisk, weatherMap }: { records: RegionRecord[], avgRisk: number, weatherMap: Record<number, number> }) {
  const getRiskColor = (score: number, rainfall: number) => {
    const level = riskLevel(score, rainfall);
    if (level === 'critical-leaching') return '#a855f7'; // purple
    if (level === 'high') return '#e11d48'; // crimson
    if (level === 'medium') return '#f59e0b'; // amber
    return '#059669'; // emerald
  };

  return (
    <section className="relative w-full h-[500px] bg-zinc-100 z-0 rounded-2xl overflow-hidden shadow-sm mb-12">
      <MapContainer 
        center={[20.5937, 78.9629]} 
        zoom={5} 
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {records.map(record => {
          const rainfall = weatherMap[record.id!] || 0;
          const score = calculateRisk(record, rainfall);
          return (
            <CircleMarker
              key={record.id}
              center={[record.lat, record.lng]}
              radius={Math.max(10, score / 4)}
              pathOptions={{
                color: getRiskColor(score, rainfall),
                fillColor: getRiskColor(score, rainfall),
                fillOpacity: 0.6,
              }}
            >
              <Popup className="font-sans">
                <div className="p-1">
                  <h3 className="font-bold text-lg mb-1">{record.region}</h3>
                  <p className="text-sm text-muted mb-2">{record.crop}</p>
                  <div className="flex justify-between gap-4 text-sm border-t border-border pt-2">
                    <span className="font-semibold text-muted">Risk:</span>
                    <span className="font-bold data-number" style={{ color: getRiskColor(score, rainfall) }}>{score}%</span>
                  </div>
                  <div className="flex justify-between gap-4 text-sm pt-1">
                    <span className="font-semibold text-muted">Overuse:</span>
                    <span className="font-bold data-number">{calculateOveruse(record)} kg/ha</span>
                  </div>
                  {rainfall > 20 && (
                    <div className="flex justify-between gap-4 text-sm pt-1 text-purple-600">
                      <span className="font-semibold">Sim. Rainfall:</span>
                      <span className="font-bold data-number">{rainfall} mm</span>
                    </div>
                  )}
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
      
      <div className="absolute top-6 right-6 z-[400] glass-panel rounded-xl p-5 w-72 pointer-events-none">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-bold text-muted uppercase tracking-wider">Regional Snaphot</span>
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
          </span>
        </div>
        <div className="flex items-end gap-2 mb-2">
          <span className="text-5xl font-extrabold data-number text-ink">{avgRisk}</span>
          <span className="text-xl font-bold text-muted mb-1">%</span>
        </div>
        <p className="text-sm font-medium text-muted">Overall Risk Average</p>
      </div>
    </section>
  );
}
