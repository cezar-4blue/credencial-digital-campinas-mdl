export function LogoWorkshop({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 160" fill="none" className={className}>
      <defs>
        <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFDF73" />
          <stop offset="40%" stopColor="#D4AF37" />
          <stop offset="60%" stopColor="#AA7C11" />
          <stop offset="100%" stopColor="#8A6308" />
        </linearGradient>
        <linearGradient id="gold-line" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="20%" stopColor="#D4AF37" />
          <stop offset="80%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <text x="50%" y="30" fontFamily="'Arial Black', sans-serif" fontSize="16" fontWeight="bold"
        fill="none" stroke="#fff" strokeWidth="0.5" letterSpacing="1.2em" textAnchor="middle" transform="translate(10, 0)">
        WORKSHOP
      </text>
      <rect x="50" y="45" width="400" height="2" fill="url(#gold-line)" />
      <g transform="translate(250, 95)" textAnchor="middle">
        <text x="0" y="0" fontFamily="'Arial Black', sans-serif" fontSize="52" fontWeight="900" fill="url(#gold-gradient)" letterSpacing="0.05em">
          MÁQUINA
        </text>
        <g transform="translate(0, 50)">
          <text x="-120" y="0" fontFamily="'Arial Black', sans-serif" fontSize="24" fontWeight="900" fill="#fff" letterSpacing="0.1em" opacity="0.9">
            DE
          </text>
          <text x="25" y="0" fontFamily="'Arial Black', sans-serif" fontSize="52" fontWeight="900" fill="url(#gold-gradient)" letterSpacing="0.05em">
            LUCROS
          </text>
        </g>
      </g>
    </svg>
  );
}
