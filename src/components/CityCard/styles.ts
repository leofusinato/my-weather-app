import { StyleSheet } from "react-native";
import { theme } from "../../global/styles";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 18,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: theme.colors.gray,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  city: {
    fontFamily: theme.fonts.regular400,
    fontSize: 24,
    color: theme.colors.black,
  },
  country: {
    fontFamily: theme.fonts.regular400,
    fontSize: 14,
    color: theme.colors.black,
  },
  temperature: {
    fontFamily: theme.fonts.regular400,
    fontSize: 34,
    color: theme.colors.orange,
  },
  footer: {
    marginTop: 16,
  },
  description: {
    fontFamily: theme.fonts.regular400,
    fontSize: 14,
    color: theme.colors.orange,
  },
  temperatureRange: {
    fontFamily: theme.fonts.regular400,
    fontSize: 12,
    color: theme.colors.black,
  },
});
