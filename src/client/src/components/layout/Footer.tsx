import { Link } from "react-router-dom"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
<<<<<<< HEAD
import { Film, Info, Tv } from "lucide-react"
import { t } from "i18next"
=======
import { Bug, Film, Github, Info, Tv } from "lucide-react"
>>>>>>> 7528011bf9cfac50ca2d9355f3ef9745299cc7ef
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"

export default function Footer() {
    const { t } = useTranslation(["footer", "common"])

    return (
        <footer id="footer" className="z-1 mt-8 border-t border-border bg-background py-4 transition-all duration-300 ease-in-out md:py-12">
            <div className="px-4 md:px-6">
                <div className="mb-6 grid grid-cols-2 gap-6 md:mb-8 md:grid-cols-3 md:gap-8">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <div className="mb-3 flex items-center gap-2 md:mb-4">
<<<<<<< HEAD
                            <img src="/logo.png" alt="Logo" width={150} height={150} />
=======
                            <img src="/favicon.svg" alt="Logo" width={40} height={40} />
                            <span className="text-lg font-bold text-primary md:text-xl">{t("common:projectName")}</span>
>>>>>>> 7528011bf9cfac50ca2d9355f3ef9745299cc7ef
                        </div>
                        <p className="text-xs text-muted-foreground md:text-sm">{t("tagline")}</p>
                    </div>

                    {/* Pages */}
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

<<<<<<< HEAD
                    {/* Links removed per request */}
=======
                    {/* Links */}
                    <div>
                        <h3 className="mb-2 flex items-center gap-1 text-sm font-semibold md:mb-4 md:text-base">Links</h3>
                        <ul className="space-y-1 md:space-y-2">
                            <li>
                                <Link
                                    to={t("common:opensource.git-url")}
                                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground md:text-sm"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    <Github className="h-4 w-4" /> {t("links.git")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={t("common:opensource.git-url") + "/blob/main/README.md"}
                                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground md:text-sm"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    <Info className="h-4 w-4" /> {t("links.about")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={t("common:opensource.git-url") + "/issues"}
                                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground md:text-sm"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    <Bug className="h-4 w-4" />
                                    {t("links.report-issue")}
                                </Link>
                            </li>
                        </ul>
                    </div>
>>>>>>> 7528011bf9cfac50ca2d9355f3ef9745299cc7ef
                </div>

                <Separator className="mb-6 md:mb-8" />

                <div className="flex flex-col items-center justify-between md:flex-row">
                    <p className="text-center text-xs text-muted-foreground md:text-left md:text-sm">
<<<<<<< HEAD
                        © {new Date().getFullYear()} {t("projectName")} by {t("authors")}. All rights reserved.
=======
                        © {new Date().getFullYear()} {t("projectName")} by{" "}
                        <Link to={t("common:opensource.git-url")} className="underline" target="_blank" rel="noopener">
                            {t("authors")}
                        </Link>
                        . All rights reserved.
>>>>>>> 7528011bf9cfac50ca2d9355f3ef9745299cc7ef
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
