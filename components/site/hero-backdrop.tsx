/**
 * Cinematic hero backdrop — purely decorative, no client JS.
 *
 * Layers, back to front: a slow sweeping projector beam, a vector field of
 * thin film-geometry lines, two scrolling 35mm perforation strips, and a
 * drift of tiny movie glyphs. Everything is CSS-animated (see `globals.css`)
 * and all positions are hard-coded so server and client render identically.
 */

import Image from "next/image";

type Glyph = {
  /** left / top as percentages of the hero box */
  x: number;
  y: number;
  size: number;
  /** seconds — long, desynchronised loops keep the motion from pulsing */
  dur: number;
  delay: number;
  d: string;
};

/** Single-path movie marks: aperture, reel, clapper, ticket, frame, star, play. */
const APERTURE = "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 0 4.5 7.8M21 12h-9m4.5 1.2L12 21m0-9-4.5 7.8M3 12h9M7.5 10.8 12 3";
const REEL = "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 4.2a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4Zm5.6 4.4a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4Zm-11.2 0a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4ZM12 15a2.2 2.2 0 1 0 0 4.4A2.2 2.2 0 0 0 12 15Z";
const CLAPPER = "M3 9h18v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Zm0 0 1-4.3 17.2 2.2L20.6 11M8.4 4.3 7.2 9.6m5.5-4.6-1.2 5.3";
const TICKET = "M3 8.5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1.2a2.3 2.3 0 0 0 0 4.6v1.2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1.2a2.3 2.3 0 0 0 0-4.6V8.5Zm7 .3v6.4";
const FRAME = "M4 5h16v14H4Zm3.4 0v14m9.2-14v14M4 12h3.4m9.2 0H20";
const STAR = "M12 3.5l2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.9l6-.8Z";
const PLAY = "M5 4.5 19 12 5 19.5Z";
const SPOOL = "M5 4h14M5 20h14M8 4v16m8-16v16M12 7.5v9";

const glyphs: Glyph[] = [
  { x: 6, y: 18, size: 26, dur: 26, delay: 0, d: APERTURE },
  { x: 17, y: 72, size: 18, dur: 34, delay: -6, d: REEL },
  { x: 31, y: 8, size: 16, dur: 30, delay: -13, d: STAR },
  { x: 44, y: 84, size: 22, dur: 38, delay: -3, d: CLAPPER },
  { x: 57, y: 24, size: 14, dur: 28, delay: -18, d: PLAY },
  { x: 66, y: 62, size: 24, dur: 32, delay: -9, d: TICKET },
  { x: 78, y: 14, size: 20, dur: 36, delay: -22, d: FRAME },
  { x: 88, y: 48, size: 17, dur: 29, delay: -15, d: SPOOL },
  { x: 95, y: 80, size: 21, dur: 40, delay: -27, d: REEL },
  { x: 24, y: 40, size: 13, dur: 31, delay: -11, d: STAR },
  { x: 71, y: 92, size: 15, dur: 27, delay: -20, d: APERTURE },
  { x: 38, y: 56, size: 12, dur: 35, delay: -24, d: PLAY },
];

export function HeroBackdrop() {
  return (
    <div aria-hidden className="hero-backdrop pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Logo watermark — first child so every vector layer paints over it */}
      <div className="hero-logo absolute left-1/2 top-1/2 aspect-square w-[min(60vw,320px)] -translate-x-1/2 -translate-y-1/2">
        <Image src="/logo.webp" alt="" fill sizes="320px" priority className="object-contain" />
      </div>

      {/* Projector beams sweeping across the frame */}
      <div className="hero-beam hero-beam-a" />
      <div className="hero-beam hero-beam-b" />

      {/* Thin vector line field */}
      <svg className="absolute inset-0 size-full" viewBox="0 0 1200 700" fill="none" preserveAspectRatio="xMidYMid slice">
        <g className="hero-lines" stroke="currentColor" strokeWidth="1.15" vectorEffect="non-scaling-stroke">
          <path className="hero-draw" style={{ animationDelay: "0s" }} d="M-40 520C160 470 300 560 470 500S760 340 980 400s200 40 300 10" />
          <path className="hero-draw" style={{ animationDelay: "-4s" }} d="M-40 600C200 560 340 640 540 570S820 420 1060 470" />
          <path className="hero-draw" style={{ animationDelay: "-8s" }} d="M-40 440C180 400 260 330 440 300s340 90 520 30" />
          <path className="hero-draw" style={{ animationDelay: "-12s" }} d="M120 -40C180 140 120 260 240 380s240 160 300 340" />
          <path className="hero-draw" style={{ animationDelay: "-16s" }} d="M980 -40c-60 200 20 300 80 420s40 200 20 320" />
        </g>

        {/* Focus reticle / lens rings */}
        <g className="hero-rings" stroke="currentColor" fill="none" vectorEffect="non-scaling-stroke">
          <circle className="hero-spin" cx="1010" cy="170" r="120" strokeWidth="1.2" strokeDasharray="3 14" />
          <circle className="hero-spin-rev" cx="1010" cy="170" r="86" strokeWidth="1.2" strokeDasharray="22 10" />
          <circle cx="1010" cy="170" r="52" strokeWidth="1.2" opacity="0.7" />
          <circle className="hero-spin" cx="150" cy="590" r="70" strokeWidth="1.2" strokeDasharray="2 12" />
        </g>
      </svg>

      {/* 35mm perforation strips, scrolling like film through a gate */}
      <div className="hero-strip hero-strip-left">
        <div className="hero-strip-track">
          {Array.from({ length: 24 }, (_, i) => (
            <span key={i} className="hero-perf" />
          ))}
        </div>
      </div>
      <div className="hero-strip hero-strip-right">
        <div className="hero-strip-track hero-strip-track-rev">
          {Array.from({ length: 24 }, (_, i) => (
            <span key={i} className="hero-perf" />
          ))}
        </div>
      </div>

      {/* Drifting movie glyphs */}
      {glyphs.map((g, i) => (
        <svg
          key={i}
          className="hero-glyph"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            left: `${g.x}%`,
            top: `${g.y}%`,
            width: g.size,
            height: g.size,
            animationDuration: `${g.dur}s`,
            animationDelay: `${g.delay}s`,
          }}
        >
          <path d={g.d} />
        </svg>
      ))}

      {/* Soft vignette so the type always wins */}
      <div className="hero-vignette" />
    </div>
  );
}
