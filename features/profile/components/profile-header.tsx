import { SimpleTooltip } from "@/components/ui/tooltip";
import { USER } from "../data/user";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

export default function ProfileHeader() {
    return (
        <div className="screen-line-after flex border-x border-edge">
            <div className="shrink-0 border-r border-edge">
                <div className="mx-[2px] my-[3px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        className="size-32 ring-1 ring-border ring-offset-2 ring-offset-background select-none sm:size-40"
                        alt={`${USER.displayName}'s avatar`}
                        src={USER.avatar}
                        fetchPriority="high"
                    />
                </div>
            </div>
            <div className="flex flex-1 flex-col">

                        <div
                    className={cn(
                        "flex grow items-end pb-1 pl-4",
                        "bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] [--pattern-foreground:var(--color-edge)]/56"
                    )}
                />

                <div className="border-t border-edge">
                    <h1 className="flex items-center pl-4 text-3xl font-semibold">
                        {USER.displayName}

                    </h1>

                    <div className="border-y border-edge py-1 pl-4">
                        <h1>Profession</h1>
                    </div>

                    <div className="flex border-y border-edge pl-4">
                        <div className="w-px bg-edge" />
                        <button className="flex cursor-pointer size-8 items-center justify-center hover:bg-accent ">
                            <Icons.github className="size-4" />
                        </button>
                        <div className="w-px bg-edge" />
                        <button className="flex cursor-pointer px-2 items-center justify-center hover:bg-accent transition-colors">
                            Hire Me
                        </button>
                        <div className="w-px bg-edge" />
                    </div>
                </div>
                <div
                    className={cn(
                        "flex grow items-end pb-1 pl-4",
                        "bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] [--pattern-foreground:var(--color-edge)]/56"
                    )}
                />
            </div>
        </div>
    );
}