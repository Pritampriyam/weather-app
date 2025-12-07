import React from "react";

const conditionToGradient = (condition, timeOfDay) => {
  const isNight = timeOfDay === "night";
  switch (condition) {
    case "sunny":
      return isNight
        ? "from-slate-900 via-indigo-900 to-slate-900"
        : "from-sky-400 via-sky-500 to-indigo-500";
    case "cloudy":
      return isNight
        ? "from-slate-900 via-slate-800 to-slate-900"
        : "from-slate-400 via-slate-500 to-sky-500";
    case "foggy":
      return "from-slate-500 via-slate-400 to-slate-600";
    case "snowy":
      return isNight
        ? "from-slate-900 via-slate-700 to-sky-900"
        : "from-sky-200 via-slate-200 to-slate-400";
    case "stormy":
      return "from-slate-900 via-slate-800 to-indigo-900";
    case "rainy":
    default:
      return isNight
        ? "from-slate-900 via-slate-800 to-slate-900"
        : "from-sky-500 via-slate-600 to-slate-900";
  }
};

export default function AnimatedBackground({ condition, timeOfDay }) {
  const gradient = conditionToGradient(condition, timeOfDay);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Main gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90`} />

      {/* Rotating glow disk (sun/moon aura) */}
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-white/10 blur-3xl animate-slow-spin" />

      {/* Fog / haze layer */}
      {(condition === "foggy" || condition === "cloudy" || condition === "rainy") && (
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-slate-900/70 via-slate-900/0 to-transparent animate-fog-move" />
      )}

      {/* Star field for night */}
      {timeOfDay === "night" && (
        <div className="absolute inset-0">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-white animate-pulse-soft"
              style={{
                top: `${Math.random() * 60}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Rain particles */}
      {condition === "rainy" && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute h-16 w-px bg-sky-200/40 animate-rain-fall"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 1.5}s`,
                animationDuration: `${1.5 + Math.random()}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Snow particles */}
      {condition === "snowy" && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute h-2 w-2 rounded-full bg-sky-50 animate-snow-fall"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 3}s`,
                opacity: 0.6 + Math.random() * 0.4,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
