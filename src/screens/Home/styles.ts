import { StyleSheet } from "react-native";
import { theme } from "../../global/styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: "row",
    marginTop: 16,
  },
  fullCenter: {
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
