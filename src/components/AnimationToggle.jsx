import React from "react";

export default function AnimationToggle({ enabled, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs transition ${
        enabled
          ? "border-emerald-400/70 bg-emerald-500/10 text-emerald-100"
          : "border-slate-600 bg-slate-800/60 text-slate-300"
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          enabled ? "bg-emerald-400 animate-pulse" : "bg-slate-500"
        }`}
      />
      <span>Animations {enabled ? "On" : "Off"}</span>
    </button>
  );
}
