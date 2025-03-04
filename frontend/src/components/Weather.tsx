import React, { useState, useEffect } from "react";
import { getWeatherData, WeatherData } from "../api/weatherAPI";
import "../styles/Weather.css";
import { getAIBlurb } from "../api/openaiAPI"; 


const Weather: React.FC = () => {
    const [city, setCity] = useState<string>("");
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [aiBlurb, setAiBlurb] = useState<string | null>(null);
    const [displayedBlurb, setDisplayedBlurb] = useState<string>("");

    //Animated typewriter effect for displaying ai blurb
    useEffect(() => {
        if (!aiBlurb) return;

        const cleanedBlurb = aiBlurb.replace(/[\u200B-\u200D\uFEFF]/g, "").trim();
        if (cleanedBlurb.length === 0) return;

        let i = 0;
        setDisplayedBlurb(cleanedBlurb.charAt(0));

        const interval = setInterval(() => {
            i++;
            if (i < cleanedBlurb.length) {
                setDisplayedBlurb((prev) => prev + cleanedBlurb.charAt(i));
            } else {
                clearInterval(interval);
            }
        }, 50);

        return () => clearInterval(interval);
    }, [aiBlurb]);


    const fetchWeather = async () => {
        if (!city || (weather && weather.location.toLowerCase() === city.toLowerCase())) return;
        setLoading(true);
        setError(null);
        setAiBlurb(null);

        try {
            const data = await getWeatherData(city);
            if (data) {
                setWeather(data);
                fetchAIBlurb(data);
                
            } else {
                setError("Sorry, I couldn't find that city. Please try again.");
                setWeather(null);
            }
        } catch (e) {
            setWeather(null);
            setError("Error fetching weather data");
        } finally {
            setLoading(false);
        }
    };

    const fetchAIBlurb = async (data: WeatherData) => {
        try {
            const aiWeatherData = {
                city: data.location,
                temperature: data.temperature,
                condition: data.condition,
                humidity: data.humidity,
            };
    
            const aiResponse = await getAIBlurb(aiWeatherData);
            console.log("AI Response:", aiResponse);
            setAiBlurb(aiResponse);
        } catch (aiError) {
            console.error("Failed to fetch AI blurb:", aiError);
            setAiBlurb(null);
        }
    };

    const getTimeBasedBackground = (weatherTime?: string) => { 
        if (!weatherTime) { 
            return "linear-gradient(to bottom, #AEE2FF, #1E3A8A)";
        }
    
        const timeParts = weatherTime.split(" ");
        if (timeParts.length < 2) {  
            console.warn("Invalid weatherTime format:", weatherTime);
            return "linear-gradient(to bottom, #AEE2FF, #1E3A8A)"; 
        }
    
        const timeSegment = timeParts[1]; 
        const hour = parseInt(timeSegment.split(":")[0], 10);
    
        if (isNaN(hour)) { 
            console.warn("Invalid hour extracted from weatherTime:", weatherTime);
            return "linear-gradient(to bottom, #AEE2FF, #1E3A8A)"; 
        }
    
        if (hour >= 6 && hour < 12) {
            return "linear-gradient(to bottom, #FFEB99, #1E3A8A)"; 
        } else if (hour >= 12 && hour < 18) {
            return "linear-gradient(to bottom, #AEE2FF, #1E3A8A)"; 
        } else {
            return "linear-gradient(to bottom, #1A237E, #4A148C)"; 
        }
    };

    return (
        <>
            <div className="weather-container">
                <div className="weather-card" style={{background: getTimeBasedBackground(weather?.time)}}> 
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
                {aiBlurb && (
                <div className="ai-blurb">
                    <h2><strong>Breezy AI Says:</strong> {displayedBlurb}</h2>
                </div>
            )}
            </div> 
        </>
    );
}

export default Weather;
