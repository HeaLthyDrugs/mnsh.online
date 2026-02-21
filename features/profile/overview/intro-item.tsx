import { cn } from "@/lib/utils";

export function IntroItem({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex items-center gap-4 font-mono text-sm", className)}
      {...props}
    />
  );
}

export function IntroItemIcon({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        // Base layout
        "flex size-6 shrink-0 items-center justify-center rounded-none",
        // Gradient background with noise texture
        "bg-gradient-to-br from-muted via-muted to-muted/80",
        "relative overflow-hidden",
        // Border with gradient
        "border border-muted-foreground/20",
        // Ring effects
        "ring-1 ring-edge/80 ring-offset-1 ring-offset-background",
        // Shadow for depth
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]",
        // Hover effects
        "transition-all duration-300 ease-out",
        "hover:border-muted-foreground/30 hover:ring-edge hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_0_0_1px_rgba(0,0,0,0.05)]",
        "dark:hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(255,255,255,0.05)]",
        // Noise texture overlay (pseudo-element)
        "before:absolute before:inset-0 before:rounded-none before:opacity-[0.015] dark:before:opacity-[0.025]",
        "before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]",
        "before:bg-repeat before:pointer-events-none",
        // Icon styles
        "[&_svg]:pointer-events-none [&_svg]:text-muted-foreground [&_svg:not([class*='size-'])]:size-4",
        "[&_svg]:relative [&_svg]:z-10 [&_svg]:transition-transform [&_svg]:duration-300",
        "hover:[&_svg]:scale-110",
        className
      )}
      aria-hidden="true"
      {...props}
    />
  );
}

export function IntroItemContent({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return <p className={cn("text-balance", className)} {...props} />;
}

export function IntroItemLink({
  className,
  ...props
}: React.ComponentProps<"a">) {
  return (
    <a
      className={cn("underline-offset-4 hover:underline", className)}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  );
}