export function Hero() {
  return (
    <section id="hero" className="flex min-h-[80vh] flex-col justify-center px-6 pt-16 md:px-12">
      <div className="mx-auto max-w-5xl text-center">
        <div className="mb-6 inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
          <span>💧 Precision Agriculture</span>
        </div>
        <h1 className="mb-6 text-5xl font-bold tracking-tight text-white md:text-7xl">
          Scientific Farming, <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
            Simplified.
          </span>
        </h1>
        <p className="mb-8 text-xl text-neutral-400 md:text-2xl max-w-3xl mx-auto">
          We turn complex soil tests into precise fertilizer mixes and irrigation schedules. 
          No more guesswork—just optimized yield and lower costs.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#problem"
            className="rounded-full bg-blue-600 px-8 py-3 font-medium text-white transition hover:bg-blue-500"
          >
            Why It Matters
          </a>
          <a
            href="https://forms.google.com/your-form-link"
            target="_blank"
            className="rounded-full border border-neutral-700 bg-neutral-900 px-8 py-3 font-medium text-white transition hover:bg-neutral-800"
          >
            See the Demo
          </a>
        </div>
      </div>
    </section>
  )
}