import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";

import HeaderBase from "../../../../components/HeaderBase";

import { styles } from "./styles";
import { theme } from "../../../../global/styles";

import { useNavigation } from "@react-navigation/native";
import { AppStackParamList } from "../../../../global/routes.types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export function Header() {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList, "Home">>();

  return (
    <HeaderBase
      prefix={<Text style={styles.city}>Cidades</Text>}
      action={
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Favorites");
          }}
        >
          <Feather name="heart" size={20} color={theme.colors.white} />
        </TouchableOpacity>
      }
    />
  );
}
