import { StyleSheet } from "react-native";
import { theme } from "../../../../global/styles";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    color: theme.colors.black,
    fontFamily: theme.fonts.bold700,
  },
  subtitle: {
    fontFamily: theme.fonts.regular400,
    fontSize: 16,
    textAlign: "center",
    color: theme.colors.gray,
    marginTop: 16,
  },
});
