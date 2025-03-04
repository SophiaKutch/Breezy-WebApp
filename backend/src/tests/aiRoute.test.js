import request from 'supertest';
import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import aiWeatherRoute from '../api/openAI.js';

dotenv.config();

jest.mock('axios');

const app = express();
app.use(express.json());
app.use('/ai-weather', aiWeatherRoute);

describe('POST /ai-weather', () => {

    it('should return 400 if no weather data is provided', async () => {
        const response = await request(app)
            .post('/ai-weather')
            .send({});  
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Weather data is required');
    });

    it('should return an AI-generated blurb if valid weather data is provided', async () => {
        const validWeatherData = {
            city: "Seattle",
            temperature: 55,
            condition: "Cloudy",
            humidity: 75,
        };

        axios.post.mockResolvedValue({
            data: {
                choices: [{
                    message: {
                        content: "It's a cloudy day in Seattle with a temperature of 55°F and 75% humidity. Stay cozy!"
                    }
                }]
            }
        });

        const response = await request(app)
            .post('/ai-weather')
            .send({ weather: validWeatherData });
        
        expect(response.status).toBe(200);
        expect(response.body.aiResponse).toBe("It's a cloudy day in Seattle with a temperature of 55°F and 75% humidity. Stay cozy!");
    });

    it('should return 500 if there is an error with the OpenAI API', async () => {
        const validWeatherData = {
            city: "Seattle",
            temperature: 55,
            condition: "Cloudy",
            humidity: 75,
        };

        axios.post.mockRejectedValue({
            response: {
                status: 500,
                data: { error: 'API key invalid' }
            }
        });

        const response = await request(app)
            .post('/ai-weather')
            .send({ weather: validWeatherData });

        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Failed to fetch AI-generated response');
    });

});
