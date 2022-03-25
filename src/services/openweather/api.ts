import axios from "axios";

const api = axios.create({
  baseURL: "https://api.openweathermap.org",
  params: {
    lang: "pt_br",
    units: "metric",
    appid: process.env.WEATHER_API_KEY,
  },
});

export default api;
