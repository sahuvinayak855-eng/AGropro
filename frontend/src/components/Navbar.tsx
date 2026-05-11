import { ChevronDown, Menu } from 'lucide-react';

export function Navbar() {
  return (
    <div className="fixed top-0 inset-x-0 z-50 flex justify-center p-4 pointer-events-none">
      <header className="pointer-events-auto w-full max-w-[1400px] bg-white/70 backdrop-blur-xl border border-white/20 shadow-lg rounded-2xl flex items-center justify-between px-4 py-3">
        
        {/* Logo */}
        <a className="flex items-center gap-2 group shrink-0" href="#home" aria-label="AgroPro home">
          <span className="w-8 h-8 bg-black rounded-lg flex items-center justify-center font-bold text-white shadow-sm transition-transform group-hover:scale-105">A</span>
          <span className="font-bold tracking-tight text-ink text-lg hidden sm:block">AgroPro</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#home" className="text-sm font-medium text-muted hover:text-ink transition-colors">Overview</a>
          
          <a href="#dashboard" className="flex items-center gap-1 text-sm font-medium text-muted hover:text-ink transition-colors">
            Interactive Map
          </a>
          
          <a href="#database" className="text-sm font-medium text-muted hover:text-ink transition-colors">Database Lab</a>
          
          <a href="#guide" className="flex items-center gap-1 text-sm font-medium text-muted hover:text-ink transition-colors">
            FAO Guidelines <ChevronDown size={16} className="opacity-50" />
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <a 
            href="#database" 
            className="hidden sm:flex items-center gap-2 btn-black px-5 py-2.5 font-medium text-sm transition-all"
          >
            Add Region
          </a>
          
          <button className="md:hidden p-2 text-ink hover:bg-zinc-100 rounded-lg transition-colors">
            <Menu size={20} />
          </button>
        </div>
        
      </header>
    </div>
  );
}
