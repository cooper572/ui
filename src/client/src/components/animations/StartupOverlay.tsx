import { useEffect, useState } from "react"
import { H4 } from "@/components/ui/typography.tsx"
import "@/styles/animation.css"
import { useTranslation } from "react-i18next"

type StartupPhase = "loading" | "closing" | "done"
const startupOverlayKey = "app.startup-overlay-done"

export default function StartupOverlay() {
    const { t } = useTranslation("common")

    const [phase, setPhase] = useState<StartupPhase>(() => {
        return window.sessionStorage.getItem(startupOverlayKey) === "true" ? "done" : "loading"
    })

    useEffect(() => {
        if (phase === "done") return

        let timer: number

        if (phase === "loading") {
            timer = window.setTimeout(() => setPhase("closing"), 2000)
        } else if (phase === "closing") {
            timer = window.setTimeout(() => setPhase("done"), 500)
        }

        return () => clearTimeout(timer)
    }, [phase])

    useEffect(() => {
        const app = document.getElementById("app-root")

        if (phase === "done") {
            window.sessionStorage.setItem(startupOverlayKey, "true")
        }

        document.body.style.overflow = phase === "done" ? "" : "hidden"

        if (app) {
            if (phase === "closing") {
                app.style.filter = "blur(0px)"
            } else if (phase !== "done") {
                app.style.filter = "blur(6px)"
            } else {
                app.style.filter = ""
            }
        }

        return () => {
            document.body.style.overflow = ""
            if (app) app.style.filter = ""
        }
    }, [phase])

    if (phase === "done") return null

    return (
        <div
            className={`fixed inset-0 z-500 flex items-center justify-center bg-background transition-all duration-500 ease-out ${
                phase === "closing" ? "scale-105 opacity-0" : "scale-100 opacity-100"
            }`}
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_45%)]" />

            {phase !== "closing" ? (
                <div className="relative z-10 flex w-[min(88vw,420px)] flex-col items-center gap-5">
                    <div className="inline-flex w-full items-center justify-center transition-all duration-500">
                        <div className="flex size-full items-center justify-center">
                            <img src="/logo.png" alt={t("projectName") + " Logo"} className="h-28 w-auto object-contain sm:h-36" />
                        </div>
                    </div>

                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                        <div className={`animate-startup-loading-bar h-full rounded-full bg-linear-to-r from-primary via-accent to-primary`} />
                    </div>

                    <H4 className="text-xs tracking-[0.3em] text-muted-foreground uppercase italic">{t("loading")}</H4>
                </div>
            ) : (
                <div className="relative z-10 flex w-[min(88vw,420px)] flex-col items-center gap-5 opacity-0 transition-all duration-500" aria-hidden="true">
                    <div className="inline-flex w-full items-center justify-center transition-all duration-500">
                        <div className="flex size-full items-center justify-center">
                            <img src="/logo.png" alt={t("projectName") + " Logo"} className="h-28 w-auto object-contain sm:h-36" />
                        </div>
                    </div>

                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                        <div className={`animate-startup-loading-bar h-full rounded-full bg-linear-to-r from-primary via-accent to-primary`} />
                    </div>

                    <H4 className="text-xs tracking-[0.3em] text-muted-foreground uppercase italic">{t("loading")}</H4>
                </div>
            )}
        </div>
    )
}
