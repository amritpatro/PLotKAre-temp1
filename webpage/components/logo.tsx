import React from 'react'

export function LogoMark() {
  return (
    <div className="flex items-center gap-3">
      {/* Geometric P Mark */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Vertical rectangle */}
        <rect x="7" y="2" width="4" height="28" fill="#8B1538" />
        {/* Quarter-circle arc (top right) */}
        <path
          d="M 11 2 Q 20 2 20 11 L 16 11 Q 16 6 11 6 Z"
          fill="#8B1538"
        />
      </svg>

      {/* Text Branding */}
      <div className="flex flex-col">
        <span className="font-sans text-base font-medium tracking-wide text-foreground">
          PLOTKARE
        </span>
        <span className="font-mono text-xs tracking-widest text-muted-foreground">
          PLOT MANAGEMENT SERVICES
        </span>
      </div>
    </div>
  )
}

export function LogoMarkSmall() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Vertical rectangle */}
      <rect x="7" y="2" width="4" height="28" fill="#8B1538" />
      {/* Quarter-circle arc (top right) */}
      <path
        d="M 11 2 Q 20 2 20 11 L 16 11 Q 16 6 11 6 Z"
        fill="#8B1538"
      />
    </svg>
  )
}
