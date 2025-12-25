import React, { useState, useEffect } from 'react';

interface WeatherData {
  main: {
    temp: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  timestamp: number;
}



const WEATHER_CACHE_KEY = 'weather_cache';
const CACHE_DURATION = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

const Footer: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const currentDate = new Date();
  const location = 'Kannur';
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])
  useEffect(() => {
    const loadWeather = async () => {
      // Try to get weather from session storage first
      const cachedWeather = sessionStorage.getItem(WEATHER_CACHE_KEY);
      const now = Date.now();

      if (cachedWeather) {
        const parsedCache = JSON.parse(cachedWeather) as WeatherData;
        // Check if cache is still valid (less than 2 hours old)
        if (now - parsedCache.timestamp < CACHE_DURATION) {
          setWeather(parsedCache);
          return;
        }
      }

      // If no valid cache, fetch fresh data
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location},IN&units=metric&appid=${apiKey}`
        );

        if (!response.ok) {
          throw new Error('Weather unavailable');
        }

        const data = await response.json();
        const weatherData = {
          ...data,
          timestamp: now
        };

        setWeather(weatherData);
        // Store in session storage for future use
        sessionStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify(weatherData));
      } catch (err) {
        console.error('Error fetching weather:', err);
        // Don't show error, just don't display weather
      }
    };

    loadWeather();
  }, [apiKey]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN',
      { hour: '2-digit', minute: '2-digit', second: "2-digit", hour12: true }
    )
  }
  return (
    <footer className="flex justify-between max-w-xl w-full pt-4">
      <p className="text-xs">
        © {currentDate.getFullYear()} Hariprasad.
      </p>
      <div className="text-xs">
        {weather ? (
          <div className="flex items-center gap-1">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
              className="w-5 h-5"
              loading="lazy"
            />
            <span className="text-subtext">
              {Math.round(weather.main.temp)}°C • {location} • <span className='min-w-[110px]'>{formatTime(time)}</span>
            </span>
          </div>
        ) : (
          <span className="text-subtext">
            {formatTime(time)}
          </span>
        )}
      </div>
    </footer>
  );
};

export default Footer;
