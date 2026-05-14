import React, { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

const loadedImageSources = new Set<string>()

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src?: string | null
    fallbackSrc?: string
}

export function Image({ src, fallbackSrc = "/icon.png", alt = "", className, ...props }: ImageProps) {
    const srcToUse = src ?? fallbackSrc
    const [loaded, setLoaded] = useState(() => loadedImageSources.has(srcToUse))

    React.useEffect(() => {
        setLoaded(loadedImageSources.has(srcToUse))
    }, [srcToUse])

    return (
        <div className={cn("relative overflow-hidden rounded-md bg-muted", className)} style={{ display: "inline-block" }}>
            {!loaded && (
                <div className="absolute inset-0">
                    <Skeleton className="h-full w-full" />
                </div>
            )}

            <img
                src={srcToUse}
                alt={alt}
                decoding="async"
                onLoad={() => {
                    loadedImageSources.add(srcToUse)
                    setLoaded(true)
                }}
                onError={() => setLoaded(true)}
                className={cn(
                    "h-full w-full object-cover transition-opacity duration-300",
                    loaded ? "opacity-100" : "opacity-0"
                )}
                {...props}
            />
        </div>
    )
}

export default Image
