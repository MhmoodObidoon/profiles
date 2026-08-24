const CloudNetworkBg = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden>
      <svg className="w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="net-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(197 100% 47%)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(32 100% 50%)" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Network Nodes */}
        <g stroke="url(#net-line-grad)" strokeWidth="1.5" strokeDasharray="4 4">
          <line x1="10%" y1="20%" x2="30%" y2="45%" className="animate-pulse" />
          <line x1="30%" y1="45%" x2="55%" y2="25%" />
          <line x1="55%" y1="25%" x2="85%" y2="40%" className="animate-pulse" />
          <line x1="30%" y1="45%" x2="70%" y2="80%" />
          <line x1="70%" y1="80%" x2="90%" y2="65%" />
        </g>

        {/* Node Pulsing Dots */}
        <circle cx="10%" cy="20%" r="4" fill="hsl(197 100% 47%)" className="animate-ping opacity-60" />
        <circle cx="30%" cy="45%" r="5" fill="hsl(197 100% 47%)" />
        <circle cx="55%" cy="25%" r="4" fill="hsl(32 100% 50%)" className="animate-ping opacity-60" />
        <circle cx="85%" cy="40%" r="6" fill="hsl(197 100% 47%)" />
        <circle cx="70%" cy="80%" r="4" fill="hsl(32 100% 50%)" />
        <circle cx="90%" cy="65%" r="5" fill="hsl(197 100% 47%)" className="animate-ping opacity-40" />
      </svg>
    </div>
  );
};

export default CloudNetworkBg;
