import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config(); 

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// mock api route
app.get('/posts', async (req, res) => {
    console.log("JSON Placeholder request triggered");
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Public api route unnauthenticated
app.get('/weather', async (req, res) => {
    console.log("Open weather map api request triggered");
  const city = req.query.city || 'Chicago';
  const apiKey = process.env.OPENWEATHER_API_KEY;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// github api route
app.get('/repos', async (req, res) => {
    console.log("GitHub request triggered");
  const token = process.env.GITHUB_TOKEN;
  console.log('GitHub Token:', process.env.GITHUB_TOKEN);

  try {
    const response = await fetch('https://api.github.com/user/repos', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch GitHub repos' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));