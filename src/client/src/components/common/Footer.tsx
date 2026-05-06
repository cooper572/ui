import { Film, Tv, Video } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom"

const socialLinks = [
    { label: "Live", icon: Video },
    { label: "Instagram", icon: Film },
    { label: "TV", icon: Tv },
]

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="relative mt-16 border-t border-white/10 bg-black text-zinc-300">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_120%_at_50%_0%,rgba(255,68,0,0.18),transparent_60%)]" />

            <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-5 lg:px-8">
                <div className="lg:col-span-2">
                    <div>
                    <Link to="/" className="group inline-flex items-center gap-2">
                            <span className="inline-flex size-10 items-center justify-center overflow-hidden rounded-2xl shadow-lg shadow-red-800/30 transition-transform duration-300 group-hover:scale-105">
                                <img src="/icon512_rounded.png" alt="CinePro logo" className="size-full object-cover" />
                            </span>
                            <span className="text-2xl font-semibold tracking-tight text-white">CinePro/ui</span>
                        </Link>
                        </div>
                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-400">
                        Watch blockbuster movies, binge-worthy series, and live channels all in one
                        place.
                    </p>
                    <div className="mt-5 flex items-center gap-2">
                        {socialLinks.map(({ label, icon: Icon }) => (
                            <Button
                                key={label}
                                asChild
                                variant="outline"
                                size="icon"
                                className="rounded-full border-white/10 bg-zinc-900/70 text-zinc-300 hover:border-red-500/50 hover:bg-zinc-900/90 hover:text-white"
                                aria-label={label}
                            >
                                <a href="#" aria-label={label} title={label}>
                                    <Icon className="size-4" />
                                </a>
                            </Button>
                        ))}
                    </div>
                </div>

            </div>

            <Separator className="bg-white/10" />

            <div className="relative py-5">
                <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                    <p>Copyright {currentYear} CinePro, Inc. All rights reserved.</p>
                    <p>Built for movie nights and weekend marathons.</p>
                </div>
            </div>
        </footer>
    )
}

type FooterColumnProps = {
    title: string
    links: string[]
}

function FooterColumn({ title, links }: FooterColumnProps) {
    return (
        <div>
            <h3 className="mb-3 text-sm font-semibold tracking-wide text-white">{title}</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
                {links.map((link) => (
                    <li key={link}>
                        <a href="#" className="transition hover:text-white">
                            {link}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}
