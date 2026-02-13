"use client"

import React, { useState, useRef, useEffect } from "react"

/**
 * CROPWISE: THE FUTURE OF PRECISION AGRICULTURE
 * * Features:
 * - Scroll-driven reveal animations (Apple-style)
 * - Gemini 2.5 Flash Integrated Smart Lab
 * - Floating background particles
 * - Production-safe Tailwind animations (No build-breaking style tags)
 */

export default function App() {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [userInput, setUserInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Gemini API Configuration (Injected at runtime)
  const apiKey = "";

  useEffect(() => {
    setActive(true);

    // Intersection Observer for Scroll-Reveal Animations
    const observerOptions = { threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0', 'scale-100');
          entry.target.classList.remove('opacity-0', 'translate-y-20', 'scale-95');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // --- Gemini API Logic with Exponential Backoff ---
  async function callWithRetry(fn: () => Promise<any>, retries = 5, delay = 1000) {
    for (let i = 0; i < retries; i++) {
      try {
        const res = await fn();
        if (!res.ok) throw new Error("API Request Failed");
        return await res.json();
      } catch (err) {
        if (i === retries - 1) throw err;
        await new Promise(r => setTimeout(r, delay));
        delay *= 2;
      }
    }
  }

  const askExpert = async () => {
    if (!userInput) return;
    setLoading(true);
    setAiResponse("Querying specialized Agri-LLM engine...");
    try {
      const data = await callWithRetry(() => fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Answer as a precision crop scientist: ${userInput}` }] }],
          systemInstruction: { parts: [{ text: "Strict, scientific, and data-driven advice only. Use bold for key nutrients." }] }
        })
      }));
      setAiResponse(data.candidates[0].content.parts[0].text);
    } catch (e) {
      setAiResponse("System error. Check network connection.");
    } finally { setLoading(false); }
  };

  const handleOCR = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setAiResponse("Vision system parsing soil test image...");
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = (reader.result as string).split(',')[1];
      try {
        const data = await callWithRetry(() => fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: "Extract N, P, K and pH from this soil health report card." }, { inlineData: { mimeType: "image/png", data: base64 } }] }]
          })
        }));
        setAiResponse(data.candidates[0].content.parts[0].text);
      } catch (e) { setAiResponse("OCR parsing error."); } finally { setLoading(false); }
    };
    reader.readAsDataURL(file);
  };

  return (
    <main className="relative min-h-screen bg-[#050505] text-white selection:bg-emerald-500/30 overflow-x-hidden font-sans">
      
      {/* Background Atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-emerald-600/5 blur-[120px] rounded-full animate-pulse [animation-delay:2s]" />
      </div>

      <div className="relative z-10 flex flex-col gap-32 pb-32">
        
        {/* HERO SECTION */}
        <section id="hero" className="relative flex min-h-screen flex-col justify-center px-6 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i}
                className="absolute hidden md:block transition-all duration-[4000ms] ease-in-out"
                style={{
                  top: `${20 + (i * 12)}%`,
                  left: `${15 + (i * 14)}%`,
                  transform: active ? `translateY(${i % 2 === 0 ? '-30px' : '30px'})` : 'translateY(0px)',
                  opacity: active ? 0.2 : 0
                }}
              >
                <div className="h-14 w-14 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-center text-2xl animate-bounce" style={{ animationDuration: `${3 + i}s` }}>
                  {['🧬', '💧', '🌾', '📊', '🧪', '🤖'][i]}
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto max-w-6xl text-center relative z-10">
            <div className={`mb-8 inline-flex items-center gap-3 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 text-xs font-bold tracking-[0.2em] text-emerald-400 uppercase transition-all duration-1000 ${active ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              AI-Driven Precision Agriculture
            </div>

            <h1 className="mb-8 text-7xl font-black tracking-tighter text-white md:text-9xl italic uppercase">
              <span className={`inline-block transition-all duration-1000 ${active ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>Crop</span>
              <span className={`inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-emerald-400 transition-all duration-1000 delay-300 ${active ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>Wise</span>
            </h1>

            <p className={`mb-12 text-xl text-neutral-400 md:text-3xl max-w-3xl mx-auto leading-tight transition-all duration-1000 delay-500 ${active ? 'opacity-100' : 'opacity-0'}`}>
              Bridging the yield gap with <span className="text-white">deterministic math</span> and <span className="text-white">generative AI</span>.
            </p>

            <div className={`flex flex-col items-center gap-4 sm:flex-row sm:justify-center transition-all duration-1000 delay-700 ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <a href="#problem" className="group relative px-12 py-5 bg-white text-black font-black rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95">
                <span className="relative z-10 uppercase tracking-widest">Launch Lab</span>
                <div className="absolute inset-0 bg-emerald-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>
              <button className="px-12 py-5 border border-white/10 bg-white/5 backdrop-blur-md text-white font-black rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest">
                Stack Tech
              </button>
            </div>
          </div>
        </section>

        {/* PROBLEM SECTION */}
        <div className="reveal opacity-0 translate-y-20 scale-95 transition-all duration-1000 px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter uppercase italic text-white">The Yield Gap</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                { t: "12 Soil Factors", d: "Manual calculation is mathematically impossible for farmers.", i: "⚗️" },
                { t: "NUE Inefficiency", d: "40% of fertilizer is wasted due to improper timing.", i: "📉" },
                { t: "Water Stress", d: "Irrigation without weather data leads to root rot.", i: "🌵" },
                { t: "Economic Loss", d: "Guesswork costs billions in annual yield globally.", i: "💸" }
              ].map((p, i) => (
                <div key={i} className="group p-8 rounded-3xl border border-white/5 bg-neutral-900/30 backdrop-blur-xl transition-all hover:bg-neutral-800 hover:border-white/20">
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform origin-left">{p.i}</div>
                  <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tighter">{p.t}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{p.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SMART LAB (MVP) */}
        <div className="reveal opacity-0 translate-y-20 scale-95 transition-all duration-1000 px-6 py-24">
          <section id="mvp" className="mx-auto max-w-6xl">
            <h2 className="mb-16 text-5xl font-black text-center text-white italic tracking-tighter uppercase">The Smart Lab</h2>
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-6">
                <div className="group relative rounded-3xl bg-neutral-900/50 p-1 border border-white/5 transition-all hover:border-emerald-500/50 shadow-2xl overflow-hidden">
                   <input 
                    value={userInput} onChange={e => setUserInput(e.target.value)}
                    placeholder="Query AI Expert (e.g. soil pH 6.0 for Corn?)"
                    className="w-full bg-transparent p-6 text-white outline-none font-mono text-sm"
                   />
                   <button onClick={askExpert} className="absolute right-4 top-4 px-6 py-2 bg-emerald-500 text-black font-black rounded-xl hover:bg-emerald-400 transition-colors uppercase text-xs">Analyze</button>
                </div>

                <button onClick={() => fileInputRef.current?.click()} className="w-full h-44 rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-neutral-500 hover:border-blue-500/50 hover:text-white transition-all bg-neutral-900/10 group">
                  <span className="text-4xl mb-3 group-hover:scale-125 transition-transform">📸</span>
                  <span className="font-bold tracking-[0.3em] uppercase text-[10px]">Analyze Soil Report (OCR)</span>
                </button>
                <input type="file" ref={fileInputRef} onChange={handleOCR} className="hidden" accept="image/*" />
              </div>

              <div className="relative min-h-[400px] rounded-[2rem] border border-white/10 bg-black/80 backdrop-blur-2xl p-8 shadow-3xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500" />
                <div className="mb-6 flex justify-between items-center text-xs font-mono text-emerald-500 uppercase tracking-[0.3em]">
                  <span>System Console</span>
                  {loading && <span className="flex gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />BUSY</span>}
                </div>
                <div className="text-neutral-400 font-mono text-sm leading-relaxed whitespace-pre-wrap h-[300px] overflow-y-auto scrollbar-hide">
                  {aiResponse || "> Terminal ready. Enter parameters or upload health card..."}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* TEAM / FOOTER */}
        <section className="reveal opacity-0 translate-y-20 scale-95 transition-all duration-1000 px-6 py-24 border-t border-white/5">
          <div className="mx-auto max-w-6xl flex flex-col items-center text-center">
            <h3 className="text-[10px] font-bold tracking-[0.6em] text-neutral-600 uppercase mb-8">Architected By</h3>
            <div className="relative group">
              <div className="absolute inset-0 bg-emerald-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative px-16 py-8 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl">
                <span className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter">Aryan Kumawat</span>
                <p className="text-[10px] text-neutral-500 mt-2 uppercase tracking-[0.5em] font-bold">MUJ AI & Robotics • Class of 2026</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
