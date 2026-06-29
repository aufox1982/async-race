interface CarIconProps {
  color: string;
  /** Optional CSS class for sizing the SVG from outside. */
  className?: string;
}

/**
 * Top-down Formula 1 car sprite.
 * Car faces RIGHT (direction of motion on the race track).
 * Color prop sets the livery; tyres and cockpit are always dark.
 */
function CarIcon({ color, className }: CarIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 140 56"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* ── Rear wing (back = left) ──────────────────────────── */}
      <rect x="2" y="4" width="6" height="48" rx="2" fill={color} />
      {/* wing struts */}
      <rect x="6" y="14" width="11" height="3" rx="1" fill={color} opacity="0.85" />
      <rect x="6" y="39" width="11" height="3" rx="1" fill={color} opacity="0.85" />

      {/* ── Rear tyres ──────────────────────────────────────── */}
      <rect x="8" y="4"  width="19" height="14" rx="4" fill="#0f0f0f" />
      <rect x="8" y="38" width="19" height="14" rx="4" fill="#0f0f0f" />
      {/* tyre grooves */}
      <line x1="12" y1="4"  x2="12" y2="18" stroke="#2a2a2a" strokeWidth="1.5" />
      <line x1="16" y1="4"  x2="16" y2="18" stroke="#2a2a2a" strokeWidth="1.5" />
      <line x1="20" y1="4"  x2="20" y2="18" stroke="#2a2a2a" strokeWidth="1.5" />
      <line x1="12" y1="38" x2="12" y2="52" stroke="#2a2a2a" strokeWidth="1.5" />
      <line x1="16" y1="38" x2="16" y2="52" stroke="#2a2a2a" strokeWidth="1.5" />
      <line x1="20" y1="38" x2="20" y2="52" stroke="#2a2a2a" strokeWidth="1.5" />

      {/* ── Main body ───────────────────────────────────────── */}
      <path
        d="M24,19 Q44,16 72,15 L100,17 L115,25 L115,31 L100,39 Q72,41 44,40 L24,37 Z"
        fill={color}
      />

      {/* ── Sidepods ────────────────────────────────────────── */}
      <path d="M28,19 L70,17 L70,10 L28,10 Z" fill={color} opacity="0.82" />
      <path d="M28,37 L70,39 L70,46 L28,46 Z" fill={color} opacity="0.82" />

      {/* ── Cockpit ─────────────────────────────────────────── */}
      <ellipse cx="65" cy="28" rx="15" ry="9"   fill="#090909" />
      <ellipse cx="64" cy="28" rx="10" ry="5.5" fill="#141414" />
      {/* visor tint */}
      <path
        d="M56,25 Q64,21 72,25 L69,28 Q64,25.5 59,28 Z"
        fill="rgba(100,190,255,0.18)"
      />

      {/* ── Halo safety arch ────────────────────────────────── */}
      <path
        d="M57,27 Q65,22 73,27"
        fill="none"
        stroke="#666"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* ── Nose (narrows to a point on the right) ──────────── */}
      <path d="M100,23 L132,27.5 L132,28.5 L100,33 Z" fill={color} />

      {/* ── Front wing ──────────────────────────────────────── */}
      <rect x="129" y="11" width="7" height="34" rx="2" fill={color} opacity="0.9" />
      <rect x="121" y="11" width="15" height="3"  rx="1" fill={color} />
      <rect x="121" y="42" width="15" height="3"  rx="1" fill={color} />
      <path d="M112,20 L129,18 L129,23 L112,24 Z" fill={color} opacity="0.7" />
      <path d="M112,32 L129,33 L129,38 L112,36 Z" fill={color} opacity="0.7" />

      {/* ── Front tyres ─────────────────────────────────────── */}
      <rect x="112" y="5"  width="16" height="13" rx="4" fill="#0f0f0f" />
      <rect x="112" y="38" width="16" height="13" rx="4" fill="#0f0f0f" />
      {/* tyre grooves */}
      <line x1="116" y1="5"  x2="116" y2="18" stroke="#2a2a2a" strokeWidth="1.5" />
      <line x1="120" y1="5"  x2="120" y2="18" stroke="#2a2a2a" strokeWidth="1.5" />
      <line x1="116" y1="38" x2="116" y2="51" stroke="#2a2a2a" strokeWidth="1.5" />
      <line x1="120" y1="38" x2="120" y2="51" stroke="#2a2a2a" strokeWidth="1.5" />
    </svg>
  );
}

export default CarIcon;
