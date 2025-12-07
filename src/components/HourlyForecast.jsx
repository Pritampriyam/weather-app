import React from "react";

function HourlyItem({ hour }) {
  const barHeight = Math.min(100, Math.max(20, (hour.temp + 5) * 3));

  return (
    <div className="flex min-w-[70px] flex-col items-center gap-2">
      <div className="text-xs text-slate-300">{hour.time}</div>
      <div className="flex h-16 w-7 items-end justify-center overflow-hidden rounded-full bg-slate-900/80 border border-slate-700/80">
        <div
          className="w-full rounded-t-full bg-gradient-to-t from-sky-500 via-sky-300 to-sky-100 transition-all duration-500"
          style={{ height: `${barHeight}%` }}
        />
      </div>
      <div className="text-xs font-semibold">
        {Math.round(hour.temp)}°
      </div>
      <div className="text-[10px] text-sky-200 flex items-center gap-1">
        <span className="h-2 w-2 rounded-full bg-sky-300 animate-pulse-soft" />
        {hour.rainChance}%
      </div>
    </div>
  );
}

export default function HourlyForecast({ hours }) {
  return (
    <section className="glass-card p-4 lg:p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-semibold tracking-wide text-slate-100">
          Hourly Forecast
        </div>
        <div className="text-xs text-slate-400">
          Next 12 hours
        </div>
      </div>

      <div className="forecast-scroll flex gap-4 overflow-x-auto pb-1">
        {hours.map((h, idx) => (
          <HourlyItem key={idx} hour={h} />
        ))}
      </div>
    </section>
  );
}
