import "./global.css";
import React, { useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ButtonNavBar from "./components/ButtonNavBar";
import HomeScreen from "./screens/home";

export default function Index() {
  const [activeTab, setActiveTab] = useState("home");
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);

    switch (tabId) {
      case "home":
        // Already on home, no navigation needed
        break;
      case "history":
        router.push("/history");
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
      <HomeScreen />
      <View className="bg-white" style={{ paddingBottom: insets.bottom }}>
        <ButtonNavBar activeTab={activeTab} onTabPress={handleTabPress} />
      </View>
    </View>
  );
}
