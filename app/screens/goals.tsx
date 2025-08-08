import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Goal {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  color: string;
  icon: string;
  category: string;
}

export default function GoalsScreen() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      title: "Read 50 Books",
      description: "Complete reading 50 books this year",
      target: 50,
      current: 23,
      unit: "books",
      deadline: "2024-12-31",
      color: "blue",
      icon: "book",
      category: "Learning",
    },
    {
      id: "2",
      title: "Run 1000km",
      description: "Run 1000 kilometers this year",
      target: 1000,
      current: 456,
      unit: "km",
      deadline: "2024-12-31",
      color: "green",
      icon: "fitness",
      category: "Fitness",
    },
    {
      id: "3",
      title: "Save $10,000",
      description: "Save $10,000 for emergency fund",
      target: 10000,
      current: 6500,
      unit: "$",
      deadline: "2024-12-31",
      color: "purple",
      icon: "wallet",
      category: "Finance",
    },
    {
      id: "4",
      title: "Learn Spanish",
      description: "Achieve B2 level in Spanish",
      target: 100,
      current: 35,
      unit: "%",
      deadline: "2024-12-31",
      color: "orange",
      icon: "language",
      category: "Learning",
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    target: "",
    unit: "",
    deadline: "",
    category: "Personal",
    color: "blue",
  });

  const slideAnim = useRef(new Animated.Value(1000)).current;

  useEffect(() => {
    if (isModalVisible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      slideAnim.setValue(1000);
    }
  }, [isModalVisible]);

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "#10B981"; // green
    if (percentage >= 60) return "#F59E0B"; // yellow
    if (percentage >= 40) return "#F97316"; // orange
    return "#EF4444"; // red
  };

  const getColorClass = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-500";
      case "green":
        return "bg-green-500";
      case "purple":
        return "bg-purple-500";
      case "orange":
        return "bg-orange-500";
      case "red":
        return "bg-red-500";
      case "pink":
        return "bg-pink-500";
      default:
        return "bg-gray-500";
    }
  };

  const getColorValue = (color: string) => {
    switch (color) {
      case "blue":
        return "#3B82F6";
      case "green":
        return "#10B981";
      case "purple":
        return "#8B5CF6";
      case "orange":
        return "#F59E0B";
      case "red":
        return "#EF4444";
      case "pink":
        return "#EC4899";
      default:
        return "#6B7280";
    }
  };

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.target && newGoal.unit) {
      const goal: Goal = {
        id: Date.now().toString(),
        title: newGoal.title,
        description: newGoal.description,
        target: parseInt(newGoal.target),
        current: 0,
        unit: newGoal.unit,
        deadline: newGoal.deadline || "2024-12-31",
        color: newGoal.color,
        icon: "flag",
        category: newGoal.category,
      };
      setGoals([...goals, goal]);
      setNewGoal({
        title: "",
        description: "",
        target: "",
        unit: "",
        deadline: "",
        category: "Personal",
        color: "blue",
      });
      setIsModalVisible(false);
    }
  };

  const updateGoalProgress = (goalId: string, increment: boolean) => {
    setGoals(
      goals.map((goal) => {
        if (goal.id === goalId) {
          const newCurrent = increment
            ? Math.min(goal.current + 1, goal.target)
            : Math.max(goal.current - 1, 0);
          return { ...goal, current: newCurrent };
        }
        return goal;
      })
    );
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="bg-white px-4 pt-20 pb-6 rounded-b-3xl">
        {/* Header with title */}
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-3xl font-quando text-gray-800 ml-3">Goals</Text>
        </View>

        {/* Subtitle */}
        <Text className="text-gray-600 font-quando ml-3 mb-6">
          Track your progress and achieve your dreams
        </Text>
      </View>

      <ScrollView className="flex-1 px-4 pt-4">
        {/* Progress Overview */}
        <View className="bg-white rounded-2xl p-4 mb-4">
          <Text className="text-lg font-quando text-gray-800 mb-3">
            Overall Progress
          </Text>
          <View className="flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-3xl font-quando text-gray-800">
                {goals.length}
              </Text>
              <Text className="text-gray-600 font-quando">Active Goals</Text>
            </View>
            <View className="flex-1 items-end">
              <Text className="text-3xl font-quando text-gray-800">
                {Math.round(
                  goals.reduce(
                    (acc, goal) =>
                      acc + getProgressPercentage(goal.current, goal.target),
                    0
                  ) / goals.length
                )}
                %
              </Text>
              <Text className="text-gray-600 font-quando">
                Average Progress
              </Text>
            </View>
          </View>
        </View>

        {/* Goals List */}
        {goals.map((goal) => {
          const progressPercentage = getProgressPercentage(
            goal.current,
            goal.target
          );
          const progressColor = getProgressColor(progressPercentage);

          return (
            <View key={goal.id} className="bg-white rounded-2xl p-4 mb-4">
              <View className="flex-row items-start justify-between mb-3">
                <View className="flex-row items-center flex-1">
                  <View
                    className={`w-12 h-12 rounded-xl items-center justify-center mr-3 ${getColorClass(goal.color)}`}
                  >
                    <Ionicons name={goal.icon as any} size={24} color="white" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-lg font-quando text-gray-800 mb-1">
                      {goal.title}
                    </Text>
                    <Text className="text-gray-600 font-quando text-sm">
                      {goal.category}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
                  onPress={() => updateGoalProgress(goal.id, true)}
                >
                  <Ionicons name="add" size={20} color="#6B7280" />
                </TouchableOpacity>
              </View>

              <Text className="text-gray-600 font-quando text-sm mb-3">
                {goal.description}
              </Text>

              {/* Progress Bar */}
              <View className="mb-3">
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-sm font-quando text-gray-600">
                    Progress
                  </Text>
                  <Text className="text-sm font-quando text-gray-800">
                    {goal.current} / {goal.target} {goal.unit}
                  </Text>
                </View>
                <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <View
                    className="h-full rounded-full"
                    style={{
                      width: `${progressPercentage}%`,
                      backgroundColor: progressColor,
                    }}
                  />
                </View>
              </View>

              {/* Progress Controls */}
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <TouchableOpacity
                    className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center mr-2"
                    onPress={() => updateGoalProgress(goal.id, false)}
                  >
                    <Ionicons name="remove" size={20} color="#6B7280" />
                  </TouchableOpacity>
                  <Text className="text-sm font-quando text-gray-600">
                    Update Progress
                  </Text>
                </View>
                <Text className="text-sm font-quando text-gray-500">
                  Due: {new Date(goal.deadline).toLocaleDateString()}
                </Text>
              </View>
            </View>
          );
        })}

        {/* Add Goal Button */}
        <TouchableOpacity
          className="flex-row items-center p-4 rounded-2xl mb-4 bg-white"
          onPress={() => setIsModalVisible(true)}
          activeOpacity={0.7}
        >
          <View className="w-12 h-12 rounded-full bg-gray-200 items-center justify-center mr-4">
            <Ionicons name="add" size={24} color="#6B7280" />
          </View>
          <View className="flex-1">
            <Text className="text-gray-800 text-base font-quando mb-1">
              Add New Goal
            </Text>
            <Text className="text-gray-500 text-xs font-quando">
              Set a new goal to track
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Add Goal Modal */}
      <Modal
        visible={isModalVisible}
        animationType="none"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View
          className="flex-1 justify-end"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
        >
          <Animated.View
            className="bg-white w-full h-2/3 rounded-t-3xl flex"
            style={{ transform: [{ translateY: slideAnim }] }}
          >
            {/* Header */}
            <View className="flex-row items-center p-6 pb-4">
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Ionicons name="chevron-back" size={24} color="#374151" />
              </TouchableOpacity>
              <Text className="text-2xl ml-4 text-gray-800 font-quando">
                Add New Goal
              </Text>
            </View>

            {/* Scrollable Content */}
            <ScrollView
              className="flex-1 px-6"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 100 }}
            >
              {/* Title Section */}
              <View className="bg-gray-100 rounded-xl p-4 mb-4">
                <TextInput
                  placeholder="Goal Title"
                  placeholderTextColor="#9CA3AF"
                  value={newGoal.title}
                  onChangeText={(text) =>
                    setNewGoal({ ...newGoal, title: text })
                  }
                  className="text-gray-800 text-base font-quando"
                />
              </View>

              {/* Description Section */}
              <View className="bg-gray-100 rounded-xl p-4 mb-4">
                <TextInput
                  placeholder="Description"
                  placeholderTextColor="#9CA3AF"
                  multiline
                  numberOfLines={3}
                  value={newGoal.description}
                  onChangeText={(text) =>
                    setNewGoal({ ...newGoal, description: text })
                  }
                  className="text-gray-800 text-base font-quando"
                />
              </View>

              {/* Target Section */}
              <View className="bg-gray-100 rounded-xl p-4 mb-4">
                <View className="flex-row space-x-2">
                  <View className="flex-1">
                    <TextInput
                      placeholder="Target"
                      placeholderTextColor="#9CA3AF"
                      value={newGoal.target}
                      onChangeText={(text) =>
                        setNewGoal({ ...newGoal, target: text })
                      }
                      keyboardType="numeric"
                      className="text-gray-800 text-base font-quando"
                    />
                  </View>
                  <View className="flex-1">
                    <TextInput
                      placeholder="Unit (books, km, $, etc.)"
                      placeholderTextColor="#9CA3AF"
                      value={newGoal.unit}
                      onChangeText={(text) =>
                        setNewGoal({ ...newGoal, unit: text })
                      }
                      className="text-gray-800 text-base font-quando"
                    />
                  </View>
                </View>
              </View>

              {/* Category Section */}
              <View className="bg-gray-100 rounded-xl p-4 mb-4">
                <Text className="text-gray-800 text-base font-quando mb-3">
                  Category
                </Text>
                <View className="flex-row flex-wrap">
                  {["Personal", "Fitness", "Learning", "Finance", "Career"].map(
                    (category) => (
                      <TouchableOpacity
                        key={category}
                        className={`px-4 py-2 rounded-lg mr-2 mb-2 ${
                          newGoal.category === category
                            ? "bg-gray-800"
                            : "bg-gray-200"
                        }`}
                        onPress={() => setNewGoal({ ...newGoal, category })}
                      >
                        <Text
                          className={`font-quando ${
                            newGoal.category === category
                              ? "text-white"
                              : "text-gray-800"
                          }`}
                        >
                          {category}
                        </Text>
                      </TouchableOpacity>
                    )
                  )}
                </View>
              </View>

              {/* Color Section */}
              <View className="bg-gray-100 rounded-xl p-4 mb-4">
                <Text className="text-gray-800 text-base font-quando mb-3">
                  Color
                </Text>
                <View className="flex-row space-x-3">
                  {["blue", "green", "purple", "orange", "red", "pink"].map(
                    (color) => (
                      <TouchableOpacity
                        key={color}
                        className={`w-10 h-10 rounded-full ${
                          newGoal.color === color ? "ring-2 ring-gray-800" : ""
                        }`}
                        style={{ backgroundColor: getColorValue(color) }}
                        onPress={() => setNewGoal({ ...newGoal, color })}
                      />
                    )
                  )}
                </View>
              </View>

              {/* Deadline Section */}
              <View className="bg-gray-100 rounded-xl p-4 mb-4">
                <TextInput
                  placeholder="Deadline (YYYY-MM-DD)"
                  placeholderTextColor="#9CA3AF"
                  value={newGoal.deadline}
                  onChangeText={(text) =>
                    setNewGoal({ ...newGoal, deadline: text })
                  }
                  className="text-gray-800 text-base font-quando"
                />
              </View>
            </ScrollView>

            {/* Sticky Save Button */}
            <View className="absolute bottom-0 left-0 right-0 bg-white p-6 border-t border-gray-200">
              <TouchableOpacity
                className="bg-gray-800 rounded-xl py-4 items-center"
                onPress={handleAddGoal}
              >
                <Text className="text-white text-lg font-quando font-semibold">
                  Add Goal
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}
