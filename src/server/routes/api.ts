/**
 * Server routes - API endpoints (reserved for future use)
 */
import type { FastifyInstance } from "fastify"

export async function registerApiRoutes(app: FastifyInstance) {
    app.get("/api/*", async () => {
        return { message: "This endpoint is reserved for future use." }
    })
}
