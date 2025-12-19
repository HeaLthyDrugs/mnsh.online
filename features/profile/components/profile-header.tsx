"use client";

import Link from "next/link";
import { USER } from "../data/user";
import { cn } from "@/lib/utils";
import { BriefcaseIcon, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";


export default function ProfileHeader() {
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
                    <div className="border-b border-dashed border-edge px-4 py-3">
                        <h1 className="text-2xl font-heading sm:text-3xl">
                            {USER.displayName}
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {USER.bio}
                        </p>
                    </div>


                    {/* CTA Buttons section */}
                    <div className="flex items-center px-2 py-2">
                        <Button asChild size="sm" className="rounded-none">
                            <Link href="/work">
                                <BriefcaseIcon />
                                My Works
                            </Link>
                        </Button>
                        <Button asChild variant="secondary" size="sm" className="rounded-none">
                            <a
                                href="https://cal.com/mnsh"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <CalendarIcon />
                                Book a call
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}