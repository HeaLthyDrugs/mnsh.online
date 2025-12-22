import { RssIcon } from "lucide-react";

import { SITE_INFO, SOURCE_CODE_GITHUB_URL } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import { SimpleTooltip } from "./ui/tooltip";



export function SiteFooter() {
  return (
    <footer className="max-w-screen overflow-x-hidden px-2">
      <div className="screen-line-before mx-auto border-x border-edge md:max-w-3xl">
        <div className="flex flex-col items-start px-4 py-8">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-muted-foreground">
              Website by {" "}
              <a
                className="link"
                href="https://x.com/HeLLLthyDrug"
                target="_blank"
                rel="noopener"
              >
                {SITE_INFO.name}
              </a>
            </p>
            <p className="text-sm text-muted-foreground">
              Inspired by {" "}
              <a
                className="link"
                href="https://tailwindcss.com"
                target="_blank"
                rel="noopener"
              >
                tailwindcss
              </a>{" "}
              &{" "}
              <a
                className="link"
                href="https://chanhdai.com/"
                target="_blank"
                rel="noopener"
              >
                chanhdai
              </a>
            </p>
          </div>
        </div>

        <div
          className={cn(
            "screen-line-before screen-line-after flex w-full items-center justify-between before:z-1 after:z-1",
            "bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] [--pattern-foreground:var(--color-edge)]/56"
          )}
        >
          <div className="flex items-center gap-3 border-edge bg-background pl-4">
            <a
              className="flex  text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              href={`${SITE_INFO.url}/llms.txt`}
              target="_blank"
              rel="noopener noreferrer"
            >
              llms.txt
            </a>

            <Separator />

            <a
              className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
              href={`${SITE_INFO.url}/rss`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <RssIcon className="size-4" />
              <span className="sr-only">RSS</span>
            </a>

            <Separator />

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

function Separator() {
  return <div className="flex h-11 w-px bg-edge" />;
}
