import React from "react";
import { Feather } from "@expo/vector-icons";

import { View, Text, TouchableOpacity } from "react-native";
import HeaderBase from "../../../../components/HeaderBase";

import { styles } from "./styles";

import { useNavigation } from "@react-navigation/native";
import { theme } from "../../../../global/styles";

export function Header() {
  const navigation = useNavigation();

  return (
    <HeaderBase
      prefix={
        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="chevron-left" size={23} color={theme.colors.white} />
          </TouchableOpacity>
          <Text style={styles.city}>Cidades favoritas</Text>
        </View>
      }
    />
  );
}
