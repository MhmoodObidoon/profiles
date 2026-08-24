interface DevOpsLogoProps {
  className?: string;
}

const DevOpsLogo = ({ className = "w-10 h-10" }: DevOpsLogoProps) => {
  return (
    <svg
      viewBox="0 0 240 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} shrink-0 transition-transform duration-300 hover:scale-105`}
      aria-label="DevOps Logo"
    >
      <defs>
        {/* Glow Filters */}
        <filter id="cyan-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#00B0F0" floodOpacity="0.7" />
        </filter>
        <filter id="orange-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#F07D00" floodOpacity="0.7" />
        </filter>

        {/* Animated Gradient Beam */}
        <linearGradient id="laser-beam" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00B0F0" />
          <stop offset="50%" stopColor="#00E5FF" />
          <stop offset="100%" stopColor="#F07D00" />
        </linearGradient>
      </defs>

      {/* ----------------- LEFT CYAN INFINITY LOOP ----------------- */}
      <path
        d="M 115 65 C 92 38 78 20 52 20 C 26 20 10 38 10 65 C 10 92 26 110 52 110 C 78 110 92 92 115 65"
        stroke="#00B0F0"
        strokeWidth="11"
        strokeLinecap="round"
        filter="url(#cyan-glow)"
      />

      {/* Animated Flow Overlay Effect */}
      <path
        d="M 115 65 C 92 38 78 20 52 20 C 26 20 10 38 10 65 C 10 92 26 110 52 110 C 78 110 92 92 115 65"
        stroke="#ffffff"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="20 120"
        className="animate-[dash_3s_linear_infinite]"
        opacity="0.9"
      />

      {/* Cyan Arrow Head */}
      <path
        d="M 110 50 L 126 65 L 102 68 Z"
        fill="#00B0F0"
      />

      {/* CLI / Terminal Prompt inside Cyan Loop */}
      <path
        d="M 32 53 L 44 65 L 32 77"
        stroke="#00B0F0"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="50"
        y1="77"
        x2="64"
        y2="77"
        stroke="#00B0F0"
        strokeWidth="6"
        strokeLinecap="round"
        className="animate-pulse"
      />

      {/* ----------------- RIGHT ORANGE INFINITY LOOP ----------------- */}
      <path
        d="M 115 65 C 138 92 152 110 178 110 C 204 110 220 92 220 65 C 220 38 204 20 178 20 C 152 20 138 38 115 65"
        stroke="#F07D00"
        strokeWidth="11"
        strokeLinecap="round"
        filter="url(#orange-glow)"
      />

      {/* Orange Arrow Head */}
      <path
        d="M 124 80 L 108 65 L 132 62 Z"
        fill="#F07D00"
      />

      {/* ----------------- ORANGE NODE BRANCHES & PINS ----------------- */}
      {/* Branch 1 */}
      <line x1="150" y1="28" x2="150" y2="8" stroke="#F07D00" strokeWidth="8" strokeLinecap="round" />
      <circle cx="150" cy="8" r="8" fill="#F07D00" className="animate-pulse" />

      {/* Branch 2 */}
      <line x1="185" y1="28" x2="218" y2="12" stroke="#F07D00" strokeWidth="8" strokeLinecap="round" />
      <circle cx="218" cy="12" r="8" fill="#F07D00" className="animate-pulse" />

      {/* Branch 3 */}
      <line x1="185" y1="102" x2="218" y2="118" stroke="#F07D00" strokeWidth="8" strokeLinecap="round" />
      <circle cx="218" cy="118" r="8" fill="#F07D00" className="animate-pulse" />
    </svg>
  );
};

export default DevOpsLogo;
