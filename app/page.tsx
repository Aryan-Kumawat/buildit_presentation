/**
 * Project: CropWise (Pitch Deck)
 * Author: Aryan Kumawat
 * Updated for: Fertilizer & Crop Resource Planner Idea
 */

import { Hero } from "@/components/hero"
import { Problem } from "@/components/problem"
import { Solution } from "@/components/solution"
import { Video } from "@/components/video"
import { MVP } from "@/components/mvp"
import { Revenue } from "@/components/revenue"
import { Team } from "@/components/team"
import { SideNav } from "@/components/side-nav"

export default function Page() {
  return (
    <main className="relative min-h-screen bg-neutral-950 text-white selection:bg-blue-500/30">
      <SideNav />
      {/* Background grid effect - switched to blue/cyan tint for "Scientific" feel */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" aria-hidden="true" />

      <div className="relative z-10 flex flex-col gap-24 pb-24">
        <Hero />
        <Problem />
        <Solution />
        <Video />
        <MVP />
        <Revenue />
        <Team />
      </div>
    </main>
  )
}