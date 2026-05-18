import { useTmdb } from "@/hooks/use-tmdb"
import { HeroCarousel } from "@/components/media/HeroCarousel/HeroCarousel"
import { MovieRail, TvRail } from "@/components/media/MediaRail/TypedRails.tsx"
import { MediaRail } from "@/components/media/MediaRail/MediaRail.tsx"
import { MediaCard } from "@/components/media/MediaRail/MediaCard.tsx"
import { useHistory } from "@/hooks/use-history"
import type { HistoryItem } from "@/app/providers/history-provider"

type WatchAgainItem = {
    id: number
    type: "movie" | "tv"
    title: string
    imagePath: string | null
    imageAlt: string
    year: number
    rating: number
}

export function HomePage() {
    const tmdb = useTmdb()
    const { history } = useHistory()

    const watchAgainItems: WatchAgainItem[] = history.reduce<WatchAgainItem[]>((items, entry) => {
        const key = entry.kind === "movie" ? `movie:${entry.item.id}` : `tv:${entry.item.show_id}`
        const exists = items.some((item) => `${item.type}:${item.id}` === key)
        if (exists) return items

        if (entry.kind === "movie") {
            if (!Number.isFinite(entry.item.id) || entry.item.id <= 0) return items
            items.push({
                id: entry.item.id,
                type: "movie",
                title: entry.item.title,
                imagePath: entry.item.poster_path,
                imageAlt: entry.item.title,
                year: new Date(entry.item.release_date).getFullYear(),
                rating: entry.item.vote_average,
            })
            return items
        }

        if (!Number.isFinite(entry.item.show_id) || entry.item.show_id <= 0) return items
        items.push({
            id: entry.item.show_id,
            type: "tv",
            title: entry.item.tvshowtitle,
            imagePath: entry.item.showPosterPath ?? null,
            imageAlt: entry.item.tvshowtitle,
            year: new Date(entry.item.air_date).getFullYear(),
            rating: entry.item.vote_average,
        })
        return items
    }, [])

    const fetchWatchAgain = async (): Promise<WatchAgainItem[]> => {
        return watchAgainItems
    }

    const renderWatchAgainItem = (item: WatchAgainItem) => {
        return (
            <MediaCard
                title={item.title}
                imagePath={item.imagePath}
                imageAlt={item.imageAlt}
                id={item.id}
                type={item.type}
                year={item.year}
                rating={item.rating}
            />
        )
    }

    const hasHistory = watchAgainItems.length > 0

    return (
        <div className="min-h-screen overflow-hidden">
            <HeroCarousel tmdb={tmdb} fetcher={() => Promise.all([tmdb.movie_lists.now_playing(), tmdb.tv_lists.popular()])} />

            <div className="pointer-events-none relative -mt-12 h-13">
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/70 to-background py-4" />
            </div>

            <section className="flex flex-col gap-8 bg-background p-8">
                {hasHistory && <MediaRail<WatchAgainItem> title="Watch Again" fetcher={fetchWatchAgain} getKey={(item) => `${item.type}-${item.id}`} renderItem={renderWatchAgainItem} />}

                <TvRail title="Trending TV Shows" fetcher={() => tmdb.tv_lists.popular({})} />

                <MovieRail title="Top Rated Movies" fetcher={() => tmdb.movie_lists.top_rated()} />

                <MovieRail title="Action Movies" fetcher={() => tmdb.discover.movies({ with_genres: "28", sort_by: "popularity.desc" })} />

                <MovieRail title="Comedy Movies" fetcher={() => tmdb.discover.movies({ with_genres: "35", sort_by: "popularity.desc" })} />

                <MovieRail title="Upcoming Movies" fetcher={() => tmdb.movie_lists.upcoming({})} />

                <TvRail title="Top Rated TV Shows" fetcher={() => tmdb.tv_lists.top_rated()} />
            </section>
        </div>
    )
}

export default HomePage
