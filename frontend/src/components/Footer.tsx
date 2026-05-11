
export function Footer() {
  return (
    <div className="mx-auto w-full px-3 relative z-10 overflow-hidden border-t border-border py-16 backdrop-blur-lg md:rounded-t-2xl max-w-screen-xl bg-transparent lg:px-4 xl:px-0">
      <footer>
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          
          {/* Brand & Socials */}
          <div className="flex flex-col gap-6">
            <div className="grow">
              <a className="block max-w-fit flex items-center gap-2" href="#home">
                <span className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center font-bold text-white shadow-sm">A</span>
                <span className="font-bold tracking-tight text-white text-xl">AgroPro</span>
              </a>
              <p className="mt-4 text-sm text-muted max-w-xs">
                The open-source geospatial intelligence platform for precision agriculture and sustainable fertiliser management.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a href="#" className="group rounded-full p-1 border border-border hover:bg-zinc-100 transition-colors">
                <span className="sr-only">Twitter</span>
                <svg width="300" height="300" viewBox="0 0 300 300" className="p-px w-4 h-4 text-muted transition-colors duration-75 group-hover:text-ink"><path stroke="currentColor" d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66"></path></svg>
              </a>
              <a href="#" className="group rounded-full p-1 border border-border hover:bg-zinc-100 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-muted transition-colors duration-75 group-hover:text-ink"><path fill="currentColor" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
              </a>
              <a href="#" className="group rounded-full p-1 border border-border hover:bg-zinc-100 transition-colors">
                <span className="sr-only">GitHub</span>
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-muted transition-colors duration-75 group-hover:text-ink"><path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
              </a>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-4 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2">
              <div className="grid gap-8">
                <div>
                  <h3 className="text-sm font-medium text-white">Product</h3>
                  <ul role="list" className="flex flex-col mt-2.5 gap-3.5">
                    <li><a className="flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors duration-75" href="#home">Dashboard Map</a></li>
                    <li><a className="flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors duration-75" href="#database">Database Lab</a></li>
                    <li><a className="flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors duration-75" href="#">AgroPro API</a></li>
                    <li><a className="flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors duration-75" href="#">Enterprise</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">Solutions</h3>
                  <ul role="list" className="flex flex-col mt-2.5 gap-3.5">
                    <li><a className="flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors duration-75" href="#">For Governments</a></li>
                    <li><a className="flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors duration-75" href="#">For Field Agronomists</a></li>
                    <li><a className="flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors duration-75" href="#">NGO Partners</a></li>
                  </ul>
                </div>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-medium text-white">Resources</h3>
                <ul role="list" className="flex flex-col mt-2.5 gap-3.5">
                  <li><a className="flex items-center text-sm text-muted hover:text-ink transition-colors duration-75 gap-1" href="#">Documentation</a></li>
                  <li><a className="flex items-center text-sm text-muted hover:text-ink transition-colors duration-75 gap-1" href="#">Help Center</a></li>
                  <li><a className="flex items-center text-sm text-muted hover:text-ink transition-colors duration-75 gap-1" href="#">Integrations</a></li>
                  <li><a className="flex items-center text-sm text-muted hover:text-ink transition-colors duration-75 gap-1" href="#">Open Data</a></li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2">
              <div className="grid gap-8">
                <div>
                  <h3 className="text-sm font-medium text-white">Company</h3>
                  <ul role="list" className="flex flex-col mt-2.5 gap-3.5">
                    <li><a className="flex items-center text-sm text-muted hover:text-ink transition-colors duration-75 gap-1" href="#">About Us</a></li>
                    <li><a className="flex items-center text-sm text-muted hover:text-ink transition-colors duration-75 gap-1" href="#">Research Blog</a></li>
                    <li><a className="flex items-center text-sm text-muted hover:text-ink transition-colors duration-75 gap-1" href="#">Careers</a></li>
                    <li><a className="flex items-center text-sm text-muted hover:text-ink transition-colors duration-75 gap-1" href="#">Contact</a></li>
                  </ul>
                </div>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-medium text-white">Compare</h3>
                <ul role="list" className="flex flex-col mt-2.5 gap-3.5">
                  <li><a className="flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors duration-75" href="#">AgroPro vs ArcGIS</a></li>
                  <li><a className="flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors duration-75" href="#">AgroPro vs QGIS</a></li>
                  <li><a className="flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors duration-75" href="#">AgroPro vs Mapbox</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-200 flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          <a target="_blank" className="group flex max-w-fit items-center gap-2 rounded-lg border border-zinc-200 bg-white py-2 pl-2 pr-2.5 transition-colors hover:bg-zinc-50" href="#">
            <div className="relative w-2 h-2">
              <div className="absolute inset-0 m-auto w-2 h-2 animate-ping rounded-full bg-emerald-500"></div>
              <div className="absolute inset-0 z-10 w-2 h-2 rounded-full bg-emerald-500"></div>
            </div>
            <p className="text-xs font-semibold leading-none text-zinc-600">OpenWeather API Operational</p>
          </a>
          
          <div className="flex gap-4 items-center">
             <span className="text-xs font-semibold text-zinc-400 bg-zinc-800 px-3 py-1.5 rounded-md border border-zinc-700">Open Source</span>
             <span className="text-xs font-semibold text-zinc-400 bg-zinc-800 px-3 py-1.5 rounded-md border border-zinc-700">FAO Verified</span>
          </div>

          <p className="text-xs font-medium text-muted">© {new Date().getFullYear()} AgroPro Intelligence.</p>
        </div>
      </footer>
    </div>
  );
}
