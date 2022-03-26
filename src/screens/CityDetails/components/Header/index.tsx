import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Menu, MenuItem } from "react-native-material-menu";

import HeaderBase from "../../../../components/HeaderBase";

import useCities from "../../../../stores/cities";
import { CityProps } from "../../../../global/models/city";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../../../global/styles";
import { styles } from "./styles";

type Props = {
  city: CityProps;
};

export function Header({ city }: Props) {
  const { removeCity } = useCities((state) => state.actions);

  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);

  async function handleRemoveCity() {
    setMenuVisible(false);
    navigation.goBack();
    await removeCity(city);
  }

  return (
    <HeaderBase
      prefix={
        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="chevron-left" size={23} color={theme.colors.white} />
          </TouchableOpacity>
          <Text style={styles.city}>{city.name}</Text>
        </View>
      }
      action={
        <Menu
          visible={menuVisible}
          anchor={
            <TouchableOpacity onPress={() => setMenuVisible(true)}>
              <Feather
                name="more-vertical"
                size={23}
                color={theme.colors.white}
              />
            </TouchableOpacity>
          }
          onRequestClose={() => setMenuVisible(false)}
        >
          <MenuItem onPress={async () => await handleRemoveCity()}>
            <View style={styles.row}>
              <Feather name="trash-2" size={23} color={theme.colors.red} />
              <Text style={styles.remove}>Apagar cidade</Text>
            </View>
          </MenuItem>
        </Menu>
      }
    />
  );
}
