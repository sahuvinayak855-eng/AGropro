import React from 'react';
import { Globe, Map, Database, ShieldAlert, Settings } from 'lucide-react';

export function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-screen w-64 glass-panel border-r border-white/20 z-50 flex flex-col p-6 hidden md:flex">
      <a href="/index.html" className="flex items-center gap-3 mb-12 hover:opacity-80 transition-opacity">
        <div className="grid w-10 h-10 place-items-center rounded-xl bg-ink text-white font-bold shadow-md">
          A
        </div>
        <span className="font-extrabold text-xl tracking-tight text-ink">AgroPro</span>
      </a>

      <nav className="flex-1 space-y-2">
        <a href="#overview" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/50 text-ink font-semibold shadow-sm border border-white/40">
          <Globe size={18} /> Global Overview
        </a>
        <a href="#mapping" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted hover:bg-white/30 hover:text-ink transition-colors font-semibold">
          <Map size={18} /> Regional Hotspots
        </a>
        <a href="#database" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted hover:bg-white/30 hover:text-ink transition-colors font-semibold">
          <Database size={18} /> Database Lab
        </a>
        <a href="#actions" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted hover:bg-white/30 hover:text-ink transition-colors font-semibold">
          <ShieldAlert size={18} /> Policy Actions
        </a>
      </nav>

      <div className="mt-auto pt-6 border-t border-border">
        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted hover:bg-white/30 transition-colors font-semibold">
          <Settings size={18} /> Settings
        </a>
      </div>
    </aside>
  );
}
