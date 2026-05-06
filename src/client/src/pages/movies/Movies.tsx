import { useEffect, useState } from "react"

import { ArrowRight, Film, Sparkles } from "lucide-react"

import MovieRail, { type RailMovie } from "@/components/ui/MovieRail"
import { Button } from "@/components/ui/button"
import { useTmdb } from "@/hooks/use-tmdb"
import { mapTmdbMovies } from "@/lib/tmdb-movies"

export default function Movies() {
    const tmdb = useTmdb()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [nowPlaying, setNowPlaying] = useState<RailMovie[]>([])
    const [popular, setPopular] = useState<RailMovie[]>([])
    const [topRated, setTopRated] = useState<RailMovie[]>([])

    useEffect(() => {
        let mounted = true

        async function loadMovies() {
            setLoading(true)
            setError(null)

            try {
                const [nowPlayingResponse, popularResponse, topRatedResponse] = await Promise.all([
                    tmdb.movie_lists.now_playing({ page: 1 }),
                    tmdb.movie_lists.popular({ page: 1 }),
                    tmdb.movie_lists.top_rated({ page: 1 }),
                ])

                if (!mounted) {
                    return
                }

                setNowPlaying(mapTmdbMovies(tmdb, nowPlayingResponse).slice(0, 12))
                setPopular(mapTmdbMovies(tmdb, popularResponse).slice(0, 12))
                setTopRated(mapTmdbMovies(tmdb, topRatedResponse).slice(0, 12))
            } catch (fetchError) {
                if (!mounted) {
                    return
                }

                console.error(fetchError)
                setError("TMDB movie lists could not be loaded. Check your API key in Settings.")
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

    return (
        <div className="space-y-8">
            <section className="rounded-[2rem] border border-white/10 bg-black/45 px-6 py-8 text-white shadow-2xl shadow-black/20 sm:px-10 lg:px-14">
                <div className="max-w-3xl space-y-4">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.25em] text-zinc-300">
                        <Sparkles className="size-3.5" />
                        TMDB movie library
                    </span>
                    <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Browse real movie lists from TMDB</h1>
                    <p className="max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                        This page now loads actual TMDB lists instead of placeholder content. Use Settings to tune
                        your TMDB API key, locale, and region.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2">
                        <Button asChild className="rounded-full bg-white px-6 text-black hover:bg-zinc-200">
                            <a href="#now-playing" className="inline-flex items-center gap-2">
                                <Film className="size-4" />
                                Jump to now playing
                            </a>
                        </Button>
                        <Button asChild variant="outline" className="rounded-full border-white/20 bg-white/5 px-6 text-white hover:bg-white/10">
                            <a href="#top-rated" className="inline-flex items-center gap-2">
                                <ArrowRight className="size-4" />
                                Jump to top rated
                            </a>
                        </Button>
                    </div>
                </div>
            </section>

            {error ? <section className="rounded-3xl border border-red-500/30 bg-red-500/10 px-6 py-4 text-sm text-red-100">{error}</section> : null}

            <main className="space-y-10 pb-10">
                {loading ? (
                    <section className="rounded-3xl border border-white/10 bg-black/30 px-6 py-10 text-center text-zinc-300">
                        Loading movies from TMDB...
                    </section>
                ) : (
                    <>
                        <div id="now-playing">
                            <MovieRail title="Now Playing" movies={nowPlaying} />
                        </div>
                        <MovieRail title="Popular Movies" movies={popular} />
                        <div id="top-rated">
                            <MovieRail title="Top Rated Movies" movies={topRated} />
                        </div>
                    </>
                )}
            </main>
        </div>
    )
}
