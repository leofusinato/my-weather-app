import React from "react";

import { ScrollView, Text } from "react-native";
import { CityCard } from "../../components/CityCard";
import useCities from "../../stores/cities";
// import { useCities } from "../../contexts/CitiesProvider";
import { Header } from "./components/Header";

import { styles } from "./styles";

export function Favorites() {
  const { cities } = useCities((state) => state.state);
  const favorites = cities.filter((city) => {
    if (city.favorite) {
      return city;
    }
  });

  return (
    <>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {favorites.length > 0 ? (
          favorites.map((city) => {
            return (
              <CityCard
                key={city.name}
                title={city.name}
                description={city.description}
                data={city}
              />
            );
          })
        ) : (
          <Text style={styles.noDataText}>
            Você não possui nenhuma cidade favoritada
          </Text>
        )}
      </ScrollView>
    </>
  );
}
