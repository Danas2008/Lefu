export default function ChinesePattern({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="chinese-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            {/* Outer square */}
            <rect x="5" y="5" width="50" height="50" fill="none" stroke="rgba(212,175,55,0.06)" strokeWidth="0.5"/>
            {/* Inner square rotated */}
            <rect x="15" y="15" width="30" height="30" fill="none" stroke="rgba(212,175,55,0.04)" strokeWidth="0.5" transform="rotate(45 30 30)"/>
            {/* Center dot */}
            <circle cx="30" cy="30" r="1.5" fill="rgba(212,175,55,0.05)"/>
            {/* Corner dots */}
            <circle cx="5" cy="5" r="1" fill="rgba(212,175,55,0.04)"/>
            <circle cx="55" cy="5" r="1" fill="rgba(212,175,55,0.04)"/>
            <circle cx="5" cy="55" r="1" fill="rgba(212,175,55,0.04)"/>
            <circle cx="55" cy="55" r="1" fill="rgba(212,175,55,0.04)"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#chinese-pattern)"/>
      </svg>
    </div>
  );
}
