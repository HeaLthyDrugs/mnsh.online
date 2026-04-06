"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import type { Post } from "../types/work-post";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Tag } from "@/components/ui/tag";
import { Icons } from "@/components/icons";
import { ArrowUpRight } from "lucide-react";
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

function getStatusConfig(status?: string) {
  switch (status) {
    case "Completed":
      return { label: "Finished", dotClass: "bg-zinc-400 dark:bg-zinc-500", desc: "This project has been completed." };
    case "In Progress":
      return { label: "Working", dotClass: "bg-amber-500", pingClass: "bg-amber-500", desc: "Actively working on this project." };
    case "Maintained":
      return { label: "Operational", dotClass: "bg-emerald-500", pingClass: "bg-emerald-500", desc: "All systems are operational and maintained." };
    case "Archived":
      return { label: "Archived", dotClass: "bg-muted-foreground", desc: "This project is archived and no longer maintained." };
    default:
      if (status) return { label: status, dotClass: "bg-muted-foreground", desc: `Status: ${status}` };
      return null;
  }
}

function TruncatedDescription({ text }: { text: string }) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const check = () => setIsTruncated(el.scrollHeight > el.clientHeight);
    check();

    const timeoutId = setTimeout(check, 100);
    window.addEventListener("resize", check);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", check);
    };
  }, [text]);

  const pBlock = (
    <p
      ref={textRef}
      className="line-clamp-2 text-sm text-muted-foreground/80 leading-relaxed"
    >
      {text}
    </p>
  );

  if (isTruncated) {
    return (
      <SimpleTooltip content={<p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{text}</p>}>
        {pBlock}
      </SimpleTooltip>
    );
  }

  return pBlock;
}

export function WorkItem({
  work,
  shouldPreloadImage,
}: {
  work: Post;
  shouldPreloadImage?: boolean;
}) {
  const { metadata } = work;

  const inProgress = metadata.status === "In Progress";

  const innerContent = (
    <>
      {metadata.image && (
        <div className="relative select-none block overflow-hidden">
          <Image
            src={metadata.image}
            alt={metadata.title}
            width={1200}
            height={630}
            quality={100}
            priority={shouldPreloadImage}
            className={cn(
              "rounded-none aspect-1200/630 object-cover transition-all duration-300",
              inProgress && "blur-sm scale-[1.02] opacity-80"
            )}
          />

          {inProgress && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/30 backdrop-blur-[2px] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] bg-[size:16px_16px]">
              <span className="text-[10px] uppercase tracking-[0.2em] font-mono font-medium text-foreground/40 select-none dark:text-foreground/90">
                Work in Progress
              </span>
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 z-20 rounded-none ring-1 ring-black/10 ring-inset dark:ring-white/10" />

          {metadata.new && !inProgress && (
            <span className="absolute z-20 top-2 right-2 rounded-none bg-info px-1.5 font-sans text-sm font-medium text-white text-shadow-xs">
              New
            </span>
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col justify-between gap-3 px-1">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <h3 className={cn(
              "text-lg font-medium leading-tight tracking-tight text-foreground underline-offset-4",
              !inProgress && "group-hover/post:underline"
            )}>
              {metadata.title}
            </h3>
          </div>

          {metadata.description && (
            <TruncatedDescription text={metadata.description} />
          )}
        </div>
      </div>

      {(metadata.liveUrl || metadata.repoUrl || metadata.status) && (
        <div className="mt-auto flex w-fit items-center gap-0 divide-x divide-edge border border-edge bg-background">
          {metadata.status && (() => {
            const statusConfig = getStatusConfig(metadata.status);
            if (!statusConfig) return null;
            return (
              <SimpleTooltip content={statusConfig.desc}>
                <div className="flex h-8 items-center gap-2 px-3 text-xs font-medium text-muted-foreground select-none transition-colors hover:bg-muted/30 hover:text-foreground cursor-help">
                  <span className="relative flex size-2 shrink-0">
                    {statusConfig.pingClass && (
                      <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-75", statusConfig.pingClass)}></span>
                    )}
                    <span className={cn("relative inline-flex size-2 rounded-full", statusConfig.dotClass)}></span>
                  </span>
                  <span className="truncate">{statusConfig.label}</span>
                </div>
              </SimpleTooltip>
            );
          })()}

          {metadata.repoUrl && (
            <SimpleTooltip content="View Source">
              <button
                type="button"
                className="flex h-8 items-center px-3 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground cursor-pointer outline-none"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(metadata.repoUrl, "_blank", "noopener,noreferrer");
                }}
              >
                <Icons.github className="size-4" />
                <span className="sr-only">View Source for {metadata.title}</span>
              </button>
            </SimpleTooltip>
          )}

          {metadata.liveUrl && (
            <SimpleTooltip content="Preview Live Site">
              <button
                type="button"
                className="flex h-8 items-center px-3 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground cursor-pointer outline-none"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(metadata.liveUrl, "_blank", "noopener,noreferrer");
                }}
              >
                <ArrowUpRight className="size-4" />
                <span className="sr-only">Preview Live Site for {metadata.title}</span>
              </button>
            </SimpleTooltip>
          )}
        </div>
      )}
    </>
  );

  const containerClassName = cn(
    "group/post relative flex flex-col gap-4 p-2",
    "border-y border-edge",
    inProgress ? "cursor-default" : "cursor-pointer"
  );

  if (inProgress) {
    return (
      <div className={containerClassName}>
        {innerContent}
      </div>
    );
  }

  return (
    <Link
      href={`/work/${work.slug}`}
      className={containerClassName}
    >
      {innerContent}
    </Link>
  );
}
