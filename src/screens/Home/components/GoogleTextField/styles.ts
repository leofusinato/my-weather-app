import { StyleSheet } from "react-native";
import { theme } from "../../../../global/styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 16,
  },
  textInputContainer: {
    borderRadius: 16,
    overflow: "visible",
  },
  textInput: {
    fontFamily: theme.fonts.regular400,
    borderColor: theme.colors.gray,
    borderWidth: 0.5,
    borderRadius: 8,
  },
});
