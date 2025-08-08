import "./global.css";
import React, { useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ButtonNavBar from "./components/ButtonNavBar";
import GoalsScreen from "./screens/goals";

export default function Goals() {
  const [activeTab, setActiveTab] = useState("goals");
  const insets = useSafeAreaInsets();

  const router = useRouter();

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);

    switch (tabId) {
      case "home":
        router.push("/");
        break;
      case "goals":
        // Already on goals, no navigation needed
        break;
      case "settings":
        router.push("/settings");
        break;
    }
  };

  return (
    <View className="flex-1 bg-gray-100">
      <GoalsScreen />
      <View className="bg-white" style={{ paddingBottom: insets.bottom }}>
        <ButtonNavBar activeTab={activeTab} onTabPress={handleTabPress} />
      </View>
    </View>
  );
}
