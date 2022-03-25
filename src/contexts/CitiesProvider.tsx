import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { Alert } from "react-native";

import {
  GooglePlaceData,
  GooglePlaceDetail,
} from "react-native-google-places-autocomplete";
import { getWeatherFromLatLng } from "../services/openweather";
import * as asyncStorage from "../services/storage";
import { capitalize } from "../utils/string";
import { CityProps } from "../global/models/city";

type Props = {
  children: ReactNode;
};

type CitiesContextData = {
  cities: CityProps[];
  loading: boolean;
  findCity: (
    data: GooglePlaceData,
    details: GooglePlaceDetail | null
  ) => Promise<void>;
  addCity: (city: CityProps) => Promise<boolean>;
  removeCity: (city: CityProps) => Promise<void>;
  toggleFavorite: (city: CityProps) => Promise<void>;
};

const CitiesContext = createContext({} as CitiesContextData);

export function CitiesProvider({ children }: Props) {
  const [cities, setCities] = useState<CityProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      await loadInitialData();
    })();
  }, []);

  async function loadInitialData() {
    const data = await asyncStorage.getCities();
    if (data) {
      setCities(data);
    }
  }

  async function findCity(
    data: GooglePlaceData,
    details: GooglePlaceDetail | null
  ) {
    setLoading(true);
    if (details) {
      const { lat, lng } = details.geometry.location;
      const response = await getWeatherFromLatLng(lat, lng);
      if (response) {
        const city = data.structured_formatting.main_text.trim();
        const otherInfos = data.structured_formatting.secondary_text.split(",");
        const country = otherInfos[otherInfos.length - 1].trim();
        const added = await addCity({
          name: city,
          country,
          description: capitalize(response.weather[0].description),
          favorite: false,
          temp: Math.round(response.main.temp),
          tempMin: Math.round(response.main.temp_min),
          tempMax: Math.round(response.main.temp_max),
          lat,
          lng,
        });
        if (!added) {
          Alert.alert("", "Esta cidade já foi adicionada");
        }
      }
    }
    setLoading(false);
  }

  async function addCity(cityToAdd: CityProps): Promise<boolean> {
    const exists = cities.find((city) => city.name === cityToAdd.name);
    if (!exists) {
      const newCities = [...cities, cityToAdd];
      setCities(newCities);
      await asyncStorage.setCities(newCities);
      return true;
    }
    return false;
  }

  async function removeCity(cityToRemove: CityProps): Promise<void> {
    const newCities = cities.filter((city) => {
      if (city.name !== cityToRemove.name) {
        return city;
      }
    });
    setCities(newCities);
    await asyncStorage.setCities(newCities);
  }

  async function toggleFavorite(cityToFavorite: CityProps): Promise<void> {
    const newCities = cities.map((city) => {
      if (city.name == cityToFavorite.name) {
        city.favorite = !city.favorite;
      }
      return city;
    });
    const sortedCities = newCities.sort((a) => {
      return a.favorite ? -1 : 1;
    });
    setCities(sortedCities);
    await asyncStorage.setCities(sortedCities);
  }

  return (
    <CitiesContext.Provider
      value={{ cities, loading, findCity, addCity, removeCity, toggleFavorite }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export function useCities() {
  const context = useContext(CitiesContext);
  return context;
}
