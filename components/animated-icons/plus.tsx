"use client";

import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef, useEffect } from "react";

import { cn } from "@/lib/utils";

export interface PlusIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
}

interface PlusIconProps extends HTMLAttributes<HTMLDivElement> {
    size?: number;
    isOpen?: boolean;
}

const PlusIcon = forwardRef<PlusIconHandle, PlusIconProps>(
    ({ onMouseEnter, onMouseLeave, className, size = 28, isOpen, ...props }, ref) => {
        const controls = useAnimation();
        const isControlledRef = useRef(false);

        const isHoveredRef = useRef(false);

        // Control animation via isOpen prop if provided
        useEffect(() => {
            if (isOpen !== undefined) {
                if (isOpen) {
                    controls.start(isHoveredRef.current ? "normal" : "animate");
                } else {
                    controls.start(isHoveredRef.current ? "animate" : "normal");
                }
            }
        }, [isOpen, controls]);

        useImperativeHandle(ref, () => {
            isControlledRef.current = true;

            return {
                startAnimation: () => controls.start("animate"),
                stopAnimation: () => controls.start("normal"),
            };
        });

        const handleMouseEnter = useCallback(
            (e: React.MouseEvent<HTMLDivElement>) => {
                isHoveredRef.current = true;
                if (!isControlledRef.current) {
                    if (isOpen === true) {
                        controls.start("normal");
                    } else {
                        controls.start("animate");
                    }
                } else {
                    onMouseEnter?.(e);
                }
            },
            [controls, onMouseEnter, isOpen]
        );

        const handleMouseLeave = useCallback(
            (e: React.MouseEvent<HTMLDivElement>) => {
                isHoveredRef.current = false;
                if (!isControlledRef.current) {
                    if (isOpen === true) {
                        controls.start("animate");
                    } else {
                        controls.start("normal");
                    }
                } else {
                    onMouseLeave?.(e);
                }
            },
            [controls, onMouseLeave, isOpen]
        );

        return (
            <div
                className={cn(className)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                {...props}
            >
                <motion.svg
                    animate={controls}
                    fill="none"
                    height={size}
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    variants={{
                        normal: {
                            rotate: 0,
                        },
                        animate: {
                            rotate: 180,
                        },
                    }}
                    viewBox="0 0 24 24"
                    width={size}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M5 12h14" />
                    <motion.path
                        d="M12 5v14"
                        variants={{
                            normal: {
                                opacity: 1,
                                pathLength: 1,
                            },
                            animate: {
                                opacity: 0,
                                pathLength: 0,
                            },
                        }}
                    />
                </motion.svg>
            </div>
        );
    }
);

PlusIcon.displayName = "PlusIcon";

export { PlusIcon };
