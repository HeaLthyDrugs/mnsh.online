/**
 * Events Data Configuration
 * 
 * Grid System: 2 cols (mobile) / 4 cols (tablet) / 6 cols (desktop)
 * 
 * Available Size Options:
 * - xs: Extra small (1 col) - Perfect for small accents
 * - small: Small (1/1/2 cols) - Standard small cards
 * - medium: Medium (1/2/2 cols) - Default size
 * - large: Large (2/2/3 cols) - Featured events
 * - wide: Wide (2/4/6 cols) - Full width banners
 * - tall: Tall (1/2/2 cols, 2 rows) - Detailed content
 * - xl: Extra large (2/2/3 cols, 2 rows) - Hero cards
 */

import { Event } from "../types/events";

export const EVENTS: Event[] = [
    // ═══════════════════════════════════════════════════════════════
    // ROW 1: XL Hero (3 cols) + Large (3 cols) = 6 cols
    // ═══════════════════════════════════════════════════════════════
    {
        id: "tech-summit-2025",
        title: "Tech Summit 2025",
        date: "15.03.2025",
        location: "San Francisco, CA",
        category: "Conference",
        description: "Annual technology summit featuring the latest innovations in AI, Web3, and Cloud Computing.",
        backgroundImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
        textColor: "text-white",
        link: "https://techsummit2025.com",
        tags: ["AI", "Web3", "Cloud"],
        size: "xl",
    },
    {
        id: "hackathon-2025",
        title: "Global Hackathon",
        date: "05.04.2025",
        location: "London, UK",
        category: "Hackathon",
        description: "48-hour coding marathon for social impact.",
        backgroundImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80",
        textColor: "text-white",
        link: "https://globalhackathon.io",
        tags: ["Coding", "Innovation"],
        size: "large",
    },

    // ═══════════════════════════════════════════════════════════════
    // ROW 2: Tall (2 cols, 2 rows) + Medium (2 cols) + Small (2 cols) = 6 cols
    // ═══════════════════════════════════════════════════════════════
    {
        id: "react-masterclass",
        title: "React Masterclass",
        date: "22.02.2025",
        location: "Online",
        category: "Workshop",
        description: "Deep dive into React 19 features, Server Components, and modern patterns. Full-day intensive workshop.",
        backgroundImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
        textColor: "text-white",
        tags: ["React", "Next.js"],
        size: "tall",
    },
    {
        id: "design-systems",
        title: "Design Systems Workshop",
        date: "18.03.2025",
        location: "Berlin",
        category: "Workshop",
        description: "Build scalable design systems from scratch.",
        backgroundColor: "bg-gradient-to-br from-violet-100 to-purple-200 dark:from-violet-950 dark:to-purple-900",
        tags: ["Design", "UI/UX"],
        size: "medium",
    },
    {
        id: "startup-pitch",
        title: "Pitch Night",
        date: "28.02.2025",
        location: "Austin, TX",
        category: "Networking",
        description: "Connect with investors.",
        backgroundColor: "bg-gradient-to-br from-amber-100 to-orange-200 dark:from-amber-950 dark:to-orange-900",
        tags: ["Startups"],
        size: "small",
    },

    // ═══════════════════════════════════════════════════════════════
    // ROW 3: XS (1 col) + XS (1 col) + Medium (2 cols) + Small (2 cols) = 6 cols
    // ═══════════════════════════════════════════════════════════════
    {
        id: "tip-git",
        title: "Git Tips",
        date: "01.02.2025",
        category: "Tip",
        description: "Advanced Git workflows.",
        backgroundColor: "bg-gradient-to-br from-slate-100 to-gray-200 dark:from-slate-900 dark:to-gray-800",
        tags: ["Git"],
        size: "xs",
    },
    {
        id: "tip-css",
        title: "CSS Tricks",
        date: "02.02.2025",
        category: "Tip",
        description: "Modern CSS techniques.",
        backgroundColor: "bg-gradient-to-br from-sky-100 to-blue-200 dark:from-sky-950 dark:to-blue-900",
        tags: ["CSS"],
        size: "xs",
    },
    {
        id: "ai-workshop",
        title: "AI & Machine Learning",
        date: "12.03.2025",
        location: "Singapore",
        category: "Workshop",
        description: "Hands-on ML workshop with Python.",
        backgroundImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
        textColor: "text-white",
        tags: ["AI", "ML"],
        size: "medium",
    },
    {
        id: "code-review",
        title: "Code Review Best Practices",
        date: "15.02.2025",
        location: "Online",
        category: "Workshop",
        description: "Effective code review techniques.",
        backgroundColor: "bg-gradient-to-br from-emerald-100 to-teal-200 dark:from-emerald-950 dark:to-teal-900",
        tags: ["Best Practices"],
        size: "small",
    },

    // ═══════════════════════════════════════════════════════════════
    // ROW 4: Wide Banner (6 cols) = 6 cols
    // ═══════════════════════════════════════════════════════════════
    {
        id: "annual-showcase",
        title: "Annual Tech Showcase 2025",
        date: "20.05.2025",
        location: "Tokyo, Japan",
        category: "Exhibition",
        description: "Experience the future of technology. Showcasing innovative products from around the globe.",
        backgroundImage: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=1200&q=80",
        textColor: "text-white",
        link: "https://techshowcase.io",
        tags: ["Innovation", "Exhibition", "Global"],
        size: "wide",
    },

    // ═══════════════════════════════════════════════════════════════
    // ROW 5: Large (3 cols) + Medium (2 cols) + XS (1 col) = 6 cols
    // ═══════════════════════════════════════════════════════════════
    {
        id: "webdev-conf",
        title: "WebDev Conference",
        date: "25.04.2025",
        location: "Amsterdam",
        category: "Conference",
        description: "The future of web development with industry leaders.",
        backgroundImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80",
        textColor: "text-white",
        tags: ["Web Dev", "JavaScript"],
        size: "large",
    },
    {
        id: "figma-workshop",
        title: "Advanced Figma",
        date: "08.03.2025",
        location: "Online",
        category: "Workshop",
        description: "Master advanced Figma techniques.",
        backgroundColor: "bg-gradient-to-br from-pink-100 to-rose-200 dark:from-pink-950 dark:to-rose-900",
        tags: ["Figma", "Design"],
        size: "medium",
    },
    {
        id: "tip-perf",
        title: "Performance",
        date: "03.02.2025",
        category: "Tip",
        description: "Optimization tips.",
        backgroundColor: "bg-gradient-to-br from-lime-100 to-green-200 dark:from-lime-950 dark:to-green-900",
        tags: ["Performance"],
        size: "xs",
    },

    // ═══════════════════════════════════════════════════════════════
    // ROW 6: Small (2 cols) + XL (3 cols) + XS (1 col) = 6 cols
    // ═══════════════════════════════════════════════════════════════
    {
        id: "typescript-deep",
        title: "TypeScript Deep Dive",
        date: "14.03.2025",
        location: "Online",
        category: "Workshop",
        description: "Advanced TypeScript patterns.",
        backgroundColor: "bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-950 dark:to-indigo-900",
        tags: ["TypeScript"],
        size: "small",
    },
    {
        id: "devops-summit",
        title: "DevOps Summit 2025",
        date: "10.04.2025",
        location: "Seattle, WA",
        category: "Conference",
        description: "CI/CD, Kubernetes, and cloud infrastructure best practices from industry experts.",
        backgroundImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
        textColor: "text-white",
        link: "https://devopssummit.io",
        tags: ["DevOps", "Cloud"],
        size: "xl",
    },
    {
        id: "tip-a11y",
        title: "Accessibility",
        date: "05.02.2025",
        category: "Tip",
        description: "A11y essentials.",
        backgroundColor: "bg-gradient-to-br from-cyan-100 to-teal-200 dark:from-cyan-950 dark:to-teal-900",
        tags: ["A11y"],
        size: "xs",
    },
];
