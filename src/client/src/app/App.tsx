import { lazy, Suspense, useEffect } from "react"
import { Toaster } from "@/components/ui/sonner"
import { Navigate, Route, Routes, useSearchParams } from "react-router-dom"
import { useIsMobile } from "@/hooks/use-mobile.ts"
import Lenis from "lenis"

const HomePage = lazy(() => import("@/pages/home/Home"))
const MoviesPage = lazy(() => import("@/pages/movies/Movies"))
const WatchMoviePage = lazy(() => import("@/pages/watch/movie/WatchMoviePage.tsx"))
const WatchTvPage = lazy(() => import("@/pages/watch/tv/WatchTvPage.tsx"))
const ShowsPage = lazy(() => import("@/pages/shows/Shows"))
const NotFound = lazy(() => import("@/pages/404/NotFound"))
const Settings = lazy(() => import("@/pages/settings/Settings"))
const Disclaimer = lazy(() => import("@/pages/disclaimer/Disclaimer"))

import AppLayout from "@/app/AppLayout.tsx"
import BlankLayout from "@/app/BlankLayout"

function RootPage() {
    const [searchParams] = useSearchParams()
    const id = searchParams.get("id")
    const season = searchParams.get("s")
    const episode = searchParams.get("e")

    if (id) {
        if (season && episode) {
            return <Navigate to={`/watch/tv/${id}?s=${season}&e=${episode}`} replace />
        }

        return <Navigate to={`/watch/movie/${id}`} replace />
    }

    return <HomePage />
}

export default function App() {
    const isMobile = useIsMobile()

    useEffect(() => {
        if (!isMobile) {
            const lenis = new Lenis({
                autoRaf: true,
                prevent: (node) => node.classList.contains("lenis-disabled"),
            })

            return () => lenis.destroy()
        }
    }, [isMobile])

    return (
        <>
            <Suspense
                fallback={
                    <div className="flex min-h-screen min-w-screen items-center justify-center">
                        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    </div>
                }
            >
                <Routes>
                    {/* MAIN APP */}
                    <Route element={<AppLayout />}>
                        <Route path="/" element={<RootPage />} />
                        <Route path="/movies" element={<MoviesPage />} />
                        <Route path="/shows" element={<ShowsPage />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/disclaimer" element={<Disclaimer />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>

                    <Route element={<BlankLayout />}>
                        <Route path="/watch/movie/:id" element={<WatchMoviePage />} />
                        <Route path="/watch/tv/:id" element={<WatchTvPage />} />
                    </Route>
                </Routes>
            </Suspense>

            <Toaster />
        </>
    )
}
