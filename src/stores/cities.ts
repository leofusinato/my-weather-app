import create from "zustand";
import produce from "immer";
import * as asyncStorage from "../services/storage";
import { CityProps } from "../global/models/city";
import {
  GooglePlaceData,
  GooglePlaceDetail,
} from "react-native-google-places-autocomplete";
import { getWeatherFromLatLng } from "../services/openweather";
import { capitalize } from "../utils/string";
import { Alert } from "react-native";

type State = {
  state: {
    cities: CityProps[];
    loading: boolean;
  };
  actions: {
    refreshData: () => Promise<void>;
    addCity: (cityToAdd: CityProps) => Promise<void>;
    loadInitialData: () => Promise<void>;
    findCity: (
      data: GooglePlaceData,
      details: GooglePlaceDetail | null
    ) => Promise<void>;
    removeCity: (cityToRemove: CityProps) => Promise<void>;
    toggleFavorite: (cityToFavorite: CityProps) => Promise<void>;
  };
};

const useCities = create<State>((set, get) => {
  const setState = (fn: any) => set(produce(fn));

  const setLoading = (loading: boolean) => {
    setState(({ state }: State) => {
      state.loading = loading;
    });
  };

  const setCities = (cities: CityProps[]) => {
    setState(({ state }: State) => {
      state.cities = cities;
    });
  };

  const getCities = () => {
    return get().state.cities;
  };

  return {
    state: {
      cities: [],
      loading: false,
    },
    actions: {
      addCity: async (cityToAdd: CityProps) => {
        const newCities = [...getCities(), cityToAdd];
        await asyncStorage.setCities(newCities);
        setCities(newCities);
      },
      loadInitialData: async () => {
        setLoading(true);
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
            setCities([...getCities(), city]);
          });
        }
        setLoading(false);
      },
      findCity: async (
        data: GooglePlaceData,
        details: GooglePlaceDetail | null
      ) => {
        setLoading(true);
        if (details) {
          const { lat, lng } = details.geometry.location;
          const response = await getWeatherFromLatLng(lat, lng);
          if (response) {
            const cityToAdd = data.structured_formatting.main_text.trim();
            const otherInfos =
              data.structured_formatting.secondary_text.split(",");
            const country = otherInfos[otherInfos.length - 1].trim();
            const exists = getCities().find((city) => city.name === cityToAdd);
            if (!exists) {
              await get().actions.addCity({
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
      },
      refreshData: async () => {
        setCities([]);
        await get().actions.loadInitialData();
      },
      removeCity: async (cityToRemove: CityProps) => {
        const newCities = getCities().filter((city) => {
          if (city.name !== cityToRemove.name) {
            return city;
          }
        });
        setCities(newCities);
        await asyncStorage.setCities(newCities);
      },
      toggleFavorite: async (cityToFavorite: CityProps) => {
        let cities = getCities();
        const find = cities.findIndex((city) => {
          if (city.name == cityToFavorite.name) {
            return city;
          }
        });
        if (find >= 0) {
          setState(({ state }: State) => {
            state.cities[find].favorite = !state.cities[find].favorite;
          });
          setState(({ state }: State) => {
            state.cities.sort((a) => {
              return a.favorite ? -1 : 1;
            });
          });
        }
        await asyncStorage.setCities(getCities());
      },
    },
  };
});

export default useCities;
