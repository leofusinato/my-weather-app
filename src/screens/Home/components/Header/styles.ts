import { StyleSheet } from "react-native";
import { theme } from "../../../../global/styles";

export const styles = StyleSheet.create({
  city: {
    fontFamily: theme.fonts.bold700,
    fontSize: 18,
    color: theme.colors.white,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
