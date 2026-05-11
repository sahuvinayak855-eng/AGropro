import React from 'react';
import { Activity, Droplets, MapPin, AlertTriangle } from 'lucide-react';

export function Metrics({ 
  totalRegions, 
  avgOveruse, 
  avgWater, 
  avgRisk 
}: { 
  totalRegions: number, 
  avgOveruse: number, 
  avgWater: number, 
  avgRisk: number 
}) {
  return (
    <section className="px-6 lg:px-12 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="overview">
      <div className="bento-card p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <span className="text-muted font-medium text-sm">Active Regions</span>
          <MapPin size={18} className="text-muted" />
        </div>
        <div>
          <strong className="block text-4xl font-extrabold data-number text-ink mb-1">{totalRegions}</strong>
          <small className="text-emerald-600 font-medium text-sm flex items-center gap-1">
            <span className="relative flex h-2 w-2 mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Live tracking active
          </small>
        </div>
      </div>

      <div className="bento-card p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <span className="text-muted font-medium text-sm">Avg. Overuse</span>
          <Activity size={18} className="text-muted" />
        </div>
        <div>
          <strong className="block text-4xl font-extrabold data-number text-ink mb-1">{Math.round(avgOveruse)}<span className="text-lg text-muted ml-1">kg/ha</span></strong>
          <small className="text-muted font-medium text-sm">Above recommended</small>
        </div>
      </div>

      <div className="bento-card p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <span className="text-muted font-medium text-sm">Water Sensitivity</span>
          <Droplets size={18} className="text-blue-500" />
        </div>
        <div>
          <strong className="block text-4xl font-extrabold data-number text-ink mb-1">{Math.round(avgWater)}%</strong>
          <small className="text-muted font-medium text-sm">Runoff/Leaching exposure</small>
        </div>
      </div>

      <div className="bento-card p-6 flex flex-col justify-between hover:shadow-md transition-shadow bg-gradient-to-br from-surface to-red-50/30">
        <div className="flex justify-between items-start mb-4">
          <span className="text-muted font-medium text-sm">Yield Risk Signal</span>
          <AlertTriangle size={18} className="text-amber-500" />
        </div>
        <div>
          <strong className="block text-4xl font-extrabold data-number text-ink mb-1">{Math.round(avgRisk)}%</strong>
          <small className="text-amber-600 font-medium text-sm">Soil imbalance detected</small>
        </div>
      </div>
    </section>
  );
}
