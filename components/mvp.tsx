import { ScanText, Calculator, Droplets, Languages } from "lucide-react"

export function MVP() {
  const features = [
    {
      title: "Soil Test OCR",
      description: "Upload a photo of any soil health card. We parse the 12 key parameters instantly using AI.",
      icon: <ScanText className="h-6 w-6 text-yellow-400" />,
    },
    {
      title: "Smart Mix Solver",
      description: "Mathematically solves for the cheapest combination of Urea, DAP, and MOP to meet N-P-K targets.",
      icon: <Calculator className="h-6 w-6 text-green-400" />,
    },
    {
      title: "ET Irrigation Scheduler",
      description: "Dynamic water planning based on Evapotranspiration (ET0) and crop stage (Kc curves).",
      icon: <Droplets className="h-6 w-6 text-blue-400" />,
    },
    {
      title: "Localized Assistant",
      description: "Generates audio & text explanations in the farmer's native language using Gemini.",
      icon: <Languages className="h-6 w-6 text-purple-400" />,
    },
  ]

  return (
    <section id="mvp" className="px-6 py-12 md:px-12">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-12 text-3xl font-bold text-white md:text-4xl">
          MVP Features
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((feature, i) => (
            <div key={i} className="group rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 transition hover:border-neutral-700 hover:bg-neutral-900">
              <div className="mb-4 inline-block rounded-lg bg-neutral-800 p-3">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">
                {feature.title}
              </h3>
              <p className="text-neutral-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}