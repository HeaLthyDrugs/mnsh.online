"use client";

import Link from "next/link";
import type { Post } from "../types/work-post";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Tag } from "@/components/ui/tag";
import { Icons } from "@/components/icons";
import { ArrowUpRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
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
        "max-sm:border-y max-sm:border-edge",
        "sm:nth-[2n+1]:border-y sm:nth-[2n+1]:border-edge"
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
            <span className="absolute top-2 right-2 rounded-none bg-info px-1.5 font-sans text-sm font-medium text-white text-shadow-xs">
              New
            </span>
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col justify-between gap-3 px-1">
        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-medium leading-tight tracking-tight text-foreground underline-offset-4 group-hover/post:underline">
              {metadata.title}
            </h3>
          </div>

          {metadata.description && (
            <p className="line-clamp-2 text-sm text-muted-foreground/80 leading-relaxed">
              {metadata.description}
            </p>
          )}
        </div>

        {(metadata.liveUrl || metadata.repoUrl) && (
          <div className="flex items-center gap-2">
            <div
              className={cn(
                buttonVariants({
                  size: "sm",
                  variant: "secondary",
                  className:
                    "gap-0 divide-x px-0 font-sans active:scale-none dark:divide-white/10 rounded-none hover:rounded-none focus:rounded-none w-fit",
                })
              )}
            >
              {metadata.repoUrl && (
                <SimpleTooltip content="View Source">
                  <button
                    type="button"
                    className="flex size-7 items-center justify-center transition-colors hover:bg-muted/50 rounded-none outline-none disabled:opacity-50"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(metadata.repoUrl, "_blank");
                    }}
                  >
                    <Icons.github className="size-3.5" />
                    <span className="sr-only">View Source for {metadata.title}</span>
                  </button>
                </SimpleTooltip>
              )}

              {metadata.liveUrl && (
                <SimpleTooltip content="Preview Live Site">
                  <button
                    type="button"
                    className="flex size-7 items-center justify-center transition-colors hover:bg-muted/50 rounded-none outline-none disabled:opacity-50"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(metadata.liveUrl, "_blank");
                    }}
                  >
                    <ArrowUpRight className="size-3.5" />
                    <span className="sr-only">Preview Live Site for {metadata.title}</span>
                  </button>
                </SimpleTooltip>
              )}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}

