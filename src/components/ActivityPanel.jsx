import React from "react";

function ClothingCharacter({ temp, rainChance }) {
  const isCold = temp <= 10;
  const isHot = temp >= 28;
  const isWet = rainChance >= 50;

  return (
    <div className="relative flex h-24 w-24 items-center justify-center">
      {/* Body */}
      <div className="h-16 w-10 rounded-2xl bg-sky-500/70 shadow-lg animate-float" />
      {/* Head */}
      <div className="absolute -top-4 h-10 w-10 rounded-full bg-slate-100 shadow-md" />
      {/* Umbrella */}
      {isWet && (
        <div className="absolute -top-2 -right-4 h-12 w-12">
          <div className="h-1 w-full rounded-full bg-slate-300" />
          <div className="mt-1 h-7 w-9 rounded-b-full bg-sky-400/80 border border-sky-200/70 animate-glow-pulse" />
        </div>
      )}
      {/* Scarf / jacket details */}
      {isCold && (
        <div className="absolute top-4 h-3 w-10 rounded-full bg-rose-400/90" />
      )}
      {isHot && (
        <div className="absolute top-6 h-2 w-10 rounded-full bg-amber-300/90" />
      )}
    </div>
  );
}

function ActivityMeter({ label, score }) {
  return (
    <div className="flex flex-col gap-1 text-xs">
      <div className="flex items-center justify-between">
        <span className="text-slate-300">{label}</span>
        <span className="text-slate-400">{Math.round(score)}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-amber-400"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

export default function ActivityPanel({ data }) {
  const { temperature, rainChance } = data;
  const outdoorScore = Math.max(
    0,
    100 - rainChance - Math.max(0, temperature - 26) * 2
  );
  const runningScore = Math.max(
    0,
    100 - Math.abs(temperature - 18) * 4 - rainChance / 2
  );
  const picnicScore = Math.max(0, outdoorScore - 10);

  return (
    <section className="glass-card p-4 lg:p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-semibold tracking-wide text-slate-100">
          Activity & Outfit
        </div>
        <div className="text-xs text-slate-400">
          Animated AI-style hints
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex flex-1 flex-col gap-3">
          <ActivityMeter label="Outdoor comfort" score={outdoorScore} />
          <ActivityMeter label="Running outside" score={runningScore} />
          <ActivityMeter label="Picnic / chill" score={picnicScore} />
          <div className="mt-1 text-[11px] text-slate-300">
            {rainChance >= 60
              ? "High chance of rain – keep activities flexible and consider indoor plans."
              : temperature >= 28
              ? "Warm and humid – hydrate well and avoid peak afternoon sun."
              : "Conditions are fairly comfortable for most outdoor activities."}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <ClothingCharacter temp={temperature} rainChance={rainChance} />
          <div className="mt-2 text-[11px] text-slate-300 text-center">
            {temperature <= 10
              ? "Wear layers, jacket, and maybe a scarf."
              : temperature >= 28
              ? "Light, breathable clothing is best."
              : "Light jacket or hoodie should be enough."}
          </div>
        </div>
      </div>
    </section>
  );
}
