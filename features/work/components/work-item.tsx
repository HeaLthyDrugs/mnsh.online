"use client";

import Link from "next/link";
import dayjs from "dayjs";
import type { Post } from "../types/work-post";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Tag } from "@/components/ui/tag";
import { Icons } from "@/components/icons";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SimpleTooltip } from "@/components/ui/tooltip";

/**
 * Formats the duration string from start and end dates.
 * Shows "Ongoing" for active projects (no end date).
 */
function formatDuration(startDate?: string, endDate?: string): string {
  if (!startDate) return "";

  const start = dayjs(startDate).format("MMM YYYY");
  const end = endDate ? dayjs(endDate).format("MMM YYYY") : "Ongoing";

  return `${start} — ${end}`;
}

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
  const duration = formatDuration(metadata.startDate, metadata.endDate);

  return (
    <Link
      href={`/work/${work.slug}`}
      className={cn(
        "group/post relative flex flex-col gap-3 p-2",
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

          {metadata.projectType && (
            <Tag className="absolute bottom-1.5 left-1.5 flex items-center gap-1 rounded-md bg-background/80 px-1.5 py-0.5 text-xs font-medium text-foreground backdrop-blur-sm">
              {getProjectTypeIcon(metadata.projectType)}
              <span>{metadata.projectType}</span>
            </Tag>
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-col gap-0.5">
            <h3 className="text-xl font-semibold leading-tight tracking-tight text-foreground underline-offset-4 group-hover/post:underline">
              {metadata.title}
            </h3>

            {/* Client info for freelance/client work */}
            {metadata.client && (
              <p className="text-sm text-muted-foreground">
                for <span className="font-medium text-foreground">{metadata.client}</span>
              </p>
            )}
          </div>

          {metadata.description && (
            <p className="line-clamp-2 text-sm text-muted-foreground/80">
              {metadata.description}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between gap-2 mt-auto">
          {/* Duration */}
          <div className="text-xs font-medium text-muted-foreground/60">
            {duration}
          </div>
        </div>
      </div>

      {metadata.liveUrl && (
        <SimpleTooltip content="Preview Live Site">
          <Button
            variant="outline"
            size="icon"
            className="absolute bottom-0 right-0 z-10 size-6 rounded-none cursor-pointer m-1"
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
