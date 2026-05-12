/**
 * Server entry point
 * Bootstraps and starts the Fastify application
 */
import { buildApp } from "./app.js"

async function main() {
    console.clear()
    const app = await buildApp()

    try {
        await app.listen({
            port: app.config.PORT,
            host: app.config.HOST,
        })

        console.log(`Pandora is running at http://${app.config.HOST}:${app.config.PORT}`)
        console.log("Pandora server started.\n")
        console.log(`Press CTRL+C to stop\n`)
    } catch (err) {
        console.error("Failed to start server:", err instanceof Error ? err.message : String(err))
        process.exit(1)
    }
}

main()
