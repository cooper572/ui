import { useTranslation } from "react-i18next"
import { useNavigate, useSearchParams } from "react-router-dom"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

import { useAppSettings } from "@/hooks/use-appsettings.ts"
import { supportedLocales, type SupportedLocales } from "@/hooks/use-appsettings"
import { useHistory } from "@/hooks/use-history.ts"

import { Item, ItemContent } from "@/components/ui/item.tsx"
import { H1, P } from "@/components/ui/typography.tsx"
import { Button } from "@/components/ui/button"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"

import ConfirmDialog from "@/components/layout/ConfirmDialog.tsx"

import { RefreshCcw, Trash2 } from "lucide-react"
import { useEffect } from "react"

export default function Settings() {
    const { t } = useTranslation(["settings", "common", "header"])
    const navigate = useNavigate()

    const [searchParams, setSearchParams] = useSearchParams()

    const validTabs = ["general", "history", "playback"] as const

    type Tab = (typeof validTabs)[number]

    const tabFromUrl = searchParams.get("tab")

    const currentTab: Tab = validTabs.includes(tabFromUrl as Tab) ? (tabFromUrl as Tab) : "general"

    useEffect(() => {
        // if no tab is specified in the URL, redirect to the first tab
        if (!tabFromUrl) {
            navigate({ pathname: location.pathname, search: `?tab=${validTabs[0]}` }, { replace: true })
        }
    }, [])

    const { locale, autoplayNext, setLocale, setAutoplayNext } = useAppSettings()

    const { clear, history, remove } = useHistory()

    return (
        <section className="mx-auto mt-25 min-h-[60vh] max-w-3xl space-y-6">
            <H1>{t("title")}</H1>

            <Tabs
                value={currentTab}
                onValueChange={(value) => {
                    const params = new URLSearchParams(searchParams)

                    if (value === "general") {
                        params.delete("tab")
                    } else {
                        params.set("tab", value)
                    }

                    setSearchParams(params, {
                        replace: true,
                    })
                }}
                className="w-full px-3"
            >
                {/* Tabs header */}
                <TabsList variant="line">
                    <TabsTrigger value="general">{t("general.title")}</TabsTrigger>
                    <TabsTrigger value="history">{t("tabs.history")}</TabsTrigger>
                    <TabsTrigger value="playback">{t("tabs.playback")}</TabsTrigger>
                </TabsList>

                {/* ---------------- GENERAL ---------------- */}
                <TabsContent value="general">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t("general.title")}</CardTitle>
                            <CardDescription>{t("general.description")}</CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            <div className="mt-3 flex justify-between">
                                <div>
                                    <Label>{t("general.language.cardlabel")}</Label>
                                    <span className="flex pt-1 text-muted-foreground">{t("general.language.info")}</span>
                                </div>

                                <Select value={locale} onValueChange={(value) => setLocale(value as SupportedLocales)}>
                                    <SelectTrigger className="max-w-min">
                                        <SelectValue placeholder={t("general.language.placeholder")} />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>{t("general.language.selectlabel")}</SelectLabel>

                                            {supportedLocales.map((l) => (
                                                <SelectItem key={l.iso639} value={l.iso639}>
                                                    {l.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="mt-3 flex justify-between">
                                <div>
                                    <Label>{t("general.reset.label")}</Label>
                                    <span className="flex pt-1 text-muted-foreground">{t("general.reset.info")}</span>
                                </div>
                                <ConfirmDialog
                                    title={t("general.reset.title")}
                                    description={t("general.reset.description")}
                                    onConfirm={() => {
                                        localStorage.clear()
                                        location.reload()
                                    }}
                                    classname="w-40"
                                    trigger={
                                        <Button variant="destructive" className={"max-w-min"}>
                                            <RefreshCcw />
                                            <span className={"ml-1 hidden sm:inline"}>{t("general.reset.button")}</span>
                                        </Button>
                                    }
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* ---------------- HISTORY ---------------- */}
                <TabsContent value="history">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t("history.title")}</CardTitle>
                            <CardDescription>{t("history.description")}</CardDescription>

                            <CardAction>
                                <ConfirmDialog
                                    title={t("history.clear.title")}
                                    description={t("history.clear.description")}
                                    onConfirm={clear}
                                    trigger={
                                        <Button variant="destructive" className={"max-w-min"} disabled={!history.length}>
                                            <Trash2 />
                                            <span className={"ml-1 hidden sm:inline"}>{t("history.clear.button")}</span>
                                        </Button>
                                    }
                                />
                            </CardAction>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            {!history.length ? (
                                <Empty className="rounded-lg border py-10">
                                    <EmptyHeader>
                                        <EmptyMedia variant="icon">
                                            <Trash2 className="size-5" />
                                        </EmptyMedia>
                                        <EmptyTitle>{t("history.empty.title")}</EmptyTitle>
                                        <EmptyDescription>{t("history.empty.description")}</EmptyDescription>
                                    </EmptyHeader>
                                </Empty>
                            ) : (
                                <div className="space-y-2">
                                    {history.map((item) => {
                                        const title = item.kind === "movie" ? item.item.title : `${item.item.tvshowtitle} • S${item.item.season_number}E${item.item.episode_number}`

                                        return (
                                            <Item key={title} className="lenis-stopped flex items-center justify-between border-dashed border-border">
                                                <ItemContent>
                                                    <P>{title}</P>
                                                </ItemContent>

                                                <ConfirmDialog
                                                    title={t("history.item.removeTitle")}
                                                    description={t("history.item.removeDescription")}
                                                    onConfirm={() => remove(item)}
                                                    trigger={
                                                        <Button variant="secondary" size="sm">
                                                            <Trash2 />
                                                            {t("history.item.removeButton")}
                                                        </Button>
                                                    }
                                                />
                                            </Item>
                                        )
                                    })}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* ---------------- PLAYBACK ---------------- */}
                <TabsContent value="playback">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t("playback.title")}</CardTitle>
                            <CardDescription>{t("playback.description")}</CardDescription>
                        </CardHeader>

                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <Label>{t("playback.autoplayNext.label")}</Label>
                                    <p className="text-sm text-muted-foreground">{t("playback.autoplayNext.description")}</p>
                                </div>

                                <Switch checked={autoplayNext} onCheckedChange={setAutoplayNext} />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </section>
    )
}
