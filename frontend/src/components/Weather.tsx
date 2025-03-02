// import React, { useState } from "react";
// import { getWeatherData } from "../api/weatherAPI";

// function Weather () {
//     const [city, setCity] = useState("");
//     const [weather, setWeather] = useState(null);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);

//     const fetchWeather = async () => {
//         if (!city) return;
//         setLoading(true);
//         setError(null);

//         try {
//             const data = await getWeatherData(city);
//             setWeather(data); 
//         } catch (e) {
//             setWeather(null);
//             setError("Error fetching weather data");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const formatDateTime = (timeString) => {
//         if (!timeString) return " ";

//         const [date, time] = timeString.split(" ");
//         const [, month, day] = date.split("-"); 

//         return `${month}/${day} at ${time}`;
//     };

//     return (
//         <div>
//             <h2>Welome to Breezy Weather App</h2>
//             <input
//                 type="text"
//                 placeholder="Enter a city name..."
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//             />
//             <button onClick={fetchWeather} disabled={loading}>
//                 {loading ? "Loading..." : "Go"}
//             </button>

//             {error && <p style={{ color: "red" }}>{error}</p>}
//             {loading && <p>Speaking to my weather satelites...</p>}

//             {weather && !loading && (
//                 <div>
//                     <h3>{weather.location}, {weather.region}</h3>
//                     <p>{weather.country}</p>
//                     <h2>{weather.temperature}°F</h2>
//                     <img src={weather.icon} alt="weather-icon" /> 
//                     <p>{weather.condition}</p>
//                     <p>Humidity: {weather.humidity}</p>
//                     <p>UV Index: {weather.uv}</p>
//                     <p>{formatDateTime(weather.time)}</p>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Weather;

import React, { useState } from "react";
import { getWeatherData, WeatherData } from "../api/weatherAPI";

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

    const formatDateTime = (timeString: string | null): string => {
        if (!timeString) return " ";

        const [date, time] = timeString.split(" ");
        const [, month, day] = date.split("-");

        return `${month}/${day} at ${time}`;
    };

    return (
        <div>
            <h2>Welcome to Breezy Weather App</h2>
            <input
                type="text"
                placeholder="Enter a city name..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={fetchWeather} disabled={loading}>
                {loading ? "Loading..." : "Go"}
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {loading && <p>Speaking to my weather satellites...</p>}

            {weather && !loading && (
                <div>
                    <h3>{weather.location}, {weather.region}</h3>
                    <p>{weather.country}</p>
                    <h2>{weather.temperature}°F</h2>
                    <img src={weather.icon} alt="weather-icon" /> 
                    <p>{weather.condition}</p>
                    <p>Humidity: {weather.humidity}</p>
                    <p>UV Index: {weather.uv}</p>
                    <p>{formatDateTime(weather.time)}</p>
                </div>
            )}
        </div>
    );
}

export default Weather;
