import React from 'react';

export function Header() {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-6 px-4 md:px-14 py-4 border-b border-line/80 bg-paper/90 backdrop-blur-md">
      <a className="flex items-center gap-2.5 font-extrabold text-ink" href="#home" aria-label="AgroPro home">
        <span className="grid w-8 h-8 place-items-center rounded-lg text-white bg-brand-green">A</span>
        <span>AgroPro</span>
      </a>
      <nav className="hidden md:flex items-center gap-6 text-muted text-sm font-semibold" aria-label="Primary navigation">
        <a href="#dashboard" className="hover:text-ink transition-colors">Dashboard</a>
        <a href="#mapping" className="hover:text-ink transition-colors">Mapping</a>
        <a href="#database" className="hover:text-ink transition-colors">Database</a>
        <a href="#actions" className="hover:text-ink transition-colors">Actions</a>
      </nav>
      <a className="hidden md:block px-4 py-2.5 rounded-lg font-extrabold cursor-pointer text-white bg-ink" href="#database">
        Add Region
      </a>
    </header>
  );
}
