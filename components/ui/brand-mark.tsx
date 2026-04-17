type BrandMarkProps = {
  className?: string;
};

export function BrandMark({ className }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 160 160"
      aria-hidden="true"
      className={className}
      fill="none"
    >
      <defs>
        <linearGradient id="brand-gradient" x1="20" y1="16" x2="138" y2="142" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#A9D2FF" />
          <stop offset="0.5" stopColor="#FFD1DC" />
          <stop offset="1" stopColor="#AEEFEA" />
        </linearGradient>
      </defs>
      <g transform="translate(80 80) rotate(-12) translate(-80 -80)">
        <path
          d="M80 16L136 80L80 144L24 80L80 16Z"
          stroke="url(#brand-gradient)"
          strokeWidth="8"
          opacity="0.95"
        />
        <path
          d="M80 30L122 80L80 130L38 80L80 30Z"
          stroke="url(#brand-gradient)"
          strokeWidth="6"
          opacity="0.82"
        />
        <path
          d="M80 52L104 80L80 108L56 80L80 52Z"
          stroke="url(#brand-gradient)"
          strokeWidth="6"
          opacity="0.95"
        />
        <path
          d="M80 65L92 80L80 95L68 80L80 65Z"
          fill="url(#brand-gradient)"
          opacity="0.88"
        />
        <path
          d="M52 34C62 46 66 58 68 80C66 102 62 114 52 126"
          stroke="url(#brand-gradient)"
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.75"
        />
        <path
          d="M108 34C98 46 94 58 92 80C94 102 98 114 108 126"
          stroke="url(#brand-gradient)"
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.75"
        />
        <path
          d="M38 52C56 58 68 62 80 64C92 62 104 58 122 52"
          stroke="url(#brand-gradient)"
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.72"
        />
        <path
          d="M38 108C56 102 68 98 80 96C92 98 104 102 122 108"
          stroke="url(#brand-gradient)"
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.72"
        />
      </g>
    </svg>
  );
}
