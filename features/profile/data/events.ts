/**
 * Events Data Configuration
 * 
 * Grid System: 2 cols (mobile) / 4 cols (tablet) / 6 cols (desktop)
 * Dense packing enabled — items fill gaps automatically.
 * 
 * Available Size Options:
 * - xs: Extra small (1 col) - Perfect for small accents
 * - small: Small (1 col) - Standard small cards
 * - medium: Medium (1/2/2 cols) - Default size
 * - large: Large (2/2/3 cols) - Featured events
 * - wide: Wide (2/4/6 cols) - Full width banners
 * - tall: Tall (1/2/2 cols, 2 rows) - Detailed content
 * - xl: Extra large (2/2/3 cols, 2 rows) - Hero cards
 *
 * Desktop row math (6 cols):
 * Row 1-2: xl(3×2) + large(3) = 6 | xl bleeds into row 2
 * Row 2:   medium(2) + xs(1) = 3 (fills remaining of row 2)
 * Row 3:   tall(2×2) + medium(2) + small(1) + xs(1) = 6
 * Row 4:   (tall continues) + xs(1) + xs(1) + medium(2) = 6 (dense fills)
 * Row 5:   wide(6)
 * Row 6:   large(3) + medium(2) + xs(1) = 6
 * Row 7-8: small(1) + xl(3×2) + medium(2) = 6 | xl bleeds
 * Music player (2×2) inserted at position 5 — dense packing places it
 */

import { Event } from "../types/events";

export const EVENTS: Event[] = [
    {
        id: "blog",
        title: "Blog",
        date: "",
        category: "Content",
        description: "Read my latest thoughts, tutorials, and deep-dives.",
        backgroundImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=80",
        link: "/blogs",
        size: "hero",
        textColor: "text-white",
    },
    {
        id: "works",
        title: "Works",
        date: "",
        category: "Portfolio",
        description: "Explore the projects I've built.",
        backgroundColor: "bg-gradient-to-br from-violet-100 to-purple-200 dark:from-violet-950 dark:to-purple-900",
        link: "/works",
        size: "tall",
    },
    {
        id: "tools",
        title: "Tools",
        date: "",
        category: "Resources",
        backgroundColor: "bg-gradient-to-br from-sky-100 to-blue-200 dark:from-sky-950 dark:to-blue-900",
        link: "/tools",
        size: "medium",
    },
    {
        id: "gear",
        title: "Gear",
        date: "",
        category: "Equipment",
        backgroundColor: "bg-gradient-to-br from-slate-100 to-gray-200 dark:from-slate-900 dark:to-gray-800",
        link: "/gear",
        size: "medium",
    },
    {
        id: "github",
        title: "GitHub",
        date: "",
        category: "Social",
        backgroundColor: "bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900",
        link: "https://github.com",
        size: "xs",
    },
    {
        id: "twitter",
        title: "X (Twitter)",
        date: "",
        category: "Social",
        backgroundColor: "bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-900",
        link: "https://x.com",
        size: "xs",
    },
    {
        id: "linkedin",
        title: "LinkedIn",
        date: "",
        category: "Social",
        backgroundColor: "bg-gradient-to-br from-blue-200 to-blue-300 dark:from-blue-800 dark:to-blue-900",
        link: "https://linkedin.com",
        size: "xs",
    },
    {
        id: "mail",
        title: "Email",
        date: "",
        category: "Contact",
        backgroundColor: "bg-gradient-to-br from-rose-200 to-rose-300 dark:from-rose-800 dark:to-rose-900",
        link: "mailto:hello@example.com",
        size: "xs",
    }
];
