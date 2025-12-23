"use client";

import Link from "next/link";
import { USER } from "../data/user";
import { cn } from "@/lib/utils";
import { BriefcaseIcon, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";
import { AnimatePresence, motion } from "framer-motion";
import { useLoop } from "@/lib/animation/useLoop";
import { MessageCircleMoreIcon } from "@/components/animated-icons/message-circle-more";
import { MailCheckIcon } from "@/components/ui/mail-check";

const ROTATING_TEXTS = USER.flipSentences;

export default function ProfileHeader() {
    const { key } = useLoop(3000);
    const currentText = ROTATING_TEXTS[key % ROTATING_TEXTS.length];

    return (
        <div className="screen-line-after border-x border-edge">
            {/* Main header - responsive layout */}
            <div className="flex flex-col sm:flex-row">
                {/* Avatar section */}
                <div className="flex justify-start border-b border-dashed border-edge p-2 sm:justify-start sm:border-b-0 sm:border-r">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        className="size-24 border border-edge ring-2 ring-edge/50 ring-offset-2 ring-offset-background select-none sm:size-32"
                        alt={`${USER.displayName}'s avatar`}
                        src={USER.avatar}
                        fetchPriority="high"
                    />
                </div>

                {/* Content section - stacked vertically */}
                <div className="flex flex-1 flex-col">
                    {/* Name section */}
                    <div className="border-b border-dashed border-edge px-3 py-2">
                        <h1 className="text-2xl font-heading sm:text-3xl">
                            {USER.displayName}
                        </h1>
                    </div>

                    {/* Bio section with rotating text */}
                    <div className="flex flex-col items-start gap-1 border-b border-dashed border-edge px-3 py-2 text-sm sm:flex-row sm:items-center">
                        <span className="text-muted-foreground">
                            I design and build digital products
                        </span>
                        <div className="relative inline-flex h-5 overflow-hidden">
                            <AnimatePresence mode="popLayout">
                                <motion.span
                                    key={key}
                                    initial={{ opacity: 0, y: "100%" }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: "-100%" }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="whitespace-nowrap font-heading text-foreground"
                                >
                                    {currentText}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* CTA Buttons section */}
                    <div className="flex items-center px-2 py-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="default" className="rounded-none cursor-pointer">
                                    <MessageCircleMoreIcon className="size-4" />
                                    Start a conversation
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-42 rounded-none">
                                <DropdownMenuItem asChild className="rounded-none cursor-pointer">
                                    <a
                                        href="https://wa.me/918432563227"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Icons.whatsapp className="mr-2 size-4" />
                                        WhatsApp
                                    </a>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild className="rounded-none cursor-pointer">
                                    <a href={`mailto:${USER.email}`}>
                                        <Icons.mail className="mr-2 size-4" />
                                        Email
                                    </a>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild className="rounded-none cursor-pointer">
                                    <a
                                        href="https://cal.com/mnsh"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Icons.phone className="mr-2 size-4" />
                                        Schedule a call
                                    </a>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </div>
    );
}