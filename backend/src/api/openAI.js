import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
    const { weather } = req.body;

    if (!weather) {
        return res.status(400).json({ error: "Weather data is required" });
    }

    try {
        const prompt = `Generate a short, engaging blurb about the current weather conditions in ${weather.city}. 
        The temperature is ${Math.floor(weather.temperature)}°F, the condition is ${weather.condition}, 
        and the humidity is ${weather.humidity}%. Keep it fun and under 40 words.`;    

        console.log("Sending API request with key:", process.env.OPENAI_API_KEY);

        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: prompt }], 
                temperature: 0.7,
                max_tokens: 100,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("OpenAI Response:", response.data);  // debug response
        res.json({ aiResponse: response.data.choices[0].message.content });
    } catch (error) {
        console.error("OpenAI API Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch AI-generated response", details: error.response?.data || error.message });
    }
});

export default router;
