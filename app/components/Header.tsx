import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface HeaderProps {
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
}

export default function Header({
  selectedPeriod,
  onPeriodChange,
}: HeaderProps) {
  const periods = ["Today", "Weekly", "Monthly"];

  return (
    <View className="bg-white px-4 pt-20 pb-6 rounded-b-3xl">
      {/* Header with title */}
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-3xl font-quando text-gray-800 ml-3">
          Habit Tracker
        </Text>
      </View>

      {/* Segmented Control */}
      <View className="bg-gray-200 rounded-full p-1 mx-8">
        <View className="flex-row">
          {periods.map((period) => {
            const isSelected = selectedPeriod === period;
            return (
              <TouchableOpacity
                key={period}
                className={`flex-1 py-2 px-4 rounded-full ${
                  isSelected ? "bg-gray-800" : "bg-transparent"
                }`}
                onPress={() => onPeriodChange(period)}
                activeOpacity={0.7}
              >
                <Text
                  className={`text-center text-sm font-quando ${
                    isSelected ? "text-white" : "text-gray-700"
                  }`}
                >
                  {period}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}
