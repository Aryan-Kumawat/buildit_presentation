"use client"

import React from "react"

/**
 * CropWise MVP Section
 * This component uses inline SVGs to ensure zero dependency errors 
 * and provides both named and default exports to prevent import mismatches.
 */
export function MVP() {
  const features = [
    {
      title: "Soil Test OCR Engine",
      description: "Upload any soil health card. Our AI instantly extracts 12 key chemical parameters with 99% accuracy.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
          <path d="M4 7V4a2 2 0 0 1 2-2h2" />
          <path d="M16 2h2a2 2 0 0 1 2 2v3" />
          <path d="M20 17v2a2 2 0 0 1-2 2h-2" />
          <path d="M8 21H6a2 2 0 0 1-2-2v-2" />
          <path d="M7 12h10" />
          <path d="M10 8v8" />
          <path d="M14 8v8" />
        </svg>
      ),
      gradient: "from-yellow-400/20 to-orange-500/20",
      border: "group-hover:border-yellow-500/50"
    },
    {
      title: "Linear Programming Solver",
      description: "Mathematical optimization engine that calculates the absolute cheapest fertilizer mix to hit N-P-K targets.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
          <rect width="16" height="20" x="4" y="2" rx="2" />
          <line x1="8" x2="16" y1="6" y2="6" />
          <line x1="16" x2="16" y1="14" y2="18" />
          <path d="M16 10h.01" />
          <path d="M12 10h.01" />
          <path d="M8 10h.01" />
          <path d="M12 14h.01" />
          <path d="M8 14h.01" />
          <path d="M12 18h.01" />
          <path d="M8 18h.01" />
        </svg>
      ),
      gradient: "from-green-400/20 to-emerald-500/20",
      border: "group-hover:border-green-500/50"
    },
    {
      title: "ET-Based Irrigation",
      description: "Dynamic water scheduling using real-time Evapotranspiration (ET0) data and crop coefficient (Kc) curves.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
          <path d="m7 16.3c2.2 0 4-1.8 4-4 0-3.3-4-6.3-4-6.3s-4 3-4 6.3c0 2.2 1.8 4 4 4Z" />
          <path d="m17 16.3c2.2 0 4-1.8 4-4 0-3.3-4-6.3-4-6.3s-4 3-4 6.3c0 2.2 1.8 4 4 4Z" />
        </svg>
      ),
      gradient: "from-blue-400/20 to-cyan-500/20",
      border: "group-hover:border-blue-500/50"
    },
    {
      title: "Gemini Voice Assistant",
      description: "Farmers can talk in their local dialect. We translate, process, and respond with actionable audio advice.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
          <path d="m5 8 6 6" />
          <path d="m4 14 6-6 2-3" />
          <path d="M2 5h12" />
          <path d="M7 2h1" />
          <path d="m22 22-5-10-5 10" />
          <path d="M14 18h6" />
        </svg>
      ),
      gradient: "from-purple-400/20 to-pink-500/20",
      border: "group-hover:border-purple-500/50"
    },
  ]

  return (
    <section id="mvp" className="relative px-6 py-24 md:px-12 overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-6xl">
        {/* CSS Keyframes injected via dangerouslySetInnerHTML to ensure compatibility with Next.js App Router */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
          }
        `}} />

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
              {/* Animated Gradient Background on Hover */}
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

              {/* Decorative Glow Orb */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 blur-2xl rounded-full group-hover:bg-white/10 transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Adding Default Export to handle any import style (named or default) from page.tsx
export default MVP;
