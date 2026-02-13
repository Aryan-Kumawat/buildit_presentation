"use client"

import { ScanText, Calculator, Droplets, Languages } from "lucide-react"

export function MVP() {
  const features = [
    {
      title: "Soil Test OCR Engine",
      description: "Upload any soil health card. Our AI instantly extracts 12 key chemical parameters with 99% accuracy.",
      icon: <ScanText className="h-8 w-8 text-yellow-400" />,
      gradient: "from-yellow-400/20 to-orange-500/20",
      border: "group-hover:border-yellow-500/50"
    },
    {
      title: "Linear Programming Solver",
      description: "Mathematical optimization engine that calculates the absolute cheapest fertilizer mix to hit N-P-K targets.",
      icon: <Calculator className="h-8 w-8 text-green-400" />,
      gradient: "from-green-400/20 to-emerald-500/20",
      border: "group-hover:border-green-500/50"
    },
    {
      title: "ET-Based Irrigation",
      description: "Dynamic water scheduling using real-time Evapotranspiration (ET0) data and crop coefficient (Kc) curves.",
      icon: <Droplets className="h-8 w-8 text-blue-400" />,
      gradient: "from-blue-400/20 to-cyan-500/20",
      border: "group-hover:border-blue-500/50"
    },
    {
      title: "Gemini Voice Assistant",
      description: "Farmers can talk in their local dialect. We translate, process, and respond with actionable audio advice.",
      icon: <Languages className="h-8 w-8 text-purple-400" />,
      gradient: "from-purple-400/20 to-pink-500/20",
      border: "group-hover:border-purple-500/50"
    },
  ]

  return (
    <section id="mvp" className="relative px-6 py-24 md:px-12 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl font-bold md:text-5xl lg:text-6xl mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-green-400 to-emerald-400">
              Power Features
            </span>
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            We don't just track data. We process it with military-grade precision algorithms.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className={`group relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/40 p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 ${feature.border}`}
            >
              {/* Hover Gradient Background */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${feature.gradient}`} />
              
              <div className="relative z-10 flex flex-col gap-6">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-800/50 border border-neutral-700 shadow-inner group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-neutral-400 transition-all">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-400 text-lg leading-relaxed group-hover:text-neutral-200 transition-colors">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Decorative Corner Glow */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 blur-2xl rounded-full group-hover:bg-white/10 transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>

      {/* CSS for custom animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  )
}
