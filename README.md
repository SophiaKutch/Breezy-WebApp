# Breezy-WebApp

Breezy Web App -- A weather-based AI-powered app

Overview:
    Breezy is a weather application that provides real-time weather updates and generates AI-powered blurbs based on the current weather conditions!

Features:
    - Get real-time weather data for any city
    - AI-generated short and engaging weather insights
    - Simple and clean user interface 

Installation & Setup:  
1. Clone the repository by running git clone https://github.com/SophiaKutch/Breezy-WebApp.git and then 'cd Breezy-WebApp'
2. Set up environmental variables. Add a .env file to  the backend directory:
    OPENAI_API_KEY=your_openai_api_key  
    WEATHER_API_KEY=your_weather_api_key
3. Install dependencies by running:
   
    cd backend  
    npm install  
    npm run dev
   
   &
   
    cd frontend  
    npm install  
    npm start

   The frontend will be available at http://localhost:3000
   The backend runs on http://localhost:4000

Testing:
  1. To run tests, do 
  
      cd backend  
      npm test
