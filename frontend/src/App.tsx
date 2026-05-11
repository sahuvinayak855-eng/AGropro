import { InteractiveMap } from './components/InteractiveMap';
import { Metrics } from './components/Metrics';
import { DatabaseSection } from './components/DatabaseSection';
import { Guidelines } from './components/Guidelines';
import { Footer } from './components/Footer';
import Particles from './components/Particles';
import { Navbar } from './components/Navbar';
import { useAgriData, calculateRisk, calculateOveruse } from './hooks/useAgriData';

function App() {
  const { records, loading, weatherMap, handleAddRecord, handleDeleteRecord, handleResetData } = useAgriData();

  if (loading) return <div className="p-10 text-center font-bold h-screen flex items-center justify-center text-ink bg-paper">Loading Spatial Intelligence...</div>;

  const count = records.length || 1;
  const avgOveruse = records.reduce((sum, r) => sum + calculateOveruse(r), 0) / count;
  const avgWater = records.reduce((sum, r) => sum + Number(r.water), 0) / count;
  const avgRisk = Math.round(records.reduce((sum, r) => sum + calculateRisk(r, weatherMap[r.id!] || 0), 0) / count);

  return (
    <div className="bg-paper text-ink font-sans flex flex-col items-center">
      
      <Navbar />

      <main className="w-full flex-1 mx-auto pt-24" id="home">
        
        <section className="w-full min-h-[90vh] relative overflow-hidden flex flex-col items-center justify-center pt-24 pb-20" style={{ backgroundColor: '#ffffff' }}>
          <div className="absolute inset-0 z-0 opacity-80">
            <Particles
              particleColors={["#000000"]}
              particleCount={750}
              particleSpread={10}
              speed={0.1}
              particleBaseSize={80}
              moveParticlesOnHover={false}
              alphaParticles={false}
              disableRotation={false}
              pixelRatio={1}
            />
          </div>
          

          <div className="relative z-10 flex flex-col items-center text-center max-w-4xl px-4 mt-12">
            
            <div className="mb-10 px-5 py-2 rounded-full bg-white border border-zinc-100 flex items-center gap-2" style={{ boxShadow: "rgba(158, 158, 158, 0.2) 0px 4px 10px, rgb(255, 255, 255) 0px 2px 2px 0px inset" }}>
              <span className="text-zinc-400">✨</span>
              <span className="text-xs font-bold text-zinc-700 tracking-widest uppercase">Precision Agriculture Intelligence</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
              <div className="w-24 h-24 sm:w-28 sm:h-28 bg-black rounded-full flex items-center justify-center" style={{ boxShadow: "rgba(0, 0, 0, 0.4) 0px 10px 30px, rgba(255, 255, 255, 0.2) 0px 2px 5px inset" }}>
                 <div className="w-12 h-12 border-4 border-white rounded-md transform rotate-45 flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded-sm"></div>
                 </div>
              </div>
              <h1 className="text-7xl sm:text-[110px] font-medium tracking-tighter text-zinc-900 leading-none">
                AGRO PRO
              </h1>
            </div>

            <p className="text-xl sm:text-2xl text-zinc-800 mb-12 max-w-3xl font-medium tracking-tight">
              Custom spatial intelligence, built for the innovators of tomorrow
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a className="btn-black px-8 py-4 font-semibold text-lg flex items-center gap-2" href="#dashboard">
                Get Started <span className="text-2xl leading-none -mt-1">↗</span>
              </a>
              <a className="btn-3d px-8 py-4 font-semibold text-lg text-black" href="#database">
                See Our Services
              </a>
            </div>
          </div>
        </section>

        <div className="p-6 lg:p-10 max-w-[1600px] mx-auto w-full" id="dashboard">

        <InteractiveMap records={records} avgRisk={avgRisk} weatherMap={weatherMap} />
        
        <div className="max-w-[1400px] mx-auto w-full">
          <Metrics 
            totalRegions={records.length} 
            avgOveruse={avgOveruse} 
            avgWater={avgWater} 
            avgRisk={avgRisk} 
          />
          
          <div id="database">
            <DatabaseSection 
              records={records}
              weatherMap={weatherMap}
              onAddRecord={handleAddRecord}
              onDeleteRecord={handleDeleteRecord}
              onResetData={handleResetData}
            />
          </div>
          
          <Guidelines />
        </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
