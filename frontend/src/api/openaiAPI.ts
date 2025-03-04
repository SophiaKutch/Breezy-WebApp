import axios from "axios";

const AI_URL = "http://localhost:4000/api/openAI";

export const getAIBlurb = async (weather: {
    city: string;
    temperature: number;
    condition: string;
    humidity: number;
}): Promise<string | null> => {
    try {
        const response = await axios.post(AI_URL, { weather });
        return response.data.aiResponse;
    } catch (error) {
        console.error("Error fetching AI-generated blurb:", error);
        return null;
    }
};

