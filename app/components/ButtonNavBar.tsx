import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface NavItem {
  id: string;
  label: string;
  iconActive: keyof typeof Ionicons.glyphMap;
  iconInactive: keyof typeof Ionicons.glyphMap;
}

const navItems: NavItem[] = [
  {
    id: "home",
    label: "Home",
    iconActive: "home",
    iconInactive: "home-outline",
  },
  {
    id: "history",
    label: "History",
    iconActive: "time",
    iconInactive: "time-outline",
  },
  {
    id: "goals",
    label: "Goals",
    iconActive: "trophy",
    iconInactive: "trophy-outline",
  },
  {
    id: "settings",
    label: "Settings",
    iconActive: "settings",
    iconInactive: "settings-outline",
  },
];

interface ButtonNavBarProps {
  activeTab: string;
  onTabPress: (tabId: string) => void;
}

export default function ButtonNavBar({
  activeTab,
  onTabPress,
}: ButtonNavBarProps) {
  return (
    <View className="bg-white border-t border-gray-200">
      <View className="flex-row justify-around items-center py-3">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const iconName = isActive ? item.iconActive : item.iconInactive;

          return (
            <TouchableOpacity
              key={item.id}
              className="flex-1 items-center"
              activeOpacity={0.7}
              onPress={() => onTabPress(item.id)}
            >
              <Ionicons
                name={iconName}
                size={28}
                color={isActive ? "#1f2937" : "#6b7280"}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
