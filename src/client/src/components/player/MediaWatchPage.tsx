import { useParams, useSearchParams, useNavigate } from "react-router-dom"
import { ErrorState } from "./ErrorState"
import type { MediaType } from "./types/media.types"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { buildPlayerEmbedUrl } from "./embed-config"

function MediaWatchPageContent({ type }: { type: MediaType }) {
    const { id } = useParams<{ id: string }>()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const season = searchParams.get("s") ? parseInt(searchParams.get("s")!) : type === "tv" ? 1 : undefined
    const episode = searchParams.get("e") ? parseInt(searchParams.get("e")!) : type === "tv" ? 1 : undefined
    const hasValidId = Number.isInteger(Number(id)) && Number(id) > 0

    if (!hasValidId) {
        return <ErrorState error="Invalid media id" />
    }

    let embedUrl: string

    try {
        embedUrl = buildPlayerEmbedUrl(id!, type === "tv" ? season : undefined, type === "tv" ? episode : undefined)
    } catch (error) {
        return <ErrorState error={error instanceof Error ? error.message : "Player embed is not configured"} />
    }

    return (
        <div className="relative min-h-screen bg-black text-foreground">
            <div className="absolute top-4 left-4 z-50">
                <Button variant="ghost" className="border border-border" onClick={() => navigate(-1)}>
                    <ChevronLeft className="h-6 w-6" /> Back
                </Button>
            </div>

            <div className="h-screen w-full bg-black">
                <iframe
                    src={embedUrl}
                    title="Embedded Player"
                    className="h-full w-full border-0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    referrerPolicy="origin"
                />
            </div>
        </div>
    )
}

export default function MediaWatchPage({ type }: { type: MediaType }) {
    return <MediaWatchPageContent type={type} />
}
