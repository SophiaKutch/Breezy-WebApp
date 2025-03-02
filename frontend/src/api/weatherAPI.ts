// import axios from "axios";

// const WEATHER_URL = "http://localhost:4000/api/weather";

// export const getWeatherData = async (city) => {
//     try {
//         const response = await axios.get(WEATHER_URL, { params: { city } });
//         return response.data;
//     } catch (e) {
//         console.log("Error fetching weather data: ", e)
//     }
// };

import axios from "axios";

const WEATHER_URL = "http://localhost:4000/api/weather";

export interface WeatherData {
    location: string;
    region: string;
    country: string;
    temperature: number;
    condition: string;
    icon: string;
    humidity: number;
    uv: number;
    time: string;
}

export const getWeatherData = async (city: string): Promise<WeatherData | null> => {
    try {
        const response = await axios.get<WeatherData>(WEATHER_URL, { params: { city } });
        return response.data;
    } catch (e) {
        console.error("Error fetching weather data: ", e);
        return null;
    }
};