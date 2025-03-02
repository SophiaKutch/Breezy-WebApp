import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// GET call to WeatherAPI
router.get("/", async (request, result) => {
    const city = request.query.city;

    // Log URL to debug issues
    const url = `${process.env.WEATHER_BASE_URL}/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}`;
    console.log(`Fetching from: ${url}`);

    if (!city) {
        return result.status(400).json({ error: "Please give a city name" });
    }

    try {
        const response = await axios.get(url);

        const data = response.data;

        result.json({
            location: data.location.name,
            region: data.location.region,
            country: data.location.country,
            time: data.location.localtime,
            temperature: data.current.temp_f,
            condition: data.current.condition.text,
            icon: data.current.condition.icon,
            humidity: data.current.humidity,
            uv: data.current.uv,
        });

    } catch (e) {
        if (e.response) {
            if (e.response.status === 400) {
                return result.status(400).json({ error: "Invalid request. Please check that your city name is valid." });
            } else if (e.response.status === 403) {
                return result.status(403).json({ error: "There was an issue with your API key." });
            } else if (e.response.status === 500) {
                return result.status(500).json({ error: "500 error. Weather API service is currently down." });
            }
        } else {
            return result.status(500).json({ error: "An unexpected error occurred. Please try again." });
        }
    }
});

export default router;
