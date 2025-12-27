"use client";

import Link from "next/link";
import type { Post } from "../types/work-post";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Tag } from "@/components/ui/tag";
import { Icons } from "@/components/icons";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SimpleTooltip } from "@/components/ui/tooltip";

/**
 * Returns the appropriate icon component based on project type.
 */
function getProjectTypeIcon(projectType?: string) {
  switch (projectType) {
    case "Freelance":
    case "Client Work":
      return <Icons.briefcase className="size-3.5" />;
    case "Personal":
    case "Open Source":
      return <Icons.personal className="size-3.5" />;
    default:
      return null;
  }
}

export function WorkItem({
  work,
  shouldPreloadImage,
}: {
  work: Post;
  shouldPreloadImage?: boolean;
}) {
  const { metadata } = work;

  return (
    <Link
      href={`/work/${work.slug}`}
      className={cn(
        "group/post relative flex flex-col gap-4 p-2",
        "max-sm:screen-line-before max-sm:screen-line-after",
        "sm:nth-[2n+1]:screen-line-before sm:nth-[2n+1]:screen-line-after"
      )}
    >
      {metadata.image && (
        <div className="relative select-none">
          <Image
            src={metadata.image}
            alt={metadata.title}
            width={1200}
            height={630}
            quality={100}
            priority={shouldPreloadImage}
            className="rounded-none aspect-1200/630 object-cover"
            unoptimized
          />

          <div className="pointer-events-none absolute inset-0 rounded-none ring-1 ring-black/10 ring-inset dark:ring-white/10" />

          {metadata.new && (
            <span className="absolute top-2 right-2 rounded-md bg-info px-1.5 font-mono text-sm font-medium text-white text-shadow-xs">
              New
            </span>
          )}

          {metadata.projectType && (
            <Tag className="absolute bottom-0 left-0 flex items-center gap-1.5 rounded-none bg-background/90 px-2 py-0.5 text-xs font-medium text-foreground backdrop-blur-sm">
              {getProjectTypeIcon(metadata.projectType)}
              <span>{metadata.projectType}</span>
            </Tag>
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col justify-between gap-3 px-1">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-medium leading-tight tracking-tight text-foreground underline-offset-4 group-hover/post:underline">
              {metadata.title}
            </h3>

            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
              {metadata.client && (
                <span>
                  for <span className="text-foreground/90">{metadata.client}</span>
                </span>
              )}
            </div>
          </div>

          {metadata.description && (
            <p className="line-clamp-2 text-sm text-muted-foreground/80 leading-relaxed">
              {metadata.description}
            </p>
          )}
        </div>
      </div>

      {metadata.liveUrl && (
        <SimpleTooltip content="Preview Live Site">
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-0 right-0 z-10 size-8 rounded-none cursor-pointer opacity-0 transition-opacity group-hover/post:opacity-100 hover:bg-muted text-muted-foreground hover:text-foreground"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(metadata.liveUrl, "_blank");
            }}
          >
            <ArrowUpRight className="size-4" />
            <span className="sr-only">Preview {metadata.title}</span>
          </Button>
        </SimpleTooltip>
      )}
    </Link>
  );
}

