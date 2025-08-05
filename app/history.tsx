import "./global.css";
import React, { useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ButtonNavBar from "./components/ButtonNavBar";
import HistoryScreen from "./screens/history";

export default function History() {
  const [activeTab, setActiveTab] = useState("history");
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);

    switch (tabId) {
      case "home":
        router.push("/");
        break;
      case "history":
        // Already on history, no navigation needed
        break;
      case "goals":
        router.push("/goals");
        break;
      case "settings":
        router.push("/settings");
        break;
    }
  };

  return (
    <View className="flex-1 bg-gray-100">
      <HistoryScreen />
      <View className="bg-white" style={{ paddingBottom: insets.bottom }}>
        <ButtonNavBar activeTab={activeTab} onTabPress={handleTabPress} />
      </View>
    </View>
  );
}
