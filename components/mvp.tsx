"use client"

import React, { useState, useRef, useEffect } from "react"

/**
 * CropWise MVP Section - Production-Hardened Version
 * * FIX: Completely removed <style> tags to bypass 'styled-jsx' build errors.
 * ANIMATION: Uses React state + Tailwind transitions for the "Fade In Up" effect.
 * API: Gemini integration with exponential backoff.
 */
export function MVP() {
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Trigger entrance animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const apiKey = "";

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
            contents: [{ parts: [{ text: `You are a precision agriculture expert. Answer this: ${userInput}` }] }],
            systemInstruction: { parts: [{ text: "Respond as a helpful agricultural scientist with bullet points." }] }
          })
        });
        if (!response.ok) throw new Error("API fail");
        return await response.json();
      });
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
      setAiResponse(text || "No response.");
    } catch (error) {
      setAiResponse("Connection error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const analyzeSoilReport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setAiResponse("Analyzing report...");
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
                  { text: "Extract N, P, K values from this soil health card." },
                  { inlineData: { mimeType: "image/png", data: base64Data } }
                ]
              }]
            })
          });
          if (!response.ok) throw new Error("OCR fail");
          return await response.json();
        });
        setAiResponse(result.candidates?.[0]?.content?.parts?.[0]?.text || "Read error.");
      } catch (error) {
        setAiResponse("Error analyzing image.");
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

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
        return await response.json();
      });
      const pcmData = result.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (pcmData) {
        const audioBlob = new Blob([Uint8Array.from(atob(pcmData), c => c.charCodeAt(0))], { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        new Audio(url).play();
      }
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const features = [
    { title: "Soil Test OCR", description: "AI extraction of 12 chemical parameters.", icon: "🔍", color: "yellow" },
    { title: "Math Solver", description: "Cheapest fertilizer mix optimization.", icon: "🧮", color: "green" },
    { title: "ET Irrigation", description: "Water scheduling based on weather data.", icon: "💧", color: "blue" },
    { title: "Voice Assistant", description: "Actionable advice in local dialects.", icon: "🗣️", color: "purple" }
  ];

  return (
    <section id="mvp" className="relative px-6 py-24 md:px-12 bg-neutral-950 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] aspect-square bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className={`mx-auto max-w-6xl transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold md:text-6xl mb-6 bg-gradient-to-r from-blue-400 via-green-400 to-emerald-400 bg-clip-text text-transparent">
            Power Features
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Scientific precision meets farmer-friendly design.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-20">
          {features.map((f, i) => (
            <div key={i} className="group relative rounded-3xl border border-neutral-800 bg-neutral-900/40 p-8 transition-all hover:-translate-y-1 hover:border-neutral-700">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{f.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-2">{f.title}</h3>
              <p className="text-neutral-400">{f.description}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-blue-500/20 bg-blue-500/5 p-8 md:p-12">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">✨ Smart Farming Lab</h3>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <input 
                value={userInput} onChange={e => setUserInput(e.target.value)}
                placeholder="Ask about crops..."
                className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-white focus:ring-2 focus:ring-blue-500"
              />
              <button onClick={askAgriExpert} disabled={loading} className="w-full rounded-xl bg-blue-600 py-3 font-bold text-white hover:bg-blue-500 disabled:opacity-50 transition-all">
                {loading ? "Processing..." : "✨ Get AI Advice"}
              </button>
              <button onClick={() => fileInputRef.current?.click()} disabled={loading} className="w-full rounded-xl border-2 border-dashed border-neutral-700 py-6 text-neutral-400 hover:border-green-500/50 hover:text-white transition-all">
                📷 Upload Soil Report Image
              </button>
              <input type="file" ref={fileInputRef} onChange={analyzeSoilReport} className="hidden" accept="image/*" />
            </div>

            <div className="rounded-2xl bg-neutral-950 p-6 border border-neutral-800 flex flex-col min-h-[300px]">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-mono text-blue-400 uppercase">Analysis</span>
                {aiResponse && !loading && <button onClick={speakAdvice} className="text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors">🔊 Listen</button>}
              </div>
              <div className="flex-1 text-neutral-300 text-sm whitespace-pre-wrap leading-relaxed">
                {aiResponse || "Results will appear here..."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MVP;
