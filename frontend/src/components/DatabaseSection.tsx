import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Search, CheckCircle } from 'lucide-react';
import type { RegionRecord } from '../types';
import { calculateRisk, riskLevel, priorityText } from '../hooks/useAgriData';

const geoDictionary: Record<string, { lat: number, lng: number }> = {
  "Andaman and Nicobar": { lat: 11.7401, lng: 92.6586 },
  "Andhra Pradesh": { lat: 15.9129, lng: 79.7400 },
  "Arunachal Pradesh": { lat: 28.2180, lng: 94.7278 },
  "Assam": { lat: 26.2006, lng: 92.9376 },
  "Bihar": { lat: 25.0961, lng: 85.3131 },
  "Chandigarh": { lat: 30.7333, lng: 76.7794 },
  "Chhattisgarh": { lat: 21.2787, lng: 81.8661 },
  "Dadra and Nagar Haveli": { lat: 20.1809, lng: 73.0169 },
  "Delhi": { lat: 28.7041, lng: 77.1025 },
  "Goa": { lat: 15.2993, lng: 74.1240 },
  "Gujarat": { lat: 22.2587, lng: 71.1924 },
  "Haryana": { lat: 29.0588, lng: 76.0856 },
  "Himachal Pradesh": { lat: 31.1048, lng: 77.1734 },
  "Jammu and Kashmir": { lat: 33.7782, lng: 76.5762 },
  "Jharkhand": { lat: 23.6102, lng: 85.2799 },
  "Karnataka": { lat: 15.3173, lng: 75.7139 },
  "Kerala": { lat: 10.8505, lng: 76.2711 },
  "Ladakh": { lat: 34.1526, lng: 77.5771 },
  "Lakshadweep": { lat: 10.5667, lng: 72.6417 },
  "Madhya Pradesh": { lat: 22.9734, lng: 78.6569 },
  "Maharashtra": { lat: 19.7515, lng: 75.7139 },
  "Manipur": { lat: 24.6637, lng: 93.9063 },
  "Meghalaya": { lat: 25.4670, lng: 91.3662 },
  "Mizoram": { lat: 23.1645, lng: 92.9376 },
  "Nagaland": { lat: 26.1584, lng: 94.5624 },
  "Odisha": { lat: 20.9517, lng: 85.0985 },
  "Puducherry": { lat: 11.9416, lng: 79.8083 },
  "Punjab": { lat: 31.1471, lng: 75.3412 },
  "Rajasthan": { lat: 27.0238, lng: 74.2179 },
  "Sikkim": { lat: 27.5330, lng: 88.5122 },
  "Tamil Nadu": { lat: 11.1271, lng: 78.6569 },
  "Telangana": { lat: 18.1124, lng: 79.0193 },
  "Tripura": { lat: 23.9408, lng: 91.9882 },
  "Uttar Pradesh": { lat: 26.8467, lng: 80.9462 },
  "Uttarakhand": { lat: 30.0668, lng: 79.0193 },
  "West Bengal": { lat: 22.9868, lng: 87.8550 }
};

export function DatabaseSection({ 
  records, 
  weatherMap,
  onAddRecord, 
  onDeleteRecord, 
  onResetData 
}: { 
  records: RegionRecord[],
  weatherMap: Record<number, number>,
  onAddRecord: (r: RegionRecord) => void,
  onDeleteRecord: (id: number) => void,
  onResetData: () => void
}) {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const filteredRecords = records.filter(r => 
    r.region.toLowerCase().includes(search.toLowerCase()) || 
    r.crop.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedRecords = filteredRecords.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const totalPages = Math.ceil(filteredRecords.length / rowsPerPage);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const crop = formData.get("crop") as string;
    
    // Crop Presets (Mock API logic)
    const presets: Record<string, { rec: number, water: number }> = {
      "Wheat": { rec: 165, water: 70 },
      "Rice": { rec: 155, water: 85 },
      "Sugarcane": { rec: 205, water: 75 },
      "Cotton": { rec: 160, water: 45 },
      "Corn": { rec: 180, water: 60 }
    };
    
    const cropData = presets[crop] || { rec: 150, water: 50 };
    
    // Fallback to center of India if region not in strict dictionary
    const geo = geoDictionary[formData.get("region") as string] || { lat: 20.5937, lng: 78.9629 };

    onAddRecord({
      region: formData.get("region") as string,
      crop: crop,
      fertiliser: Number(formData.get("fertiliser")),
      recommended: cropData.rec,
      water: cropData.water,
      lat: geo.lat,
      lng: geo.lng,
      timestamp: new Date().toISOString(),
      source_reliability: 98 // High reliability for strict matching
    });
    
    e.currentTarget.reset();
    setIsModalOpen(false);
  };

  const getRiskPillClass = (score: number, rainfall: number) => {
    const level = riskLevel(score, rainfall);
    if (level === 'critical-leaching') return 'bg-purple-100 text-purple-700 border-purple-200';
    if (level === 'high') return 'bg-red-100 text-red-700 border-red-200';
    if (level === 'medium') return 'bg-amber-100 text-amber-700 border-amber-200';
    return 'bg-emerald-100 text-emerald-700 border-emerald-200';
  };

  return (
    <section className="px-6 lg:px-12 py-12" id="database">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-ink">Database Lab</h2>
          <p className="text-muted mt-1">Manage and audit spatial intelligence records.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={onResetData} className="btn-3d px-4 py-2 text-sm font-semibold text-ink transition-colors">
            Reset Data
          </button>
          <button onClick={() => setIsModalOpen(true)} className="btn-black px-4 py-2 text-sm font-semibold flex items-center gap-2">
            <Plus size={16} /> Add Record
          </button>
        </div>
      </div>

      <div className="bento-card overflow-hidden">
        <div className="p-4 border-b border-border bg-zinc-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
            <input 
              type="search" 
              placeholder="Search region or crop..." 
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-9 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ink/20" 
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 border-b border-border">
                <th className="px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider">Region</th>
                <th className="px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider">Crop</th>
                <th className="px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider">Coordinates</th>
                <th className="px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider">Risk Score</th>
                <th className="px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider">Verified</th>
                <th className="px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {paginatedRecords.map(record => {
                  const rainfall = weatherMap[record.id!] || 0;
                  const score = calculateRisk(record, rainfall);
                  return (
                    <motion.tr 
                      key={record.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="border-b border-border hover:bg-zinc-50/50 transition-colors"
                    >
                      <td className="px-6 py-4 font-semibold text-ink">{record.region}</td>
                      <td className="px-6 py-4 text-muted">{record.crop}</td>
                      <td className="px-6 py-4 text-muted text-sm data-number">{record.lat?.toFixed(2)}, {record.lng?.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border data-number ${getRiskPillClass(score, rainfall)}`}>
                          {priorityText(score, rainfall)} ({score}%)
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-emerald-600 text-sm font-medium">
                          <CheckCircle size={14} />
                          <span className="data-number">{record.source_reliability}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => onDeleteRecord(record.id!)}
                          className="text-red-500 hover:text-red-700 text-sm font-semibold transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </motion.tr>
                  )
                })}
              </AnimatePresence>
            </tbody>
          </table>
          {filteredRecords.length === 0 && (
            <div className="p-8 text-center text-muted font-medium">No records found.</div>
          )}
        </div>
        
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-border flex justify-between items-center bg-zinc-50">
            <span className="text-sm text-muted">Showing page {page} of {totalPages}</span>
            <div className="flex gap-2">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1 border border-border rounded text-sm disabled:opacity-50">Prev</button>
              <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="px-3 py-1 border border-border rounded text-sm disabled:opacity-50">Next</button>
            </div>
          </div>
        )}
      </div>

      {/* Slide-over Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col border-l border-border"
            >
              <div className="px-6 py-4 border-b border-border flex justify-between items-center">
                <h3 className="font-bold text-lg">Add New Record</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-muted hover:text-ink"><X size={20} /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 flex-1 overflow-y-auto flex flex-col gap-5">
                <div className="bg-zinc-100 border border-zinc-200 p-4 rounded-lg mb-2">
                  <p className="text-sm text-zinc-800 font-medium">
                    <strong className="font-bold">Smart Fill enabled:</strong> We will automatically assign coordinates, baseline water sensitivity, and FAO-recommended limits based on your crop selection.
                  </p>
                </div>
                
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-semibold text-ink">Region / State</span>
                  <select name="region" required className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                    <option value="">Select an agricultural zone...</option>
                    {Object.keys(geoDictionary).map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-semibold text-ink">Crop Type</span>
                  <select name="crop" required className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                    <option value="">Select a crop...</option>
                    <option value="Wheat">Wheat (Rec: 165kg/ha)</option>
                    <option value="Rice">Rice (Rec: 155kg/ha)</option>
                    <option value="Sugarcane">Sugarcane (Rec: 205kg/ha)</option>
                    <option value="Cotton">Cotton (Rec: 160kg/ha)</option>
                    <option value="Corn">Corn (Rec: 180kg/ha)</option>
                  </select>
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-semibold text-ink">Actual Fertiliser Used (kg/ha)</span>
                  <input name="fertiliser" type="number" min="0" placeholder="e.g. 210" required className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white" />
                </label>
                
                <div className="mt-auto pt-6 border-t border-border flex justify-end gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="btn-3d px-4 py-2 text-sm font-semibold">Cancel</button>
                  <button type="submit" className="btn-3d px-4 py-2 text-sm font-semibold">Generate Record</button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
