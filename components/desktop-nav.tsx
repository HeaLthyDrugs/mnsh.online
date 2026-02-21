"use client";

import { usePathname } from "next/navigation";


import type { NavItem } from "@/types/nav";
import { Nav } from "./nav";

export function DesktopNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return <Nav className="max-sm:hidden" items={items} activeId={pathname} />;
}