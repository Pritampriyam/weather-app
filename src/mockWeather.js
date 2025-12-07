export const mockWeather = {
  location: "San Francisco",
  condition: "rainy", // "sunny" | "cloudy" | "foggy" | "snowy" | "stormy"
  timeOfDay: "day",   // "day" | "night"
  temperature: 18,
  feelsLike: 16,
  description: "Light rain with cool breeze",
  high: 21,
  low: 14,
  rainChance: 70,
  windSpeed: 18,
  windDirection: "SW",
  humidity: 82,
  alerts: [
    {
      id: 1,
      type: "Storm Warning",
      severity: "high",
      message: "Thunderstorms expected in the next 2 hours.",
    },
    {
      id: 2,
      type: "Rain Alert",
      severity: "medium",
      message: "Moderate rain likely during your evening commute.",
    },
  ],
  hourly: Array.from({ length: 12 }).map((_, i) => ({
    time: `${(8 + i).toString().padStart(2, "0")}:00`,
    temp: 16 + Math.sin(i / 2) * 3,
    rainChance: 40 + i * 3,
    wind: 10 + i,
    isNight: i < 2 || i > 8,
  })),
  daily: [
    {
      day: "Today",
      high: 21,
      low: 14,
      rainChance: 70,
      summary: "Cloudy with showers through the afternoon.",
    },
    {
      day: "Tomorrow",
      high: 22,
      low: 15,
      rainChance: 40,
      summary: "Partly cloudy with a light breeze.",
    },
    {
      day: "Wed",
      high: 24,
      low: 16,
      rainChance: 10,
      summary: "Mostly sunny and warmer.",
    },
    {
      day: "Thu",
      high: 19,
      low: 13,
      rainChance: 80,
      summary: "Heavy rain and possible thunder.",
    },
  ],
};
