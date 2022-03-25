import { StyleSheet } from "react-native";
import { theme } from "../../global/styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 16,
  },
  noDataText: {
    fontFamily: theme.fonts.regular400,
    marginTop: 16,
    textAlign: "center",
    fontSize: 12,
    color: theme.colors.black,
  },
});
