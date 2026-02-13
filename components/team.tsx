export function Team() {
  return (
    <section id="team" className="px-6 py-24 md:px-12">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="mb-12 text-3xl font-bold text-white md:text-4xl">
          Built By
        </h2>
        <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
          <div className="flex flex-col items-center gap-4">
            <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-neutral-800 bg-neutral-900">
               {/* Replace with your image in public/ folder */}
               <div className="flex h-full w-full items-center justify-center text-2xl">👨‍💻</div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-white">Aryan Kumawat</h3>
              <p className="text-sm text-neutral-400">Lead Developer</p>
              <p className="mt-1 text-xs text-neutral-500">Manipal University Jaipur</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}