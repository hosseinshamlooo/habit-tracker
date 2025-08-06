import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface MonthlyHabitCardProps {
  title: string;
  frequency: string;
  color: string;
  icon: string;
  monthlyProgress: {
    [month: string]: {
      [day: string]: "completed" | "special" | "current" | "incomplete";
    };
  };
  notificationsEnabled: boolean;
  onPress?: () => void;
}

export default function MonthlyHabitCard({
  title,
  frequency,
  color,
  icon,
  monthlyProgress,
  notificationsEnabled,
  onPress,
}: MonthlyHabitCardProps) {
  const months = ["Jan", "Feb", "Mar", "Apr"];
  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

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

  const getDayStatus = (month: string, day: string) => {
    return monthlyProgress[month]?.[day] || "incomplete";
  };

  const getDayStyle = (status: string) => {
    switch (status) {
      case "completed":
        return colorClasses.progressColor;
      case "special":
        return "bg-white";
      case "current":
        return "bg-white border border-gray-400";
      default:
        return "bg-gray-100";
    }
  };

  const renderSpecialIcon = (status: string) => {
    if (status === "special") {
      return <View className="w-3 h-3 bg-purple-400 rounded-sm" />;
    }
    return null;
  };

  return (
    <TouchableOpacity
      className={`flex-row items-center p-4 rounded-2xl mb-4 mt-2 mx-3 ${colorClasses.bg}`}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Left side - Title and frequency */}
      <View className="flex-1">
        <View className="flex-row items-center justify-between mb-4">
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

        {/* Calendar Grid */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row">
            {/* Days of week labels */}
            <View className="mr-2">
              {daysOfWeek.map((day, index) => (
                <View
                  key={index}
                  className="h-3 items-center justify-center mb-1"
                >
                  <Text className="text-gray-500 text-xs font-quando">
                    {day}
                  </Text>
                </View>
              ))}
            </View>

            {/* Monthly grids */}
            <View className="flex-row">
              {/* Tiles grid */}
              <View className="flex-row">
                {Array.from({ length: 28 }, (_, colIndex) => (
                  <View key={colIndex} className="mr-0.5">
                    {Array.from({ length: 7 }, (_, rowIndex) => {
                      const dayIndex = colIndex * 7 + rowIndex + 1;
                      const day = dayIndex.toString();
                      const status = getDayStatus("Jan", day); // For now, just use Jan data
                      return (
                        <View
                          key={rowIndex}
                          className={`w-3 h-3 m-0.5 rounded-sm items-center justify-center ${getDayStyle(status)}`}
                        >
                          {renderSpecialIcon(status)}
                        </View>
                      );
                    })}
                  </View>
                ))}
              </View>

              {/* Month labels at bottom */}
              <View className="flex-row">
                {["Jan", "Feb", "Mar", "Apr"].map((month, monthIndex) => (
                  <View key={monthIndex} className="mr-0.5">
                    <Text className="text-gray-500 text-xs font-quando text-center mt-1">
                      {month}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableOpacity>
  );
}
