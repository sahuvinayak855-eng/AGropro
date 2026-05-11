import React, { useState } from 'react';
import type { RegionRecord } from '../types';
import { calculateRisk, riskLevel, calculateOveruse, priorityText } from '../hooks/useAgriData';

export function MapSection({ records }: { records: RegionRecord[] }) {
  const [cropFilter, setCropFilter] = useState('all');
  const [selectedId, setSelectedId] = useState<number | null>(records.length ? records[0].id ?? null : null);

  const crops = [...new Set(records.map(r => r.crop))].sort();
  const filteredRecords = records.filter(r => cropFilter === 'all' || r.crop === cropFilter);
  const selectedRecord = records.find(r => r.id === selectedId) || records[0];

  const getRiskBgClass = (score: number) => {
    const level = riskLevel(score);
    if (level === 'high') return 'bg-[#f7a38d]';
    if (level === 'medium') return 'bg-[#ffe19b]';
    return 'bg-[#d9f0cf]';
  };

  return (
    <section className="px-4 lg:px-[76px] py-16" id="mapping">
      <div className="max-w-[760px] mb-7">
        <p className="text-[#6c8a76] text-xs font-extrabold uppercase mb-2">Spatial intelligence</p>
        <h2 className="text-3xl lg:text-5xl font-extrabold leading-tight m-0">Map hotspots by crop, nutrient load, and water sensitivity.</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-6">
        <section className="p-5 border border-line rounded-lg bg-white shadow-[0_24px_70px_rgba(31,55,37,0.14)]" aria-label="Fertiliser overuse map">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <span className="text-[#6c8a76] text-xs font-extrabold uppercase mb-2 block">Risk Map</span>
              <h3 className="text-xl font-bold m-0">District Nutrient Pressure</h3>
            </div>
            <select 
              value={cropFilter}
              onChange={(e) => setCropFilter(e.target.value)}
              className="w-full sm:w-auto border border-line rounded-lg px-3 py-3 text-ink bg-white"
              aria-label="Filter regions by crop"
            >
              <option value="all">All crops</option>
              {crops.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 min-h-[340px]">
            {filteredRecords.length > 0 ? filteredRecords.map(record => {
              const score = calculateRisk(record);
              return (
                <button 
                  key={record.id}
                  onClick={() => setSelectedId(record.id ?? null)}
                  className={`min-h-[148px] p-3 border-0 rounded-lg text-left cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl focus:outline focus:outline-4 focus:outline-brand-green/20 ${getRiskBgClass(score)}`}
                >
                  <strong className="block mb-2 text-base">{record.region}</strong>
                  <span className="block text-ink/70 font-bold">{record.crop}</span>
                  <span className="block text-ink/70 font-bold">{calculateOveruse(record)} kg/ha over</span>
                  <span className="block text-ink/70 font-bold">{score}% risk</span>
                </button>
              );
            }) : (
              <p className="col-span-full p-4 text-center text-muted">No matching records in the database.</p>
            )}
          </div>
          
          <div className="flex items-center justify-end gap-4 mt-4 text-muted text-sm font-bold" aria-label="Risk legend">
            <span className="flex items-center"><i className="inline-block w-3 h-3 mr-1.5 rounded-full bg-[#88c66e]"></i>Balanced</span>
            <span className="flex items-center"><i className="inline-block w-3 h-3 mr-1.5 rounded-full bg-brand-amber"></i>Watch</span>
            <span className="flex items-center"><i className="inline-block w-3 h-3 mr-1.5 rounded-full bg-brand-red"></i>Critical</span>
          </div>
        </section>

        <aside className="self-start p-5 border border-line rounded-lg bg-white shadow-[0_24px_70px_rgba(31,55,37,0.14)]" aria-label="Selected region insight">
          <span className="text-[#6c8a76] text-xs font-extrabold uppercase mb-2 block">Selected Region</span>
          <h3 className="text-2xl font-bold mb-2 m-0">{selectedRecord?.region || 'Choose a region'}</h3>
          <p className="text-muted leading-relaxed mb-4">
            {selectedRecord 
              ? `${selectedRecord.region} is mapped as ${priorityText(calculateRisk(selectedRecord)).toLowerCase()} priority because it uses ${calculateOveruse(selectedRecord)} kg/ha more fertiliser than the recommendation, with ${selectedRecord.water}% water sensitivity.`
              : 'Select any map cell to see nutrient overuse, crop dependency, irrigation pressure, and suggested action.'}
          </p>
          <dl className="m-0">
            <div className="flex justify-between gap-4 py-3 border-t border-line">
              <dt className="text-muted font-bold">Crop</dt>
              <dd className="m-0 font-extrabold text-right">{selectedRecord?.crop || '--'}</dd>
            </div>
            <div className="flex justify-between gap-4 py-3 border-t border-line">
              <dt className="text-muted font-bold">Fertiliser Use</dt>
              <dd className="m-0 font-extrabold text-right">{selectedRecord ? `${selectedRecord.fertiliser} kg/ha` : '--'}</dd>
            </div>
            <div className="flex justify-between gap-4 py-3 border-t border-line">
              <dt className="text-muted font-bold">Recommended</dt>
              <dd className="m-0 font-extrabold text-right">{selectedRecord ? `${selectedRecord.recommended} kg/ha` : '--'}</dd>
            </div>
            <div className="flex justify-between gap-4 py-3 border-t border-line">
              <dt className="text-muted font-bold">Priority</dt>
              <dd className="m-0 font-extrabold text-right">
                {selectedRecord ? `${priorityText(calculateRisk(selectedRecord))} (${calculateRisk(selectedRecord)}%)` : '--'}
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
