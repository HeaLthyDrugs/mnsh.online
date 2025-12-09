/**
 * Events Data Configuration
 * 
 * Grid System: 2 cols (mobile) / 4 cols (tablet) / 6 cols (desktop)
 * 
 * Available Size Options:
 * - xs: Extra small (1/1/1 cols) - Perfect for quick tips
 * - small: Small (1/1/2 cols) - Standard small cards
 * - medium: Medium (1/2/2 cols) - Default size
 * - large: Large (2/2/3 cols) - Featured events
 * - wide: Wide (2/4/6 cols) - Full width banners
 * - tall: Tall (1/2/2 cols, 2 rows) - Detailed content
 * - xl: Extra large (2/3/4 cols, 2 rows) - Hero cards
 * 
 * Customization Options:
 * - backgroundImage: URL to background image
 * - gradientOverlay: Tailwind gradient classes (e.g., "from-blue-900/90 to-purple-900/90")
 * - textColor: Custom text color (e.g., "text-white")
 * - backgroundColor: Tailwind background classes (e.g., "bg-gradient-to-br from-cyan-50 to-blue-100")
 * - showImage: Set to false to hide inline image and only show background
 */

import { Event } from "../types/events";

export const EVENTS: Event[] = [
    // Row 1: XL Hero + Tall + Small
    {
        id: "tech-summit-2025",
        title: "Tech Summit 2025",
        date: "15.03.2025",
        location: "San Francisco, CA",
        category: "Conference",
        description: "Annual technology summit featuring the latest innovations in AI, Web3, and Cloud Computing. Join industry leaders and innovators.",
        backgroundImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
        gradientOverlay: "from-blue-900/90 via-purple-900/85 to-pink-900/90",
        textColor: "text-white",
        link: "https://techsummit2025.com",
        tags: ["AI", "Web3", "Cloud", "Networking"],
        size: "xs",
        showImage: false,
    },
    {
        id: "react-workshop",
        title: "Advanced React Workshop",
        date: "22.02.2025",
        location: "Online",
        category: "Workshop",
        description: "Deep dive into React Server Components, Suspense, and modern patterns. Hands-on coding sessions included.",
        backgroundColor: "bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-cyan-950 dark:to-blue-950",
        tags: ["React", "Next.js", "TypeScript"],
        size: "small",
    },
    {
        id: "quick-tip-1",
        title: "Design Tip #1",
        date: "01.02.2025",
        category: "Tip",
        description: "Master color theory basics.",
        backgroundColor: "bg-gradient-to-br from-rose-50 to-orange-100 dark:from-rose-950 dark:to-orange-950",
        tags: ["Design"],
        size: "large",
    },
    {
        id: "quick-tip-2",
        title: "Design Tip #2",
        date: "02.02.2025",
        category: "Tip",
        description: "Typography best practices.",
        backgroundColor: "bg-gradient-to-br from-violet-50 to-purple-100 dark:from-violet-950 dark:to-purple-950",
        tags: ["Typography"],
        size: "large",
    },

    // Row 2: Large + Medium + Small
    {
        id: "hackathon-2025",
        title: "Global Hackathon 2025",
        date: "05.04.2025",
        location: "London, UK",
        category: "Hackathon",
        description: "48-hour coding marathon to build innovative solutions for social impact. Win prizes and network with developers.",
        backgroundImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80",
        gradientOverlay: "from-emerald-900/90 via-teal-900/85 to-cyan-900/90",
        textColor: "text-white",
        link: "https://globalhackathon.io",
        tags: ["Coding", "Innovation", "Social Impact"],
        size: "xl",
        showImage: false,
    },
    {
        id: "webdev-conference",
        title: "Web Dev Conference",
        date: "18.03.2025",
        location: "Berlin, Germany",
        category: "Conference",
        description: "Exploring the future of web development with industry leaders.",
        backgroundImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80",
        gradientOverlay: "from-orange-900/90 via-red-900/85 to-pink-900/90",
        textColor: "text-white",
        tags: ["Web Dev", "JavaScript", "Performance"],
        size: "xl",
        showImage: false,
    },
    {
        id: "design-meetup",
        title: "UI/UX Design Meetup",
        date: "10.02.2025",
        location: "New York, NY",
        category: "Meetup",
        description: "Monthly gathering of designers to share insights.",
        backgroundColor: "bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-950 dark:to-pink-950",
        tags: ["Design", "UI/UX"],
        size: "small",
    },

    // Row 3: Wide Banner
    {
        id: "annual-showcase",
        title: "Annual Tech Showcase 2025",
        date: "20.05.2025",
        location: "Tokyo, Japan",
        category: "Exhibition",
        description: "Showcasing the year's most innovative tech products and solutions from around the globe. Experience the future of technology.",
        backgroundImage: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80",
        gradientOverlay: "from-indigo-900/90 via-blue-900/85 to-cyan-900/90",
        textColor: "text-white",
        tags: ["Innovation", "Technology", "Exhibition", "Global"],
        size: "wide",
        showImage: false,
    },

    // Row 4: Medium + Small + Small + XS
    {
        id: "ai-workshop",
        title: "AI & Machine Learning Workshop",
        date: "12.03.2025",
        location: "Singapore",
        category: "Workshop",
        description: "Hands-on workshop covering the latest in AI and ML technologies.",
        backgroundColor: "bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-950",
        tags: ["AI", "Machine Learning", "Python"],
        size: "medium",
    },
    {
        id: "startup-pitch",
        title: "Startup Pitch Night",
        date: "28.02.2025",
        location: "Austin, TX",
        category: "Networking",
        description: "Connect with founders and investors in the startup ecosystem.",
        backgroundColor: "bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-amber-950 dark:to-yellow-950",
        tags: ["Startups", "Funding"],
        size: "small",
    },
    {
        id: "code-review",
        title: "Code Review Session",
        date: "15.02.2025",
        location: "Online",
        category: "Workshop",
        description: "Learn best practices for effective code reviews.",
        backgroundColor: "bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-950 dark:to-gray-950",
        tags: ["Code Quality"],
        size: "small",
    },
    {
        id: "quick-tip-3",
        title: "Dev Tip #3",
        date: "03.02.2025",
        category: "Tip",
        description: "Git workflow tips.",
        backgroundColor: "bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-teal-950 dark:to-cyan-950",
        tags: ["Git"],
        size: "xs",
    },
    {
        id: "quick-tip-4",
        title: "Dev Tip #4",
        date: "04.02.2025",
        category: "Tip",
        description: "Performance optimization.",
        backgroundColor: "bg-gradient-to-br from-lime-50 to-green-100 dark:from-lime-950 dark:to-green-950",
        tags: ["Performance"],
        size: "xs",
    },
];
