import { useEffect, useState } from "react"

type StartupPhase = "loading" | "brand" | "done"
const startupOverlayKey = "snorflix-startup-overlay-seen"

export function StartupOverlay() {
  const [phase, setPhase] = useState<StartupPhase>(() => {
    return window.sessionStorage.getItem(startupOverlayKey) === "true" ? "done" : "loading"
  })

  useEffect(() => {
    if (phase === "done") {
      return
    }

    const loadingTimer = window.setTimeout(() => {
      setPhase("brand")
    }, 2000)

    const brandTimer = window.setTimeout(() => {
      setPhase("done")
    }, 4000)

    return () => {
      window.clearTimeout(loadingTimer)
      window.clearTimeout(brandTimer)
    }
  }, [phase])

  useEffect(() => {
    if (phase === "done") {
      window.sessionStorage.setItem(startupOverlayKey, "true")
    }

    document.body.style.overflow = phase === "done" ? "" : "hidden"

    return () => {
      document.body.style.overflow = ""
    }
  }, [phase])

  if (phase === "done") {
    return null
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_45%)]" />

      {phase === "loading" ? (
        <div className="relative z-10 flex w-[min(88vw,420px)] flex-col items-center gap-5">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-full origin-left rounded-full bg-gradient-to-r from-red-500 via-orange-400 to-red-500 motion-safe:animate-[startup-loading-bar_1800ms_linear_forwards]" />
          </div>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Loading</p>
        </div>
      ) : (
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="inline-flex size-24 items-center justify-center overflow-hidden rounded-[1.75rem] shadow-2xl shadow-red-900/30 sm:size-28 motion-safe:animate-pulse">
            <img src="/icon512_rounded.png" alt="CinePro logo" className="size-full object-cover" />
          </div>
          <div className="text-center">
            <p className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">CinePro</p>
            <p className="mt-2 text-sm uppercase tracking-[0.24em] text-zinc-400">Stream your world</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default StartupOverlay
