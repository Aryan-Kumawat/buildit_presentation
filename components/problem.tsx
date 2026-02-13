export function Problem() {
  return (
    <section id="problem" className="px-6 py-12 md:px-12">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-8 text-3xl font-bold text-white md:text-4xl">
          The "Rocket Science" of Farming
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8">
            <h3 className="mb-4 text-xl font-semibold text-red-400">
              The Calculation Gap
            </h3>
            <p className="leading-relaxed text-neutral-400">
              To farm correctly, you need to balance <strong>12 soil parameters</strong>, 
              Nutrient Use Efficiency (NUE), and crop removal rates. Most farmers can't do 
              this math in their heads, leading to nutrient imbalances.
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8">
            <h3 className="mb-4 text-xl font-semibold text-red-400">
              Water & Cost Inefficiency
            </h3>
            <p className="leading-relaxed text-neutral-400">
              Irrigation isn't just "watering plants"—it requires calculating Evapotranspiration (ET) 
              and Effective Rainfall. Without this, farmers waste water, increase energy bills, 
              and leach expensive fertilizers into the groundwater.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}