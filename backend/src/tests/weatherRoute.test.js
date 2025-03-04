import request from 'supertest';
import express from 'express';
import weatherRouter from '../api/weather'; // Adjust the path to your weather route

const app = express();
app.use('/weather', weatherRouter);

describe('Weather Route', () => {
  it('should return 400 if no city is provided', async () => {
    const response = await request(app).get('/weather');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Please give a city name');
  });

  it('should return weather data for a valid city', async () => {
    // Make sure to use a valid city or mock the API call in this test
    const response = await request(app).get('/weather?city=London');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('location');
    expect(response.body).toHaveProperty('region');
    expect(response.body).toHaveProperty('country');
    expect(response.body).toHaveProperty('temperature');
    expect(response.body).toHaveProperty('condition');
  });

it('should return an error if the API key is invalid', async () => {
    const response = await request(app).get('/weather?city=InvalidCity');
    expect(response.status).toBe(400); 
    expect(response.body.error).toBe('Invalid request. Please check that your city name is valid.');
});
});

