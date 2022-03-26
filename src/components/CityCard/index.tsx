import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { CityProps } from "../../global/models/city";

import useCities from "../../stores/cities";
import { useNavigation } from "@react-navigation/native";
import { AppStackParamList } from "../../global/routes.types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { theme } from "../../global/styles";
import { styles } from "./styles";

type Props = {
  title: string;
  description: string;
  data: CityProps;
  pressable?: boolean;
};

export function CityCard({
  title,
  description,
  data,
  pressable = true,
}: Props) {
  const { toggleFavorite } = useCities((state) => state.actions);

  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList, "Home">>();

  return (
    <TouchableOpacity
      disabled={!pressable}
      style={styles.container}
      onPress={() => navigation.navigate("CityDetails", { city: data })}
    >
      <View style={styles.row}>
        <View>
          <Text style={styles.city}>{title}</Text>
          <Text style={styles.country}>{description}</Text>
        </View>
        <Text style={styles.temperature}>{data.temp}º</Text>
      </View>
      <View style={[styles.row, styles.footer]}>
        <View>
          <Text style={styles.description}>{data.description}</Text>
          <Text style={styles.temperatureRange}>
            {data.tempMin}º - {data.tempMax}º
          </Text>
        </View>
        {pressable && (
          <TouchableOpacity onPress={async () => await toggleFavorite(data)}>
            <AntDesign
              name={data.favorite ? "heart" : "hearto"}
              size={20}
              color={theme.colors.red}
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}
