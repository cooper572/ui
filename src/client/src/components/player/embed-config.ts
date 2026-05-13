const PLAYER_EMBED_BASE_URL = "https://player-aj5.pages.dev/"

export function buildPlayerEmbedUrl(id: string, type: "movie" | "tv", season?: number, episode?: number) {
    if (!PLAYER_EMBED_BASE_URL || PLAYER_EMBED_BASE_URL.includes("your-site.com")) {
        throw new Error("Set PLAYER_EMBED_BASE_URL in src/client/src/components/player/embed-config.ts")
    }

    const url = new URL(PLAYER_EMBED_BASE_URL)
    url.searchParams.set("id", id)
    url.searchParams.set("type", type)

    if (season !== undefined && episode !== undefined) {
        url.searchParams.set("season", String(season))
        url.searchParams.set("episode", String(episode))
    }

    return url.toString()
}

export { PLAYER_EMBED_BASE_URL }
