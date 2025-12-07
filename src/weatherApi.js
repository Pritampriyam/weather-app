// src/weatherApi.js

// Convert Open-Meteo response into the shape your UI expects
function mapToAppWeather(cityName, apiData) {
  const current = apiData.current_weather;
  const hourly = apiData.hourly;
  const daily = apiData.daily;

  // Basic condition mapping
  let condition = "sunny";
  let description = "Clear or mostly clear skies";

  // crude: use precipitation probability & wind speed
  const rainNow = hourly.precipitation_probability[0] || 0;
  if (rainNow >= 60) {
    condition = "rainy";
    description = "Rainy conditions expected";
  } else if (rainNow >= 30) {
    condition = "cloudy";
    description = "Cloudy with a chance of rain";
  }

  const hour = new Date(current.time).getHours();
  const timeOfDay = hour >= 18 || hour < 6 ? "night" : "day";

  const hourlyData = hourly.time.slice(0, 12).map((t, idx) => ({
    time: new Date(t).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    temp: hourly.temperature_2m[idx],
    rainChance: hourly.precipitation_probability[idx],
    wind: hourly.wind_speed_10m[idx],
    isNight: (() => {
      const h = new Date(t).getHours();
      return h >= 18 || h < 6;
    })(),
  }));

  const dailyData = daily.time.slice(0, 4).map((t, idx) => ({
    day: new Date(t).toLocaleDateString([], { weekday: "short" }),
    high: daily.temperature_2m_max[idx],
    low: daily.temperature_2m_min[idx],
    rainChance: daily.precipitation_probability_max[idx],
    summary:
      daily.precipitation_probability_max[idx] >= 60
        ? "Likely rainy or stormy."
        : daily.precipitation_probability_max[idx] >= 30
        ? "Cloudy with possible showers."
        : "Mostly dry and calm.",
  }));

  return {
    location: cityName,
    condition,
    timeOfDay,
    temperature: current.temperature,
    feelsLike: current.temperature, // Open-Meteo doesn’t give feels-like
    description,
    high: daily.temperature_2m_max[0],
    low: daily.temperature_2m_min[0],
    rainChance: rainNow,
    windSpeed: current.windspeed,
    windDirection: current.winddirection,
    humidity: hourly.relative_humidity_2m[0] || 0,
    alerts: [], // Open-Meteo free API doesn't include alerts
    hourly: hourlyData,
    daily: dailyData,
  };
}

// Fetch weather by city name (using Open-Meteo geocoding + forecast)
export async function fetchWeatherForCity(cityName) {
  // 1) Geocode city -> lat/lon
  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      cityName
    )}&count=1&language=en&format=json`
  );
  if (!geoRes.ok) {
    throw new Error("Failed to fetch location data");
  }
  const geo = await geoRes.json();
  if (!geo.results || geo.results.length === 0) {
    throw new Error("City not found");
  }
  const loc = geo.results[0];

  // 2) Fetch weather for that lat/lon
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${loc.latitude}&longitude=${loc.longitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`;
  const weatherRes = await fetch(weatherUrl);
  if (!weatherRes.ok) {
    throw new Error("Failed to fetch weather data");
  }
  const weatherJson = await weatherRes.json();

  // 3) Map to your app’s shape
  return mapToAppWeather(`${loc.name}, ${loc.country || ""}`.trim(), weatherJson);
}
