'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface MailIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
}

interface MailIconProps extends HTMLAttributes<HTMLDivElement> {
    size?: number;
}

const envelopeVariants: Variants = {
    normal: { scale: 1 },
    animate: {
        scale: [1, 1.05, 1],
        transition: {
            duration: 0.3,
            ease: 'easeInOut',
        },
    },
};

const flapVariants: Variants = {
    normal: {
        pathLength: 1,
        opacity: 1,
        pathOffset: 0,
    },
    animate: {
        pathLength: [0, 1],
        opacity: [0, 1],
        pathOffset: [0.5, 0],
        transition: {
            duration: 0.4,
            ease: 'easeOut',
        },
    },
};

const MailIcon = forwardRef<MailIconHandle, MailIconProps>(
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
                    variants={envelopeVariants}
                    animate={controls}
                >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <motion.path
                        d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
                        variants={flapVariants}
                        animate={controls}
                    />
                </motion.svg>
            </div>
        );
    }
);

MailIcon.displayName = 'MailIcon';

export { MailIcon };
