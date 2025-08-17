// components/FlowingLines.tsx
'use client'

import { motion } from 'motion/react';

interface FlowingLinesProps {
    variant?: 'top' | 'bottom' | 'both';
    intensity?: 'light' | 'medium' | 'strong';
    className?: string;
}

export default function FlowingLines({
    variant = 'both',
    intensity = 'medium',
    className = ''
}: FlowingLinesProps) {
    // Enhanced opacity levels for better visibility
    const opacityMap = {
        light: 0.15,
        medium: 0.25,
        strong: 0.35
    };

    const opacity = opacityMap[intensity];

    // Top flowing lines - more prominent and quote-like
    const topLines = (
        <div className="absolute top-0 left-0 w-full h-2/3 overflow-hidden">
            {/* Primary bold flowing line */}
            <motion.svg
                className="absolute top-0 left-0 w-full h-full"
                viewBox="0 0 1400 400"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity }}
                transition={{ duration: 2.5, delay: 0, ease: "easeInOut" }}
            >
                <path
                    d="M-300,180 Q100,60 400,120 T800,100 Q1100,80 1500,140"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    fill="none"
                    className="text-black dark:text-white"
                />
            </motion.svg>

            {/* Secondary flowing line */}
            <motion.svg
                className="absolute top-0 left-0 w-full h-full"
                viewBox="0 0 1400 400"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: opacity * 0.8 }}
                transition={{ duration: 2.5, delay: 0.3, ease: "easeInOut" }}
            >
                <path
                    d="M-250,140 Q200,80 500,110 T900,90 Q1200,70 1550,120"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className="text-black dark:text-white"
                />
            </motion.svg>

            {/* Tertiary flowing line */}
            <motion.svg
                className="absolute top-0 left-0 w-full h-full"
                viewBox="0 0 1400 400"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: opacity * 0.6 }}
                transition={{ duration: 2.5, delay: 0.6, ease: "easeInOut" }}
            >
                <path
                    d="M-200,220 Q300,100 600,140 T1000,120 Q1300,100 1600,160"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                    className="text-black dark:text-white"
                />
            </motion.svg>

            {/* Additional detail lines */}
            <motion.svg
                className="absolute top-0 left-0 w-full h-full"
                viewBox="0 0 1400 400"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: opacity * 0.4 }}
                transition={{ duration: 3, delay: 0.9, ease: "easeInOut" }}
            >
                <path
                    d="M-350,260 Q50,140 350,180 T750,160 Q1050,140 1650,200"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                    className="text-black dark:text-white"
                />
            </motion.svg>

            <motion.svg
                className="absolute top-0 left-0 w-full h-full"
                viewBox="0 0 1400 400"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: opacity * 0.3 }}
                transition={{ duration: 3, delay: 1.2, ease: "easeInOut" }}
            >
                <path
                    d="M-150,100 Q450,40 750,80 T1150,60 Q1450,40 1700,100"
                    stroke="currentColor"
                    strokeWidth="0.8"
                    fill="none"
                    className="text-black dark:text-white"
                />
            </motion.svg>
        </div>
    );

    // Bottom flowing lines - mirrored and enhanced
    const bottomLines = (
        <div className="absolute bottom-0 left-0 w-full h-2/3 overflow-hidden">
            {/* Primary bold flowing line */}
            <motion.svg
                className="absolute bottom-0 left-0 w-full h-full"
                viewBox="0 0 1400 400"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity }}
                transition={{ duration: 2.5, delay: 1.5, ease: "easeInOut" }}
            >
                <path
                    d="M1700,220 Q1300,340 1000,280 T600,300 Q300,320 -300,260"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    fill="none"
                    className="text-black dark:text-white"
                />
            </motion.svg>

            {/* Secondary flowing line */}
            <motion.svg
                className="absolute bottom-0 left-0 w-full h-full"
                viewBox="0 0 1400 400"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: opacity * 0.8 }}
                transition={{ duration: 2.5, delay: 1.8, ease: "easeInOut" }}
            >
                <path
                    d="M1650,260 Q1200,320 900,290 T500,310 Q200,330 -250,280"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className="text-black dark:text-white"
                />
            </motion.svg>

            {/* Tertiary flowing line */}
            <motion.svg
                className="absolute bottom-0 left-0 w-full h-full"
                viewBox="0 0 1400 400"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: opacity * 0.6 }}
                transition={{ duration: 2.5, delay: 2.1, ease: "easeInOut" }}
            >
                <path
                    d="M1600,180 Q1100,300 800,260 T400,280 Q100,300 -200,240"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                    className="text-black dark:text-white"
                />
            </motion.svg>

            {/* Additional detail lines */}
            <motion.svg
                className="absolute bottom-0 left-0 w-full h-full"
                viewBox="0 0 1400 400"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: opacity * 0.4 }}
                transition={{ duration: 3, delay: 2.4, ease: "easeInOut" }}
            >
                <path
                    d="M1750,140 Q1350,260 1050,220 T650,240 Q350,260 -350,200"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                    className="text-black dark:text-white"
                />
            </motion.svg>

            <motion.svg
                className="absolute bottom-0 left-0 w-full h-full"
                viewBox="0 0 1400 400"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: opacity * 0.3 }}
                transition={{ duration: 3, delay: 2.7, ease: "easeInOut" }}
            >
                <path
                    d="M1800,300 Q950,360 650,340 T250,360 Q50,380 -150,320"
                    stroke="currentColor"
                    strokeWidth="0.8"
                    fill="none"
                    className="text-black dark:text-white"
                />
            </motion.svg>
        </div>
    );

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {/* Continuous subtle floating animation */}
            <motion.div
                animate={{
                    x: [0, 15, -10, 20, 0],
                    y: [0, -8, 15, -12, 0]
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="w-full h-full"
            >
                {(variant === 'top' || variant === 'both') && topLines}
            </motion.div>

            <motion.div
                animate={{
                    x: [0, -12, 18, -15, 0],
                    y: [0, 12, -8, 18, 0]
                }}
                transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 8
                }}
                className="w-full h-full"
            >
                {(variant === 'bottom' || variant === 'both') && bottomLines}
            </motion.div>
        </div>
    );
}