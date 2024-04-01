import { useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import StockCard from "../components/StockCard";
import { StoreContext } from "./_layout";

export default function SearchScreen() {
  const { searchQuery, searchedStocks } = useContext(StoreContext);

  if (!searchQuery && searchedStocks.length === 0)
    return (
      <View style={styles.container}>
        <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
          Search Stocks
        </Text>
      </View>
    );

  if (searchQuery && searchedStocks.length === 0)
    return (
      <View style={styles.container}>
        <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
          No Stocks Found
        </Text>
      </View>
    );

  return (
    <FlatList
      data={searchedStocks}
      keyExtractor={(item) => item.ticker}
      renderItem={({ item }) => <StockCard {...item} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
