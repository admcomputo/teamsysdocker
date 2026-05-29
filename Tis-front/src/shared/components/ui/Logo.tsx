interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo = ({ className = '', size = 40 }: LogoProps) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <div className="absolute inset-0 bg-brand-azul-brillante/20 blur-xl rounded-full animate- soft-pulse" />
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 40 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        <path 
          d="M20 2L36 11V29L20 38L4 29V11L20 2Z" 
          fill="url(#logo-gradient)" 
          fillOpacity="0.8"
          stroke="url(#stroke-gradient)" 
          strokeWidth="1.5"
        />
        <path 
          d="M15 15L11 20L15 25" 
          stroke="white" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M25 15L29 20L25 25" 
          stroke="white" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M22 13L18 27" 
          stroke="white" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="logo-gradient" x1="4" y1="2" x2="36" y2="38" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2F80ED" stopOpacity="0.4"/>
            <stop offset="1" stopColor="#1C6ED5" stopOpacity="0.1"/>
          </linearGradient>
          <linearGradient id="stroke-gradient" x1="4" y1="2" x2="36" y2="38" gradientUnits="userSpaceOnUse">
            <stop stopColor="#5DAEFF"/>
            <stop offset="1" stopColor="#2F80ED" stopOpacity="0.2"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
