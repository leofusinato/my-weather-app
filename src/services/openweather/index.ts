import { AxiosResponse } from "axios";
import {
  WeatherDayResponse,
  WeatherForecastData,
  WeatherForecastResponse,
} from "../../global/models/weather";
import api from "./api";

export async function getWeatherFromLatLng(
  lat: number,
  lon: number
): Promise<WeatherDayResponse | null> {
  const response: AxiosResponse<WeatherDayResponse> = await api.get(
    "/data/2.5/weather",
    {
      params: {
        lat,
        lon,
      },
    }
  );
  if (response.status == 200) {
    return response.data;
  }
  return null;
}

export async function getSevenDaysForecastFromLatLng(
  lat: number,
  lon: number
): Promise<WeatherForecastData[] | null> {
  const response: AxiosResponse<WeatherForecastResponse> = await api.get(
    "/data/2.5/onecall",
    {
      params: {
        lat,
        lon,
        exclude: "hourly,minutely,alerts,current",
      },
    }
  );
  if (response.status == 200) {
    return response.data.daily;
  }
  return null;
}
