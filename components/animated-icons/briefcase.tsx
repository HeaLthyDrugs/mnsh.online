'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface BriefcaseIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
}

interface BriefcaseIconProps extends HTMLAttributes<HTMLDivElement> {
    size?: number;
}

const lidVariants: Variants = {
    normal: { y: 0, rotate: 0 },
    animate: {
        y: [-1, 0],
        rotate: [-3, 0],
        transition: {
            duration: 0.4,
            ease: 'easeOut',
        },
    },
};

const bodyVariants: Variants = {
    normal: { scale: 1 },
    animate: {
        scale: [1, 1.02, 1],
        transition: {
            duration: 0.3,
            ease: 'easeInOut',
        },
    },
};

const BriefcaseIcon = forwardRef<BriefcaseIconHandle, BriefcaseIconProps>(
    ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
        const controls = useAnimation();
        const isControlledRef = useRef(false);

        useImperativeHandle(ref, () => {
            isControlledRef.current = true;

            return {
                startAnimation: () => controls.start('animate'),
                stopAnimation: () => controls.start('normal'),
            };
        });

        const handleMouseEnter = useCallback(
            (e: React.MouseEvent<HTMLDivElement>) => {
                if (!isControlledRef.current) {
                    controls.start('animate');
                } else {
                    onMouseEnter?.(e);
                }
            },
            [controls, onMouseEnter]
        );

        const handleMouseLeave = useCallback(
            (e: React.MouseEvent<HTMLDivElement>) => {
                if (!isControlledRef.current) {
                    controls.start('normal');
                } else {
                    onMouseLeave?.(e);
                }
            },
            [controls, onMouseLeave]
        );

        return (
            <div
                className={cn(className)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                {...props}
            >
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={size}
                    height={size}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    variants={bodyVariants}
                    animate={controls}
                >
                    <motion.path
                        d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"
                        variants={lidVariants}
                        animate={controls}
                    />
                    <rect width="20" height="14" x="2" y="6" rx="2" />
                </motion.svg>
            </div>
        );
    }
);

BriefcaseIcon.displayName = 'BriefcaseIcon';

export { BriefcaseIcon };
