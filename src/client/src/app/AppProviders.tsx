import { TooltipProvider } from "@/components/ui/tooltip"
import { type ReactNode, useMemo } from "react"
import { OmssProvider } from "@/app/providers/omss-provider"
import { TMDBProvider } from "@/app/providers/tmdb-provider"
import { ThemeProvider } from "@/app/providers/theme-provider"
import { useAppSettings } from "@/hooks/use-appsettings"
import "@/app/i18n/i18n"
import { HistoryProvider } from "@/app/providers/history-provider.tsx"

export default function AppProviders({ children }: { children: ReactNode }) {
    const { omssUrl, tmdbApiKey, tmdbOptions } = useAppSettings();

    const omssOptions = useMemo(
        () => ({
            baseUrl: omssUrl,
        }),
        [omssUrl]
    )

    return (
        <ThemeProvider defaultTheme="dark">
            <TooltipProvider>
                <TMDBProvider apiKey={tmdbApiKey} options={tmdbOptions}>
                    <OmssProvider options={omssOptions}>
                        <HistoryProvider>
                            {children}
                        </HistoryProvider>
                    </OmssProvider>
                </TMDBProvider>
            </TooltipProvider>
        </ThemeProvider>
    )
}
