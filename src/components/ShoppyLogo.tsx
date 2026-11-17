import React from 'react';

interface ShoppyLogoProps {
  className?: string;
  size?: number;
  inverted?: boolean;
}

export function ShoppyLogo({ className = 'w-6 h-6', size, inverted = false }: ShoppyLogoProps) {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-label="Shoppy Logo"
    >
      <rect width="100" height="100" rx="22" fill={inverted ? '#FFFFFF' : '#000000'} />
      {/* Top Hook Segment */}
      <path
        d="M24 22H76V38H46L34 50H24V22Z"
        fill={inverted ? '#000000' : '#FFFFFF'}
      />
      {/* Bottom Hook Segment */}
      <path
        d="M76 50H66L54 62H24V78H76V50Z"
        fill={inverted ? '#000000' : '#FFFFFF'}
      />
      {/* Central Geometric Precision Square */}
      <rect
        x="47"
        y="47"
        width="6"
        height="6"
        rx="1"
        fill={inverted ? '#000000' : '#FFFFFF'}
      />
    </svg>
  );
}
