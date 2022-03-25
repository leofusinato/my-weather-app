import AsyncStorage from "@react-native-async-storage/async-storage";

import { CityProps } from "../global/models/city";

const STORAGE_CITIES_KEY = "@WeatherApp:cities";

export async function setCities(cities: CityProps[]): Promise<void> {
  const data = JSON.stringify(cities);
  await AsyncStorage.setItem(STORAGE_CITIES_KEY, data);
}

export async function getCities(): Promise<CityProps[] | null> {
  const cities = await AsyncStorage.getItem(STORAGE_CITIES_KEY);
  if (cities) {
    return JSON.parse(cities);
  }
  return null;
}
