import { StyleSheet } from "react-native";

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputField: {
    width: "100%",
    height: 36,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "white",
  },
  btnIcon: { position: "absolute", left: 16 },
});
