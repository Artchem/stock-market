import { FlatList, StyleSheet, useWindowDimensions, View } from "react-native";
import { Text } from "react-native-paper";
import { stocks } from "../../data";

import StockCard from "../../components/StockCard";

export default function StockScreen() {
  const { width } = useWindowDimensions();

  return (
    <View style={{ flex: 1, paddingTop: 30 }}>
      <Text
        variant="titleLarge"
        style={{
          fontWeight: "bold",
          marginLeft: 5,
          marginBottom: 5,
        }}
      >
        Avalilable Stocks
      </Text>
      <FlatList
        keyExtractor={(item) => item.ticker}
        data={stocks}
        renderItem={({ item }) => (
          <StockCard
            image={item.image}
            ticker={item.ticker}
            price={item.price}
            companyName={item.companyName}
            priceChange={item.priceChange}
            priceChangePercentage={item.priceChangePercentage}
          />
        )}
      />
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
