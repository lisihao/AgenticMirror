'use client';

import { motion } from 'framer-motion';

interface SketchAIBrainProps {
    isSearching?: boolean;
    searchProgress?: number;
}

export default function SketchAIBrain({
    isSearching = false,
    searchProgress = 0,
}: SketchAIBrainProps) {
    return (
        <svg
            viewBox="0 0 200 200"
            className="w-full h-full"
            style={{ maxWidth: '250px' }}
        >
            <defs>
                {/* Sketch filter */}
                <filter id="ai-sketch-filter">
                    <feTurbulence type="turbulence" baseFrequency="0.03" numOctaves="2" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" />
                </filter>

                {/* Glow effect */}
                <filter id="ai-glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>

                {/* Gradient for brain */}
                <linearGradient id="brain-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E91E63" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#9C27B0" stopOpacity="0.3" />
                </linearGradient>

                {/* Radar sweep gradient */}
                <linearGradient id="radar-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#E91E63" stopOpacity="0" />
                    <stop offset="50%" stopColor="#E91E63" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#E91E63" stopOpacity="0" />
                </linearGradient>
            </defs>

            {/* Background circle */}
            <motion.circle
                cx="100"
                cy="100"
                r="80"
                fill="url(#brain-gradient)"
                stroke="#E91E63"
                strokeWidth="2"
                strokeDasharray="8,4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
            />

            {/* Brain outline - left hemisphere */}
            <motion.path
                d="M 100 40
                   C 70 40 50 55 45 75
                   C 40 95 45 110 50 120
                   C 45 130 45 145 55 155
                   C 65 165 85 165 100 160"
                fill="none"
                stroke="#374151"
                strokeWidth="2"
                strokeLinecap="round"
                filter="url(#ai-sketch-filter)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
            />

            {/* Brain outline - right hemisphere */}
            <motion.path
                d="M 100 40
                   C 130 40 150 55 155 75
                   C 160 95 155 110 150 120
                   C 155 130 155 145 145 155
                   C 135 165 115 165 100 160"
                fill="none"
                stroke="#374151"
                strokeWidth="2"
                strokeLinecap="round"
                filter="url(#ai-sketch-filter)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
            />

            {/* Brain wrinkles - left */}
            <motion.path
                d="M 55 80 Q 70 75 75 85 M 50 100 Q 65 95 70 105 M 55 125 Q 70 120 80 130"
                fill="none"
                stroke="#374151"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
            />

            {/* Brain wrinkles - right */}
            <motion.path
                d="M 145 80 Q 130 75 125 85 M 150 100 Q 135 95 130 105 M 145 125 Q 130 120 120 130"
                fill="none"
                stroke="#374151"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
            />

            {/* Center divider */}
            <motion.line
                x1="100"
                y1="45"
                x2="100"
                y2="155"
                stroke="#374151"
                strokeWidth="1.5"
                strokeDasharray="4,4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
            />

            {/* Radar sweep animation when searching */}
            {isSearching && (
                <motion.g
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: '100px 100px' }}
                >
                    <path
                        d="M 100 100 L 100 30 A 70 70 0 0 1 140 45 Z"
                        fill="url(#radar-gradient)"
                        opacity="0.6"
                    />
                </motion.g>
            )}

            {/* Neural connection nodes */}
            {isSearching && (
                <>
                    {[
                        { cx: 65, cy: 70, delay: 0 },
                        { cx: 135, cy: 70, delay: 0.2 },
                        { cx: 55, cy: 100, delay: 0.4 },
                        { cx: 145, cy: 100, delay: 0.6 },
                        { cx: 70, cy: 130, delay: 0.8 },
                        { cx: 130, cy: 130, delay: 1 },
                        { cx: 100, cy: 100, delay: 0.5 },
                    ].map((node, i) => (
                        <motion.circle
                            key={i}
                            cx={node.cx}
                            cy={node.cy}
                            r="5"
                            fill="#E91E63"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: [0, 1.2, 1],
                                opacity: [0, 1, 0.8],
                            }}
                            transition={{
                                duration: 0.5,
                                delay: node.delay,
                                repeat: Infinity,
                                repeatDelay: 1.5,
                            }}
                        />
                    ))}

                    {/* Connection lines */}
                    {[
                        { x1: 65, y1: 70, x2: 100, y2: 100 },
                        { x1: 135, y1: 70, x2: 100, y2: 100 },
                        { x1: 55, y1: 100, x2: 100, y2: 100 },
                        { x1: 145, y1: 100, x2: 100, y2: 100 },
                        { x1: 70, y1: 130, x2: 100, y2: 100 },
                        { x1: 130, y1: 130, x2: 100, y2: 100 },
                    ].map((line, i) => (
                        <motion.line
                            key={i}
                            x1={line.x1}
                            y1={line.y1}
                            x2={line.x2}
                            y2={line.y2}
                            stroke="#E91E63"
                            strokeWidth="1"
                            opacity="0.4"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: [0, 1, 0] }}
                            transition={{
                                duration: 1.5,
                                delay: i * 0.1,
                                repeat: Infinity,
                                repeatDelay: 0.5,
                            }}
                        />
                    ))}
                </>
            )}

            {/* AI text label */}
            <motion.text
                x="100"
                y="185"
                textAnchor="middle"
                fontSize="14"
                fontWeight="600"
                fill="#374151"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                Agentic AI
            </motion.text>

            {/* Progress indicator */}
            {isSearching && searchProgress > 0 && (
                <motion.circle
                    cx="100"
                    cy="100"
                    r="75"
                    fill="none"
                    stroke="#E91E63"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${searchProgress * 4.71} 471`}
                    transform="rotate(-90 100 100)"
                    filter="url(#ai-glow)"
                />
            )}
        </svg>
    );
}
