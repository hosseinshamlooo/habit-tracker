import React, { useState } from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ButtonNavBar from "../../components/ButtonNavBar";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const insets = useSafeAreaInsets();

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
    // TODO: Implement actual screen navigation logic here
    console.log(`Switched to ${tabId} tab`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <View className="flex-1 items-center justify-center">
            <Text className="text-2xl font-bold text-gray-800 mb-4">Home</Text>
            <Text className="text-gray-600 text-center px-4">
              Welcome to your habit tracker! Start building healthy habits
              today.
            </Text>
          </View>
        );
      case "history":
        return (
          <View className="flex-1 items-center justify-center">
            <Text className="text-2xl font-bold text-gray-800 mb-4">
              History
            </Text>
            <Text className="text-gray-600 text-center px-4">
              Track your progress and see your habit completion history.
            </Text>
          </View>
        );
      case "goals":
        return (
          <View className="flex-1 items-center justify-center">
            <Text className="text-2xl font-bold text-gray-800 mb-4">Goals</Text>
            <Text className="text-gray-600 text-center px-4">
              Set and manage your habit goals and milestones.
            </Text>
          </View>
        );
      case "settings":
        return (
          <View className="flex-1 items-center justify-center">
            <Text className="text-2xl font-bold text-gray-800 mb-4">
              Settings
            </Text>
            <Text className="text-gray-600 text-center px-4">
              Customize your app preferences and account settings.
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView className="flex-1">{renderContent()}</ScrollView>
      <View className="bg-white" style={{ paddingBottom: insets.bottom }}>
        <ButtonNavBar activeTab={activeTab} onTabPress={handleTabPress} />
      </View>
    </View>
  );
}
