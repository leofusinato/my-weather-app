import { StyleSheet } from "react-native";
import { theme } from "../../../../global/styles";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  city: {
    fontFamily: theme.fonts.regular400,
    fontSize: 20,
    color: theme.colors.white,
    marginLeft: 40,
  },
  remove: {
    fontFamily: theme.fonts.regular400,
    fontSize: 14,
    color: theme.colors.black,
    marginLeft: 7,
  },
});
