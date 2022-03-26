import React, { useEffect } from "react";
import { ActivityIndicator, ScrollView, StatusBar, View } from "react-native";

import { Header } from "./components/Header";
import NoData from "./components/NoData";
import { CityCard } from "../../components/CityCard";
import { GoogleTextField } from "./components/GoogleTextField";

import useCities from "../../stores/cities";
import { theme } from "../../global/styles";
import { styles } from "./styles";

export default function Home() {
  const { cities, loading } = useCities((state) => state.state);
  const { loadInitialData } = useCities((state) => state.actions);

  useEffect(() => {
    (async () => {
      await loadInitialData();
    })();
  }, []);

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.primary}
        barStyle="light-content"
      />
      <Header />
      <View style={styles.container}>
        <View style={styles.row}>
          <GoogleTextField />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {loading ? (
            <ActivityIndicator
              size={"large"}
              color={theme.colors.primary}
              style={styles.fullCenter}
            />
          ) : cities.length > 0 ? (
            <>
              {cities.map((city, index) => {
                return (
                  <CityCard
                    key={index}
                    title={city.name}
                    description={city.country}
                    data={city}
                  />
                );
              })}
            </>
          ) : (
            <NoData />
          )}
        </ScrollView>
      </View>
    </>
  );
}
