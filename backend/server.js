import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import weatherRoutes from './src/api/weather.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/weather', weatherRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'The server is running!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
