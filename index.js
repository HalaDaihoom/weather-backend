require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// Route: /weather?city=Cairo
app.get("/weather", async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: { q: city, appid: API_KEY, units: "metric" },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json(error.response?.data || { error: "Something went wrong" });
  }
});

app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
