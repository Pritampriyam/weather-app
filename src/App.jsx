import React, { useEffect, useState } from "react";
import AnimatedBackground from "./components/AnimatedBackground.jsx";
import CurrentWeather from "./components/CurrentWeather.jsx";
import HourlyForecast from "./components/HourlyForecast.jsx";
import DailyForecast from "./components/DailyForecast.jsx";
import RadarMap from "./components/RadarMap.jsx";
import AlertsPanel from "./components/AlertsPanel.jsx";
import ActivityPanel from "./components/ActivityPanel.jsx";
import AnimationToggle from "./components/AnimationToggle.jsx";
import { fetchWeatherForCity } from "./weatherApi.js";

export default function App() {
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [city, setCity] = useState("Delhi");
  const [inputCity, setInputCity] = useState("Delhi");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load weather when city changes
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError("");
        const data = await fetchWeatherForCity(city);
        if (!cancelled) {
          setWeather(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load weather");
          setWeather(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [city]);

  const handleCitySubmit = (e) => {
    e.preventDefault();
    if (!inputCity.trim()) return;
    setCity(inputCity.trim());
  };

  const bgCondition = weather?.condition || "cloudy";
  const bgTime = weather?.timeOfDay || "day";

  return (
    <div className="min-h-screen">
      {animationsEnabled && (
        <AnimatedBackground condition={bgCondition} timeOfDay={bgTime} />
      )}

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-8 pt-4 lg:px-6 lg:pt-6">
        {/* Header */}
        <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-lg font-semibold tracking-tight md:text-2xl">
              Aurora Weather
            </h1>
            <p className="text-xs text-slate-300 md:text-sm">
              Live weather • Animated UI • Open-Meteo API
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <form
              onSubmit={handleCitySubmit}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputCity}
                onChange={(e) => setInputCity(e.target.value)}
                placeholder="Enter city (e.g., Delhi)"
                className="rounded-full bg-slate-900/70 border border-slate-700 px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-sky-400"
              />
              <button
                type="submit"
                className="rounded-full border border-sky-500/70 bg-sky-500/20 px-3 py-1.5 text-xs text-sky-100 hover:bg-sky-500/30 transition"
              >
                Update
              </button>
            </form>

            <div className="flex items-center justify-end gap-2">
              <AnimationToggle
                enabled={animationsEnabled}
                onToggle={() => setAnimationsEnabled((x) => !x)}
              />
            </div>
          </div>
        </header>

        {/* Loading / Error states */}
        {loading && (
          <div className="flex flex-1 items-center justify-center">
            <div className="glass-card px-6 py-4 text-sm text-slate-200 flex items-center gap-3">
              <div className="h-3 w-3 rounded-full border-2 border-sky-400 border-t-transparent animate-spin" />
              <span>Loading weather for {city}...</span>
            </div>
          </div>
        )}

        {!loading && error && (
          <div className="flex flex-1 items-center justify-center">
            <div className="glass-card px-6 py-4 text-sm text-red-200 border-red-500/60">
              Failed to load weather: {error}
            </div>
          </div>
        )}

        {!loading && !error && weather && (
          <>
            {/* Main layout */}
            <main className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
              <div className="flex flex-col gap-4 lg:col-span-2">
                <CurrentWeather data={weather} />
                <HourlyForecast hours={weather.hourly} />
                <DailyForecast days={weather.daily} />
              </div>

              <div className="flex flex-col gap-4">
                <RadarMap />
                <AlertsPanel alerts={weather.alerts} />
                <ActivityPanel data={weather} />
              </div>
            </main>

            {/* Footer */}
            <footer className="mt-4 flex items-center justify-between text-[11px] text-slate-500">
              <span>Live data via Open-Meteo • City: {weather.location}</span>
              <span>React + Vite + Tailwind</span>
            </footer>
          </>
        )}
      </div>
    </div>
  );
}
