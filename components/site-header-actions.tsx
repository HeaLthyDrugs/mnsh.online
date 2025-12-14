"use client";

import { useState } from "react";
import { ChevronDownIcon, Briefcase, BookOpen } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Link from "next/link";

const navItems = [
    {
        title: "Work",
        href: "/work",
        icon: Briefcase,
    },
    {
        title: "Blog",
        href: "/blog",
        icon: BookOpen,
    },
];

export function MoreOptions() {
    const [open, setOpen] = useState(false);

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <button className="font-mono items-center justify-center text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground flex items-center gap-1 cursor-pointer">
                    <span>More</span>
                    <ChevronDownIcon
                        className={`size-3.5 transition-transform duration-500 ${open ? "rotate-180" : ""}`}
                    />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="border-border rounded-none"
                onCloseAutoFocus={(e) => e.preventDefault()}
            >
                {navItems.map(({ title, href, icon: Icon }) => (
                    <DropdownMenuItem key={href} asChild className="cursor-pointer rounded-none">
                        <Link href={href} className="flex items-center gap-2">
                            <Icon className="size-4" />
                            {title}
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}