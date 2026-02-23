interface CatalystLogoProps {
  size?: number;
}

export function CatalystLogo({ size = 24 }: CatalystLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="12"
        y="2"
        width="14.14"
        height="14.14"
        rx="3"
        transform="rotate(45 12 2)"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
