import { View, Pressable, useWindowDimensions } from "react-native";

import { Image } from "expo-image";
import { Text } from "react-native-paper";
import { formatCurrecy } from "../utils/formatCurrecy";
import { router } from "expo-router";

export default function StockCard({
  ticker,
  companyName,
  price,
  priceChange,
  priceChangePercentage,
  image,
}) {
  const { width } = useWindowDimensions();

  return (
    <Pressable
      style={{
        width: "100%",
        marginBottom: 5,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 50,
        backgroundColor: "#132323",
        borderStyle: "solid",
        borderColor: "rgba(86, 219, 214, 0.18)",
        borderWidth: 1,

        flexDirection: "row",
        height: 50,
      }}
      onPress={() => router.push(`/${ticker}`)}
    >
      <Image
        source={image}
        style={{ height: 30, width: 30 }}
        contentFit="contain"
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: width - 75,
          paddingLeft: 15,
        }}
      >
        <View>
          <Text
            variant="titleMedium"
            style={{
              fontWeight: "bold",
            }}
          >
            {ticker}
          </Text>
          <Text>{companyName}</Text>
        </View>
        <View
          style={{
            alignItems: "flex-end",
          }}
        >
          <Text
            variant="titleMedium"
            style={{
              fontWeight: "bold",
            }}
          >
            {formatCurrecy(price)}
          </Text>
          <Text
            variant="labelMedium"
            style={{
              color:
                priceChange < 0
                  ? "red"
                  : priceChange > 0
                  ? "lightgreen"
                  : "auto",
            }}
          >
            {formatCurrecy(priceChange)} {priceChangePercentage.toFixed(2)}%
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
