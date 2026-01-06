"use client";

import { CheckIcon, ExternalLinkIcon, RssIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { SITE_INFO, SOURCE_CODE_GITHUB_URL } from "@/config/site";
import { cn } from "@/lib/utils";
import { CopyIcon, type CopyIconHandle } from "./animated-icons/copy";
import { Icons } from "./icons";
import { SimpleTooltip } from "./ui/tooltip";



export function SiteFooter() {
  return (
    <footer className="max-w-screen overflow-x-hidden px-2">
      <div className="screen-line-before mx-auto border-x border-edge md:max-w-3xl">
        <div className="flex flex-col">
          {/* Headline & Timezone */}
          <div className="py-8 px-4 space-y-4">
            <h3 className="text-3xl md:text-3xl font-heading text-muted-foreground/80 leading-tight">
              Got a project in mind?
            </h3>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              I&apos;m always open to interesting conversations — whether it&apos;s about building something together, sharing ideas, or just saying hello.
            </p>

            {/* Timezone Display */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
              <LiveClock />
            </div>
          </div>

          {/* Contact CTAs */}
          <div className="screen-line-before flex flex-col">
            <ContactRow
              value="hey@mnsh.me"
              platform="mailto"
              href="mailto:hey@mnsh.me"
            />
            <div className="h-px w-full bg-edge" />
            <ContactRow
              value="@HeLLLthyDrug"
              platform="x.com"
              href="https://x.com/HeLLLthyDrug"
            />
            <div className="h-px w-full bg-edge" />
            <ContactRow
              value="HeaLthyDrugs"
              platform="Github"
              href="https://github.com/HeaLthyDrugs"
            />
          </div>
        </div>

        <div
          className={cn(
            "screen-line-before screen-line-after flex w-full items-center justify-between before:z-1 after:z-1",
            "bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] [--pattern-foreground:var(--color-edge)]/56"
          )}
        >
          <div className="flex items-center gap-3 border-edge bg-background pl-4">
            <SimpleTooltip content="LLMs Context File">
              <a
                className="flex text-xs text-muted-foreground transition-colors hover:text-foreground"
                href={`${SITE_INFO.url}/llms.txt`}
                target="_blank"
                rel="noopener noreferrer"
              >
                llms.txt
              </a>
            </SimpleTooltip>

            <Separator />

            <SimpleTooltip content="RSS Feed">
              <a
                className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
                href={`${SITE_INFO.url}/rss`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <RssIcon className="size-4" />
                <span className="sr-only">RSS</span>
              </a>
            </SimpleTooltip>

            <Separator />

            <SimpleTooltip content="DMCA Protected">
              <a
                className="flex text-muted-foreground transition-colors hover:text-foreground"
                href={
                  process.env.NEXT_PUBLIC_DMCA_URL ||
                  "https://www.dmca.com/ProtectionPro.aspx"
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icons.dmca className="h-5 w-auto" />
                <span className="sr-only">DMCA.com Protection Status</span>
              </a>
            </SimpleTooltip>

            <Separator />
          </div>

          <div className="flex items-center gap-3 border-edge bg-background pr-4">
            <Separator />

            <SimpleTooltip content="GitHub">
              <a
                className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
                href={SOURCE_CODE_GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icons.github className="size-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </SimpleTooltip>

            <Separator />

            <SimpleTooltip content="X (Twitter)">
              <a
                className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
                href="https://x.com/HeLLLthyDrug"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icons.x className="size-4" />
                <span className="sr-only">X (Twitter)</span>
              </a>
            </SimpleTooltip>

            <Separator />

            <SimpleTooltip content="Instagram">
              <a
                className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
                href="https://instagram.com/manish18_here"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icons.instagram className="size-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </SimpleTooltip>
          </div>
        </div>
      </div>
      <div className="pb-[env(safe-area-inset-bottom,0px)]">
        <div className="flex h-2" />
      </div>
    </footer>
  );
}

function Separator({ className }: { className?: string }) {
  return <div className={cn("flex h-11 w-px bg-edge", className)} />;
}

function LiveClock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      setTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return null;

  return (
    <span>
      {time} IST (GMT+5:30) · Lonavla, India
    </span>
  );
}

function ContactRow({
  value,
  platform,
  href
}: {
  value: string;
  platform: string;
  href: string;
}) {
  const [copied, setCopied] = useState(false);
  const copyIconRef = useRef<CopyIconHandle>(null);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      copyIconRef.current?.startAnimation();
      setTimeout(() => {
        setCopied(false);
        copyIconRef.current?.stopAnimation();
      }, 2000);
    } catch {
      // Fallback for older browsers
    }
  };

  return (
    <div className="group relative flex items-stretch">
      {/* Copy button + Value */}
      <button
        onClick={handleCopy}
        className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors pl-4 py-3"
      >
        <span className="relative size-3.5 shrink-0 cursor-pointer">
          <CheckIcon
            className={cn(
              "absolute inset-0 size-3.5 text-green-500 transition-all duration-200",
              copied ? "opacity-100 scale-100" : "opacity-0 scale-75"
            )}
          />
          <span
            className={cn(
              "absolute inset-0 transition-all duration-200 ",
              copied ? "opacity-0 scale-75" : "opacity-100 scale-100"
            )}
          >
            <CopyIcon ref={copyIconRef} size={14} />
          </span>
        </span>
        <span className="text-sm text-muted-foreground">{value}</span>
      </button>

      {/* Dashed line with vertical separators */}
      <div className="flex-1 flex items-center mx-4">
        <div className="w-px border-l border-dashed border-edge self-stretch" />
        <div className="flex-1 border-t border-dashed border-edge" />
        <div className="w-px border-r border-dashed border-edge self-stretch" />
      </div>

      {/* Platform link */}
      <a
        href={href}
        target={platform === "mailto" ? undefined : "_blank"}
        rel={platform === "mailto" ? undefined : "noopener noreferrer"}
        className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0 pr-4 py-3"
      >
        <span>{platform}</span>
        <ExternalLinkIcon className="size-3" />
      </a>
    </div>
  );
}
