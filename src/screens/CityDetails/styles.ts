import { StyleSheet } from "react-native";
import { theme } from "../../global/styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: theme.colors.background,
  },
  description: {
    fontFamily: theme.fonts.regular400,
    marginVertical: 16,
    fontSize: 12,
    color: theme.colors.black,
    textAlign: "center",
  },
});
