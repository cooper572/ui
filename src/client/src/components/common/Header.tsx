import { useEffect, useState } from "react"

import { ArrowUpRight, Home, Search, Settings2 } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandShortcut,
} from "@/components/ui/command"

const navItems = [
    { label: "Home", icon: Home, to: "/" },
    { label: "API", icon: ArrowUpRight, to: "https://www.themoviedb.org", external: true },
]

export default function Header() {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const down = (event: KeyboardEvent) => {
            if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
                event.preventDefault()
                setOpen((prev) => !prev)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    return (
        <>
            <header className="fixed top-0 z-50 w-full">
                <div className="mx-auto mt-3 flex h-16 w-[min(92vw,1240px)] items-center justify-between rounded-2xl border border-white/10 bg-black/45 px-4 backdrop-blur-xl sm:px-5 lg:px-6">
                    <div className="flex items-center gap-4 lg:gap-6">
                        <Link to="/" className="group inline-flex items-center gap-2">
                            <span className="inline-flex size-10 items-center justify-center overflow-hidden rounded-2xl shadow-lg shadow-red-800/30 transition-transform duration-300 group-hover:scale-105">
                                <img src="/icon512_rounded.png" alt="CinePro logo" className="size-full object-cover" />
                            </span>
                            <span className="text-2xl font-semibold tracking-tight text-white">CinePro/ui</span>
                        </Link>

                        <nav className="hidden items-center gap-1 md:flex">
                            {navItems.map(({ label, icon: Icon, to, external }) =>
                                external ? (
                                    <a
                                        key={label}
                                        href={to}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/10 hover:text-white"
                                    >
                                        <Icon className="size-3.5" />
                                        {label}
                                    </a>
                                ) : (
                                    <Link
                                        key={label}
                                        to={to}
                                        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/10 hover:text-white"
                                    >
                                        <Icon className="size-3.5" />
                                        {label}
                                    </Link>
                                )
                            )}
                        </nav>

                        <div className="hidden sm:block">
                            <Button
                                variant="outline"
                                onClick={() => setOpen(true)}
                                className="h-9 w-36 justify-between rounded-full border-white/10 bg-zinc-900/70 px-3 text-sm text-zinc-400 hover:bg-zinc-900/90 hover:text-zinc-200 lg:w-48"
                            >
                                <span className="inline-flex items-center gap-2">
                                    <Search className="size-4" />
                                    Search
                                </span>
                                <kbd className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-zinc-300">Ctrl K</kbd>
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button asChild variant="outline" size="sm" className="rounded-full border-white/15 bg-white/5 px-3 text-xs text-zinc-100 hover:bg-white/10">
                            <Link to="/settings" className="inline-flex items-center gap-1.5">
                                <Settings2 className="size-4" />
                                Settings
                            </Link>
                        </Button>

                        <Button asChild variant="outline" size="sm" className="rounded-full border-white/15 bg-white/5 px-3 text-xs text-zinc-100 hover:bg-white/10">
                            <a href="https://github.com/cinepro-org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5">
                                <ArrowUpRight className="size-4" />
                                GitHub
                            </a>
                        </Button>
                    </div>
                </div>
            </header>

            <CommandDialog open={open} onOpenChange={setOpen} className="border-white/10 bg-zinc-950 text-zinc-100">
                <CommandInput placeholder="Search movies, series, genres..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Quick Links">
                        <CommandItem>
                            Home
                            <CommandShortcut>H</CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                            API
                            <CommandShortcut>A</CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                            Trending
                            <CommandShortcut>T</CommandShortcut>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}
