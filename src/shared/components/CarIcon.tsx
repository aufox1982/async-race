interface CarIconProps {
  color: string;
  /** Optional CSS class for sizing the SVG from outside. */
  className?: string;
}

/**
 * SVG car silhouette colored by the `color` prop.
 * Used in both the race track and the Winners table.
 */
function CarIcon({ color, className }: CarIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 50"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Main body */}
      <rect x="5" y="22" width="90" height="20" rx="5" fill={color} />
      {/* Roof / cabin */}
      <rect x="22" y="10" width="52" height="16" rx="5" fill={color} />
      {/* Windows */}
      <rect x="25" y="12" width="20" height="12" rx="2" fill="rgba(0,0,0,0.35)" />
      <rect x="49" y="12" width="20" height="12" rx="2" fill="rgba(0,0,0,0.35)" />
      {/* Wheels */}
      <circle cx="22" cy="42" r="8" fill="#1a1a1a" />
      <circle cx="78" cy="42" r="8" fill="#1a1a1a" />
      <circle cx="22" cy="42" r="3.5" fill="#555" />
      <circle cx="78" cy="42" r="3.5" fill="#555" />
      {/* Headlight */}
      <rect x="93" y="26" width="4" height="6" rx="1" fill="#f1c40f" />
    </svg>
  );
}

export default CarIcon;
