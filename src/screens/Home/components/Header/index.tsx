import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import HeaderBase from "../../../../components/HeaderBase";

import { useCities } from "../../../../contexts/CitiesProvider";
import { useNavigation } from "@react-navigation/native";
import { AppStackParamList } from "../../../../global/routes.types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { styles } from "./styles";
import { theme } from "../../../../global/styles";

export function Header() {
  const { refreshData } = useCities();

  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList, "Home">>();

  return (
    <HeaderBase
      prefix={<Text style={styles.city}>Cidades</Text>}
      action={
        <View style={styles.row}>
          <TouchableOpacity
            onPress={async () => {
              await refreshData();
            }}
          >
            <Feather name="refresh-cw" size={20} color={theme.colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Favorites");
            }}
          >
            <Feather
              name="heart"
              size={20}
              color={theme.colors.white}
              style={{ marginLeft: 24 }}
            />
          </TouchableOpacity>
        </View>
      }
    />
  );
}
