import React from "react";
import { View, Text, ScrollView } from "react-native";

export default function GoalsScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-2xl font-bold text-gray-800 mb-4">Goals</Text>
        <Text className="text-gray-600 text-center px-4">
          Set and manage your habit goals and milestones.
        </Text>
      </View>
    </ScrollView>
  );
}
