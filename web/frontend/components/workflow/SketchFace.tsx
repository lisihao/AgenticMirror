'use client';

import { motion } from 'framer-motion';

interface SketchFaceProps {
    // Makeup progress (0-5, 0=no makeup, 5=full makeup)
    makeupStep?: number;
    // Show scan animation
    showScanLine?: boolean;
    // Show skin analysis metrics
    showMetrics?: boolean;
    // Highlight specific area
    highlightArea?: 'full_face' | 'eyebrow' | 'eyeshadow' | 'lips' | 'foundation' | 'blush' | 't_zone' | 'cheeks' | 'ears' | null;
    // Show before/after comparison mode
    showTransformation?: boolean;
    // Beauty score to display
    beautyScore?: number;
    // Show zone guides (animated dashed boxes)
    showZoneGuides?: boolean;
    // Current zone being guided
    activeZone?: 'foundation' | 'eyebrow' | 'eyeshadow' | 'blush' | 'lips' | 't_zone' | 'cheeks' | null;
    // Show earring recommendation
    showEarringRecommend?: boolean;
}

export default function SketchFace({
    makeupStep = 0,
    showScanLine = false,
    showMetrics = false,
    highlightArea = null,
    showTransformation = false,
    beautyScore = 60,
    showZoneGuides = false,
    activeZone = null,
    showEarringRecommend = false,
}: SketchFaceProps) {
    // Calculate makeup effects based on step
    const hasFoundation = makeupStep >= 1;
    const hasEyebrow = makeupStep >= 2;
    const hasEyeshadow = makeupStep >= 3;
    const hasBlush = makeupStep >= 4;
    const hasLips = makeupStep >= 5;

    // Skin color transitions from dull to glowing
    const skinColor = hasFoundation ? '#FDEEE9' : '#E8D5C4';
    const skinGlow = hasFoundation ? 0.15 : 0;

    // Zone guide animation
    const zoneAnimation = {
        animate: {
            strokeDashoffset: [0, 20],
            opacity: [0.6, 1, 0.6],
        },
        transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
        },
    };

    return (
        <div className="relative w-full">
            <svg
                viewBox="0 0 420 620"
                className="w-full h-auto"
                preserveAspectRatio="xMidYMid meet"
            >
                {/* SVG Filters & Gradients */}
                <defs>
                    {/* Sketch effect filter */}
                    <filter id="sketch" x="-5%" y="-5%" width="110%" height="110%">
                        <feTurbulence type="turbulence" baseFrequency="0.03" numOctaves="2" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" />
                    </filter>

                    {/* Mirror glass effect */}
                    <linearGradient id="mirror-glass" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.95" />
                        <stop offset="50%" stopColor="#e2e8f0" stopOpacity="0.85" />
                        <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.9" />
                    </linearGradient>

                    {/* Mirror frame gradient */}
                    <linearGradient id="mirror-frame" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#94a3b8" />
                        <stop offset="30%" stopColor="#64748b" />
                        <stop offset="70%" stopColor="#475569" />
                        <stop offset="100%" stopColor="#334155" />
                    </linearGradient>

                    {/* Mirror highlight */}
                    <linearGradient id="mirror-highlight" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="white" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </linearGradient>

                    {/* Gimbal metal gradient */}
                    <linearGradient id="gimbal-metal" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#e2e8f0" />
                        <stop offset="30%" stopColor="#94a3b8" />
                        <stop offset="70%" stopColor="#64748b" />
                        <stop offset="100%" stopColor="#475569" />
                    </linearGradient>

                    {/* Base gradient */}
                    <linearGradient id="base-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#1e293b" />
                        <stop offset="50%" stopColor="#0f172a" />
                        <stop offset="100%" stopColor="#020617" />
                    </linearGradient>

                    {/* LED ring gradient */}
                    <linearGradient id="led-ring" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#E91E63" />
                        <stop offset="50%" stopColor="#9C27B0" />
                        <stop offset="100%" stopColor="#E91E63" />
                    </linearGradient>

                    {/* Skin glow gradient */}
                    <radialGradient id="skin-glow" cx="50%" cy="40%" r="60%">
                        <stop offset="0%" stopColor="#FFF5F0" stopOpacity={skinGlow} />
                        <stop offset="100%" stopColor="#FFF5F0" stopOpacity="0" />
                    </radialGradient>

                    {/* Eyeshadow gradient */}
                    <linearGradient id="eyeshadow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#D4A574" stopOpacity="0.6" />
                        <stop offset="50%" stopColor="#C4956A" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#8B6914" stopOpacity="0.4" />
                    </linearGradient>

                    {/* Blush gradient */}
                    <radialGradient id="blush-grad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#F4A0A0" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#F4A0A0" stopOpacity="0" />
                    </radialGradient>

                    {/* Lip gradient */}
                    <linearGradient id="lip-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#E85A5A" />
                        <stop offset="50%" stopColor="#D64545" />
                        <stop offset="100%" stopColor="#C73E3E" />
                    </linearGradient>

                    {/* Zone highlight gradients */}
                    <linearGradient id="zone-tzone" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.1" />
                    </linearGradient>

                    <radialGradient id="zone-cheek" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#EC4899" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#EC4899" stopOpacity="0.05" />
                    </radialGradient>

                    <linearGradient id="zone-eye" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
                    </linearGradient>

                    {/* Clip path for mirror content */}
                    <clipPath id="mirror-clip">
                        <ellipse cx="210" cy="250" rx="175" ry="215" />
                    </clipPath>
                </defs>

                {/* Mirror Frame - Outer */}
                <ellipse
                    cx="210"
                    cy="250"
                    rx="190"
                    ry="230"
                    fill="url(#mirror-frame)"
                    stroke="#1e293b"
                    strokeWidth="3"
                />

                {/* Mirror Frame - Inner rim */}
                <ellipse
                    cx="210"
                    cy="250"
                    rx="182"
                    ry="222"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                />

                {/* Mirror Glass Background */}
                <ellipse
                    cx="210"
                    cy="250"
                    rx="175"
                    ry="215"
                    fill="url(#mirror-glass)"
                />

                {/* Mirror Glass Highlight */}
                <ellipse
                    cx="170"
                    cy="150"
                    rx="80"
                    ry="50"
                    fill="url(#mirror-highlight)"
                    opacity="0.6"
                />

                {/* Face Content - Clipped to mirror shape */}
                <g clipPath="url(#mirror-clip)">
                    {/* Hair (simple sketch) */}
                    <motion.path
                        d="M 110 170
                           C 100 120 140 80 210 70
                           C 280 80 320 120 310 170
                           C 320 140 290 100 210 90
                           C 130 100 100 140 110 170"
                        fill="#3D2914"
                        stroke="#2D1F0F"
                        strokeWidth="1.5"
                        opacity="0.9"
                        filter="url(#sketch)"
                    />

                    {/* Left Ear */}
                    <g filter="url(#sketch)">
                        <motion.path
                            d="M 95 210
                               C 80 210 70 230 72 255
                               C 74 280 85 295 95 290
                               C 90 280 85 260 88 240
                               C 90 225 95 215 95 210"
                            fill={skinColor}
                            stroke="#8B7355"
                            strokeWidth="1"
                            initial={{ fill: '#E8D5C4' }}
                            animate={{ fill: skinColor }}
                            transition={{ duration: 0.5 }}
                        />
                        {/* Ear inner detail */}
                        <path
                            d="M 88 230 C 82 240 82 260 86 275"
                            fill="none"
                            stroke="#A08060"
                            strokeWidth="1"
                        />
                        {/* Earring placeholder */}
                        {(showEarringRecommend || highlightArea === 'ears') && (
                            <motion.g
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <circle cx="88" cy="290" r="8" fill="#FFD700" stroke="#DAA520" strokeWidth="1" />
                                <circle cx="88" cy="290" r="4" fill="#FFF8DC" />
                            </motion.g>
                        )}
                    </g>

                    {/* Right Ear */}
                    <g filter="url(#sketch)">
                        <motion.path
                            d="M 325 210
                               C 340 210 350 230 348 255
                               C 346 280 335 295 325 290
                               C 330 280 335 260 332 240
                               C 330 225 325 215 325 210"
                            fill={skinColor}
                            stroke="#8B7355"
                            strokeWidth="1"
                            initial={{ fill: '#E8D5C4' }}
                            animate={{ fill: skinColor }}
                            transition={{ duration: 0.5 }}
                        />
                        {/* Ear inner detail */}
                        <path
                            d="M 332 230 C 338 240 338 260 334 275"
                            fill="none"
                            stroke="#A08060"
                            strokeWidth="1"
                        />
                        {/* Earring placeholder */}
                        {(showEarringRecommend || highlightArea === 'ears') && (
                            <motion.g
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <circle cx="332" cy="290" r="8" fill="#FFD700" stroke="#DAA520" strokeWidth="1" />
                                <circle cx="332" cy="290" r="4" fill="#FFF8DC" />
                            </motion.g>
                        )}
                    </g>

                    {/* Ear highlight zone */}
                    {highlightArea === 'ears' && (
                        <>
                            <motion.ellipse
                                cx="88"
                                cy="250"
                                rx="25"
                                ry="45"
                                fill="#E91E63"
                                opacity="0.15"
                                animate={{ opacity: [0.1, 0.2, 0.1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            <motion.ellipse
                                cx="332"
                                cy="250"
                                rx="25"
                                ry="45"
                                fill="#E91E63"
                                opacity="0.15"
                                animate={{ opacity: [0.1, 0.2, 0.1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                        </>
                    )}

                    {/* Face outline */}
                    <motion.path
                        d="M 210 110
                           C 270 110 310 155 310 210
                           C 310 265 295 320 275 355
                           C 255 390 230 410 210 410
                           C 190 410 165 390 145 355
                           C 125 320 110 265 110 210
                           C 110 155 150 110 210 110"
                        fill={skinColor}
                        stroke="#8B7355"
                        strokeWidth="1.5"
                        filter="url(#sketch)"
                        initial={{ fill: '#E8D5C4' }}
                        animate={{ fill: skinColor }}
                        transition={{ duration: 0.5 }}
                    />

                    {/* Skin glow overlay (when foundation applied) */}
                    {hasFoundation && (
                        <motion.ellipse
                            cx="210"
                            cy="250"
                            rx="90"
                            ry="130"
                            fill="url(#skin-glow)"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        />
                    )}

                    {/* Skin imperfections (before makeup) */}
                    {!hasFoundation && (
                        <g opacity="0.4">
                            {/* Dark circles */}
                            <ellipse cx="170" cy="225" rx="18" ry="6" fill="#C4A882" />
                            <ellipse cx="250" cy="225" rx="18" ry="6" fill="#C4A882" />
                            {/* Uneven skin patches */}
                            <circle cx="185" cy="270" r="10" fill="#D4B896" opacity="0.5" />
                            <circle cx="240" cy="285" r="8" fill="#D4B896" opacity="0.5" />
                            <circle cx="220" cy="160" r="6" fill="#D4B896" opacity="0.4" />
                        </g>
                    )}

                    {/* ===== ZONE GUIDES WITH DASHED BOXES ===== */}

                    {/* T-Zone Guide */}
                    {(showZoneGuides || activeZone === 't_zone' || activeZone === 'foundation') && (
                        <g>
                            {/* T-Zone transparent overlay */}
                            <motion.path
                                d="M 180 130 L 240 130 L 240 180 L 260 180 L 260 280 L 160 280 L 160 180 L 180 180 Z"
                                fill="url(#zone-tzone)"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: activeZone === 't_zone' || activeZone === 'foundation' ? 0.5 : 0.2 }}
                                transition={{ duration: 0.5 }}
                            />
                            {/* T-Zone dashed border */}
                            <motion.path
                                d="M 180 130 L 240 130 L 240 180 L 260 180 L 260 280 L 160 280 L 160 180 L 180 180 Z"
                                fill="none"
                                stroke="#F59E0B"
                                strokeWidth="2"
                                strokeDasharray="8 4"
                                {...(activeZone === 't_zone' || activeZone === 'foundation' ? zoneAnimation : {})}
                            />
                            {/* T-Zone label */}
                            {(activeZone === 't_zone' || activeZone === 'foundation') && (
                                <motion.g
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <rect x="175" y="105" width="70" height="20" rx="4" fill="#F59E0B" />
                                    <text x="210" y="119" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">T区控油</text>
                                </motion.g>
                            )}
                        </g>
                    )}

                    {/* Cheek Zone Guide - Left */}
                    {(showZoneGuides || activeZone === 'cheeks' || activeZone === 'blush') && (
                        <g>
                            <motion.ellipse
                                cx="145"
                                cy="270"
                                rx="35"
                                ry="30"
                                fill="url(#zone-cheek)"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: activeZone === 'cheeks' || activeZone === 'blush' ? 0.5 : 0.2 }}
                            />
                            <motion.ellipse
                                cx="145"
                                cy="270"
                                rx="35"
                                ry="30"
                                fill="none"
                                stroke="#EC4899"
                                strokeWidth="2"
                                strokeDasharray="6 4"
                                {...(activeZone === 'cheeks' || activeZone === 'blush' ? zoneAnimation : {})}
                            />
                            {/* Cheek Zone Guide - Right */}
                            <motion.ellipse
                                cx="275"
                                cy="270"
                                rx="35"
                                ry="30"
                                fill="url(#zone-cheek)"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: activeZone === 'cheeks' || activeZone === 'blush' ? 0.5 : 0.2 }}
                            />
                            <motion.ellipse
                                cx="275"
                                cy="270"
                                rx="35"
                                ry="30"
                                fill="none"
                                stroke="#EC4899"
                                strokeWidth="2"
                                strokeDasharray="6 4"
                                {...(activeZone === 'cheeks' || activeZone === 'blush' ? zoneAnimation : {})}
                            />
                            {(activeZone === 'cheeks' || activeZone === 'blush') && (
                                <>
                                    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        <rect x="110" y="305" width="70" height="18" rx="4" fill="#EC4899" />
                                        <text x="145" y="318" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">腮红区</text>
                                    </motion.g>
                                    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        <rect x="240" y="305" width="70" height="18" rx="4" fill="#EC4899" />
                                        <text x="275" y="318" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">腮红区</text>
                                    </motion.g>
                                </>
                            )}
                        </g>
                    )}

                    {/* Eye Zone Guide */}
                    {(showZoneGuides || activeZone === 'eyeshadow') && (
                        <g>
                            <motion.rect
                                x="140"
                                y="195"
                                width="55"
                                height="35"
                                rx="8"
                                fill="url(#zone-eye)"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: activeZone === 'eyeshadow' ? 0.5 : 0.2 }}
                            />
                            <motion.rect
                                x="140"
                                y="195"
                                width="55"
                                height="35"
                                rx="8"
                                fill="none"
                                stroke="#8B5CF6"
                                strokeWidth="2"
                                strokeDasharray="6 4"
                                {...(activeZone === 'eyeshadow' ? zoneAnimation : {})}
                            />
                            <motion.rect
                                x="225"
                                y="195"
                                width="55"
                                height="35"
                                rx="8"
                                fill="url(#zone-eye)"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: activeZone === 'eyeshadow' ? 0.5 : 0.2 }}
                            />
                            <motion.rect
                                x="225"
                                y="195"
                                width="55"
                                height="35"
                                rx="8"
                                fill="none"
                                stroke="#8B5CF6"
                                strokeWidth="2"
                                strokeDasharray="6 4"
                                {...(activeZone === 'eyeshadow' ? zoneAnimation : {})}
                            />
                            {activeZone === 'eyeshadow' && (
                                <motion.g initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                                    <rect x="175" y="175" width="70" height="18" rx="4" fill="#8B5CF6" />
                                    <text x="210" y="188" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">眼影区</text>
                                </motion.g>
                            )}
                        </g>
                    )}

                    {/* Lip Zone Guide */}
                    {(showZoneGuides || activeZone === 'lips') && (
                        <g>
                            <motion.ellipse
                                cx="210"
                                cy="355"
                                rx="40"
                                ry="25"
                                fill="#EF4444"
                                fillOpacity="0.2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: activeZone === 'lips' ? 0.5 : 0.2 }}
                            />
                            <motion.ellipse
                                cx="210"
                                cy="355"
                                rx="40"
                                ry="25"
                                fill="none"
                                stroke="#EF4444"
                                strokeWidth="2"
                                strokeDasharray="6 4"
                                {...(activeZone === 'lips' ? zoneAnimation : {})}
                            />
                            {activeZone === 'lips' && (
                                <motion.g initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
                                    <rect x="175" y="385" width="70" height="18" rx="4" fill="#EF4444" />
                                    <text x="210" y="398" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">唇妆区</text>
                                </motion.g>
                            )}
                        </g>
                    )}

                    {/* Eyebrow Zone Guide */}
                    {(showZoneGuides || activeZone === 'eyebrow') && (
                        <g>
                            <motion.rect
                                x="135"
                                y="175"
                                width="60"
                                height="20"
                                rx="6"
                                fill="#92400E"
                                fillOpacity="0.2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: activeZone === 'eyebrow' ? 0.5 : 0.2 }}
                            />
                            <motion.rect
                                x="135"
                                y="175"
                                width="60"
                                height="20"
                                rx="6"
                                fill="none"
                                stroke="#92400E"
                                strokeWidth="2"
                                strokeDasharray="5 3"
                                {...(activeZone === 'eyebrow' ? zoneAnimation : {})}
                            />
                            <motion.rect
                                x="225"
                                y="175"
                                width="60"
                                height="20"
                                rx="6"
                                fill="#92400E"
                                fillOpacity="0.2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: activeZone === 'eyebrow' ? 0.5 : 0.2 }}
                            />
                            <motion.rect
                                x="225"
                                y="175"
                                width="60"
                                height="20"
                                rx="6"
                                fill="none"
                                stroke="#92400E"
                                strokeWidth="2"
                                strokeDasharray="5 3"
                                {...(activeZone === 'eyebrow' ? zoneAnimation : {})}
                            />
                            {activeZone === 'eyebrow' && (
                                <motion.g initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                                    <rect x="175" y="155" width="70" height="18" rx="4" fill="#92400E" />
                                    <text x="210" y="168" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">眉毛区</text>
                                </motion.g>
                            )}
                        </g>
                    )}

                    {/* Eyebrows */}
                    <g filter="url(#sketch)">
                        <motion.path
                            d="M 145 190 Q 170 180 195 188"
                            fill="none"
                            stroke={hasEyebrow ? '#4A3728' : '#8B7355'}
                            strokeWidth={hasEyebrow ? 5 : 2.5}
                            strokeLinecap="round"
                            initial={{ strokeWidth: 2.5 }}
                            animate={{ strokeWidth: hasEyebrow ? 5 : 2.5 }}
                            transition={{ duration: 0.3 }}
                        />
                        <motion.path
                            d="M 225 188 Q 250 180 275 190"
                            fill="none"
                            stroke={hasEyebrow ? '#4A3728' : '#8B7355'}
                            strokeWidth={hasEyebrow ? 5 : 2.5}
                            strokeLinecap="round"
                            initial={{ strokeWidth: 2.5 }}
                            animate={{ strokeWidth: hasEyebrow ? 5 : 2.5 }}
                            transition={{ duration: 0.3 }}
                        />
                    </g>

                    {/* Eyeshadow (when applied) */}
                    {hasEyeshadow && (
                        <g>
                            <motion.ellipse
                                cx="170"
                                cy="215"
                                rx="25"
                                ry="15"
                                fill="url(#eyeshadow-grad)"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            />
                            <motion.ellipse
                                cx="250"
                                cy="215"
                                rx="25"
                                ry="15"
                                fill="url(#eyeshadow-grad)"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            />
                        </g>
                    )}

                    {/* Eyes */}
                    <g>
                        {/* Left eye */}
                        <ellipse cx="170" cy="220" rx="22" ry="12" fill="white" stroke="#5D4E3C" strokeWidth="1.5" />
                        <circle cx="170" cy="220" r="9" fill="#4A3728" />
                        <circle cx="167" cy="217" r="3" fill="white" />

                        {/* Right eye */}
                        <ellipse cx="250" cy="220" rx="22" ry="12" fill="white" stroke="#5D4E3C" strokeWidth="1.5" />
                        <circle cx="250" cy="220" r="9" fill="#4A3728" />
                        <circle cx="247" cy="217" r="3" fill="white" />

                        {/* Eyelashes */}
                        {hasEyeshadow && (
                            <g stroke="#2D1F0F" strokeWidth="1.2" strokeLinecap="round">
                                <line x1="152" y1="213" x2="149" y2="206" />
                                <line x1="158" y1="210" x2="155" y2="203" />
                                <line x1="165" y1="209" x2="163" y2="202" />
                                <line x1="175" y1="209" x2="177" y2="202" />
                                <line x1="182" y1="210" x2="185" y2="203" />
                                <line x1="188" y1="213" x2="191" y2="206" />
                                <line x1="232" y1="213" x2="229" y2="206" />
                                <line x1="238" y1="210" x2="235" y2="203" />
                                <line x1="245" y1="209" x2="243" y2="202" />
                                <line x1="255" y1="209" x2="257" y2="202" />
                                <line x1="262" y1="210" x2="265" y2="203" />
                                <line x1="268" y1="213" x2="271" y2="206" />
                            </g>
                        )}
                    </g>

                    {/* Nose */}
                    <path
                        d="M 210 225 L 210 280 M 195 288 Q 210 298 225 288"
                        fill="none"
                        stroke="#A08060"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />

                    {/* Blush (when applied) */}
                    {hasBlush && (
                        <g>
                            <motion.ellipse
                                cx="140"
                                cy="265"
                                rx="30"
                                ry="22"
                                fill="url(#blush-grad)"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            />
                            <motion.ellipse
                                cx="280"
                                cy="265"
                                rx="30"
                                ry="22"
                                fill="url(#blush-grad)"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            />
                        </g>
                    )}

                    {/* Lips */}
                    <g>
                        <motion.path
                            d="M 175 340 Q 193 330 210 335 Q 227 330 245 340"
                            fill={hasLips ? 'url(#lip-grad)' : '#D4A5A5'}
                            stroke={hasLips ? '#C73E3E' : '#B08080'}
                            strokeWidth="1"
                            initial={{ fill: '#D4A5A5' }}
                            animate={{ fill: hasLips ? 'url(#lip-grad)' : '#D4A5A5' }}
                            transition={{ duration: 0.3 }}
                        />
                        <motion.path
                            d="M 175 340 Q 210 365 245 340"
                            fill={hasLips ? 'url(#lip-grad)' : '#DCACAC'}
                            stroke={hasLips ? '#C73E3E' : '#B08080'}
                            strokeWidth="1"
                            initial={{ fill: '#DCACAC' }}
                            animate={{ fill: hasLips ? 'url(#lip-grad)' : '#DCACAC' }}
                            transition={{ duration: 0.3 }}
                        />
                        {hasLips && (
                            <motion.ellipse
                                cx="210"
                                cy="350"
                                rx="10"
                                ry="5"
                                fill="white"
                                opacity="0.3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.3 }}
                            />
                        )}
                    </g>

                    {/* Scan line animation */}
                    {showScanLine && (
                        <motion.line
                            x1="50"
                            y1="50"
                            x2="370"
                            y2="50"
                            stroke="#E91E63"
                            strokeWidth="3"
                            initial={{ y1: 50, y2: 50 }}
                            animate={{ y1: 450, y2: 450 }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                        />
                    )}
                </g>

                {/* ===== SMART MIRROR UI ELEMENTS ===== */}

                {/* Top Status Bar */}
                <g>
                    <rect x="100" y="25" width="220" height="32" rx="16" fill="rgba(0,0,0,0.7)" />
                    <circle cx="125" cy="41" r="6" fill="#10B981" />
                    <text x="145" y="46" fontSize="12" fill="white" fontFamily="monospace">
                        AI Mirror Active
                    </text>
                    <text x="280" y="46" fontSize="11" fill="#94a3b8" fontFamily="monospace">
                        09:30
                    </text>
                </g>

                {/* Skin Analysis Metrics Panel */}
                {showMetrics && (
                    <g>
                        {/* Left Panel - Skin Metrics */}
                        <motion.g
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <rect x="15" y="100" width="65" height="120" rx="10" fill="rgba(0,0,0,0.7)" />
                            <text x="47" y="120" textAnchor="middle" fontSize="10" fill="#94a3b8">皮肤指标</text>

                            <circle cx="35" cy="145" r="5" fill="#F59E0B" />
                            <text x="45" y="148" fontSize="9" fill="white">T区 油</text>

                            <circle cx="35" cy="170" r="5" fill="#8B5CF6" />
                            <text x="45" y="173" fontSize="9" fill="white">黑眼圈</text>

                            <circle cx="35" cy="195" r="5" fill="#10B981" />
                            <text x="45" y="198" fontSize="9" fill="white">暖色调</text>
                        </motion.g>

                        {/* Right Panel - Recommendations */}
                        <motion.g
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <rect x="340" y="100" width="65" height="120" rx="10" fill="rgba(0,0,0,0.7)" />
                            <text x="372" y="120" textAnchor="middle" fontSize="10" fill="#94a3b8">推荐</text>

                            <text x="350" y="145" fontSize="9" fill="#EC4899">💄 哑光唇膏</text>
                            <text x="350" y="168" fontSize="9" fill="#8B5CF6">👁️ 大地眼影</text>
                            <text x="350" y="191" fontSize="9" fill="#F59E0B">✨ 控油散粉</text>
                        </motion.g>
                    </g>
                )}

                {/* Bottom Info Bar */}
                <motion.g
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    <rect x="70" y="475" width="280" height="35" rx="17" fill="rgba(0,0,0,0.7)" />

                    {/* Weather */}
                    <text x="95" y="497" fontSize="11" fill="white">☀️ 22°C</text>

                    {/* Divider */}
                    <line x1="150" y1="483" x2="150" y2="502" stroke="#475569" strokeWidth="1" />

                    {/* Schedule */}
                    <text x="165" y="497" fontSize="11" fill="white">📅 部门会议 14:00</text>

                    {/* Divider */}
                    <line x1="290" y1="483" x2="290" y2="502" stroke="#475569" strokeWidth="1" />

                    {/* Style suggestion */}
                    <text x="305" y="497" fontSize="11" fill="#EC4899">职场妆</text>
                </motion.g>

                {/* Earring Recommendation Panel */}
                {showEarringRecommend && (
                    <motion.g
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <rect x="15" y="250" width="65" height="80" rx="10" fill="rgba(0,0,0,0.7)" />
                        <text x="47" y="270" textAnchor="middle" fontSize="10" fill="#FFD700">耳饰推荐</text>
                        <circle cx="32" cy="295" r="10" fill="#FFD700" stroke="#DAA520" strokeWidth="1" />
                        <text x="50" y="298" fontSize="8" fill="white">金色耳环</text>
                        <text x="47" y="318" textAnchor="middle" fontSize="9" fill="#10B981">匹配度 92%</text>
                    </motion.g>
                )}

                {/* Samsung-style brand indicator */}
                <g>
                    <rect x="180" y="490" width="60" height="16" rx="3" fill="#1e293b" />
                    <text x="210" y="502" textAnchor="middle" fontSize="9" fill="#94a3b8" fontFamily="monospace">
                        MIRROR
                    </text>
                </g>

                {/* ===== GIMBAL & BASE STRUCTURE ===== */}

                {/* Gimbal Neck/Arm */}
                <g>
                    {/* Upper joint - connects to mirror */}
                    <motion.ellipse
                        cx="210"
                        cy="485"
                        rx="25"
                        ry="8"
                        fill="url(#gimbal-metal)"
                        stroke="#475569"
                        strokeWidth="1"
                        animate={{ rotateX: [0, 5, 0, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Main arm segment */}
                    <motion.path
                        d="M 195 488
                           L 190 520
                           Q 210 530 230 520
                           L 225 488"
                        fill="url(#gimbal-metal)"
                        stroke="#475569"
                        strokeWidth="1"
                    />

                    {/* Middle rotation joint */}
                    <motion.g
                        animate={{ rotate: [-3, 3, -3] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        style={{ transformOrigin: '210px 525px' }}
                    >
                        <ellipse cx="210" cy="525" rx="20" ry="10" fill="#334155" stroke="#1e293b" strokeWidth="2" />
                        {/* Joint indicator ring */}
                        <ellipse cx="210" cy="525" rx="12" ry="6" fill="none" stroke="#E91E63" strokeWidth="1.5" opacity="0.6" />

                        {/* Lower arm segment */}
                        <path
                            d="M 198 530
                               L 195 560
                               Q 210 565 225 560
                               L 222 530"
                            fill="url(#gimbal-metal)"
                            stroke="#475569"
                            strokeWidth="1"
                        />
                    </motion.g>

                    {/* Base joint */}
                    <ellipse cx="210" cy="565" rx="28" ry="12" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                </g>

                {/* Robot Base */}
                <g>
                    {/* LED Ring around base */}
                    <motion.ellipse
                        cx="210"
                        cy="575"
                        rx="55"
                        ry="18"
                        fill="none"
                        stroke="url(#led-ring)"
                        strokeWidth="3"
                        opacity="0.8"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />

                    {/* Main base body */}
                    <ellipse cx="210" cy="580" rx="70" ry="25" fill="url(#base-gradient)" stroke="#334155" strokeWidth="2" />

                    {/* Base top surface */}
                    <ellipse cx="210" cy="575" rx="60" ry="20" fill="#1e293b" stroke="#475569" strokeWidth="1" />

                    {/* Base bottom rim */}
                    <ellipse cx="210" cy="595" rx="70" ry="20" fill="#020617" stroke="#1e293b" strokeWidth="1" />

                    {/* Status indicator lights */}
                    <motion.circle
                        cx="175"
                        cy="580"
                        r="4"
                        fill="#10B981"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <motion.circle
                        cx="210"
                        cy="585"
                        r="4"
                        fill="#3B82F6"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                    />
                    <motion.circle
                        cx="245"
                        cy="580"
                        r="4"
                        fill="#10B981"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                    />

                    {/* Brand name on base */}
                    <text x="210" y="600" textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="monospace" fontWeight="bold">
                        AgenticMirror
                    </text>
                </g>

                {/* Tracking indicators - showing gimbal movement */}
                <g>
                    {/* Left tracking arrow */}
                    <motion.g
                        animate={{ x: [-5, 5, -5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <path
                            d="M 120 300 L 100 300 L 108 292 M 100 300 L 108 308"
                            fill="none"
                            stroke="#E91E63"
                            strokeWidth="2"
                            strokeLinecap="round"
                            opacity="0.6"
                        />
                    </motion.g>

                    {/* Right tracking arrow */}
                    <motion.g
                        animate={{ x: [5, -5, 5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <path
                            d="M 300 300 L 320 300 L 312 292 M 320 300 L 312 308"
                            fill="none"
                            stroke="#E91E63"
                            strokeWidth="2"
                            strokeLinecap="round"
                            opacity="0.6"
                        />
                    </motion.g>

                    {/* Vertical tracking indicator */}
                    <motion.g
                        animate={{ y: [-3, 3, -3] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <path
                            d="M 380 200 L 380 180 L 372 188 M 380 180 L 388 188"
                            fill="none"
                            stroke="#9C27B0"
                            strokeWidth="2"
                            strokeLinecap="round"
                            opacity="0.6"
                        />
                        <path
                            d="M 380 320 L 380 340 L 372 332 M 380 340 L 388 332"
                            fill="none"
                            stroke="#9C27B0"
                            strokeWidth="2"
                            strokeLinecap="round"
                            opacity="0.6"
                        />
                    </motion.g>

                    {/* "Tracking" label */}
                    <motion.g
                        animate={{ opacity: [0.4, 0.8, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <rect x="355" y="255" width="60" height="20" rx="4" fill="rgba(233, 30, 99, 0.2)" />
                        <text x="385" y="269" textAnchor="middle" fontSize="9" fill="#E91E63" fontWeight="bold">
                            TRACKING
                        </text>
                    </motion.g>
                </g>

                {/* 2-Axis gimbal specs indicator */}
                <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <rect x="15" y="520" width="80" height="55" rx="8" fill="rgba(0,0,0,0.7)" />
                    <text x="55" y="538" textAnchor="middle" fontSize="9" fill="#94a3b8">云台参数</text>
                    <text x="25" y="555" fontSize="8" fill="#10B981">● 水平 ±45°</text>
                    <text x="25" y="568" fontSize="8" fill="#3B82F6">● 垂直 ±30°</text>
                </motion.g>
            </svg>

            {/* Beauty Score Badge */}
            {showTransformation && (
                <motion.div
                    className="absolute top-6 right-2 w-18 h-18 rounded-full bg-gradient-to-br from-mirror-500 to-accent-500 flex items-center justify-center shadow-lg border-2 border-white"
                    style={{ width: '72px', height: '72px' }}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                >
                    <div className="text-center text-white">
                        <motion.div
                            className="text-2xl font-bold"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            {beautyScore}
                        </motion.div>
                        <div className="text-[10px] opacity-80">颜值分</div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
