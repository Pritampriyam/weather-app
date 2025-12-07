import React from "react";

function WeatherIcon({ condition, isNight }) {
  if (condition === "stormy") {
    return (
      <div className="relative flex h-20 w-20 items-center justify-center">
        <div className="h-16 w-16 rounded-full bg-slate-800/80 shadow-lg flex items-center justify-center">
          <div className="h-5 w-10 rounded-full bg-slate-500" />
        </div>
        <div className="absolute -bottom-2 h-7 w-3 skew-x-[-20deg] bg-yellow-400 shadow-lg animate-pulse" />
      </div>
    );
  }

  if (condition === "rainy") {
    return (
      <div className="relative flex h-20 w-20 items-center justify-center">
        <div className="h-14 w-14 rounded-full bg-slate-800/90 flex items-center justify-center">
          <div className="h-5 w-10 rounded-full bg-slate-400" />
        </div>
        <div className="absolute -bottom-3 flex gap-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-4 w-2 rounded-b-full bg-sky-300 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (condition === "snowy") {
    return (
      <div className="relative flex h-20 w-20 items-center justify-center">
        <div className="h-16 w-16 rounded-full bg-slate-200/90 flex items-center justify-center">
          <div className="h-2 w-10 rounded-full bg-slate-400" />
        </div>
        <div className="absolute inset-0 flex items-end justify-center gap-1 pb-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-full bg-sky-50 animate-pulse-soft"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  const sunClass = isNight ? "bg-slate-100/90" : "bg-yellow-300";
  const haloClass = isNight ? "bg-sky-500/40" : "bg-yellow-400/40";

  return (
    <div className="relative flex h-20 w-20 items-center justify-center">
      <div className={`h-16 w-16 rounded-full ${sunClass} animate-float`} />
      <div
        className={`absolute h-24 w-24 rounded-full ${haloClass} blur-xl animate-glow-pulse`}
      />
      {condition === "cloudy" && (
        <div className="absolute bottom-0 h-6 w-12 rounded-full bg-slate-500/90" />
      )}
    </div>
  );
}

export default function CurrentWeather({ data }) {
  const isCold = data.temperature <= 10;
  const isHot = data.temperature >= 28;

  return (
    <section className="glass-card relative p-5 lg:p-6 overflow-hidden">
      {/* Frost / heat shimmer overlay */}
      {isCold && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-200/10 via-sky-100/0 to-sky-200/10 backdrop-blur-sm" />
      )}
      {isHot && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-amber-500/10 via-transparent to-amber-500/10" />
      )}

      <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <WeatherIcon condition={data.condition} isNight={data.timeOfDay === "night"} />
          <div>
            <div className="text-sm uppercase tracking-[0.2em] text-slate-300">
              {data.location}
            </div>
            <div className="mt-1 text-xl font-semibold">
              {data.description}
            </div>
            <div className="mt-1 flex items-center gap-2 text-sm text-slate-300">
              <span>Wind {data.windSpeed} km/h {data.windDirection}</span>
              <span className="h-1 w-1 rounded-full bg-slate-400" />
              <span>Humidity {data.humidity}%</span>
            </div>
          </div>
        </div>

        <div className="flex items-end gap-4">
          <div className="relative flex items-start gap-2">
            <div className="relative">
              <span className="block text-5xl lg:text-6xl font-semibold leading-none">
                {Math.round(data.temperature)}
              </span>
              <span className="absolute -top-1 -right-4 text-xl text-slate-300">
                °C
              </span>
            </div>
            <div className="flex flex-col justify-end text-sm text-slate-300">
              <span>Feels like {Math.round(data.feelsLike)}°</span>
              <span>H: {Math.round(data.high)}° • L: {Math.round(data.low)}°</span>
              <span>Rain: {data.rainChance}%</span>
            </div>
          </div>

          {/* Animated temperature pillar */}
          <div className="relative h-20 w-4 overflow-hidden rounded-full bg-slate-800/80 border border-slate-600/80">
            <div
              className={`absolute bottom-0 w-full rounded-t-full bg-gradient-to-t ${
                isHot
                  ? "from-amber-500 via-orange-400 to-red-400"
                  : isCold
                  ? "from-sky-600 via-sky-400 to-sky-200"
                  : "from-sky-500 via-indigo-400 to-emerald-400"
              }`}
              style={{
                height: `${Math.min(100, Math.max(20, (data.temperature + 10) * 2))}%`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
