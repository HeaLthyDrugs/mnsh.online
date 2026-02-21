import Link from "next/link";
import dayjs from "dayjs";
import type { BlogPost } from "../types/blog-post";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Tag } from "@/components/ui/tag";
import { Icons } from "@/components/icons";

/**
 * Formats the date string for display.
 */
function formatDate(dateString: string): string {
    return dayjs(dateString).format("MMM D, YYYY");
}

/**
 * Returns the appropriate icon component based on category.
 */
function getCategoryIcon(category?: string) {
    switch (category?.toLowerCase()) {
        case "technology":
        case "development":
            return <Icons.code className="size-3.5" />;
        case "design":
            return <Icons.palette className="size-3.5" />;
        case "thoughts":
        case "personal":
            return <Icons.feather className="size-3.5" />;
        default:
            return <Icons.fileText className="size-3.5" />;
    }
}

export function BlogItem({
    post,
    shouldPreloadImage,
}: {
    post: BlogPost;
    shouldPreloadImage?: boolean;
}) {
    const { metadata } = post;

    return (
        <Link
            href={`/blog/${post.slug}`}
            className={cn(
                "group/post flex flex-col gap-2 p-2",
                "max-sm:screen-line-before max-sm:screen-line-after",
                "sm:nth-[2n+1]:screen-line-before sm:nth-[2n+1]:screen-line-after"
            )}
        >
            {metadata.image && (
                <div className="relative select-none [&_img]:aspect-1200/630 [&_img]:rounded-none">
                    <Image
                        src={metadata.image}
                        alt={metadata.title}
                        width={1200}
                        height={630}
                        quality={100}
                        priority={shouldPreloadImage}
                        unoptimized
                    />

                    <div className="pointer-events-none absolute inset-0 rounded-none ring-1 ring-black/10 ring-inset dark:ring-white/10" />

                    {metadata.new && (
                        <span className="absolute top-1.5 right-1.5 rounded-md bg-info px-1.5 font-mono text-sm font-medium text-white text-shadow-xs">
                            New
                        </span>
                    )}

                    {metadata.category && (
                        <Tag
                            className="absolute bottom-1.5 left-1.5 flex items-center gap-1 rounded-md bg-background/80 px-1.5 py-0.5 text-xs font-medium text-foreground backdrop-blur-sm"
                        >
                            {getCategoryIcon(metadata.category)}
                            <span className="capitalize">{metadata.category}</span>
                        </Tag>
                    )}
                </div>
            )}

            <div className="flex flex-col gap-1 p-2">
                <h3 className="text-lg leading-snug font-medium text-balance underline-offset-4 group-hover/post:underline">
                    {metadata.title}
                </h3>

                {/* Read time and date */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {metadata.readTime && (
                        <>
                            <span>{metadata.readTime} min read</span>
                            <span>·</span>
                        </>
                    )}
                    <time dateTime={metadata.createdAt}>
                        {formatDate(metadata.createdAt)}
                    </time>
                </div>

                {/* Tags */}
                {metadata.tags && metadata.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                        {metadata.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </Link>
    );
}
