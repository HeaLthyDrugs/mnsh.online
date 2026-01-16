
export interface Tool {
    name: string;
    description: string;
    url: string;
    image?: string; // URL to favicon or image
    category: "Development" | "Design" | "Productivity" | "Utilities" | "Other";
}

export const TOOLS: Tool[] = [
    {
        name: "Visual Studio Code",
        description: "My go-to code editor for all web development projects.",
        url: "https://code.visualstudio.com/",
        category: "Development",
        image: "https://code.visualstudio.com/favicon.ico",
    },
    {
        name: "Figma",
        description: "The collaborative interface design tool I use for all my designs.",
        url: "https://www.figma.com/",
        category: "Design",
        image: "https://static.figma.com/app/icon/1/icon-64.png",
    },
    {
        name: "Notion",
        description: "All-in-one workspace for notes, management, and tasks.",
        url: "https://www.notion.so/",
        category: "Productivity",
        image: "https://www.notion.so/images/favicon.ico",
    },
    {
        name: "Vercel",
        description: "Develop. Preview. Ship. The best platform for frontend framework deployments.",
        url: "https://vercel.com/",
        category: "Development",
        image: "https://assets.vercel.com/image/upload/q_auto/front/favicon/vercel/180x180.png",
    },
    {
        name: "Linear",
        description: "The issue tracking tool I use to manage my projects.",
        url: "https://linear.app/",
        category: "Productivity",
        image: "https://static.linear.app/client/favicon/180x180.png",
    }
];
