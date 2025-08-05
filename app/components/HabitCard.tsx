import React from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PanGestureHandler, State } from "react-native-gesture-handler";

interface HabitCardProps {
  title: string;
  time: string;
  frequency: string;
  color: string;
  icon: string;
  isCompleted?: boolean;
  onPress?: () => void;
  onToggleComplete?: (habitName: string, completed: boolean) => void;
}

export default function HabitCard({
  title,
  time,
  frequency,
  color,
  icon,
  isCompleted = false,
  onPress,
  onToggleComplete,
}: HabitCardProps) {
  const translateX = new Animated.Value(0);
  const opacity = new Animated.Value(1);

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      const { translationX } = event.nativeEvent;

      if (translationX > 50) {
        // Swipe right - mark as completed
        if (!isCompleted && onToggleComplete) {
          onToggleComplete(title, true);
        }
      } else if (translationX < -50) {
        // Swipe left - mark as incomplete
        if (isCompleted && onToggleComplete) {
          onToggleComplete(title, false);
        }
      }

      // Reset position
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  const getColorClasses = (color: string) => {
    const colorMap: {
      [key: string]: {
        bg: string;
        iconBg: string;
        text: string;
        iconColor: string;
      };
    } = {
      purple: {
        bg: "bg-purple-400",
        iconBg: "bg-gray-100",
        text: "text-white",
        iconColor: "#a855f7", // purple-400 hex
      },
      orange: {
        bg: "bg-orange-400",
        iconBg: "bg-gray-100",
        text: "text-white",
        iconColor: "#fb923c", // orange-400 hex
      },
      green: {
        bg: "bg-green-400",
        iconBg: "bg-gray-100",
        text: "text-white",
        iconColor: "#4ade80", // green-400 hex
      },
      gray: {
        bg: "bg-gray-400",
        iconBg: "bg-gray-100",
        text: "text-white",
        iconColor: "#9ca3af", // gray-400 hex
      },
    };
    return colorMap[color] || colorMap.gray;
  };

  const colorClasses = getColorClasses(color);

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <Animated.View
        style={{
          transform: [{ translateX }],
          opacity,
        }}
      >
        <TouchableOpacity
          className={`flex-row items-center p-4 rounded-2xl mb-4 mt-2 mx-3 ${colorClasses.bg} ${
            isCompleted ? "opacity-60" : ""
          }`}
          onPress={onPress}
          activeOpacity={0.7}
        >
          {/* Icon */}
          <View
            className={`w-12 h-12 rounded-full ${colorClasses.iconBg} items-center justify-center mr-4`}
          >
            <Ionicons
              name={icon as any}
              size={24}
              color={colorClasses.iconColor}
            />
          </View>

          {/* Text Content */}
          <View className="flex-1">
            <Text className={`text-base font-quando ${colorClasses.text} mb-1`}>
              {title}
            </Text>
            <Text className="text-gray-200 text-xs font-quando">
              {time} — {frequency}
            </Text>
          </View>

          {/* Swipe indicator */}
          <View className="absolute right-4 opacity-30">
            <Ionicons
              name={isCompleted ? "arrow-back" : "checkmark-circle"}
              size={20}
              color="white"
            />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </PanGestureHandler>
  );
}
