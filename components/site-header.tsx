import dynamic from "next/dynamic";
import Link from "next/link";

import { DesktopNav } from "@/components/desktop-nav";
import { NavItemGitHub } from "./nav-item-github";
import { MAIN_NAV } from "@/config/site";

import { cn } from "@/lib/utils";

import { SiteHeaderWrapper } from "./site-header-wrapper";
import { ToggleTheme } from "./toggle-theme";
import { MoreOptions } from "./site-header-actions";
import { MnshMark } from "@/components/mnsh-mark";

const CommandMenu = dynamic(() =>
  import("@/components/command-menu").then((mod) => mod.CommandMenu)
);

const MobileNav = dynamic(() =>
  import("@/components/mobile-nav").then((mod) => mod.MobileNav)
);

export function SiteHeader() {


  return (
    <SiteHeaderWrapper
      className="sticky top-0 z-50 max-w-screen overflow-x-hidden bg-background px-2 pt-2"
    >
      <div
        className={cn(
          "mx-auto flex h-12 items-center justify-between border-x border-t border-b border-border md:max-w-3xl",
          "transition-shadow duration-300",
          "[header[data-affix='true']_&]:shadow-[0_8px_16px_-8px_black]/8 dark:[header[data-affix='true']_&]:shadow-[0_8px_16px_-8px_black]/80"
        )}
        data-header-container
      >

        <div className="flex h-full w-12 items-center justify-center border-r border-border">
          <Link href="/" aria-label="Home" className="flex h-full w-full items-center justify-center">
            <MnshMark className="h-9 w-9 text-muted-foreground transition-colors duration-300 hover:text-foreground" />
          </Link>
        </div>

        <div className="flex-1" />

        <div className="flex h-full items-center">
          <DesktopNav items={MAIN_NAV} />
        </div>

        <div className="flex h-full items-center border-l border-border px-4">
          <MoreOptions />
        </div>

        <div className="flex h-full items-center border-l border-border">
          <div className="flex h-full items-center px-4">
            <CommandMenu />
          </div>
          {/* <ToggleTheme /> */}
          <div className="flex h-full w-12 items-center justify-center border-l border-border sm:hidden">
            <MobileNav items={MAIN_NAV} />
          </div>
        </div>
      </div>
    </SiteHeaderWrapper>
  );
}
