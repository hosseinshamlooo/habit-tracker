import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
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
        <View className="flex-row">
          {/* Days of week labels */}
          <View className="mr-2">
            {daysOfWeek.map((day, index) => (
              <View key={index} className="h-6 items-center justify-center">
                <Text className="text-gray-500 text-xs font-quando">{day}</Text>
              </View>
            ))}
          </View>

          {/* Monthly grids */}
          {months.map((month) => (
            <View key={month} className="flex-1 mr-2">
              {/* Month label */}
              <Text className="text-gray-500 text-xs font-quando text-center mb-1">
                {month}
              </Text>

              {/* Days grid */}
              <View className="flex-row flex-wrap">
                {Array.from({ length: 28 }, (_, i) => {
                  const day = (i + 1).toString();
                  const status = getDayStatus(month, day);
                  return (
                    <View
                      key={i}
                      className={`w-3 h-3 m-0.5 rounded-sm items-center justify-center ${getDayStyle(status)}`}
                    >
                      {renderSpecialIcon(status)}
                    </View>
                  );
                })}
              </View>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
}
