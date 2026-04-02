"use client";

import { CheckIcon, ExternalLinkIcon, RssIcon, MousePointerClick } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { SITE_INFO, SOURCE_CODE_GITHUB_URL } from "@/config/site";
import { cn } from "@/lib/utils";
import { CopyIcon, type CopyIconHandle } from "./animated-icons/copy";
import { Icons } from "./icons";
import { SimpleTooltip } from "./ui/tooltip";
import { ToggleTheme } from "./toggle-theme";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { USER } from "@/features/profile/data/user";

export function SiteFooter() {
  return (
    <footer className="max-w-screen overflow-x-hidden px-2">
      <div className="border-t border-edge mx-auto border-x md:max-w-3xl">
        <div className="flex flex-col">
          {/* Headline & Tap Section */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_200px]">
            {/* Headline & Timezone */}
            <div className="py-8 px-4 space-y-4">
              <h3 className="text-3xl md:text-3xl font-heading text-muted-foreground leading-tight flex items-center flex-wrap gap-x-4 gap-y-4">
                <span>Got anything in mind ?</span>
              </h3>
              <p className="text-sm text-muted-foreground/80 max-w-md leading-relaxed">
                I&apos;m always open to interesting conversations — whether it&apos;s about building something together, sharing ideas, or just saying hello.
              </p>

              {/* Timezone Display */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
                <LiveClock />
              </div>
            </div>

            {/* Tap Section */}
            <ContactTriggerBox />
          </div>

          {/* Contact CTAs */}
          <div className="border-t border-edge flex flex-col">
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
            "border-y border-edge flex w-full items-start justify-start before:z-1 after:z-1",
            "bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] [--pattern-foreground:var(--color-edge)]/56"
          )}
        >
          <div className="flex items-center h-11 border-r border-edge bg-background">
            {/* <SimpleTooltip content="Read my blog">
              <Link
                className="flex h-full items-center px-4 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50 border-r border-edge"
                href="/blog"
              >
                Blog
              </Link>
            </SimpleTooltip>

            <SimpleTooltip content="View my works">
              <Link
                className="flex h-full items-center px-4 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50 border-r border-edge"
                href="/work"
              >
                Works
              </Link>
            </SimpleTooltip>

            <SimpleTooltip content="My hardware & gear">
              <Link
                className="flex h-full items-center px-4 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50 border-r border-edge"
                href="/gear"
              >
                Gear
              </Link>
            </SimpleTooltip>

            <SimpleTooltip content="Tools I use">
              <Link
                className="flex h-full items-center px-4 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50 border-r border-edge"
                href="/tools"
              >
                Tools
              </Link>
            </SimpleTooltip> */}

            <SimpleTooltip content="LLMs Context File">
              <a
                className="flex h-full items-center px-4 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50 border-r border-edge"
                href={`${SITE_INFO.url}/llms.txt`}
                target="_blank"
                rel="noopener noreferrer"
              >
                llms.txt
              </a>
            </SimpleTooltip>

            <SimpleTooltip content="RSS Feed">
              <a
                className="flex h-full items-center px-4 text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50"
                href={`${SITE_INFO.url}/rss.xml`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <RssIcon className="size-4" />
                <span className="sr-only">RSS</span>
              </a>
            </SimpleTooltip>

            {/* <SimpleTooltip content="DMCA Protected">
              <a
                className="flex h-full items-center px-4 text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50"
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
            </SimpleTooltip> */}
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

function ContactTriggerBox() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div 
      ref={containerRef}
      onClick={() => !isOpen && setIsOpen(true)}
      className={cn(
        "flex flex-col border-t md:border-t-0 md:border-l border-edge transition-all outline-none w-full h-full min-h-[160px] relative overflow-hidden group",
        !isOpen ? "cursor-pointer hover:bg-muted/10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] bg-[size:16px_16px]" : "bg-background"
      )}
    >
      {isOpen ? (
        <div className="absolute inset-0 flex flex-col justify-center z-20 animate-in fade-in zoom-in-95 duration-200 divide-y divide-edge">
          <a href="https://wa.me/918432563227" target="_blank" rel="noopener noreferrer" className="flex items-center px-6 py-3 hover:bg-muted/50 transition-colors flex-1 justify-center text-xs font-medium text-muted-foreground hover:text-foreground">
            <Icons.whatsapp className="mr-2 size-4 shrink-0" /> WhatsApp
          </a>
          <a href={`mailto:${USER.email}`} className="flex items-center px-6 py-3 hover:bg-muted/50 transition-colors flex-1 justify-center text-xs font-medium text-muted-foreground hover:text-foreground">
            <Icons.mail className="mr-2 size-4 shrink-0" /> Email
          </a>
          <a href="https://cal.com/mnsh" target="_blank" rel="noopener noreferrer" className="flex items-center px-6 py-3 hover:bg-muted/50 transition-colors flex-1 justify-center text-xs font-medium text-muted-foreground hover:text-foreground">
            <Icons.phone className="mr-2 size-4 shrink-0" /> Schedule a call
          </a>
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center pointer-events-none opacity-40 group-hover:opacity-80 transition-all duration-300">
          <MousePointerClick className="size-4 text-foreground" />
          <span className="block text-[10px] uppercase tracking-widest font-mono text-foreground mt-1">Tap to start conversation</span>
        </div>
      )}
    </div>
  );
}
