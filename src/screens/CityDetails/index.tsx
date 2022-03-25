import React, { useEffect, useState } from "react";
import { Text, ScrollView, ActivityIndicator } from "react-native";
import { CityCard } from "../../components/CityCard";
import { WeatherForecastData } from "../../global/models/weather";
import { CityDetailsNavigationProps } from "../../global/routes.types";
import { getFiveDaysForecastFromLatLng } from "../../services/openweather";
import * as dateUtils from "../../utils/date";
import { capitalize } from "../../utils/string";

import { Header } from "./components/Header";

import { styles } from "./styles";

export function CityDetails({ route }: CityDetailsNavigationProps) {
  const { city } = route.params;
  const [forecastList, setForecastList] = useState<WeatherForecastData[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      await getForecast();
    })();
    setLoading(false);
  }, []);

  async function getForecast(): Promise<void> {
    const response = await getFiveDaysForecastFromLatLng(city.lat, city.lng);
    if (response) {
      setForecastList(response);
    }
  }

  return (
    <>
      <Header city={city} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.description}>Previsão para os próximos 7 dias</Text>
        {loading ? (
          <ActivityIndicator />
        ) : (
          forecastList &&
          forecastList.map((data, index) => {
            const date = dateUtils.getDateFromUnix(data.dt);
            const weekDay =
              index == 0
                ? "Hoje"
                : index == 1
                ? "Amanhã"
                : dateUtils.getWeekDay(date.getDay());

            return (
              <CityCard
                key={index}
                title={weekDay}
                description={dateUtils.getExtenseDay(date)}
                data={{
                  name: city.name,
                  country: city.country,
                  description: capitalize(data.weather[0].description),
                  favorite: false,
                  temp: Math.round(data.temp.day),
                  tempMin: Math.round(data.temp.min),
                  tempMax: Math.round(data.temp.max),
                  lat: city.lat,
                  lng: city.lng,
                }}
                pressable={false}
              />
            );
          })
        )}
      </ScrollView>
    </>
  );
}
