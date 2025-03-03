import React, { useState } from "react";
import { getWeatherData, WeatherData } from "../api/weatherAPI";
import "../styles/Weather.css";

const Weather: React.FC = () => {
    const [city, setCity] = useState<string>("");
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchWeather = async () => {
        if (!city) return;
        setLoading(true);
        setError(null);

        try {
            const data = await getWeatherData(city);
            if (data) {
                setWeather(data);
            } else {
                setError("City not found or API error.");
                setWeather(null);
            }
        } catch (e) {
            setWeather(null);
            setError("Error fetching weather data");
        } finally {
            setLoading(false);
        }
    };

    const getTimeBasedBackground = (weatherTime: string) => {
        if (!weatherTime) return "linear-gradient(to bottom, #AEE2FF, #1E3A8A)";
    
        const hour = parseInt(weatherTime.split(" ")[1].split(":")[0], 10);
    
        if (hour >= 6 && hour < 12) {
            return "linear-gradient(to bottom, #FFEB99, #1E3A8A)"; 
        } else if (hour >= 12 && hour < 18) {
            return "linear-gradient(to bottom, #AEE2FF, #1E3A8A)";
        } else {
            return "linear-gradient(to bottom, #1A237E, #4A148C)";; 
        }
    };

    return (
        <div className="weather-container">
            <div className="weather-card" style={{background: getTimeBasedBackground(weather?.time || "12:00")}}>
                <h2 className="weather-title">Welcome to Breezy Weather App</h2>
                <div className="input-container">
                    <input
                        className="weather-input"
                        type="text"
                        placeholder="Enter a city name..."
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button onClick={fetchWeather} disabled={loading} className="weather-button">
                        {loading ? "Loading..." : "Go"}
                    </button>
                </div>
                
                {error && <p style={{ color: "red" }}>{error}</p>}
                {loading && <p>Speaking to my weather satellites...</p>}

                {weather && !loading && (
                    <div className="weather-info">
                        <h3>{weather.location}, {weather.region}</h3>
                    
                        <img src={weather.icon} alt="weather-icon" className="weather-icon"/> 
                        <h1>{Math.floor(weather.temperature)}°F</h1>
                        <h3>{weather.condition}</h3>
                        
                        <ul className="weather-list">
                            <li>
                                <strong>Humidity:</strong> {weather.humidity}%
                            </li>
                            <li>
                                <strong>UV Index:</strong> {Math.floor(weather.uv)}
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Weather;
