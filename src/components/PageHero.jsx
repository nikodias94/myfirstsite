import React from 'react';
import { motion } from 'framer-motion';

/**
 * PageHero — unique artistic full-width banner for each content page.
 * Each page variant has its own handcrafted SVG illustration + color palette.
 */

// ─── SVG Illustrations ───────────────────────────────────────────────────────

// 🪶 POETRY — quill pen writing on moonlit night, rose petals drifting
const POETRY_SVG = `
<svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
  <defs>
    <radialGradient id="pg" cx="30%" cy="40%" r="70%">
      <stop offset="0%" stop-color="%23c9a96e" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="%23000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <!-- Moon -->
  <circle cx="1100" cy="80" r="55" fill="%23c9a96e" opacity="0.12"/>
  <circle cx="1115" cy="72" r="55" fill="%230a0a12" opacity="1"/>
  <circle cx="1100" cy="80" r="55" fill="%23c9a96e" opacity="0.08"/>
  <!-- Stars -->
  <circle cx="200" cy="40" r="1.5" fill="%23c9a96e" opacity="0.6"/>
  <circle cx="340" cy="25" r="1" fill="%23c9a96e" opacity="0.5"/>
  <circle cx="580" cy="55" r="2" fill="%23c9a96e" opacity="0.4"/>
  <circle cx="780" cy="30" r="1.5" fill="%23c9a96e" opacity="0.55"/>
  <circle cx="960" cy="20" r="1" fill="%23c9a96e" opacity="0.45"/>
  <circle cx="1280" cy="45" r="1.5" fill="%23c9a96e" opacity="0.5"/>
  <circle cx="1380" cy="18" r="1" fill="%23c9a96e" opacity="0.4"/>
  <!-- Quill pen body -->
  <g transform="translate(120, 100) rotate(-35)">
    <path d="M0 0 C10 -60, 30 -120, 8 -180 C20 -120, 5 -60, 15 0 Z" fill="%23c9a96e" opacity="0.18"/>
    <path d="M8 -180 C30 -160, 50 -130, 15 0" stroke="%23c9a96e" stroke-width="0.8" fill="none" opacity="0.25"/>
    <!-- Nib -->
    <path d="M0 0 L8 20 L15 0 Z" fill="%23c9a96e" opacity="0.3"/>
    <line x1="8" y1="20" x2="8" y2="55" stroke="%23c9a96e" stroke-width="0.6" opacity="0.35"/>
  </g>
  <!-- Ink flow lines (writing) -->
  <path d="M180 200 Q250 185 320 195 Q390 205 460 190" stroke="%23c9a96e" stroke-width="0.8" fill="none" opacity="0.2"/>
  <path d="M180 215 Q270 200 370 210" stroke="%23c9a96e" stroke-width="0.6" fill="none" opacity="0.15"/>
  <!-- Rose petals -->
  <ellipse cx="700" cy="240" rx="18" ry="8" fill="%23c9a96e" opacity="0.07" transform="rotate(-20, 700, 240)"/>
  <ellipse cx="730" cy="260" rx="14" ry="6" fill="%23c9a96e" opacity="0.06" transform="rotate(15, 730, 260)"/>
  <ellipse cx="660" cy="255" rx="16" ry="7" fill="%23c9a96e" opacity="0.05" transform="rotate(-40, 660, 255)"/>
  <!-- Georgian script-like swirls -->
  <path d="M900 150 C920 130, 950 140, 940 165 C930 190, 900 185, 905 160" stroke="%23c9a96e" stroke-width="1" fill="none" opacity="0.12"/>
  <path d="M950 145 C975 125, 1000 145, 990 170" stroke="%23c9a96e" stroke-width="0.8" fill="none" opacity="0.1"/>
  <!-- Wavy ground lines -->
  <path d="M0 300 Q360 270 720 290 Q1080 310 1440 280 L1440 320 L0 320Z" fill="%23c9a96e" opacity="0.04"/>
</svg>`;

// 🌍 POEMS EN — constellation map, classical English manuscript border
const POEMS_EN_SVG = `
<svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
  <defs>
    <radialGradient id="sg" cx="70%" cy="30%" r="60%">
      <stop offset="0%" stop-color="%23b8d4e8" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="%23000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <!-- Star constellation lines -->
  <line x1="200" y1="60" x2="280" y2="100" stroke="%23a8c8e0" stroke-width="0.6" opacity="0.2"/>
  <line x1="280" y1="100" x2="350" y2="75" stroke="%23a8c8e0" stroke-width="0.6" opacity="0.2"/>
  <line x1="350" y1="75" x2="420" y2="120" stroke="%23a8c8e0" stroke-width="0.6" opacity="0.2"/>
  <line x1="800" y1="50" x2="870" y2="80" stroke="%23a8c8e0" stroke-width="0.6" opacity="0.18"/>
  <line x1="870" y1="80" x2="940" y2="45" stroke="%23a8c8e0" stroke-width="0.6" opacity="0.18"/>
  <line x1="940" y1="45" x2="1020" y2="90" stroke="%23a8c8e0" stroke-width="0.6" opacity="0.18"/>
  <!-- Stars (constellation) -->
  <circle cx="200" cy="60" r="2.5" fill="%23a8c8e0" opacity="0.5"/>
  <circle cx="280" cy="100" r="2" fill="%23a8c8e0" opacity="0.45"/>
  <circle cx="350" cy="75" r="3" fill="%23c9a96e" opacity="0.5"/>
  <circle cx="420" cy="120" r="2" fill="%23a8c8e0" opacity="0.4"/>
  <circle cx="800" cy="50" r="2.5" fill="%23a8c8e0" opacity="0.5"/>
  <circle cx="870" cy="80" r="2" fill="%23a8c8e0" opacity="0.4"/>
  <circle cx="940" cy="45" r="3.5" fill="%23c9a96e" opacity="0.55"/>
  <circle cx="1020" cy="90" r="2" fill="%23a8c8e0" opacity="0.4"/>
  <!-- Random small stars -->
  <circle cx="500" cy="35" r="1.2" fill="%23a8c8e0" opacity="0.35"/>
  <circle cx="620" cy="65" r="1" fill="%23a8c8e0" opacity="0.3"/>
  <circle cx="1150" cy="30" r="1.5" fill="%23a8c8e0" opacity="0.4"/>
  <circle cx="1300" cy="70" r="1.2" fill="%23a8c8e0" opacity="0.35"/>
  <!-- Open book silhouette (center-right) -->
  <g transform="translate(1050, 160)" opacity="0.1">
    <path d="M0 0 L60 -10 L60 80 L0 70 Z" fill="%23a8c8e0"/>
    <path d="M0 0 L-60 -10 L-60 80 L0 70 Z" fill="%23a8c8e0"/>
    <line x1="0" y1="0" x2="0" y2="70" stroke="%23a8c8e0" stroke-width="1"/>
    <!-- Book lines -->
    <line x1="-50" y1="15" x2="-5" y2="12" stroke="%23fff" stroke-width="0.8" opacity="0.4"/>
    <line x1="-50" y1="25" x2="-5" y2="22" stroke="%23fff" stroke-width="0.8" opacity="0.4"/>
    <line x1="-50" y1="35" x2="-5" y2="32" stroke="%23fff" stroke-width="0.8" opacity="0.4"/>
    <line x1="5" y1="12" x2="55" y2="9" stroke="%23fff" stroke-width="0.8" opacity="0.4"/>
    <line x1="5" y1="22" x2="55" y2="19" stroke="%23fff" stroke-width="0.8" opacity="0.4"/>
    <line x1="5" y1="32" x2="55" y2="29" stroke="%23fff" stroke-width="0.8" opacity="0.4"/>
  </g>
  <!-- Classical corner ornament (top-left) -->
  <path d="M0 0 L80 0 Q60 20 40 60 Q20 20 0 40 Z" fill="%23a8c8e0" opacity="0.05"/>
  <path d="M1440 0 L1360 0 Q1380 20 1400 60 Q1420 20 1440 40 Z" fill="%23a8c8e0" opacity="0.05"/>
  <!-- Wave bottom -->
  <path d="M0 290 Q360 260 720 280 Q1080 300 1440 270 L1440 320 L0 320Z" fill="%23a8c8e0" opacity="0.04"/>
</svg>`;

// 📜 TRANSLATIONS — bridge arch, multiple script calligraphy
const TRANSLATIONS_SVG = `
<svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
  <!-- Bridge arch -->
  <path d="M300 320 Q400 160 500 320" stroke="%23c9a96e" stroke-width="1.5" fill="none" opacity="0.14"/>
  <path d="M500 320 Q600 140 700 320" stroke="%23c9a96e" stroke-width="1.5" fill="none" opacity="0.14"/>
  <path d="M700 320 Q800 160 900 320" stroke="%23c9a96e" stroke-width="1.5" fill="none" opacity="0.14"/>
  <!-- Vertical bridge columns -->
  <line x1="300" y1="320" x2="300" y2="220" stroke="%23c9a96e" stroke-width="1.2" opacity="0.12"/>
  <line x1="500" y1="320" x2="500" y2="210" stroke="%23c9a96e" stroke-width="1.2" opacity="0.12"/>
  <line x1="700" y1="320" x2="700" y2="200" stroke="%23c9a96e" stroke-width="1.2" opacity="0.12"/>
  <line x1="900" y1="320" x2="900" y2="220" stroke="%23c9a96e" stroke-width="1.2" opacity="0.12"/>
  <!-- Horizontal bridge deck -->
  <line x1="250" y1="220" x2="950" y2="220" stroke="%23c9a96e" stroke-width="1" opacity="0.1"/>
  <!-- Calligraphy - Latin -->
  <text x="80" y="100" font-family="Georgia,serif" font-size="48" fill="%23c9a96e" opacity="0.07" font-style="italic">poetry</text>
  <!-- Calligraphy - Look-alike Georgian -->
  <path d="M1050 80 C1070 60, 1090 70, 1085 95 C1080 115, 1055 110, 1060 90" stroke="%23c9a96e" stroke-width="2" fill="none" opacity="0.1"/>
  <path d="M1100 75 C1125 55, 1145 75, 1135 100" stroke="%23c9a96e" stroke-width="2" fill="none" opacity="0.1"/>
  <path d="M1155 80 C1175 60, 1190 80, 1185 105 C1178 130, 1158 120, 1160 100" stroke="%23c9a96e" stroke-width="2" fill="none" opacity="0.1"/>
  <!-- Connecting dots (translation concept) -->
  <circle cx="1050" cy="155" r="4" fill="%23c9a96e" opacity="0.15"/>
  <line x1="1054" y1="155" x2="1090" y2="155" stroke="%23c9a96e" stroke-width="0.8" stroke-dasharray="4,4" opacity="0.12"/>
  <circle cx="1094" cy="155" r="4" fill="%23c9a96e" opacity="0.15"/>
  <line x1="1098" y1="155" x2="1134" y2="155" stroke="%23c9a96e" stroke-width="0.8" stroke-dasharray="4,4" opacity="0.12"/>
  <circle cx="1138" cy="155" r="4" fill="%23c9a96e" opacity="0.15"/>
  <!-- Ground -->
  <path d="M0 295 Q360 275 720 288 Q1080 302 1440 275 L1440 320 L0 320Z" fill="%23c9a96e" opacity="0.04"/>
</svg>`;

// ⭐ REVIEWS — award ribbon, ink drops, five-pointed stars
const REVIEWS_SVG = `
<svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
  <defs>
    <radialGradient id="rg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="%23f0c060" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="%23000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <!-- Scattered decorative stars -->
  <polygon points="120,60 126,78 145,78 131,90 137,108 120,97 103,108 109,90 95,78 114,78" fill="%23c9a96e" opacity="0.15"/>
  <polygon points="1320,50 1324,62 1338,62 1327,70 1331,82 1320,75 1309,82 1313,70 1302,62 1316,62" fill="%23c9a96e" opacity="0.12"/>
  <polygon points="650,200 653,210 663,210 655,217 658,227 650,221 642,227 645,217 637,210 647,210" fill="%23c9a96e" opacity="0.1"/>
  <!-- Small stars -->
  <polygon points="300,40 302,48 310,48 304,53 306,61 300,57 294,61 296,53 290,48 298,48" fill="%23c9a96e" opacity="0.1"/>
  <polygon points="900,35 902,42 910,42 904,47 906,54 900,50 894,54 896,47 890,42 898,42" fill="%23c9a96e" opacity="0.1"/>
  <!-- Award medal / ribbon -->
  <g transform="translate(720, 60)">
    <circle cx="0" cy="0" r="40" fill="none" stroke="%23c9a96e" stroke-width="2" opacity="0.1"/>
    <circle cx="0" cy="0" r="32" fill="none" stroke="%23c9a96e" stroke-width="1" opacity="0.08"/>
    <path d="M-15 38 L-5 90 L0 80 L5 90 L15 38" fill="%23c9a96e" opacity="0.08"/>
    <path d="M15 38 L25 90 L0 80 L-25 90 L-15 38" fill="%23c9a96e" opacity="0.06"/>
  </g>
  <!-- Ink drops (quill marks) -->
  <ellipse cx="400" cy="220" rx="3" ry="6" fill="%23c9a96e" opacity="0.12" transform="rotate(-15, 400, 220)"/>
  <ellipse cx="415" cy="230" rx="2" ry="4" fill="%23c9a96e" opacity="0.09"/>
  <ellipse cx="1050" cy="200" rx="3" ry="6" fill="%23c9a96e" opacity="0.12" transform="rotate(20, 1050, 200)"/>
  <!-- Vintage double-line border -->
  <rect x="30" y="15" width="1380" height="290" rx="4" fill="none" stroke="%23c9a96e" stroke-width="1" opacity="0.06"/>
  <rect x="40" y="25" width="1360" height="270" rx="3" fill="none" stroke="%23c9a96e" stroke-width="0.5" opacity="0.04"/>
  <!-- Corner ornaments -->
  <path d="M50 50 L80 50 L80 80" stroke="%23c9a96e" stroke-width="1" fill="none" opacity="0.1"/>
  <path d="M1390 50 L1360 50 L1360 80" stroke="%23c9a96e" stroke-width="1" fill="none" opacity="0.1"/>
  <path d="M50 270 L80 270 L80 240" stroke="%23c9a96e" stroke-width="1" fill="none" opacity="0.1"/>
  <path d="M1390 270 L1360 270 L1360 240" stroke="%23c9a96e" stroke-width="1" fill="none" opacity="0.1"/>
  <!-- Ground wave -->
  <path d="M0 285 Q360 265 720 278 Q1080 295 1440 268 L1440 320 L0 320Z" fill="%23c9a96e" opacity="0.04"/>
</svg>`;

// 📖 PROSE — typewriter, flowing narrative waves, ancient tree silhouette
const PROSE_SVG = `
<svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
  <!-- Typewriter keys (bottom-left) -->
  <g transform="translate(60, 200)" opacity="0.09" fill="%23c9a96e">
    <rect x="0"  y="0" width="22" height="16" rx="3"/>
    <rect x="26" y="0" width="22" height="16" rx="3"/>
    <rect x="52" y="0" width="22" height="16" rx="3"/>
    <rect x="78" y="0" width="22" height="16" rx="3"/>
    <rect x="13" y="20" width="22" height="16" rx="3"/>
    <rect x="39" y="20" width="22" height="16" rx="3"/>
    <rect x="65" y="20" width="22" height="16" rx="3"/>
    <!-- Spacebar -->
    <rect x="10" y="40" width="80" height="12" rx="3"/>
    <!-- Paper roll -->
    <rect x="-5" y="-25" width="112" height="18" rx="2"/>
    <line x1="10" y1="-20" x2="10" y2="-10" stroke="%23000" stroke-width="0.5" opacity="0.5"/>
    <line x1="20" y1="-22" x2="20" y2="-10" stroke="%23000" stroke-width="0.5" opacity="0.5"/>
    <line x1="30" y1="-24" x2="30" y2="-10" stroke="%23000" stroke-width="0.5" opacity="0.5"/>
  </g>
  <!-- Ancient tree silhouette (right side) -->
  <g transform="translate(1200, 0)" opacity="0.07" fill="%23c9a96e">
    <!-- Trunk -->
    <rect x="35" y="200" width="20" height="120" rx="5"/>
    <!-- Branches -->
    <path d="M45 160 C20 140, 0 100, 20 60 C30 90, 25 130, 45 150"/>
    <path d="M45 160 C70 140, 90 100, 70 60 C60 90, 65 130, 45 150"/>
    <path d="M45 190 C10 180, -20 150, 0 110 C15 140, 25 165, 45 180"/>
    <path d="M45 190 C80 180, 110 150, 90 110 C75 140, 65 165, 45 180"/>
    <!-- Leaves hint -->
    <circle cx="20" cy="55" r="30"/>
    <circle cx="70" cy="50" r="28"/>
    <circle cx="45" cy="35" r="32"/>
  </g>
  <!-- Flowing narrative waves (text lines concept) -->
  <path d="M200 100 Q360 80 520 100 Q680 120 840 100 Q1000 80 1160 100" stroke="%23c9a96e" stroke-width="0.8" fill="none" opacity="0.1"/>
  <path d="M200 115 Q380 95 560 115 Q740 135 920 115 Q1100 95 1160 115" stroke="%23c9a96e" stroke-width="0.7" fill="none" opacity="0.08"/>
  <path d="M200 130 Q400 110 600 130 Q800 150 1000 130" stroke="%23c9a96e" stroke-width="0.6" fill="none" opacity="0.06"/>
  <path d="M200 145 Q420 125 640 145 Q860 165 1000 145" stroke="%23c9a96e" stroke-width="0.5" fill="none" opacity="0.05"/>
  <path d="M200 160 Q440 140 680 160 Q920 180 1000 160" stroke="%23c9a96e" stroke-width="0.5" fill="none" opacity="0.04"/>
  <!-- Ink blot detail -->
  <ellipse cx="420" cy="240" rx="6" ry="4" fill="%23c9a96e" opacity="0.08" transform="rotate(-10, 420, 240)"/>
  <ellipse cx="428" cy="247" rx="3" ry="2" fill="%23c9a96e" opacity="0.06"/>
  <!-- Ground wave -->
  <path d="M0 288 Q360 268 720 282 Q1080 298 1440 272 L1440 320 L0 320Z" fill="%23c9a96e" opacity="0.04"/>
</svg>`;

// ─── Config per page variant ──────────────────────────────────────────────────

const VARIANTS = {
  poetry: {
    svg: POETRY_SVG,
    bg: 'linear-gradient(135deg, #0a0812 0%, #100d1a 40%, #0d0a15 100%)',
    accentColor: '#c9a96e',
    glowColor: 'rgba(201, 169, 110, 0.15)',
    glowPos: '20% 60%',
    label: 'page-hero--poetry',
  },
  poemsEn: {
    svg: POEMS_EN_SVG,
    bg: 'linear-gradient(135deg, #08101a 0%, #0d1828 40%, #080f18 100%)',
    accentColor: '#a8c8e0',
    glowColor: 'rgba(168, 200, 224, 0.12)',
    glowPos: '80% 20%',
    label: 'page-hero--poems-en',
  },
  translations: {
    svg: TRANSLATIONS_SVG,
    bg: 'linear-gradient(135deg, #08120e 0%, #0d1c14 40%, #081410 100%)',
    accentColor: '#c9a96e',
    glowColor: 'rgba(100, 180, 130, 0.1)',
    glowPos: '50% 80%',
    label: 'page-hero--translations',
  },
  reviews: {
    svg: REVIEWS_SVG,
    bg: 'linear-gradient(135deg, #120e06 0%, #1a1408 40%, #120e06 100%)',
    accentColor: '#f0c060',
    glowColor: 'rgba(240, 192, 96, 0.13)',
    glowPos: '50% 30%',
    label: 'page-hero--reviews',
  },
  prose: {
    svg: PROSE_SVG,
    bg: 'linear-gradient(135deg, #0f0808 0%, #180f0f 40%, #100909 100%)',
    accentColor: '#c9a96e',
    glowColor: 'rgba(180, 100, 80, 0.1)',
    glowPos: '30% 70%',
    label: 'page-hero--prose',
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

const PageHero = ({ variant = 'poetry', icon: Icon, title, subtitle }) => {
  const v = VARIANTS[variant] || VARIANTS.poetry;

  const svgDataUri = `data:image/svg+xml,${v.svg.trim().replace(/\n\s*/g, ' ')}`;

  return (
    <div
      className={`page-hero ${v.label}`}
      style={{
        background: v.bg,
        position: 'relative',
        overflow: 'hidden',
        minHeight: '220px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        padding: '3.5rem 2rem 3rem',
        marginBottom: '3rem',
        borderBottom: `1px solid ${v.accentColor}22`,
      }}
    >
      {/* Glow orb */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at ${v.glowPos}, ${v.glowColor} 0%, transparent 65%)`,
          pointerEvents: 'none',
        }}
      />

      {/* SVG illustration layer */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("${svgDataUri}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          pointerEvents: 'none',
        }}
      />

      {/* Noise texture */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
          backgroundSize: '200px 200px',
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      />

      {/* Gold top line */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '2px',
          background: `linear-gradient(90deg, transparent, ${v.accentColor}, transparent)`,
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {Icon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ marginBottom: '1rem' }}
          >
            <Icon size={44} style={{ color: v.accentColor, opacity: 0.85 }} />
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15 }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            background: `linear-gradient(135deg, ${v.accentColor} 0%, #fff 60%, ${v.accentColor} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0,
            letterSpacing: '0.04em',
          }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              color: 'var(--text-muted)',
              fontSize: 'var(--text-sm)',
              marginTop: '0.75rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            {subtitle}
          </motion.p>
        )}

        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            width: '80px',
            height: '1.5px',
            background: `linear-gradient(90deg, transparent, ${v.accentColor}, transparent)`,
            margin: '1.25rem auto 0',
          }}
        />
      </div>
    </div>
  );
};

export default PageHero;
