"use client";

import { useEffect, useMemo, useState } from "react";
import { Panel, PanelContent } from "../components/panel";
import { USER } from "../data/user";
import { ClockIcon, CheckIcon, CopyIcon } from "lucide-react";
import { UserIcon } from "@/components/animated-icons/user";
import { MapPinIcon } from "@/components/animated-icons/map-pin";
import { BriefcaseIcon } from "@/components/animated-icons/briefcase";
import { MailIcon } from "@/components/animated-icons/mail";
import { EarthIcon } from "@/components/animated-icons/earth";
import { cn } from "@/lib/utils";
import { decodeEmail } from "@/utils/string";
import { LayersIcon } from "@/components/animated-icons/layers";
import { AnimatePresence, motion } from "framer-motion";
import { useLoop } from "@/lib/animation/useLoop";

// Local time component
function LocalTime({ timezone, label }: { timezone: string; label: string }) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        timeZone: timezone,
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      setTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [timezone]);

  if (!time) return null;

  return (
    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
      <ClockIcon className="size-3.5" />
      <span className="text-sm">
        {time} {label}
      </span>
    </span>
  );
}

// Icon container with consistent styling
function IconBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "flex size-8 shrink-0 items-center justify-center",
        "bg-gradient-to-br from-muted via-muted to-muted/80",
        "relative overflow-hidden",
        "border border-dashed border-muted-foreground/20",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]",
        "transition-all duration-300 ease-out",
        "hover:border-muted-foreground/50 hover:border-solid",
        "[&_svg]:pointer-events-none [&_svg]:text-muted-foreground [&_svg:not([class*='size-'])]:size-4",
        "[&_svg]:relative [&_svg]:z-10 [&_svg]:transition-transform [&_svg]:duration-300",
        "hover:[&_svg]:scale-110",
        // Outer thin ring
        "ring-1 ring-muted-foreground/15 ring-offset-2 ring-offset-background"
      )}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}

// Copyable email component
function CopyableEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const emailDecoded = decodeEmail(email);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(emailDecoded);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = emailDecoded;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="group inline-flex items-center gap-1.5 font-mono text-sm transition-colors hover:text-foreground"
      aria-label={copied ? "Email copied!" : `Copy email: ${emailDecoded}`}
    >
      <span className="underline-offset-4 group-hover:underline">
        {emailDecoded}
      </span>
      <span className="flex size-4 items-center justify-center text-muted-foreground transition-colors group-hover:text-foreground">
        {copied ? (
          <CheckIcon className="size-3.5 text-emerald-500" />
        ) : (
          <CopyIcon className="size-3.5" />
        )}
      </span>
    </button>
  );
}

// Info row component with full-height vertical separator
function InfoRow({
  icon,
  children,
  isLast = false,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  isLast?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-stretch font-mono text-sm",
        "transition-colors hover:bg-muted/20",
        !isLast && "border-b border-edge"
      )}
    >
      {/* Icon column */}
      <div className="flex items-center justify-center px-3 py-3">
        <IconBox>{icon}</IconBox>
      </div>

      {/* Vertical separator - full height */}
      <div className="w-px self-stretch bg-edge/60" />

      {/* Content column */}
      <div className="flex flex-1 items-center px-4 py-3">
        {children}
      </div>
    </div>
  );
}

export function Overview() {
  const { key } = useLoop(2000); // Change every 2 seconds for role animation

  const currentItem = useMemo(() => {
    return USER.flipSentences[key % USER.flipSentences.length];
  }, [key]);

  return (
    <Panel>
      <h2 className="sr-only">About Me</h2>

      <PanelContent className="p-0">
        {/* Info list with dividers */}
        <div>
          {/* Name */}
          <InfoRow icon={<UserIcon />}>
            <p className="text-balance" aria-label={`Name: ${USER.displayName}`}>
              {USER.fullName}
            </p>
          </InfoRow>

          {/* Role */}
          <InfoRow icon={<LayersIcon />}>
            <AnimatePresence mode="popLayout">
              <motion.h1
                key={key}
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "-100%" }}
                transition={{ duration: 0.3 }}
                className="whitespace-nowrap text-center"
              >
                {currentItem}
              </motion.h1>
            </AnimatePresence>
          </InfoRow>

          {/* Location + Time */}
          <InfoRow icon={<MapPinIcon />}>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  USER.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 hover:underline"
                aria-label={`Location: ${USER.address}`}
              >
                {USER.address}
              </a>
              <span className="text-muted-foreground/50">·</span>
              <LocalTime timezone={USER.timezone} label={USER.localTimeLabel} />
            </div>
          </InfoRow>

          {/* Email */}
          <InfoRow icon={<MailIcon />}>
            <CopyableEmail email={USER.email} />
          </InfoRow>

          {/* Website */}
          {USER.website && (
            <InfoRow icon={<EarthIcon />} isLast>
              <a
                href={USER.website}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 hover:underline"
                aria-label="Portfolio website"
              >
                mnsh.online
              </a>
            </InfoRow>
          )}
        </div>
      </PanelContent>
    </Panel>
  );
}
