import "./global.css";
import React, { useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ButtonNavBar from "./components/ButtonNavBar";
import SettingsScreen from "./screens/settings";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("settings");
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);

    switch (tabId) {
      case "home":
        router.push("/");
        break;
      case "history":
        router.push("/history");
        break;
      case "goals":
        router.push("/goals");
        break;
      case "settings":
        // Already on settings, no navigation needed
        break;
    }
  };

  return (
    <View className="flex-1 bg-gray-100">
      <SettingsScreen />
      <View className="bg-white" style={{ paddingBottom: insets.bottom }}>
        <ButtonNavBar activeTab={activeTab} onTabPress={handleTabPress} />
      </View>
    </View>
  );
}
