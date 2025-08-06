import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function AddHabitScreen() {
  const router = useRouter();
  const [frequency, setFrequency] = useState(4);
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [reminderTime, setReminderTime] = useState("16:00");
  const [selectedPeriod, setSelectedPeriod] = useState("Year");

  const handleBack = () => {
    router.back();
  };

  const handleShare = () => {
    // Share functionality
  };

  const handleSettings = () => {
    // Settings functionality
  };

  const increaseFrequency = () => {
    if (frequency < 7) setFrequency(frequency + 1);
  };

  const decreaseFrequency = () => {
    if (frequency > 1) setFrequency(frequency - 1);
  };

  const togglePeriod = (period: string) => {
    setSelectedPeriod(period);
  };

  return (
    <View className="flex-1 bg-gray-900">
      {/* Header */}
      <View className="flex-row items-center justify-between p-4 pt-12">
        <TouchableOpacity onPress={handleBack} className="p-2">
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-quando font-semibold">
          English
        </Text>
        <View className="flex-row">
          <TouchableOpacity onPress={handleShare} className="p-2 mr-2">
            <Ionicons name="share-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSettings} className="p-2">
            <Ionicons name="settings-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-4">
        {/* Frequency Section */}
        <View className="bg-gray-800 rounded-2xl p-4 mb-4">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-white text-lg font-quando">Frequency</Text>
            <View className="flex-row items-center">
              <Text className="text-gray-300 text-sm font-quando mr-2">
                Times a week:
              </Text>
              <View className="flex-row items-center bg-gray-700 rounded-lg px-3 py-1">
                <TouchableOpacity
                  onPress={decreaseFrequency}
                  className="w-8 h-8 rounded-full bg-blue-500 items-center justify-center mr-2"
                >
                  <Text className="text-white text-lg font-bold">-</Text>
                </TouchableOpacity>
                <Text className="text-white text-lg font-quando mx-4">
                  {frequency}
                </Text>
                <TouchableOpacity
                  onPress={increaseFrequency}
                  className="w-8 h-8 rounded-full bg-blue-500 items-center justify-center ml-2"
                >
                  <Text className="text-white text-lg font-bold">+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Reminder Section */}
        <View className="bg-gray-800 rounded-2xl p-4 mb-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-white text-lg font-quando">Reminder</Text>
            <View className="flex-row items-center">
              <Ionicons name="time-outline" size={20} color="#3b82f6" />
              <Text className="text-blue-400 text-sm font-quando mx-2">
                {reminderTime}
              </Text>
              <Text className="text-gray-300 text-sm font-quando mr-4">
                Once
              </Text>
              <Switch
                value={reminderEnabled}
                onValueChange={setReminderEnabled}
                trackColor={{ false: "#374151", true: "#3b82f6" }}
                thumbColor={reminderEnabled ? "#ffffff" : "#9ca3af"}
              />
            </View>
          </View>
        </View>

        {/* History Section */}
        <View className="bg-gray-800 rounded-2xl p-4 mb-4">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-white text-lg font-quando">History</Text>
            <Text className="text-gray-400 text-xs font-quando">
              Drag to see more
            </Text>
          </View>

          {/* Calendar Grid */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row">
              {/* Days of week labels */}
              <View className="mr-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day, index) => (
                    <View
                      key={index}
                      className="h-3 items-center justify-center mb-1"
                    >
                      <Text className="text-gray-400 text-xs font-quando">
                        {day}
                      </Text>
                    </View>
                  )
                )}
              </View>

              {/* Calendar grid */}
              <View className="flex-row">
                {Array.from({ length: 12 }, (_, colIndex) => (
                  <View key={colIndex} className="mr-0.5">
                    {Array.from({ length: 7 }, (_, rowIndex) => {
                      const dayIndex = colIndex * 7 + rowIndex + 1;
                      const day = dayIndex.toString();
                      // Random completion for demo
                      const isCompleted = Math.random() > 0.6;
                      return (
                        <View
                          key={rowIndex}
                          className={`w-3 h-3 m-0.5 rounded-sm items-center justify-center ${
                            isCompleted ? "bg-blue-500" : "bg-gray-700"
                          }`}
                        >
                          <Text className="text-white text-xs font-quando">
                            {day}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Statistics Section */}
        <View className="bg-gray-800 rounded-2xl p-4 mb-4">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-white text-lg font-quando">Statistic</Text>
            <View className="flex-row">
              <Text className="text-gray-300 text-sm font-quando mr-2">
                Times a
              </Text>
              <TouchableOpacity
                onPress={() => togglePeriod("Month")}
                className={`px-3 py-1 rounded-lg mr-2 ${
                  selectedPeriod === "Month" ? "bg-gray-600" : "bg-gray-700"
                }`}
              >
                <Text className="text-white text-xs font-quando">Month</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => togglePeriod("Year")}
                className={`px-3 py-1 rounded-lg ${
                  selectedPeriod === "Year" ? "bg-blue-500" : "bg-gray-700"
                }`}
              >
                <Text className="text-white text-xs font-quando">Year</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Bar Chart */}
          <View className="flex-row items-end justify-between h-32">
            {[
              { value: 17, label: "05" },
              { value: 14, label: "06" },
              { value: 18, label: "07" },
              { value: 15, label: "08" },
              { value: 19, label: "09" },
              { value: 17, label: "10" },
              { value: 19, label: "11" },
              { value: 20, label: "12" },
              { value: 15, label: "01" },
              { value: 18, label: "02" },
              { value: 13, label: "03" },
              { value: 16, label: "04" },
            ].map((bar, index) => (
              <View key={index} className="items-center">
                <Text className="text-white text-xs font-quando mb-1">
                  {bar.value}
                </Text>
                <View
                  className="w-4 bg-blue-500 rounded-t"
                  style={{ height: (bar.value / 20) * 80 }}
                />
                <Text className="text-gray-400 text-xs font-quando mt-1">
                  {bar.label}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
