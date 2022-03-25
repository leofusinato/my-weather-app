import { StyleSheet } from "react-native";
import { theme } from "../../../../global/styles";

export const styles = StyleSheet.create({
  city: {
    fontSize: 18,
    color: theme.colors.white,
    fontWeight: "bold",
    marginLeft: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
