"use client";

import { useTheme } from "next-themes";
import { useCallback } from "react";
import { useAtomValue } from "jotai";
import { isSoundEnabledAtom } from "@/store/sound-store";
import soundManager from "@/lib/sound-manager";
import { useMetaColor } from "@/hooks/use-meta-color";
import { META_THEME_COLORS } from "@/config/site";

export function useAnimatedThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const { setMetaColor } = useMetaColor();
    const isSoundEnabled = useAtomValue(isSoundEnabledAtom);

    // CSS for the circle-blur animation starting from top-left
    const animationCss = `
    ::view-transition-group(root) {
      animation-duration: 1s;
      animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
    }
          
    ::view-transition-new(root) {
      animation-name: reveal-light-top-left-blur;
      filter: blur(2px);
    }

    ::view-transition-old(root),
    .dark::view-transition-old(root) {
      animation: none;
      z-index: -1;
    }
    .dark::view-transition-new(root) {
      animation-name: reveal-dark-top-left-blur;
      filter: blur(2px);
    }

    @keyframes reveal-dark-top-left-blur {
      from {
        clip-path: circle(0% at 0% 0%);
        filter: blur(8px);
      }
      50% { filter: blur(4px); }
      to {
        clip-path: circle(150.0% at 0% 0%);
        filter: blur(0px);
      }
    }

    @keyframes reveal-light-top-left-blur {
      from {
         clip-path: circle(0% at 0% 0%);
         filter: blur(8px);
      }
      50% { filter: blur(4px); }
      to {
        clip-path: circle(150.0% at 0% 0%);
        filter: blur(0px);
      }
    }
  `;

    const toggleTheme = useCallback(() => {
        if (isSoundEnabled) {
            soundManager.playWoosh();
        }

        const switchTheme = () => {
            setTheme(resolvedTheme === "dark" ? "light" : "dark");
            setMetaColor(
                resolvedTheme === "dark"
                    ? META_THEME_COLORS.light
                    : META_THEME_COLORS.dark
            );
        };

        if (!document.startViewTransition) {
            switchTheme();
            return;
        }

        const styleId = "theme-transition-styles";
        let styleElement = document.getElementById(styleId) as HTMLStyleElement;

        if (!styleElement) {
            styleElement = document.createElement("style");
            styleElement.id = styleId;
            document.head.appendChild(styleElement);
        }

        styleElement.textContent = animationCss;

        document.startViewTransition(switchTheme);
    }, [resolvedTheme, setTheme, setMetaColor, isSoundEnabled, animationCss]);

    return {
        toggleTheme,
        isDark: resolvedTheme === "dark",
    };
}
