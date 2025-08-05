import React from "react";
import { View, Text, ScrollView } from "react-native";

export default function HistoryScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-2xl font-bold text-gray-800 mb-4">History</Text>
        <Text className="text-gray-600 text-center px-4">
          Track your progress and see your habit completion history.
        </Text>
      </View>
    </ScrollView>
  );
}
