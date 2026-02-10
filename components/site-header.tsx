import dynamic from "next/dynamic";
import Link from "next/link";

import { DesktopNav } from "@/components/desktop-nav";
import { NavItemGitHub } from "./nav-item-github";
import { MAIN_NAV } from "@/config/site";

import { cn } from "@/lib/utils";

import { SiteHeaderWrapper } from "./site-header-wrapper";
import { ToggleTheme } from "./toggle-theme";
import { MoreOptions } from "./site-header-actions";

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
          "mx-auto flex h-12 items-center justify-between gap-2 border-x border-t border-b border-edge px-2 sm:gap-4 md:max-w-3xl",
          "transition-shadow duration-300",
          "[header[data-affix='true']_&]:shadow-[0_8px_16px_-8px_black]/8 dark:[header[data-affix='true']_&]:shadow-[0_8px_16px_-8px_black]/80"
        )}
        data-header-container
      >

        <div className="flex-1" />

        <DesktopNav items={MAIN_NAV} />

        <MoreOptions />

        <div className="flex items-center gap-2">
          <CommandMenu />
          {/* <ToggleTheme /> */}
          <MobileNav className="sm:hidden" items={MAIN_NAV} />
        </div>
      </div>
    </SiteHeaderWrapper>
  );
}
