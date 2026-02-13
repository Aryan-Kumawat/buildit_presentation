"use client";

import React, { useState, useRef, useEffect } from "react";

export default function MVP() {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [userInput, setUserInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Gemini API Key
  const apiKey = "";

  useEffect(() => {
    setActive(true);

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
      const data = await callWithRetry(() =>
        fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `Answer as a precision crop scientist: ${userInput}` }] }]
          })
        })
      );
      setAiResponse(data.candidates[0].content.parts[0].text);
    } catch (e) {
      setAiResponse("System error. Check network connection.");
    } finally {
      setLoading(false);
    }
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
        const data = await callWithRetry(() =>
          fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [
                  { text: "Extract N, P, K and pH from this soil health report card." },
                  { inlineData: { mimeType: "image/png", data: base64 } }
                ]
              }]
            })
          })
        );
        setAiResponse(data.candidates[0].content.parts[0].text);
      } catch {
        setAiResponse("OCR parsing error.");
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <section id="mvp" className="reveal opacity-0 translate-y-20 scale-95 transition-all duration-1000 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-16 text-5xl font-black text-center text-white italic uppercase">
          The Smart Lab
        </h2>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="relative rounded-3xl bg-neutral-900/50 p-1 border border-white/5">
              <input
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                placeholder="Query AI Expert (e.g. soil pH 6.0 for Corn?)"
                className="w-full bg-transparent p-6 text-white outline-none font-mono text-sm"
              />
              <button
                onClick={askExpert}
                className="absolute right-4 top-4 px-6 py-2 bg-emerald-500 text-black font-black rounded-xl uppercase text-xs"
              >
                Analyze
              </button>
            </div>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-44 rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-neutral-500"
            >
              📸 Analyze Soil Report (OCR)
            </button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleOCR}
              className="hidden"
              accept="image/*"
            />
          </div>

          <div className="relative min-h-[400px] rounded-[2rem] border border-white/10 bg-black/80 p-8 overflow-hidden">
            <div className="mb-6 flex justify-between items-center text-xs font-mono text-emerald-500 uppercase">
              <span>System Console</span>
              {loading && <span>BUSY</span>}
            </div>

            <div className="text-neutral-400 font-mono text-sm whitespace-pre-wrap h-[300px] overflow-y-auto">
              {aiResponse || "> Terminal ready. Enter parameters or upload health card..."}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
