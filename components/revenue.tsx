import { Check } from "lucide-react"

export function Revenue() {
  return (
    <section id="revenue" className="px-6 py-12 md:px-12">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-12 text-3xl font-bold text-white md:text-4xl">
          Business Model
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Free Tier */}
          <div className="relative rounded-3xl border border-neutral-800 bg-neutral-900/30 p-8">
            <h3 className="text-lg font-medium text-neutral-400">Farmer Basic</h3>
            <div className="mt-4 flex items-baseline text-5xl font-bold tracking-tight text-white">
              Free
            </div>
            <p className="mt-4 text-neutral-400">Essential tools for smallholders.</p>
            <ul className="mt-8 space-y-4">
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-blue-500" />
                <span className="text-neutral-300">Basic Soil Test Analysis</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-blue-500" />
                <span className="text-neutral-300">Standard Fertilizer Mixes</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-blue-500" />
                <span className="text-neutral-300">Community Support</span>
              </li>
            </ul>
          </div>

          {/* Premium Tier */}
          <div className="relative rounded-3xl border border-blue-500/30 bg-blue-500/5 p-8">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-sm font-medium text-white">
              Most Popular
            </div>
            <h3 className="text-lg font-medium text-blue-400">Pro Precision</h3>
            <div className="mt-4 flex items-baseline text-5xl font-bold tracking-tight text-white">
              ₹499<span className="text-lg font-normal text-neutral-500">/mo</span>
            </div>
            <p className="mt-4 text-neutral-400">For serious yield optimization.</p>
            <ul className="mt-8 space-y-4">
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-blue-400" />
                <span className="text-white">Advanced Cost Solver (Minimize ₹)</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-blue-400" />
                <span className="text-white">Daily ET Irrigation Schedule</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-blue-400" />
                <span className="text-white">Priority Voice Assistant</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}