import React from "react";

const severityToColors = (severity) => {
  switch (severity) {
    case "high":
      return "border-red-500/60 bg-red-500/10 text-red-200";
    case "medium":
      return "border-amber-500/60 bg-amber-500/10 text-amber-100";
    default:
      return "border-sky-500/60 bg-sky-500/10 text-sky-100";
  }
};

export default function AlertsPanel({ alerts }) {
  if (!alerts || alerts.length === 0) return null;

  return (
    <section className="glass-card p-4 lg:p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
          <span className="text-sm font-semibold tracking-wide text-slate-100">
            Active Alerts
          </span>
        </div>
        <div className="text-xs text-slate-400">
          Tap for details (future extension)
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {alerts.map((alert) => {
          const colorClasses = severityToColors(alert.severity);
          return (
            <div
              key={alert.id}
              className={`relative overflow-hidden rounded-2xl border px-4 py-3 ${colorClasses}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 opacity-40 animate-pulse-soft" />
              <div className="relative flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-[0.24em]">
                    {alert.type}
                  </div>
                  <div className="mt-1 text-[11px] leading-snug">
                    {alert.message}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[11px] uppercase tracking-widest">
                  <span className="h-1.5 w-1.5 rounded-full bg-current animate-ping" />
                  <span>{alert.severity}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
