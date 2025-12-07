import React, { useState } from "react";

function DailyRow({ day, isOpen, onToggle }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-900/40">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-4 py-3"
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold">{day.day}</span>
          <span className="text-xs text-slate-400">
            {day.summary}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-300">
          <span>H: {Math.round(day.high)}°</span>
          <span>L: {Math.round(day.low)}°</span>
          <span className="flex items-center gap-1 text-sky-300">
            <span className="h-2 w-2 rounded-full bg-sky-300 animate-pulse-soft" />
            {day.rainChance}%
          </span>
          <span
            className={`inline-block transform text-slate-400 transition-transform duration-200 ${
              isOpen ? "rotate-90" : ""
            }`}
          >
            ▶
          </span>
        </div>
      </button>
      <div
        className={`grid transition-all duration-300 ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden px-4 pb-3 text-xs text-slate-300">
          <div className="mt-1 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span>Morning: mild, possible light showers.</span>
              <span>Afternoon: {day.summary}</span>
              <span>Night: cooler with patchy clouds.</span>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[10px] uppercase tracking-widest text-slate-400">
                RAIN PROBABILITY
              </span>
              <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-sky-500 via-sky-400 to-sky-200"
                  style={{ width: `${day.rainChance}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DailyForecast({ days }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="glass-card p-4 lg:p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-semibold tracking-wide text-slate-100">
          4-Day Outlook
        </div>
        <div className="text-xs text-slate-400">
          Tap a day for details
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {days.map((d, idx) => (
          <DailyRow
            key={idx}
            day={d}
            isOpen={openIndex === idx}
            onToggle={() => setOpenIndex(openIndex === idx ? -1 : idx)}
          />
        ))}
      </div>
    </section>
  );
}
