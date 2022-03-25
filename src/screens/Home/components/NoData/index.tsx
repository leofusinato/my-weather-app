import React from "react";

import { View, Text } from "react-native";

import { styles } from "./styles";

export default function NoData() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Parece que você ainda não adicionou uma cidade
      </Text>
      <Text style={styles.subtitle}>
        Tente adicionar uma cidade usando o botão de busca
      </Text>
    </View>
  );
}
