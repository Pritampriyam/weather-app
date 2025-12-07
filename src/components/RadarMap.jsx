import React, { useState } from "react";

export default function RadarMap() {
  const [timeIndex, setTimeIndex] = useState(2);

  return (
    <section className="glass-card p-4 lg:p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-semibold tracking-wide text-slate-100">
          Radar Playback
        </div>
        <div className="text-xs text-slate-400">
          Simulated radar (UI only)
        </div>
      </div>

      <div className="relative h-52 overflow-hidden rounded-2xl bg-slate-950/80 border border-slate-800">
        {/* Animated "cloud cells" */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-24 w-24 rounded-full bg-sky-400/20 blur-2xl animate-slow-spin"
            style={{
              top: `${10 + i * 10}%`,
              left: `${i * 15}%`,
              animationDuration: `${30 + i * 10}s`,
            }}
          />
        ))}

        {/* Storm core pulse */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-20 w-20 rounded-full bg-sky-500/50 blur-xl animate-pulse-soft" />
          <div className="absolute h-10 w-10 rounded-full border border-sky-200/70 animate-ping" />
        </div>

        {/* Lightning flicker */}
        <div className="pointer-events-none absolute inset-0 mix-blend-screen">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent animate-pulse-soft" />
        </div>

        {/* HUD overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-slate-950/70 px-4 py-2 text-[11px] flex items-center justify-between">
          <span className="uppercase tracking-[0.18em] text-slate-400">
            RAIN • CLOUD • STORM
          </span>
          <span className="text-slate-300">Playback T+{timeIndex * 10} min</span>
        </div>
      </div>

      {/* Time slider */}
      <div className="mt-3 flex items-center gap-3 text-xs text-slate-300">
        <span>Past</span>
        <input
          type="range"
          min="0"
          max="5"
          value={timeIndex}
          onChange={(e) => setTimeIndex(Number(e.target.value))}
          className="flex-1 accent-sky-400"
        />
        <span>Future</span>
      </div>
    </section>
  );
}
