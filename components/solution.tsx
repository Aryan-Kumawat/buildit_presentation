export function Solution() {
  return (
    <section id="solution" className="px-6 py-12 md:px-12">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-8 text-3xl font-bold text-white md:text-4xl">
          The Solution: Deterministic Precision
        </h2>
        <div className="rounded-3xl border border-blue-500/20 bg-neutral-900 p-8 md:p-12">
          <div className="mb-8">
            <h3 className="mb-4 text-2xl font-bold text-blue-400">
              Decision Support System (DSS)
            </h3>
            <p className="text-lg text-neutral-300">
              We built a hybrid engine. We use a <strong>Math Solver (Linear Programming)</strong> 
              to calculate the cheapest, chemically perfect fertilizer mix, and 
              <strong> LLMs (Gemini)</strong> to explain it to the farmer in their local language.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-neutral-800/50 p-6">
              <div className="mb-2 font-bold text-white">1. Input</div>
              <p className="text-sm text-neutral-400">User uploads Soil Test PDF + Sets Target Yield.</p>
            </div>
            <div className="rounded-xl bg-neutral-800/50 p-6">
              <div className="mb-2 font-bold text-white">2. Process</div>
              <p className="text-sm text-neutral-400">Python Solver computes nutrient gaps & ET-based water schedule.</p>
            </div>
            <div className="rounded-xl bg-neutral-800/50 p-6">
              <div className="mb-2 font-bold text-white">3. Output</div>
              <p className="text-sm text-neutral-400">A calendar of tasks, mix recipes, and labor cost estimates.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}