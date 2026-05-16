import { createRoot } from "react-dom/client"
import "@/index.css"
import App from "@/app/App"
import AppProviders from "@/app/AppProviders"
import { AppSettingsProvider } from "@/app/providers/settings-provider.tsx"

restoreSpaRoute()

function restoreSpaRoute() {
    const { hash, search } = window.location

    if (!search.startsWith("?/")) {
        return
    }

    const restoredPath = search
        .slice(1)
        .replace(/~and~/g, "&")
        .replace(/^\/?/, "/")

    window.history.replaceState({}, "", `${restoredPath}${hash}`)
}

createRoot(document.getElementById("root")!).render(
    <AppSettingsProvider>
        <AppProviders>
            <App />
        </AppProviders>
    </AppSettingsProvider>
)
