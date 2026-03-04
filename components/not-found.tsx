import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function NotFound({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[calc(100svh-5.5rem)] w-full flex-col items-center justify-center border-x border-edge px-6 text-center",
        "before:absolute before:inset-0 before:-z-1 before:h-full before:w-full",
        "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56",
        className
      )}
    >
      <h1 className="font-sans text-[10rem] font-bold leading-none tracking-tighter md:text-[15rem]">
        404
      </h1>
      <p className="mt-4 max-w-[500px] text-lg text-muted-foreground md:text-xl">
        Congratulations, you&apos;ve found a page that doesn&apos;t exist.
        <br />
        &nbsp;and also a rounded button.
      </p>

      <Button variant="default" className="mt-8 rounded-full" asChild>
        <Link href="/">
          Go home
        </Link>
      </Button>
    </div>
  );
}
