"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/nav";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useSound } from "@/hooks/use-sound";

export function MobileNav({
  items,
  className,
}: {
  items: NavItem[];
  className?: string;
}) {
  const playHover = useSound("/sounds/hover.wav");
  const playTap = useSound("/sounds/tap.wav");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn("group/toggle flex flex-col gap-1", className)}
          size="icon"
          onMouseEnter={playHover}
          onClick={playTap}
        >
          <span className="flex h-0.5 w-4 transform rounded-none bg-foreground transition-transform group-data-[state=open]/toggle:translate-y-[3px] group-data-[state=open]/toggle:rotate-45" />
          <span className="flex h-0.5 w-4 transform rounded-none bg-foreground transition-transform group-data-[state=open]/toggle:translate-y-[-3px] group-data-[state=open]/toggle:-rotate-45" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 rounded-none" align="end" sideOffset={8}>
        {items.map((link) => (
          <DropdownMenuItem 
            key={link.href} 
            asChild 
            className="cursor-pointer rounded-none"
            onMouseEnter={playHover}
            onClick={playTap}
          >
            <Link href={link.href}>{link.title}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
