"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function AnimatedScene() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-40 border-x border-b border-edge bg-muted/10 animate-pulse select-none" />
    );
  }

  const getGifSrc = () => {
    return resolvedTheme === "dark"
      ? "https://assets.mnsh.online/gifs/morning-evening.gif"
      : "https://assets.mnsh.online/gifs/day.gif";
  };

  return (
    <div className={cn("w-full border-x border-b border-edge select-none overflow-hidden bg-muted/10")}>
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        src={getGifSrc()}
        alt={`Scene for ${resolvedTheme} theme`}
        className="block h-40 w-full object-cover"
        fetchPriority="high"
      />
    </div>
  );
}