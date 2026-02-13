export function Video() {
  return (
    <section id="video" className="px-6 py-12 md:px-12">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-8 text-3xl font-bold text-white md:text-4xl">
          See It In Action
        </h2>
        <div className="aspect-video w-full overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900">
          <iframe 
            className="h-full w-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
            title="Project Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}