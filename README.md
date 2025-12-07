Here’s a complete `README.md` you can drop into your project root and tweak later.

---

````markdown
# 🌤 Aurora Weather – Animated Weather Forecast App

Aurora Weather is a modern, animated weather-forecast web app built with:

- ⚛️ **React** (with hooks)
- ⚡ **Vite** (fast dev bundler)
- 🎨 **Tailwind CSS v3** (utility-first styling)
- 🌍 **Open-Meteo API** (free, no API key needed)

It supports:

- Live weather data for any city (via Open-Meteo + geocoding)
- Animated backgrounds and micro-interactions
- Hourly & daily forecasts
- Basic activity & outfit suggestions

> This project is currently focused on **UI + animations + basic live weather**.
> No backend server is required – everything runs in the browser.

---

## 📁 Project Structure

This is the intended folder structure for the app:

```text
Weather-app/
├─ index.html
├─ package.json
├─ vite.config.js
├─ tailwind.config.js
├─ postcss.config.js
├─ README.md                ← (this file)
└─ src/
   ├─ main.jsx
   ├─ App.jsx
   ├─ index.css
   ├─ weatherApi.js
   ├─ mockWeather.js        ← dummy data (optional)
   └─ components/
      ├─ AnimatedBackground.jsx
      ├─ CurrentWeather.jsx
      ├─ HourlyForecast.jsx
      ├─ DailyForecast.jsx
      ├─ RadarMap.jsx
      ├─ AlertsPanel.jsx
      ├─ ActivityPanel.jsx
      └─ AnimationToggle.jsx
````

### Root files

* **`index.html`**

  * Vite entry HTML.
  * Contains the root div and script pointing to `src/main.jsx`.

* **`package.json`**

  * Project metadata and dependencies.
  * Includes scripts:

    * `"dev": "vite"`
    * `"build": "vite build"`
    * `"preview": "vite preview"`

* **`vite.config.js`**

  * Vite configuration.
  * Uses `@vitejs/plugin-react` for JSX/TSX support and fast refresh.

* **`tailwind.config.js`**

  * Tailwind CSS configuration.
  * Specifies where to scan for class names (`./index.html`, `./src/**/*.{js,jsx,ts,tsx}`).
  * Extends theme with custom `keyframes` and `animation` definitions for:

    * slow-spin
    * float
    * pulse-soft
    * rain-fall
    * snow-fall
    * fog-move
    * glow-pulse

* **`postcss.config.js`**

  * PostCSS setup.
  * Uses `tailwindcss` and `autoprefixer` plugins.

---

### `src/` directory

#### `src/main.jsx`

* React entry point.

* Mounts the React app into `#root` in `index.html`.

* Imports global styles:

  ```jsx
  import "./index.css";
  ```

* Renders:

  ```jsx
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  ```

#### `src/App.jsx`

* Main application shell.

* Handles:

  * Animation toggle (on/off)
  * City input and search
  * Loading / error states
  * Fetching live weather data using `fetchWeatherForCity`
  * Layout composition: header, main grid, footer

* Passes weather data into presentational components:

  * `CurrentWeather`
  * `HourlyForecast`
  * `DailyForecast`
  * `RadarMap`
  * `AlertsPanel`
  * `ActivityPanel`

#### `src/index.css`

* Tailwind’s main entry CSS file.

* Must start with:

  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```

* Also includes some global utility styles, e.g.:

  * App background (`body { @apply bg-slate-950 text-slate-50 font-sans; }`)
  * Scrollbar styling for forecast slider (`.forecast-scroll`)
  * Glassmorphism card style (`.glass-card`)

#### `src/weatherApi.js`

* Contains **all live weather API logic**.

* Uses **Open-Meteo**:

  * 1️⃣ Geocodes the city name → latitude & longitude
  * 2️⃣ Fetches forecast data for that location
  * 3️⃣ Maps raw API response into the shape expected by the UI

* Exports:

  ```js
  export async function fetchWeatherForCity(cityName)
  ```

* This function:

  * Returns an object compatible with your app’s original `mockWeather` shape:

    * `location`
    * `condition` (sunny/rainy/cloudy… derived from data)
    * `timeOfDay` ("day" or "night")
    * `temperature`, `feelsLike`, `high`, `low`
    * `rainChance`, `windSpeed`, `windDirection`, `humidity`
    * `hourly[]` (12 items)
    * `daily[]` (4 items)
    * `alerts[]` (currently empty – Open-Meteo free API doesn’t include alerts)

#### `src/mockWeather.js`

* Contains static **dummy data** mirroring the live weather shape.
* Useful for:

  * Testing UI without hitting real APIs.
  * Offline development.
* Can be plugged in instead of `fetchWeatherForCity` if needed.

---

### `src/components/` directory

All components are **presentational** (no external fetch logic), and expect already-shaped weather data.

#### `AnimatedBackground.jsx`

* Renders the **animated sky background** based on:

  * `condition` (`"sunny" | "cloudy" | "foggy" | "rainy" | "snowy" | "stormy"`)
  * `timeOfDay` (`"day" | "night"`)
* Uses Tailwind custom animations defined in `tailwind.config.js`:

  * Rotating glow disk for sun/moon.
  * Stars at night.
  * Rain or snow particle effects.
  * Fog/haze overlay.

#### `CurrentWeather.jsx`

* Shows current city-level weather information:

  * Condition icon (sun, rain, storm, snow, etc.)
  * Temperature and feels-like
  * Description
  * High/low, wind speed/direction, humidity
  * Animated temperature pillar.

* Accepts a `data` prop (the mapped weather object).

#### `HourlyForecast.jsx`

* Displays a **horizontal scrollable list** of hourly forecast items.

* Each item includes:

  * Hour label (e.g. `08:00`)
  * Animated temperature bar
  * Rain chance badge

* Uses `.forecast-scroll` custom scrollbar styling.

#### `DailyForecast.jsx`

* Renders a **4-day outlook**.

* Each day is an accordion row:

  * Day name
  * High/low temperatures
  * Rain probability
  * Summary text

* When expanded, shows more detail and a rain probability gauge.

#### `RadarMap.jsx`

* Currently a **UI-only simulated radar** (no real radar tiles yet).

* Shows:

  * Animated “cloud cells”
  * Pulsing storm core
  * Lightning/flicker effect
  * Time slider (past → future)

* Good placeholder for integrating a real map/radar layer later.

#### `AlertsPanel.jsx`

* Displays active weather alerts passed in as `alerts` prop.

* Each alert includes:

  * Type (e.g., Storm Warning)
  * Severity (`high`, `medium`, `low`)
  * Short message

* Currently alerts are empty for live data (Open-Meteo limitation) but the UI is ready.

#### `ActivityPanel.jsx`

* Computes **simple activity & outfit recommendations** based on:

  * Temperature
  * Rain chance

* Shows:

  * Meters for:

    * Outdoor comfort
    * Running outside
    * Picnic suitability
  * An animated “clothing suggestion character” with:

    * Umbrella for high rain chance
    * Scarf for cold
    * Light clothing for heat

#### `AnimationToggle.jsx`

* Small control to switch animation mode **on/off**.
* Used in the header to enable reduced-motion / battery-saving mode.
* Parent (`App.jsx`) uses it to conditionally render `AnimatedBackground`.

---

## 🚀 Getting Started

### 1. Prerequisites

* **Node.js** (LTS recommended – e.g., 18+)
* **npm** (comes with Node)

You’re on Windows, so you can use **Command Prompt**, **PowerShell**, or **Git Bash**.
Commands below assume PowerShell/CMD from the project root.

---

### 2. Install dependencies

From project root:

```bash
npm install
```

This installs React, Vite, Tailwind, and other dependencies according to `package.json`.

---

### 3. Run the development server

```bash
npm run dev
```

Vite will log something like:

```text
VITE v7.x.x  ready in XXX ms
  ➜  Local:   http://localhost:5173/
```

Open the URL in your browser.

---

### 4. Using the app

* A **city input** is in the header (default: `Delhi`).
* To view another city:

  1. Type a city name (e.g., `Mumbai`, `London`, `New York`).
  2. Click **Update** or press **Enter**.
* The app will:

  * Geocode the city via Open-Meteo geocoding API.
  * Fetch live weather and forecast.
  * Map it to the UI format.
  * Re-render `CurrentWeather`, `HourlyForecast`, `DailyForecast`, etc.

If something goes wrong (bad city, network issue), a friendly error message is shown.

---

## 🌐 APIs Used

### Open-Meteo Geocoding

```text
https://geocoding-api.open-meteo.com/v1/search
```

* Used to convert **city name → latitude + longitude**.
* Example parameters:

  * `name` – city name (e.g., `Delhi`)
  * `count=1` – only best match
  * `language=en`
  * `format=json`

### Open-Meteo Forecast

```text
https://api.open-meteo.com/v1/forecast
```

Used with parameters like:

* `latitude`, `longitude` – from geocoding step
* `current_weather=true`
* `hourly=temperature_2m,relative_humidity_2m,precipitation_probability,wind_speed_10m`
* `daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max`
* `timezone=auto`

> No API key is required.
> Free tier is generous for typical personal projects.

---

## 🧪 Switching between Live Data and Dummy Data

If you want to temporarily go back to dummy data:

1. Comment out the `fetchWeatherForCity` import and usage in `App.jsx`.

2. Import `mockWeather` instead:

   ```jsx
   import { mockWeather } from "./mockWeather.js";
   ```

3. Set:

   ```jsx
   const [weather, setWeather] = useState(mockWeather);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");
   ```

4. Remove / comment out the `useEffect` that calls `fetchWeatherForCity`.

This way you can work purely on animations and layout without hitting the API.

---

## 🛠 Scripts

From `package.json`:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

* `npm run dev` – start dev server.
* `npm run build` – build for production.
* `npm run preview` – preview the production build locally.

---

## 🔮 Possible Future Improvements

* Real radar tiles (e.g. with Leaflet + a weather layer).
* Advanced severe weather alerts from another API.
* User preferences (units, themes, favorite cities) stored in localStorage.
* Reduced-motion mode based on OS settings (prefers-reduced-motion).
* Full routing (e.g. city page, settings page) using React Router.
* Better condition mapping (using specific weather codes instead of simple rules).

---

## 👤 Author

* Local development path:
  `C:\Users\PRITAM KUMAR\Webdevelopment\React\Weather-app`
* Tech stack: React, Vite, Tailwind, Open-Meteo.

You can customise this README as you continue improving the app.

```

---

If you want, I can also:

- Generate a **GitHub-ready** short description + topics
- Add **badges** (Node version, license, etc.)
- Or write a short **“Contributing”** section if you plan to share this repo.
```
