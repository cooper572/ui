import { Link } from "react-router-dom"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { Film, Info, Tv } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"

export default function Footer() {
    const { t } = useTranslation(["footer", "common"])

    return (
        <footer id="footer" className="z-1 mt-8 border-t border-border bg-background py-4 transition-all duration-300 ease-in-out md:py-12">
            <div className="px-4 md:px-6">
                <div className="mb-6 grid grid-cols-2 gap-6 md:mb-8 md:grid-cols-2 md:gap-8">
                    <div className="col-span-2 md:col-span-1">
                        <div className="mb-3 flex items-center gap-2 md:mb-4">
                            <img src="/logo.png" alt="logo" width={80} height={80} />
                        </div>
                        <p className="text-xs text-muted-foreground md:text-sm">{t("tagline")}</p>
                    </div>

                    <div>
                        <h3 className="mb-2 flex items-center gap-1 text-sm font-semibold md:mb-4 md:text-base">Pages</h3>
                        <ul className="space-y-1 md:space-y-2">
                            <li>
                                <Link to="/movies" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground md:text-sm" target="_self" rel="noopener">
                                    <Film className="h-4 w-4" /> {t("common:movie.plural")}
                                </Link>
                            </li>
                            <li>
                                <Link to="/shows" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground md:text-sm" target="_self" rel="noopener">
                                    <Tv className="h-4 w-4" /> {t("common:tvShow.plural")}
                                </Link>
                            </li>
                            <li>
                                <Link to="/disclaimer" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground md:text-sm" target="_self" rel="noopener">
                                    <Info className="h-4 w-4" /> {t("common:disclaimer.label")}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <Separator className="mb-6 md:mb-8" />

                <div className="flex flex-col items-center justify-between md:flex-row">
                    <p className="text-center text-xs text-muted-foreground md:text-left md:text-sm">
                        &copy; {new Date().getFullYear()} {t("projectName")} by {t("authors")}. All rights reserved.
                    </p>

                    <div className="z-1 mt-4 flex flex-wrap justify-center gap-4 md:mt-0">
                        <Button
                            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                                e.preventDefault()
                                toast.success(t("cookie-policy.value"))
                            }}
                            variant={"outline"}
                        >
                            <Info className="h-4 w-4" />
                            {t("cookie-policy.label")}
                        </Button>
                    </div>
                </div>
            </div>
        </footer>
    )
}
