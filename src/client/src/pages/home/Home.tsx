import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { type TMDB } from "@lorenzopant/tmdb"
import { ArrowRight, Film, PlayCircle, Settings2, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"
import MovieRail, { type RailMovie } from "@/components/ui/MovieRail"
import { useTmdb } from "@/hooks/use-tmdb"
import { mapTmdbMovies } from "@/lib/tmdb-movies"

type HeroSlide = {
    title: string
    year: string
    rating: string
    description: string
    image: string
    badge: string
}

function toHeroSlides(tmdb: TMDB, response?: { results?: Array<{ title?: string; name?: string; release_date?: string; overview?: string; vote_average?: number; backdrop_path?: string | null; poster_path?: string | null; original_language?: string }> }) {
    return (response?.results ?? [])
        .filter((movie) => movie.backdrop_path || movie.poster_path)
        .slice(0, 3)
        .map((movie, index) => ({
            title: movie.title ?? movie.name ?? "Untitled",
            year: movie.release_date?.slice(0, 4) ?? "TBA",
            rating: typeof movie.vote_average === "number" ? movie.vote_average.toFixed(1) : "N/A",
            description: movie.overview?.trim() || "No synopsis available.",
            image: movie.backdrop_path ? tmdb.images.backdrop(movie.backdrop_path, "w1280") : tmdb.images.poster(movie.poster_path!, "w780"),
            badge: index === 0 ? "Now Playing" : index === 1 ? "Trending" : "Popular",
        }))
}

export function HomePage() {
    const tmdb = useTmdb()
    const [heroApi, setHeroApi] = useState<CarouselApi>()
    const [activeSlide, setActiveSlide] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([])
    const [popularMovies, setPopularMovies] = useState<RailMovie[]>([])
    const [topRatedMovies, setTopRatedMovies] = useState<RailMovie[]>([])
    const [nowPlayingMovies, setNowPlayingMovies] = useState<RailMovie[]>([])

    useEffect(() => {
        let mounted = true

        async function loadMovies() {
            setLoading(true)
            setError(null)

            try {
                const [nowPlaying, popular, topRated] = await Promise.all([
                    tmdb.movie_lists.now_playing({ page: 1 }),
                    tmdb.movie_lists.popular({ page: 1 }),
                    tmdb.movie_lists.top_rated({ page: 1 }),
                ])

                if (!mounted) {
                    return
                }

                setHeroSlides(toHeroSlides(tmdb, nowPlaying))
                setNowPlayingMovies(mapTmdbMovies(tmdb, nowPlaying).slice(0, 8))
                setPopularMovies(mapTmdbMovies(tmdb, popular).slice(0, 8))
                setTopRatedMovies(mapTmdbMovies(tmdb, topRated).slice(0, 8))
            } catch (fetchError) {
                if (!mounted) {
                    return
                }

                console.error(fetchError)
                setError("TMDB movies could not be loaded. Check your API key in Settings.")
            } finally {
                if (mounted) {
                    setLoading(false)
                }
            }
        }

        void loadMovies()

        return () => {
            mounted = false
        }
    }, [tmdb])

    useEffect(() => {
        if (!heroApi) {
            return
        }

        const onSelect = () => {
            setActiveSlide(heroApi.selectedScrollSnap())
        }

        onSelect()
        heroApi.on("select", onSelect)
        heroApi.on("reInit", onSelect)

        return () => {
            heroApi.off("select", onSelect)
            heroApi.off("reInit", onSelect)
        }
    }, [heroApi])

    useEffect(() => {
        if (!heroApi) {
            return
        }

        const timer = window.setInterval(() => {
            heroApi.scrollNext()
        }, 6500)

        return () => {
            window.clearInterval(timer)
        }
    }, [heroApi])

    const heroEmptyState = useMemo(
        () => (
            <div className="flex min-h-[70svh] flex-col items-center justify-center gap-4 rounded-[2rem] border border-white/10 bg-black/45 px-6 text-center text-white">
                <Sparkles className="size-8 text-red-400" />
                <h1 className="text-2xl font-semibold">Loading TMDB movies...</h1>
                <p className="max-w-xl text-sm text-zinc-300">
                    The page is wired to the TMDB movie library and will populate as soon as the client can read your API key.
                </p>
            </div>
        ),
        []
    )

    return (
        <div className="space-y-8">
            {error ? (
                <section className="rounded-3xl border border-red-500/30 bg-red-500/10 px-6 py-4 text-sm text-red-100">
                    {error}
                </section>
            ) : null}

            <main className="space-y-10 pt-0">
                {loading || heroSlides.length === 0 ? (
                    heroEmptyState
                ) : (
                    <Carousel setApi={setHeroApi} opts={{ loop: true }} className="relative left-1/2 -mt-24 min-h-[88svh] w-screen -translate-x-1/2">
                        <CarouselContent className="-ml-0">
                            {heroSlides.map((slide) => (
                                <CarouselItem key={slide.title} className="pl-0">
                                    <section className="relative flex min-h-[88svh] items-end overflow-hidden border-y border-white/10 bg-black sm:border-x">
                                        <div className="absolute inset-0">
                                            <img src={slide.image} alt={slide.title} className="size-full object-cover" />
                                        </div>
                                        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(0,0,0,0.92)_12%,rgba(0,0,0,0.35)_46%,rgba(0,0,0,0.78)_100%)]" />
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,transparent_0,transparent_42%,rgba(0,0,0,0.6)_100%)]" />

                                        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-18 pt-24 sm:px-8 lg:px-12 lg:pb-24">
                                            <div className="max-w-2xl space-y-4 sm:space-y-5">
                                                <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.25em] text-zinc-200">
                                                    <Sparkles className="size-3.5" />
                                                    {slide.badge}
                                                </p>
                                                <h1 className="text-4xl font-bold leading-[0.95] text-balance sm:text-6xl lg:text-7xl">{slide.title}</h1>
                                                <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-200/90 sm:text-base">
                                                    <span className="inline-flex items-center gap-1.5 font-semibold text-red-400">
                                                        <Sparkles className="size-3.5" />
                                                        {slide.rating}
                                                    </span>
                                                    <span>{slide.year}</span>
                                                </div>
                                                <p className="max-w-xl text-sm leading-relaxed text-zinc-200/85 sm:text-lg">{slide.description}</p>

                                                <div className="flex flex-wrap items-center gap-3 pt-2">
                                                    <Button className="rounded-full bg-white px-6 text-black hover:bg-zinc-200">
                                                        <PlayCircle className="size-4" />
                                                        Play
                                                    </Button>
                                                    <Button variant="outline" className="rounded-full border-white/30 bg-black/35 px-6 text-white hover:bg-white/10">
                                                        <ArrowRight className="size-4" />
                                                        Learn more
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        <CarouselPrevious className="left-4 hidden border-white/25 bg-black/45 text-white hover:bg-black/70 md:inline-flex" />
                        <CarouselNext className="right-4 hidden border-white/25 bg-black/45 text-white hover:bg-black/70 md:inline-flex" />

                        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                            {heroSlides.map((slide, index) => (
                                <button
                                    key={`dot-${slide.title}`}
                                    type="button"
                                    onClick={() => heroApi?.scrollTo(index)}
                                    className={`h-2.5 rounded-full transition-all ${activeSlide === index ? "w-7 bg-white" : "w-2.5 bg-white/50"}`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </Carousel>
                )}

                <section className="space-y-10">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">TMDB library</p>
                            <h2 className="mt-2 text-2xl font-semibold text-white">Movie collections</h2>
                        </div>
                        <div className="flex gap-2">
                            <Button asChild variant="outline" className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10">
                                <Link to="/movies" className="inline-flex items-center gap-2">
                                    <Film className="size-4" />
                                    Movies
                                </Link>
                            </Button>
                            <Button asChild variant="outline" className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10">
                                <Link to="/settings" className="inline-flex items-center gap-2">
                                    <Settings2 className="size-4" />
                                    Settings
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <MovieRail title="Now Playing" movies={nowPlayingMovies} />
                    <MovieRail title="Popular Movies" movies={popularMovies} />
                    <MovieRail title="Top Rated Movies" movies={topRatedMovies} />
                </section>

                
            </main>
        </div>
    )
}

function InfoCard({ title, text }: { title: string; text: string }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">{text}</p>
        </div>
    )
}

export default HomePage
