import { BarChart as Bar } from "react-native-gifted-charts";
import { View, StyleSheet, Text } from "react-native";
import React from "react";

export const BarChart = ({ label, data, color, style }) => {
  const maxValue = Math.max(...data.map((i) => i.value));

  return (
    <View style={[styles.container]}>
      <Text style={styles.text}>{label}</Text>
      <Bar
        height={150}
        maxValue={maxValue * 1.5}
        barWidth={50}
        initialSpacing={0}
        noOfSections={5}
        rulesColor={"black"}
        barBorderRadius={4}
        frontColor={color}
        data={data}
        rotateLabel
        xAxisColor={"gray"}
        xAxisThickness={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 250,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
