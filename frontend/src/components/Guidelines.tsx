import { motion } from 'framer-motion';
import { BookOpen, Droplets, Sprout, AlertTriangle } from 'lucide-react';

const guideData = [
  {
    title: "FAO Nitrogen Baselines",
    description: "Our system cross-references field inputs with the Food and Agriculture Organization's maximum safe yield thresholds. Exceeding these limits dramatically increases toxicity without improving crop yield.",
    icon: <Sprout className="text-zinc-800" size={24} />,
    color: "bg-zinc-100 border-zinc-200",
    delay: 0.1
  },
  {
    title: "Rainfall Leaching Logic",
    description: "Live weather feeds from OpenWeather API calculate immediate runoff risk. If rainfall exceeds 10mm/hr shortly after application, the Risk Score algorithm automatically penalizes the region.",
    icon: <Droplets className="text-zinc-800" size={24} />,
    color: "bg-zinc-100 border-zinc-200",
    delay: 0.2
  },
  {
    title: "Risk Calculation Formula",
    description: "Risk = [(Actual Fertiliser / Recommended) * 100] + (Rainfall * Water Sensitivity). A total score >80% triggers a Critical Leaching warning, prioritizing the region for immediate agronomist intervention.",
    icon: <AlertTriangle className="text-zinc-800" size={24} />,
    color: "bg-zinc-100 border-zinc-200",
    delay: 0.3
  },
  {
    title: "Data Reliability Index",
    description: "The 'Verified' percentage on each record represents the source's confidence. Manual inputs drop to 75% over time, while real-time IoT sensor data maintains a 98% reliability score.",
    icon: <BookOpen className="text-zinc-800" size={24} />,
    color: "bg-zinc-100 border-zinc-200",
    delay: 0.4
  }
];

export function Guidelines() {
  return (
    <section className="px-6 lg:px-12 py-20 bg-white" id="guide">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-ink mb-4"
          >
            FAO Guidelines & Intelligence Engine
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted max-w-2xl mx-auto"
          >
            Understand exactly how AgroPro calculates risk, penalizes weather events, and standardizes data against global Food and Agriculture Organization benchmarks.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {guideData.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.5, 
                delay: card.delay,
                type: "spring",
                stiffness: 100 
              }}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
              }}
              className={`p-8 rounded-2xl border ${card.color} transition-all duration-300 cursor-default bg-white`}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-sm border ${card.color} bg-white`}>
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-ink mb-3">{card.title}</h3>
              <p className="text-zinc-600 leading-relaxed text-sm">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
