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
  refreshData: () => Promise<void>;
  loading: boolean;
  findCity: (
    data: GooglePlaceData,
    details: GooglePlaceDetail | null
  ) => Promise<void>;
  removeCity: (cityToRemove: CityProps) => Promise<void>;
  toggleFavorite: (city: CityProps) => Promise<void>;
};

const CitiesContext = createContext({} as CitiesContextData);

export function CitiesProvider({ children }: Props) {
  const [cities, setCities] = useState<CityProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (loading) return;
      setLoading(true);
      await loadInitialData();
      setLoading(false);
    })();
  }, []);

  async function refreshData() {
    setLoading(true);
    setCities([]);
    await loadInitialData();
    setLoading(false);
  }

  async function loadInitialData() {
    const storageCities = await asyncStorage.getCities();
    if (storageCities) {
      // we need to update the forecast because the app can be opened after some hours and some infos can be different
      storageCities.map(async (city) => {
        const currentWeatherResponse = await getWeatherFromLatLng(
          city.lat,
          city.lng
        );
        if (currentWeatherResponse) {
          city.description = capitalize(
            currentWeatherResponse.weather[0].description
          );
          city.temp = Math.round(currentWeatherResponse.main.temp);
          city.tempMax = Math.round(currentWeatherResponse.main.temp_max);
          city.tempMin = Math.round(currentWeatherResponse.main.temp_min);
        }
        setCities((old) => [...old, city]);
      });
    }
  }

  async function findCity(
    data: GooglePlaceData,
    details: GooglePlaceDetail | null
  ) {
    if (details) {
      const { lat, lng } = details.geometry.location;
      const response = await getWeatherFromLatLng(lat, lng);
      if (response) {
        const cityToAdd = data.structured_formatting.main_text.trim();
        const otherInfos = data.structured_formatting.secondary_text
          ? data.structured_formatting.secondary_text.split(",")
          : data.structured_formatting.main_text.split(",");
        const country = otherInfos[otherInfos.length - 1].trim();
        const exists = cities.find((city) => city.name === cityToAdd);
        if (!exists) {
          await addCity({
            name: cityToAdd,
            country,
            description: capitalize(response.weather[0].description),
            favorite: false,
            temp: Math.round(response.main.temp),
            tempMin: Math.round(response.main.temp_min),
            tempMax: Math.round(response.main.temp_max),
            lat,
            lng,
          });
        } else {
          Alert.alert("", "Esta cidade já foi adicionada");
        }
      }
    }
    setLoading(false);
  }

  async function addCity(cityToAdd: CityProps): Promise<void> {
    const newCities = [...cities, cityToAdd];
    await asyncStorage.setCities(newCities);
    setCities(newCities);
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
      value={{
        refreshData,
        cities,
        loading,
        findCity,
        removeCity,
        toggleFavorite,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export function useCities() {
  const context = useContext(CitiesContext);
  return context;
}
