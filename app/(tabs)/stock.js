import {
  FlatList,
  StyleSheet,
  useWindowDimensions,
  View,
  TextInput,
} from "react-native";
import { Text } from "react-native-paper";
import { stocks } from "../../data";

import StockCard from "../../components/StockCard";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function StockScreen() {
  const { width } = useWindowDimensions();

  return (
    <LinearGradient
      style={styles.welcome}
      locations={[0, 0.47, 1]}
      colors={["#183A39", "#1D3131", "#1C3838"]}
    >
      <LinearGradient
        style={styles.innerGradient}
        locations={[0, 0.4, 1]}
        colors={["#294C49", "#1D3D3C", "#1E3F3E"]}
      >
        <View style={{ flex: 1, paddingTop: 30 }}>
          <TextInput
            style={{
              // width: "100%",
              height: 50,
              marginHorizontal: 10,
              marginBottom: 5,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 50,
              backgroundColor: "#132323",
              borderStyle: "solid",
              borderColor: "rgba(86, 219, 214, 0.18)",
              borderWidth: 1,
            }}
            // placeholder="Search Stocks..."
            // disabled
            // mode="outlined"
            // left={<TextInput.Icon icon={"magnify"} />}
            // onPressIn={() => router.push("/search")}
          >
            <Ionicons
              name="search"
              size={24}
              style={{ position: "absolute", left: 16, color: "white" }}
            />
          </TextInput>

          <View></View>

          <View
            style={{
              flex: 1,
              paddingHorizontal: 13,
              paddingVertical: 13,
              marginHorizontal: 10,
              borderRadius: 30,
              backgroundColor: "#182c2b",
              borderStyle: "solid",
              borderColor: "rgba(86, 219, 214, 0.18)",
              borderWidth: 1,
            }}
          >
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
        </View>
        <View
          style={{
            width: "95%",
            height: 70,
            marginTop: 15,
            marginBottom: 20,
            borderRadius: 50,
            backgroundColor: "#182c2b",
            shadowColor: "rgba(56, 150, 117, 0.2)",
            shadowOffset: {
              width: -2,
              height: -4,
            },
            shadowRadius: 4,
            elevation: 4,
            shadowOpacity: 1,
            borderStyle: "solid",
            borderColor: "#000",
            borderWidth: 1,
          }}
        >
          <View
            style={{
              height: "100%",
              width: "100%",
              borderRadius: 50,
              backgroundColor: "rgba(24, 49, 46, 0.1)",
              borderStyle: "solid",
              borderColor: "rgba(41, 88, 78, 0.7)",
              borderWidth: 1,
            }}
          ></View>
        </View>
      </LinearGradient>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  welcome: {
    flex: 1,
    padding: 10,
  },
  innerGradient: {
    flex: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  container: {
    height: "93%",
    width: "93%",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "rgba(24, 49, 46, 0.1)",
    borderStyle: "solid",
    borderColor: "rgba(86, 219, 214, 0.18)",
    borderWidth: 1,
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
