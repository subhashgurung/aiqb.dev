import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Reading {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  decimals: number;
}

const initialReadings: Reading[] = [
  { label: "SOIL", value: 42, unit: "%", min: 38, max: 47, decimals: 0 },
  { label: "TEMP", value: 21.4, unit: "°C", min: 19.5, max: 23.5, decimals: 1 },
  { label: "HUM", value: 68, unit: "%", min: 62, max: 74, decimals: 0 },
  { label: "LUX", value: 1240, unit: "", min: 1100, max: 1400, decimals: 0 },
];

function drift(r: Reading): Reading {
  const range = r.max - r.min;
  const step = (Math.random() - 0.5) * range * 0.15;
  const next = Math.min(r.max, Math.max(r.min, r.value + step));
  return { ...r, value: next };
}

export function SensorTicker({ className }: { className?: string }) {
  const [readings, setReadings] = useState(initialReadings);

  useEffect(() => {
    const id = setInterval(() => {
      setReadings((prev) => prev.map(drift));
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className={cn(
        "flex items-center gap-4 sm:gap-6 text-mono text-[11px] tracking-[0.14em] text-white/50",
        className
      )}
      aria-label="Live farm sensor readings"
    >
      <span className="sensor-dot shrink-0" />
      {readings.map((r) => (
        <span key={r.label} className="whitespace-nowrap tabular-nums">
          <span className="text-white/35">{r.label} </span>
          <span className="text-accent">
            {r.value.toFixed(r.decimals)}
            {r.unit}
          </span>
        </span>
      ))}
      <span className="hidden sm:inline text-white/25">PHARPING · LIVE</span>
    </div>
  );
}
