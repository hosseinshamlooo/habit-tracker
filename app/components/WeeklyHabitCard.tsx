import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface WeeklyHabitCardProps {
  title: string;
  frequency: string;
  color: string;
  icon: string;
  dailyProgress: boolean[];
  notificationsEnabled: boolean;
  onPress?: () => void;
}

export default function WeeklyHabitCard({
  title,
  frequency,
  color,
  icon,
  dailyProgress,
  notificationsEnabled,
  onPress,
}: WeeklyHabitCardProps) {
  const days = ["Tue", "Mon", "Sun", "Sat", "Fri", "Thu", "Wed"];
  const dates = ["21", "20", "19", "18", "17", "16", "15"];

  const getColorClasses = (color: string) => {
    const colorMap: {
      [key: string]: {
        bg: string;
        text: string;
        progressColor: string;
        notificationColor: string;
        titleColor: string;
      };
    } = {
      purple: {
        bg: "bg-white",
        text: "text-gray-800",
        progressColor: "bg-purple-400",
        notificationColor: "#a855f7",
        titleColor: "text-purple-600",
      },
      orange: {
        bg: "bg-white",
        text: "text-gray-800",
        progressColor: "bg-orange-400",
        notificationColor: "#fb923c",
        titleColor: "text-orange-600",
      },
      green: {
        bg: "bg-white",
        text: "text-gray-800",
        progressColor: "bg-green-400",
        notificationColor: "#4ade80",
        titleColor: "text-green-600",
      },
      gray: {
        bg: "bg-white",
        text: "text-gray-800",
        progressColor: "bg-gray-400",
        notificationColor: "#9ca3af",
        titleColor: "text-gray-600",
      },
    };
    return colorMap[color] || colorMap.gray;
  };

  const colorClasses = getColorClasses(color);

  return (
    <TouchableOpacity
      className={`flex-row items-center p-4 rounded-2xl mb-4 mt-2 mx-3 ${colorClasses.bg}`}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Left side - Title and frequency */}
      <View className="flex-1">
        <View className="flex-row items-center justify-between mb-3">
          <Text
            className={`text-lg font-semibold font-quando ${colorClasses.titleColor}`}
          >
            {title}
          </Text>
          <View className="flex-row items-center">
            <Text className="text-gray-600 text-sm font-quando mr-2">
              {frequency}
            </Text>
            <Ionicons
              name={
                notificationsEnabled ? "notifications" : "notifications-off"
              }
              size={16}
              color={
                notificationsEnabled
                  ? colorClasses.notificationColor
                  : "#6b7280"
              }
            />
          </View>
        </View>

        {/* Daily progress indicators */}
        <View className="flex-row justify-between">
          {days.map((day, index) => (
            <View key={index} className="items-center">
              <Text className="text-gray-500 text-xs font-quando mb-1">
                {day}
              </Text>
              <View
                className={`w-12 h-12 rounded-full items-center justify-center ${
                  dailyProgress[index]
                    ? colorClasses.progressColor
                    : "bg-gray-600"
                }`}
              >
                <Text className="text-white text-sm font-medium font-quando">
                  {dates[index]}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
}
