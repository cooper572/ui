import { useEffect, useState } from "react"
import { useOmss } from "@/hooks/use-omss"
import { omssService } from "../services/omss.service"
import type { MediaType } from "../types/media.types"
import type { SourceResponse } from "@omss/sdk"

export function useMediaSources(id: string, type: MediaType, season?: number, episode?: number) {
    const { client } = useOmss()
    const hasValidId = Number.isInteger(Number(id)) && Number(id) > 0
    const [sources, setSources] = useState<SourceResponse | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string>()

    useEffect(() => {
        async function fetchSources() {
            if (!hasValidId) {
                setSources(null)
                setError("Invalid media id")
                setIsLoading(false)
                return
            }

            setIsLoading(true)
            setError(undefined)
            try {
                if (type === "movie") {
                    const res = await omssService.getMovieSources(client, id)
                    setSources(res)
                } else if (season !== undefined && episode !== undefined) {
                    const res = await omssService.getTvSources(client, id, season, episode)
                    setSources(res)
                }
            } catch (e) {
                setError(e instanceof Error ? e.message : String(e))
            } finally {
                setIsLoading(false)
            }
        }

        fetchSources()
    }, [hasValidId, id, type, season, episode, client])

    return { sources, isLoading, error }
}
