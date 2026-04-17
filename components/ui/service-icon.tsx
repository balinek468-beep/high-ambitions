type ServiceIconProps = {
  index: number;
};

export function ServiceIcon({ index }: ServiceIconProps) {
  const shapes = [
    "M12 3l7 7-7 11-7-11 7-7z",
    "M5 7h14v10H5z",
    "M12 4l8 4v8l-8 4-8-4V8z",
    "M4 12l8-8 8 8-8 8-8-8z",
    "M6 6h12v12H6z",
  ];

  return (
    <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.03)]">
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-[var(--accent)] stroke-[1.25]">
        <path d={shapes[index % shapes.length]} vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="absolute inset-1 rounded-[14px] border border-[rgba(214,255,82,0.08)]" />
    </div>
  );
}
