import { Pressable, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function StockScreen() {
  return (
    <View style={{ flex: 1, paddingTop: 30 }}>
      <Text>Avalilable Stocks</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
