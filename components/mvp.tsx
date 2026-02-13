"use client"

import React, { useState, useRef, useEffect } from "react"

/**
 * CropWise MVP Section - Production Fixed Version
 * 1. Strictly marked as "use client" for App Router compatibility.
 * 2. Removed styled-jsx to fix "ELIFECYCLE / exit code 1" build errors.
 * 3. Integrated Gemini API with exponential backoff.
 */
export function MVP() {
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [userInput, setUserInput] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // The execution environment provides the API key at runtime.
  const apiKey = "";

  // Exponential Backoff for API stability
  async function callWithRetry(fn: () => Promise<any>, retries = 5, delay = 1000) {
    for (let i = 0; i < retries; i++) {
      try {
        return await fn();
      } catch (err) {
        if (i === retries - 1) throw err;
        await new Promise(r => setTimeout(r, delay));
        delay *= 2;
      }
    }
  }

  // Feature 1: AI Agri-Expert (Text)
  const askAgriExpert = async () => {
    if (!userInput) return;
    setLoading(true);
    setAiResponse("Consulting expert...");
    
    try {
      const result = await callWithRetry(async () => {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `You are a precision agriculture expert. Answer this farmer's query concisely: ${userInput}` }] }],
            systemInstruction: { parts: [{ text: "Respond as a helpful agricultural scientist. Use bullet points for steps." }] }
          })
        });
        if (!response.ok) throw new Error("API call failed");
        return await response.json();
      });

      const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
      setAiResponse(text || "No response received.");
    } catch (error) {
      setAiResponse("Failed to connect to expert. Please check your internet or try again.");
    } finally {
      setLoading(false);
    }
  };

  // Feature 2: Soil OCR (Image)
  const analyzeSoilReport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setAiResponse("Reading soil report via computer vision...");

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = (reader.result as string).split(',')[1];
      
      try {
        const result = await callWithRetry(async () => {
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                role: "user",
                parts: [
                  { text: "Extract N, P, K values and pH level from this soil health card. Format as a simple list." },
                  { inlineData: { mimeType: "image/png", data: base64Data } }
                ]
              }]
            })
          });
          if (!response.ok) throw new Error("OCR call failed");
          return await response.json();
        });

        const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
        setAiResponse(text || "Could not read report clearly.");
      } catch (error) {
        setAiResponse("Error analyzing image.");
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Feature 3: Local Voice Assistant (TTS)
  const speakAdvice = async () => {
    if (!aiResponse) return;
    setLoading(true);

    try {
      const result = await callWithRetry(async () => {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `Say warmly: ${aiResponse.substring(0, 300)}` }] }],
            generationConfig: { 
              responseModalities: ["AUDIO"],
              speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } } } 
            }
          })
        });
        if (!response.ok) throw new Error("TTS call failed");
        return await response.json();
      });

      const pcmData = result.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (pcmData) {
        const audioBlob = new Blob([Uint8Array.from(atob(pcmData), c => c.charCodeAt(0))], { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        const audio = new Audio(url);
        audio.play();
      }
    } catch (error) {
      console.error("TTS Error", error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      title: "Soil Test OCR Engine",
      description: "Upload any soil health card. Our AI instantly extracts 12 key chemical parameters with 99% accuracy.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
          <path d="M4 7V4a2 2 0 0 1 2-2h2" /><path d="M16 2h2a2 2 0 0 1 2 2v3" /><path d="M20 17v2a2 2 0 0 1-2 2h-2" /><path d="M8 21H6a2 2 0 0 1-2-2v-2" /><path d="M7 12h10" /><path d="M10 8v8" /><path d="M14 8v8" />
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
          <rect width="16" height="20" x="4" y="2" rx="2" /><line x1="8" x2="16" y1="6" y2="6" /><line x1="16" x2="16" y1="14" y2="18" /><path d="M16 10h.01" /><path d="M12 10h.01" /><path d="M8 10h.01" /><path d="M12 14h.01" /><path d="M8 14h.01" /><path d="M12 18h.01" /><path d="M8 18h.01" />
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
          <path d="m7 16.3c2.2 0 4-1.8 4-4 0-3.3-4-6.3-4-6.3s-4 3-4 6.3c0 2.2 1.8 4 4 4Z" /><path d="m17 16.3c2.2 0 4-1.8 4-4 0-3.3-4-6.3-4-6.3s-4 3-4 6.3c0 2.2 1.8 4 4 4Z" />
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
          <path d="m5 8 6 6" /><path d="m4 14 6-6 2-3" /><path d="M2 5h12" /><path d="M7 2h1" /><path d="m22 22-5-10-5 10" /><path d="M14 18h6" />
        </svg>
      ),
      gradient: "from-purple-400/20 to-pink-500/20",
      border: "group-hover:border-purple-500/50"
    },
  ]

  return (
    <section id="mvp" className="relative px-6 py-24 md:px-12 overflow-hidden bg-neutral-950">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-6xl">
        {/* Production-Safe CSS Injection */}
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

        <div className="grid gap-6 md:grid-cols-2 mb-20">
          {features.map((feature, i) => (
            <div key={i} className={`group relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/40 p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 ${feature.border}`}>
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${feature.gradient}`} />
              <div className="relative z-10 flex flex-col gap-6">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-800/50 border border-neutral-700 shadow-inner group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-neutral-400 text-lg leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gemini Integration Demo Area */}
        <div className="rounded-3xl border border-blue-500/20 bg-blue-500/5 p-8 md:p-12">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">✨ Smart Farming Lab</h3>
          
          <div className="grid gap-8 md:grid-cols-2">
            {/* Left: Interactive Input */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-blue-300 mb-2">Ask CropWise Expert</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="e.g., Why are my tomato leaves turning yellow?"
                    className="flex-1 rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button 
                    onClick={askAgriExpert}
                    disabled={loading}
                    className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-500 disabled:opacity-50 shadow-lg shadow-blue-500/20"
                  >
                    {loading ? "..." : "✨ Ask"}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-green-300 mb-2">Visual Soil Analysis</label>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={analyzeSoilReport}
                  className="hidden" 
                  accept="image/*"
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={loading}
                  className="w-full rounded-xl border-2 border-dashed border-neutral-700 bg-neutral-800/50 py-8 text-neutral-400 transition hover:border-green-500/50 hover:text-white group"
                >
                  <span className="block mb-1 group-hover:scale-110 transition-transform">✨</span>
                  Upload Soil Health Card Image
                </button>
              </div>
            </div>

            {/* Right: AI Output Display */}
            <div className="relative rounded-2xl bg-neutral-950 p-6 border border-neutral-800 flex flex-col min-h-[300px] shadow-inner">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">AI Result</span>
                {aiResponse && !loading && (
                  <button 
                    onClick={speakAdvice}
                    className="flex items-center gap-2 text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    🔊 Listen to Advice
                  </button>
                )}
              </div>
              
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {loading ? (
                  <div className="flex items-center justify-center h-full space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                ) : (
                  <div className="text-neutral-300 whitespace-pre-wrap font-sans leading-relaxed text-sm md:text-base">
                    {aiResponse || "Your personalized agricultural insights will appear here..."}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Default export to ensure compatibility with all import styles
export default MVP;
