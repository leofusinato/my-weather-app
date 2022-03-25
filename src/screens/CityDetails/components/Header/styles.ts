import { StyleSheet } from "react-native";
import { theme } from "../../../../global/styles";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  city: {
    fontSize: 20,
    color: theme.colors.white,
    marginLeft: 40,
  },
  remove: {
    fontSize: 14,
    color: theme.colors.black,
    marginLeft: 7,
  },
});
