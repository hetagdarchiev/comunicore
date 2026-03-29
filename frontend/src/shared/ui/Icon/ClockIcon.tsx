export function ClockIcon({
  width = 12,
  height = 12,
  fill = 'none',
  color = 'white',
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 12 12'
      fill={fill}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M6 3V6L8 7'
        stroke={color}
        strokeLinecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
}
