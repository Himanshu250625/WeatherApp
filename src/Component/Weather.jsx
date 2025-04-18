import React, { useState } from "react";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const handlerSearch = async () => {
    if (!city) return;
    try {
      const apiKey = "ae445bb7ca2a49afb6070717251804";
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
      );
      const data = await response.json();

      if (data.error) {
        alert(data.error.message);
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
      alert("Failed to fetch weather data");
    }
  };

  return (
    <div className="flex flex-col justify-center h-screen items-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="flex flex-col h-auto w-[60vh] items-center p-8 bg-indigo-300 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-700 mb-5">Weather App ⛅</h1>

        {/* Search Input */}
        <label className="input input-primary flex items-center gap-2 bg-white rounded px-3 py-2 w-full mb-4">
          <button onClick={handlerSearch}>
            <svg
              className="w-6 h-6 opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
          </button>
          <input
            type="search"
            className="grow bg-transparent focus:outline-none"
            placeholder="Search City.."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handlerSearch()}
          />
        </label>

        {/* Weather Result */}
        {weather && (
          <div className="text-center mt-4 text-white">
            <h2 className="text-3xl font-bold">
              {weather.location.name}
            </h2>
            <p className="text-lg">{weather.current.condition.text}</p>
            <img
              src={weather.current.condition.icon}
              alt="icon"
              className="mx-auto w-full h-[100px] max-w-[100px] max-h-[100px] mt- 50px"
            />
            <p className="text-4xl font-bold mt-2">{weather.current.temp_c}°C</p>
            <p className="mt-4">Feels like: {weather.current.feelslike_c}°C</p>
            <p>Humidity: {weather.current.humidity}%</p>
            <p>Wind: {weather.current.wind_kph} kph</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
