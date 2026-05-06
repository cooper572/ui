import { Toaster } from "@/components/ui/sonner"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Footer from "@/components/common/Footer"
import Header from "@/components/common/Header"
import StartupOverlay from "@/components/ui/StartupOverlay"
import HomePage from "@/pages/home/Home"
import MoviesPage from "@/pages/movies/Movies"
import ShowsPage from "@/pages/shows/Shows"
import NotFound from "@/pages/404/NotFound"
import Settings from "@/pages/settings/Settings.tsx"
import Disclaimer from "@/pages/disclaimer/Disclaimer.tsx"

export function App() {
    return (
        <BrowserRouter>
            <div className="relative min-h-screen w-full overflow-hidden bg-sidebar text-foreground">
                <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-full animate-pulse [animation-duration:10s]">
                        <div className="absolute -top-48 -left-48 h-[40vw] max-h-150 min-h-75 w-[40vw] max-w-150 min-w-75 rounded-full bg-primary/60 blur-[128px]" />
                        <div className="absolute -top-32 -left-32 h-[30vw] max-h-100 min-h-50 w-[30vw] max-w-100 min-w-50 rounded-full bg-primary/20 blur-[96px]" />
                        <div className="absolute -top-16 -left-16 h-[20vw] max-h-50 min-h-25 w-[20vw] max-w-50 min-w-25 rounded-full bg-primary/10 blur-3xl" />
                    </div>

                    <div className="absolute right-0 bottom-0 h-full w-full animate-pulse [animation-duration:15s]">
                        <div className="absolute -right-48 -bottom-48 h-[40vw] max-h-150 min-h-75 w-[40vw] max-w-150 min-w-75 rounded-full bg-primary/60 blur-[128px]" />
                        <div className="absolute -right-32 -bottom-32 h-[30vw] max-h-100 min-h-50 w-[30vw] max-w-100 min-w-50 rounded-full bg-primary/20 blur-[96px]" />
                        <div className="absolute -right-16 -bottom-16 h-[20vw] max-h-50 min-h-25 w-[20vw] max-w-50 min-w-25 rounded-full bg-primary/10 blur-3xl" />
                    </div>
                </div>

                <StartupOverlay />
                <Header />

                <main className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-3 pt-24 pb-10 sm:px-6 lg:px-8">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/movies" element={<MoviesPage />} />
                        <Route path="/shows" element={<ShowsPage />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/disclaimer" element={<Disclaimer />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>

                <Footer />
                <Toaster />
            </div>
        </BrowserRouter>
    )
}

export default App
