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
    // Show robotic arms
    showRoboticArms?: boolean;
    // Arm action state
    armAction?: 'idle' | 'retracted' | 'picking' | 'handing' | 'waving' | 'organizing';
    // Item being held by arm
    heldItem?: string;
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
    showRoboticArms = true,
    armAction = 'idle',
    heldItem = '',
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

                {/* Face tracking target indicator on face */}
                <motion.g
                    animate={{
                        x: [0, 15, 0, -15, 0],
                        y: [0, -10, 5, -5, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    {/* Tracking crosshair */}
                    <motion.circle
                        cx="210"
                        cy="260"
                        r="35"
                        fill="none"
                        stroke="#E91E63"
                        strokeWidth="2"
                        strokeDasharray="8 4"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        style={{ transformOrigin: '210px 260px' }}
                    />
                    <line x1="210" y1="220" x2="210" y2="240" stroke="#E91E63" strokeWidth="2" />
                    <line x1="210" y1="280" x2="210" y2="300" stroke="#E91E63" strokeWidth="2" />
                    <line x1="170" y1="260" x2="190" y2="260" stroke="#E91E63" strokeWidth="2" />
                    <line x1="230" y1="260" x2="250" y2="260" stroke="#E91E63" strokeWidth="2" />

                    {/* Center dot */}
                    <motion.circle
                        cx="210"
                        cy="260"
                        r="5"
                        fill="#E91E63"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    />
                </motion.g>

                {/* Entire mirror + gimbal assembly that tilts */}
                <motion.g
                    animate={{
                        rotate: [-3, 3, -2, 4, -3],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    style={{ transformOrigin: '210px 525px' }}
                >
                    {/* Gimbal Neck/Arm */}
                    <g>
                        {/* Upper joint - connects to mirror */}
                        <ellipse
                            cx="210"
                            cy="485"
                            rx="25"
                            ry="8"
                            fill="url(#gimbal-metal)"
                            stroke="#475569"
                            strokeWidth="1"
                        />

                        {/* Tilt motor indicator */}
                        <motion.circle
                            cx="235"
                            cy="485"
                            r="6"
                            fill="#1e293b"
                            stroke="#E91E63"
                            strokeWidth="2"
                            animate={{ stroke: ['#E91E63', '#9C27B0', '#E91E63'] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        />

                        {/* Main arm segment */}
                        <path
                            d="M 195 488
                               L 190 520
                               Q 210 530 230 520
                               L 225 488"
                            fill="url(#gimbal-metal)"
                            stroke="#475569"
                            strokeWidth="1"
                        />
                    </g>
                </motion.g>

                {/* Pan rotation joint - rotates horizontally */}
                <motion.g
                    animate={{ rotate: [-5, 5, -5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    style={{ transformOrigin: '210px 540px' }}
                >
                    <ellipse cx="210" cy="525" rx="22" ry="12" fill="#334155" stroke="#1e293b" strokeWidth="2" />
                    {/* Joint indicator ring - shows rotation */}
                    <motion.ellipse
                        cx="210"
                        cy="525"
                        rx="14"
                        ry="7"
                        fill="none"
                        stroke="#E91E63"
                        strokeWidth="2"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                    />

                    {/* Pan motor indicator */}
                    <motion.circle
                        cx="232"
                        cy="525"
                        r="5"
                        fill="#10B981"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                    />

                    {/* Lower arm segment */}
                    <path
                        d="M 198 532
                           L 195 560
                           Q 210 568 225 560
                           L 222 532"
                        fill="url(#gimbal-metal)"
                        stroke="#475569"
                        strokeWidth="1"
                    />
                </motion.g>

                {/* Base joint */}
                <ellipse cx="210" cy="565" rx="28" ry="12" fill="#1e293b" stroke="#334155" strokeWidth="2" />

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
                    {/* Simulated user position indicator - moves to show tracking */}
                    <motion.g
                        animate={{
                            x: [0, 20, 0, -20, 0],
                            y: [0, -15, 10, -10, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        {/* User position dot */}
                        <circle cx="50" cy="250" r="8" fill="#3B82F6" opacity="0.8" />
                        <text x="50" y="275" textAnchor="middle" fontSize="8" fill="#3B82F6">用户</text>
                    </motion.g>

                    {/* Tracking beam from mirror to user */}
                    <motion.line
                        x1="100"
                        y1="260"
                        x2="50"
                        y2="250"
                        stroke="#E91E63"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        animate={{
                            x2: [50, 70, 50, 30, 50],
                            y2: [250, 235, 260, 240, 250]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        opacity="0.6"
                    />

                    {/* Left tracking arrow - larger and more visible */}
                    <motion.g
                        animate={{ x: [-8, 8, -8] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <path
                            d="M 115 300 L 90 300 L 100 288 M 90 300 L 100 312"
                            fill="none"
                            stroke="#E91E63"
                            strokeWidth="3"
                            strokeLinecap="round"
                        />
                        <text x="102" y="330" fontSize="8" fill="#E91E63">PAN</text>
                    </motion.g>

                    {/* Right tracking arrow */}
                    <motion.g
                        animate={{ x: [8, -8, 8] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <path
                            d="M 305 300 L 330 300 L 320 288 M 330 300 L 320 312"
                            fill="none"
                            stroke="#E91E63"
                            strokeWidth="3"
                            strokeLinecap="round"
                        />
                        <text x="318" y="330" fontSize="8" fill="#E91E63">PAN</text>
                    </motion.g>

                    {/* Vertical tracking indicator - tilt */}
                    <motion.g
                        animate={{ y: [-8, 8, -8] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <path
                            d="M 380 195 L 380 170 L 368 182 M 380 170 L 392 182"
                            fill="none"
                            stroke="#9C27B0"
                            strokeWidth="3"
                            strokeLinecap="round"
                        />
                        <path
                            d="M 380 325 L 380 350 L 368 338 M 380 350 L 392 338"
                            fill="none"
                            stroke="#9C27B0"
                            strokeWidth="3"
                            strokeLinecap="round"
                        />
                        <text x="380" y="285" textAnchor="middle" fontSize="8" fill="#9C27B0">TILT</text>
                    </motion.g>

                    {/* "Face Tracking Active" label */}
                    <motion.g
                        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.02, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ transformOrigin: '385px 265px' }}
                    >
                        <rect x="340" y="250" width="90" height="30" rx="6" fill="rgba(233, 30, 99, 0.9)" />
                        <text x="385" y="262" textAnchor="middle" fontSize="8" fill="white">👁️ FACE TRACKING</text>
                        <text x="385" y="274" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">ACTIVE</text>
                    </motion.g>

                    {/* Motion trail effect */}
                    <motion.path
                        d="M 210 250 Q 220 245 230 250 Q 225 260 210 265 Q 195 260 190 250 Q 200 245 210 250"
                        fill="none"
                        stroke="#E91E63"
                        strokeWidth="1"
                        opacity="0.3"
                        animate={{
                            d: [
                                "M 210 250 Q 220 245 230 250 Q 225 260 210 265 Q 195 260 190 250 Q 200 245 210 250",
                                "M 225 245 Q 235 240 245 245 Q 240 255 225 260 Q 210 255 205 245 Q 215 240 225 245",
                                "M 210 250 Q 220 245 230 250 Q 225 260 210 265 Q 195 260 190 250 Q 200 245 210 250",
                                "M 195 255 Q 205 250 215 255 Q 210 265 195 270 Q 180 265 175 255 Q 185 250 195 255",
                                "M 210 250 Q 220 245 230 250 Q 225 260 210 265 Q 195 260 190 250 Q 200 245 210 250"
                            ]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
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

                {/* ===== ROBOTIC ARMS ===== */}
                {showRoboticArms && (
                    <g>
                        {/* Left Robotic Arm */}
                        <motion.g
                            initial={{ x: 0 }}
                            animate={{
                                x: armAction === 'retracted' ? 30 : 0,
                                rotate: armAction === 'waving' ? [0, -10, 0, -10, 0] :
                                        armAction === 'picking' ? -15 :
                                        armAction === 'handing' ? -20 : 0
                            }}
                            transition={{
                                duration: armAction === 'waving' ? 1.5 : 0.5,
                                repeat: armAction === 'waving' ? Infinity : 0
                            }}
                            style={{ transformOrigin: '140px 570px' }}
                        >
                            {/* Arm housing on base */}
                            <ellipse cx="140" cy="575" rx="15" ry="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />

                            {/* Upper arm segment */}
                            <motion.path
                                d="M 140 570
                                   Q 120 550 100 530
                                   L 105 525
                                   Q 125 545 145 565"
                                fill="url(#gimbal-metal)"
                                stroke="#475569"
                                strokeWidth="1"
                            />

                            {/* Elbow joint */}
                            <motion.circle
                                cx="100"
                                cy="528"
                                r="8"
                                fill="#334155"
                                stroke="#E91E63"
                                strokeWidth="2"
                                animate={{ stroke: ['#E91E63', '#9C27B0', '#E91E63'] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />

                            {/* Forearm segment */}
                            <motion.g
                                animate={{
                                    rotate: armAction === 'picking' ? -30 :
                                            armAction === 'handing' ? -45 :
                                            armAction === 'organizing' ? [-10, 10, -10] : 0
                                }}
                                transition={{
                                    duration: armAction === 'organizing' ? 2 : 0.5,
                                    repeat: armAction === 'organizing' ? Infinity : 0
                                }}
                                style={{ transformOrigin: '100px 528px' }}
                            >
                                <path
                                    d="M 100 522
                                       Q 70 500 50 485
                                       L 55 480
                                       Q 75 495 105 517"
                                    fill="url(#gimbal-metal)"
                                    stroke="#475569"
                                    strokeWidth="1"
                                />

                                {/* Wrist joint */}
                                <circle cx="52" cy="482" r="6" fill="#334155" stroke="#64748b" strokeWidth="1" />

                                {/* Gripper/Hand */}
                                <motion.g
                                    animate={{
                                        scale: armAction === 'picking' || armAction === 'handing' ? [1, 0.9, 1] : 1
                                    }}
                                    transition={{ duration: 0.5, repeat: armAction === 'picking' ? Infinity : 0 }}
                                    style={{ transformOrigin: '45px 470px' }}
                                >
                                    {/* Gripper fingers */}
                                    <path d="M 45 478 L 35 465 L 38 462 L 48 475" fill="#64748b" stroke="#475569" strokeWidth="1" />
                                    <path d="M 52 478 L 55 462 L 58 462 L 55 478" fill="#64748b" stroke="#475569" strokeWidth="1" />
                                    <path d="M 58 480 L 68 468 L 71 471 L 61 483" fill="#64748b" stroke="#475569" strokeWidth="1" />

                                    {/* Held item indicator */}
                                    {heldItem && (armAction === 'handing' || armAction === 'picking') && (
                                        <motion.g
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                        >
                                            <ellipse cx="50" cy="455" rx="12" ry="8" fill="#E91E63" opacity="0.8" />
                                            <text x="50" y="458" textAnchor="middle" fontSize="8" fill="white">💄</text>
                                        </motion.g>
                                    )}
                                </motion.g>
                            </motion.g>

                            {/* Arm status LED */}
                            <motion.circle
                                cx="140"
                                cy="570"
                                r="3"
                                fill={armAction === 'idle' ? '#10B981' : '#E91E63'}
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            />
                        </motion.g>

                        {/* Right Robotic Arm */}
                        <motion.g
                            initial={{ x: 0 }}
                            animate={{
                                x: armAction === 'retracted' ? -30 : 0,
                                rotate: armAction === 'waving' ? [0, 10, 0, 10, 0] :
                                        armAction === 'organizing' ? 10 : 0
                            }}
                            transition={{
                                duration: armAction === 'waving' ? 1.5 : 0.5,
                                repeat: armAction === 'waving' ? Infinity : 0,
                                delay: 0.2
                            }}
                            style={{ transformOrigin: '280px 570px' }}
                        >
                            {/* Arm housing on base */}
                            <ellipse cx="280" cy="575" rx="15" ry="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />

                            {/* Upper arm segment */}
                            <motion.path
                                d="M 280 570
                                   Q 300 550 320 530
                                   L 315 525
                                   Q 295 545 275 565"
                                fill="url(#gimbal-metal)"
                                stroke="#475569"
                                strokeWidth="1"
                            />

                            {/* Elbow joint */}
                            <motion.circle
                                cx="320"
                                cy="528"
                                r="8"
                                fill="#334155"
                                stroke="#E91E63"
                                strokeWidth="2"
                                animate={{ stroke: ['#E91E63', '#9C27B0', '#E91E63'] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                            />

                            {/* Forearm segment */}
                            <motion.g
                                animate={{
                                    rotate: armAction === 'organizing' ? [10, -10, 10] : 0
                                }}
                                transition={{
                                    duration: armAction === 'organizing' ? 2 : 0.5,
                                    repeat: armAction === 'organizing' ? Infinity : 0
                                }}
                                style={{ transformOrigin: '320px 528px' }}
                            >
                                <path
                                    d="M 320 522
                                       Q 350 500 370 485
                                       L 365 480
                                       Q 345 495 315 517"
                                    fill="url(#gimbal-metal)"
                                    stroke="#475569"
                                    strokeWidth="1"
                                />

                                {/* Wrist joint */}
                                <circle cx="368" cy="482" r="6" fill="#334155" stroke="#64748b" strokeWidth="1" />

                                {/* Gripper/Hand */}
                                <g>
                                    <path d="M 375 478 L 385 465 L 382 462 L 372 475" fill="#64748b" stroke="#475569" strokeWidth="1" />
                                    <path d="M 368 478 L 365 462 L 362 462 L 365 478" fill="#64748b" stroke="#475569" strokeWidth="1" />
                                    <path d="M 362 480 L 352 468 L 349 471 L 359 483" fill="#64748b" stroke="#475569" strokeWidth="1" />
                                </g>
                            </motion.g>

                            {/* Arm status LED */}
                            <motion.circle
                                cx="280"
                                cy="570"
                                r="3"
                                fill={armAction === 'idle' ? '#10B981' : '#E91E63'}
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                            />
                        </motion.g>

                        {/* Arm status label */}
                        <motion.g
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <rect x="325" y="520" width="80" height="55" rx="8" fill="rgba(0,0,0,0.7)" />
                            <text x="365" y="538" textAnchor="middle" fontSize="9" fill="#94a3b8">机械臂状态</text>
                            <text x="335" y="555" fontSize="8" fill={armAction === 'idle' ? '#10B981' : '#E91E63'}>
                                ● {armAction === 'idle' ? '待命中' :
                                   armAction === 'retracted' ? '已收起' :
                                   armAction === 'picking' ? '拾取中' :
                                   armAction === 'handing' ? '递送中' :
                                   armAction === 'waving' ? '打招呼' : '整理中'}
                            </text>
                            <text x="335" y="568" fontSize="8" fill="#94a3b8">
                                {heldItem ? `持有: ${heldItem}` : '空闲'}
                            </text>
                        </motion.g>
                    </g>
                )}
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
