import { useTmdb } from "@/hooks/use-tmdb"
import { HeroCarousel } from "@/components/media/HeroCarousel/HeroCarousel"
import { MovieRail, TvRail } from "@/components/media/MediaRail/TypedRails.tsx"
import { MediaRail } from "@/components/media/MediaRail/MediaRail.tsx"
import { MediaCard } from "@/components/media/MediaRail/MediaCard.tsx"
import { useHistory } from "@/hooks/use-history"
import type { HistoryItem } from "@/app/providers/history-provider"

export function HomePage() {
    const tmdb = useTmdb()
    const { history } = useHistory()

    const renderHistoryItem = (entry: HistoryItem) => {
        if (entry.kind === "movie") {
            return (
                <MediaCard
                    title={entry.item.title}
                    imagePath={entry.item.poster_path}
                    imageAlt={entry.item.title}
                    id={entry.item.id}
                    type="movie"
                    year={new Date(entry.item.release_date).getFullYear()}
                    rating={entry.item.vote_average}
                />
            )
        }

        return (
            <MediaCard
                title={entry.item.tvshowtitle}
                imagePath={entry.item.still_path || entry.item.poster_path}
                imageAlt={`${entry.item.tvshowtitle} S${entry.item.season_number}E${entry.item.episode_number}`}
                id={entry.item.show_id}
                type="tv"
                year={new Date(entry.item.air_date).getFullYear()}
                rating={entry.item.vote_average}
            />
        )
    }

    return (
        <div className="min-h-screen overflow-hidden">
            <HeroCarousel tmdb={tmdb} fetcher={() => Promise.all([tmdb.movie_lists.now_playing(), tmdb.tv_lists.popular()])} />

            <div className="pointer-events-none relative -mt-12 h-13">
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/70 to-background py-4" />
            </div>

            <section className="flex flex-col gap-8 bg-background p-8">
                {history.length > 0 ? (
                    <MediaRail<HistoryItem>
                        title="Watch Again"
                        fetcher={async () => history}
                        getKey={(entry) => (entry.kind === "movie" ? `movie-${entry.item.id}` : `tv-${entry.item.show_id}-${entry.item.season_number}-${entry.item.episode_number}`)}
                        renderItem={renderHistoryItem}
                    />
                ) : (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold">Watch Again</h2>
                        <p className="text-sm text-muted-foreground">Your recently watched movies and episodes will show up here.</p>
                    </div>
                )}

                <TvRail title="Trending TV Shows" fetcher={() => tmdb.tv_lists.popular({})} />

                <MovieRail title="Top Rated Movies" fetcher={() => tmdb.movie_lists.top_rated()} />
            </section>
        </div>
    )
}

export default HomePage
