
export function Hero({ avgRisk }: { avgRisk: number }) {
  const heroRiskCopy = avgRisk >= 62
      ? "Several areas need urgent nutrient-balancing and water protection."
      : "Current records show opportunities for targeted, efficient application.";

  return (
    <section className="min-h-[650px] grid grid-cols-1 lg:grid-cols-[1.06fr_0.62fr] gap-6 lg:gap-[72px] items-center px-4 lg:px-[76px] py-14 lg:py-12 bg-cover bg-center text-white relative"
      style={{
        backgroundImage: `linear-gradient(110deg, rgba(20, 43, 26, 0.82), rgba(26, 82, 54, 0.58)), url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=80")`
      }}>
      <div>
        <p className="text-[#dbf3dc] text-xs font-extrabold uppercase tracking-widest mb-2">Food security + smarter fertiliser use</p>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold max-w-[860px] leading-tight mb-5">
          Map fertiliser overuse before it becomes a harvest problem.
        </h1>
        <p className="text-white/80 text-lg leading-relaxed max-w-[660px] mb-8">
          A practical dashboard for tracking nutrient stress, crop risk, water
          impact, and field-level priorities across agricultural regions.
        </p>
        <div className="flex flex-wrap gap-3">
          <a className="px-5 py-3.5 bg-white text-ink rounded-lg font-extrabold cursor-pointer" href="#dashboard">Explore dashboard</a>
          <a className="px-5 py-3.5 bg-transparent border border-white/50 text-white rounded-lg font-extrabold cursor-pointer" href="#database">Manage records</a>
        </div>
      </div>
      
      <aside className="p-6 bg-white/95 rounded-lg border border-line shadow-2xl text-ink" aria-label="Live overuse summary">
        <span className="text-[#6c8a76] text-xs font-extrabold uppercase mb-2 block">Regional Risk Snapshot</span>
        <div 
          className="grid w-[min(240px,70vw)] aspect-square mx-auto my-4 place-items-center rounded-full text-5xl font-extrabold"
          style={{ background: 'conic-gradient(var(--color-brand-red) 0deg, var(--color-brand-amber) 185deg, var(--color-brand-mint) 260deg)' }}
        >
          <div className="flex items-start bg-white w-[85%] h-[85%] rounded-full items-center justify-center">
             <span>{avgRisk}<span className="text-lg">%</span></span>
          </div>
        </div>
        <p className="text-center text-muted font-semibold">{heroRiskCopy}</p>
        
        <div className="grid grid-cols-5 items-end gap-2.5 h-[82px] mt-6" aria-hidden="true">
          <span className="bg-gradient-to-b from-brand-green to-brand-amber rounded-t-lg w-full" style={{ height: '52%' }}></span>
          <span className="bg-gradient-to-b from-brand-green to-brand-amber rounded-t-lg w-full" style={{ height: '78%' }}></span>
          <span className="bg-gradient-to-b from-brand-green to-brand-amber rounded-t-lg w-full" style={{ height: '44%' }}></span>
          <span className="bg-gradient-to-b from-brand-green to-brand-amber rounded-t-lg w-full" style={{ height: '88%' }}></span>
          <span className="bg-gradient-to-b from-brand-green to-brand-amber rounded-t-lg w-full" style={{ height: '61%' }}></span>
        </div>
      </aside>
    </section>
  );
}
