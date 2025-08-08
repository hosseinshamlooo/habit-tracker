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
import Header from "../components/Header";
import HabitCard from "../components/HabitCard";
import WeeklyHabitCard from "../components/WeeklyHabitCard";
import MonthlyHabitCard from "../components/MonthlyHabitCard";
import { Ionicons } from "@expo/vector-icons";

interface Habit {
  id: string;
  title: string;
  time: string;
  frequency: string;
  color: string;
  icon: string;
}

interface WeeklyHabit {
  id: string;
  title: string;
  frequency: string;
  color: string;
  icon: string;
  dailyProgress: boolean[];
  notificationsEnabled: boolean;
}

interface MonthlyHabit {
  id: string;
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
}

export default function HomeScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState("Today");
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newHabitName, setNewHabitName] = useState("");
  const [newHabitColor, setNewHabitColor] = useState("purple");
  const [newHabitFrequency, setNewHabitFrequency] = useState("Daily");
  const [newHabitNotificationsEnabled, setNewHabitNotificationsEnabled] =
    useState(true);
  const [weeklyFrequency, setWeeklyFrequency] = useState(6);
  const [selectedDays, setSelectedDays] = useState<number[]>([
    0, 1, 2, 3, 4, 5, 6,
  ]);
  const [selectedMonthDays, setSelectedMonthDays] = useState<number[]>([6]);

  const slideAnim = useRef(new Animated.Value(1000)).current;

  const habits: Habit[] = [
    {
      id: "1",
      title: "Cold Shower",
      time: "07:30",
      frequency: "Daily",
      color: "purple",
      icon: "water",
    },
    {
      id: "2",
      title: "Make Bed",
      time: "08:00",
      frequency: "Daily",
      color: "orange",
      icon: "bed",
    },
    {
      id: "3",
      title: "Morning Run",
      time: "08:30",
      frequency: "Daily",
      color: "green",
      icon: "fitness",
    },
    {
      id: "4",
      title: "Wake Up Routine",
      time: "07:15",
      frequency: "Daily",
      color: "gray",
      icon: "hand-left",
    },
  ];

  const weeklyHabits: WeeklyHabit[] = [
    {
      id: "1",
      title: "Cold Shower",
      frequency: "Daily",
      color: "purple",
      icon: "water",
      dailyProgress: [true, true, true, false, true, true, true], // Tue, Mon, Sun, Sat, Fri, Thu, Wed
      notificationsEnabled: true,
    },
    {
      id: "2",
      title: "Make Bed",
      frequency: "Daily",
      color: "orange",
      icon: "bed",
      dailyProgress: [true, true, true, false, true, true, true], // Tue, Mon, Sun, Sat, Fri, Thu, Wed
      notificationsEnabled: true,
    },
    {
      id: "3",
      title: "Morning Run",
      frequency: "Daily",
      color: "green",
      icon: "fitness",
      dailyProgress: [true, true, true, false, true, false, true], // Tue, Mon, Sun, Sat, Fri, Thu, Wed
      notificationsEnabled: false,
    },
    {
      id: "4",
      title: "Wake Up Routine",
      frequency: "Daily",
      color: "gray",
      icon: "hand-left",
      dailyProgress: [true, true, false, false, true, true, true], // Tue, Mon, Sun, Sat, Fri, Thu, Wed
      notificationsEnabled: true,
    },
  ];

  const monthlyHabits: MonthlyHabit[] = [
    {
      id: "1",
      title: "Cold Shower",
      frequency: "Daily",
      color: "purple",
      icon: "water",
      monthlyProgress: {
        Jan: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
          "31": "completed",
        },
        Feb: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
        },
        Mar: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
          "31": "completed",
        },
        Apr: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
        },
        May: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
          "31": "completed",
        },
        Jun: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
        },
        Jul: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
          "31": "completed",
        },
        Aug: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
          "31": "completed",
        },
        Sep: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
        },
        Oct: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
          "31": "completed",
        },
        Nov: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
        },
        Dec: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
          "31": "completed",
        },
      },
      notificationsEnabled: true,
    },
    {
      id: "2",
      title: "Make Bed",
      frequency: "Daily",
      color: "orange",
      icon: "bed",
      monthlyProgress: {
        Jan: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
          "31": "completed",
        },
        Feb: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
        },
        Mar: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
          "31": "completed",
        },
        Apr: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
        },
        May: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
          "31": "completed",
        },
        Jun: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
        },
        Jul: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
          "31": "completed",
        },
        Aug: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
          "31": "completed",
        },
        Sep: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
        },
        Oct: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
          "31": "completed",
        },
        Nov: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
        },
        Dec: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
          "31": "completed",
        },
      },
      notificationsEnabled: true,
    },
    {
      id: "3",
      title: "Morning Run",
      frequency: "Daily",
      color: "green",
      icon: "fitness",
      monthlyProgress: {
        Jan: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
          "31": "completed",
        },
        Feb: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
        },
        Mar: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
          "31": "completed",
        },
        Apr: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
        },
        May: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
          "31": "completed",
        },
        Jun: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
        },
        Jul: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
          "31": "completed",
        },
        Aug: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
          "31": "completed",
        },
        Sep: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
        },
        Oct: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
          "31": "completed",
        },
        Nov: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
        },
        Dec: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
          "31": "completed",
        },
      },
      notificationsEnabled: false,
    },
    {
      id: "4",
      title: "Wake Up Routine",
      frequency: "Daily",
      color: "gray",
      icon: "hand-left",
      monthlyProgress: {
        Jan: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
          "31": "completed",
        },
        Feb: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
        },
        Mar: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
          "31": "completed",
        },
        Apr: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
        },
        May: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
          "31": "completed",
        },
        Jun: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
        },
        Jul: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
          "31": "completed",
        },
        Aug: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
          "31": "completed",
        },
        Sep: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
        },
        Oct: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
          "31": "completed",
        },
        Nov: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
        },
        Dec: {
          "1": "completed",
          "2": "completed",
          "3": "completed",
          "4": "completed",
          "5": "completed",
          "6": "completed",
          "7": "completed",
          "8": "completed",
          "9": "completed",
          "10": "completed",
          "11": "completed",
          "12": "completed",
          "13": "completed",
          "14": "completed",
          "15": "completed",
          "16": "completed",
          "17": "completed",
          "18": "completed",
          "19": "completed",
          "20": "completed",
          "21": "completed",
          "22": "completed",
          "23": "completed",
          "24": "completed",
          "25": "completed",
          "26": "completed",
          "27": "completed",
          "28": "completed",
          "29": "completed",
          "30": "completed",
          "31": "completed",
        },
      },
      notificationsEnabled: true,
    },
  ];

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
    console.log(`Switched to ${period} view`);
  };

  const handleHabitPress = (habitName: string) => {
    console.log(`${habitName} habit pressed`);
  };

  const handleToggleComplete = (habitName: string, completed: boolean) => {
    if (completed) {
      setCompletedHabits((prev) => [...prev, habitName]);
    } else {
      setCompletedHabits((prev) => prev.filter((name) => name !== habitName));
    }
    console.log(
      `${habitName} ${completed ? "completed" : "marked incomplete"}`
    );
  };

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

  const activeHabits = habits.filter(
    (habit) => !completedHabits.includes(habit.title)
  );
  const completedHabitsList = habits.filter((habit) =>
    completedHabits.includes(habit.title)
  );

  return (
    <View className="flex-1 bg-gray-200">
      <Header
        selectedPeriod={selectedPeriod}
        onPeriodChange={handlePeriodChange}
      />
      <ScrollView className="flex-1 px-4">
        {selectedPeriod === "Today" && (
          <View className="py-4">
            {/* Active Habits */}
            {activeHabits.map((habit) => (
              <HabitCard
                key={habit.id}
                title={habit.title}
                time={habit.time}
                frequency={habit.frequency}
                color={habit.color}
                icon={habit.icon}
                isCompleted={false}
                onPress={() => handleHabitPress(habit.title)}
                onToggleComplete={handleToggleComplete}
              />
            ))}

            {/* Add New Habit Box */}
            <TouchableOpacity
              className="flex-row items-center p-4 rounded-2xl mb-4 mt-2 mx-3 bg-gray-300"
              onPress={() => setIsModalVisible(true)}
              activeOpacity={0.7}
            >
              <View className="w-12 h-12 rounded-full bg-gray-400 items-center justify-center mr-4">
                <Text className="text-gray-600 text-3xl font-bold">+</Text>
              </View>
              <View className="flex-1">
                <Text className="text-gray-600 text-base font-quando mb-1">
                  Add New Habit
                </Text>
                <Text className="text-gray-500 text-xs font-quando">
                  Tap to create a new habit
                </Text>
              </View>
            </TouchableOpacity>

            {/* Completed Section */}
            {completedHabitsList.length > 0 && (
              <>
                <View className="flex-row items-center my-6">
                  <View className="flex-1 h-px bg-gray-300" />
                  <Text className="mx-4 text-gray-500 text-sm font-medium">
                    Completed
                  </Text>
                  <View className="flex-1 h-px bg-gray-300" />
                </View>

                {/* Completed Habits */}
                {completedHabitsList.map((habit) => (
                  <HabitCard
                    key={habit.id}
                    title={habit.title}
                    time={habit.time}
                    frequency={habit.frequency}
                    color={habit.color}
                    icon={habit.icon}
                    isCompleted={true}
                    onPress={() => handleHabitPress(habit.title)}
                    onToggleComplete={handleToggleComplete}
                  />
                ))}
              </>
            )}
          </View>
        )}

        {selectedPeriod === "Weekly" && (
          <View className="py-4">
            {weeklyHabits.map((habit) => (
              <WeeklyHabitCard
                key={habit.id}
                title={habit.title}
                frequency={habit.frequency}
                color={habit.color}
                icon={habit.icon}
                dailyProgress={habit.dailyProgress}
                notificationsEnabled={habit.notificationsEnabled}
                onPress={() => handleHabitPress(habit.title)}
              />
            ))}

            {/* Add New Habit Box */}
            <TouchableOpacity
              className="flex-row items-center p-4 rounded-2xl mb-4 mt-2 mx-3 bg-gray-300"
              onPress={() => setIsModalVisible(true)}
              activeOpacity={0.7}
            >
              <View className="w-12 h-12 rounded-full bg-gray-400 items-center justify-center mr-4">
                <Text className="text-gray-600 text-3xl font-bold">+</Text>
              </View>
              <View className="flex-1">
                <Text className="text-gray-600 text-base font-quando mb-1">
                  Add New Habit
                </Text>
                <Text className="text-gray-500 text-xs font-quando">
                  Tap to create a new habit
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {selectedPeriod === "Monthly" && (
          <View className="py-4">
            {monthlyHabits.map((habit) => (
              <MonthlyHabitCard
                key={habit.id}
                title={habit.title}
                frequency={habit.frequency}
                color={habit.color}
                icon={habit.icon}
                monthlyProgress={habit.monthlyProgress}
                notificationsEnabled={habit.notificationsEnabled}
                onPress={() => handleHabitPress(habit.title)}
              />
            ))}

            {/* Add New Habit Box */}
            <TouchableOpacity
              className="flex-row items-center p-4 rounded-2xl mb-4 mt-2 mx-3 bg-gray-300"
              onPress={() => setIsModalVisible(true)}
              activeOpacity={0.7}
            >
              <View className="w-12 h-12 rounded-full bg-gray-400 items-center justify-center mr-4">
                <Text className="text-gray-600 text-3xl font-bold">+</Text>
              </View>
              <View className="flex-1">
                <Text className="text-gray-600 text-base font-quando mb-1">
                  Add New Habit
                </Text>
                <Text className="text-gray-500 text-xs font-quando">
                  Tap to create a new habit
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

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
                Create Habit
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
                  placeholder="Title"
                  placeholderTextColor="#9CA3AF"
                  value={newHabitName}
                  onChangeText={setNewHabitName}
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
                  className="text-gray-800 text-base font-quando"
                />
              </View>
              {/* Color Section */}
              <View className="bg-gray-100 rounded-xl p-4 mb-4">
                <View className="flex-row items-center justify-between">
                  <Text className="text-gray-800 text-base font-quando">
                    Color
                  </Text>
                  <TouchableOpacity
                    className="w-8 h-8 rounded-lg"
                    style={{
                      backgroundColor:
                        newHabitColor === "purple"
                          ? "#A855F7"
                          : newHabitColor === "orange"
                            ? "#FB923C"
                            : newHabitColor === "green"
                              ? "#4ADE80"
                              : newHabitColor === "blue"
                                ? "#3B82F6"
                                : "#9CA3AF",
                    }}
                    onPress={() => {
                      // Cycle through colors
                      const colors = [
                        "purple",
                        "orange",
                        "green",
                        "blue",
                        "gray",
                      ];
                      const currentIndex = colors.indexOf(newHabitColor);
                      const nextIndex = (currentIndex + 1) % colors.length;
                      setNewHabitColor(colors[nextIndex]);
                    }}
                  />
                </View>
              </View>
              {/* Repeat & Days Section */}
              <View className="bg-gray-100 rounded-xl p-4 mb-4">
                <View className="flex-row items-center justify-between mb-3">
                  <Text className="text-gray-800 text-base font-quando">
                    Repeat
                  </Text>
                  <TouchableOpacity
                    className={`w-12 h-6 rounded-full flex-row items-center ${
                      true ? "bg-gray-800" : "bg-gray-300"
                    }`}
                  >
                    <View
                      className={`w-5 h-5 rounded-full bg-white ${
                        true ? "ml-6" : "ml-1"
                      }`}
                    />
                  </TouchableOpacity>
                </View>
                <View className="flex-row bg-gray-200 rounded-lg p-1 mb-4">
                  {["Daily", "Weekly", "Monthly"].map((freq) => (
                    <TouchableOpacity
                      key={freq}
                      className={`flex-1 py-2 px-3 rounded-md ${
                        newHabitFrequency === freq ? "bg-white" : ""
                      }`}
                      onPress={() => setNewHabitFrequency(freq)}
                    >
                      <Text
                        className={`text-center font-quando ${
                          newHabitFrequency === freq
                            ? "text-gray-800"
                            : "text-gray-600"
                        }`}
                      >
                        {freq}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Dynamic Days Section */}
                {newHabitFrequency === "Daily" && (
                  <View>
                    <Text className="text-gray-800 text-base font-quando mb-3">
                      On these days
                    </Text>
                    <View className="flex-row justify-between">
                      {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                        <TouchableOpacity
                          key={index}
                          className={`w-10 h-10 rounded-lg items-center justify-center ${
                            selectedDays.includes(index)
                              ? "bg-gray-800"
                              : "bg-gray-300"
                          }`}
                          onPress={() => {
                            if (selectedDays.includes(index)) {
                              setSelectedDays(
                                selectedDays.filter((d) => d !== index)
                              );
                            } else {
                              setSelectedDays([...selectedDays, index]);
                            }
                          }}
                        >
                          <Text className="text-white text-lg font-quando">
                            {day}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                )}

                {newHabitFrequency === "Weekly" && (
                  <View className="flex-row items-center justify-between">
                    <View>
                      <Text className="text-gray-800 text-base font-quando mb-1 mt-2">
                        Frequency
                      </Text>
                      <Text className="text-gray-500 text-sm font-quando">
                        {weeklyFrequency === 1
                          ? "Once a week"
                          : weeklyFrequency === 2
                            ? "Twice a week"
                            : weeklyFrequency === 3
                              ? "3 times a week"
                              : weeklyFrequency === 4
                                ? "4 times a week"
                                : weeklyFrequency === 5
                                  ? "5 times a week"
                                  : weeklyFrequency === 6
                                    ? "6 times a week"
                                    : "Everyday"}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <TouchableOpacity
                        className="w-10 h-10 rounded-full bg-gray-500 items-center justify-center mr-2"
                        onPress={() =>
                          setWeeklyFrequency(Math.max(1, weeklyFrequency - 1))
                        }
                      >
                        <Text className="text-white text-3xl font-bold">-</Text>
                      </TouchableOpacity>
                      <Text className="text-gray-600 text-lg font-quando mx-3">
                        {weeklyFrequency}
                      </Text>
                      <TouchableOpacity
                        className="w-10 h-10 rounded-full bg-gray-500 items-center justify-center ml-2"
                        onPress={() =>
                          setWeeklyFrequency(Math.min(7, weeklyFrequency + 1))
                        }
                      >
                        <Text className="text-white text-3xl font-bold">+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

                {newHabitFrequency === "Monthly" && (
                  <View>
                    <View className="flex-row justify-end mb-3">
                      <Text className="text-gray-500 text-sm font-quando">
                        Every month on{" "}
                        {selectedMonthDays.length > 0
                          ? selectedMonthDays.join(", ")
                          : "6"}
                      </Text>
                    </View>
                    <View className="flex-row flex-wrap">
                      {Array.from({ length: 31 }, (_, i) => i + 1).map(
                        (day) => (
                          <TouchableOpacity
                            key={day}
                            className={`w-8 h-8 rounded-full items-center justify-center mr-4 mb-2 ${
                              selectedMonthDays.includes(day)
                                ? "bg-gray-800"
                                : "bg-transparent"
                            }`}
                            onPress={() => {
                              if (selectedMonthDays.includes(day)) {
                                setSelectedMonthDays(
                                  selectedMonthDays.filter((d) => d !== day)
                                );
                              } else {
                                setSelectedMonthDays([
                                  ...selectedMonthDays,
                                  day,
                                ]);
                              }
                            }}
                          >
                            <Text
                              className={`text-sm font-quando ${
                                selectedMonthDays.includes(day)
                                  ? "text-white"
                                  : "text-gray-800"
                              }`}
                            >
                              {day}
                            </Text>
                          </TouchableOpacity>
                        )
                      )}
                    </View>
                  </View>
                )}
              </View>

              {/* Reminder Section */}
              <View className="bg-gray-100 rounded-xl p-4 mb-4">
                <View className="flex-row items-center justify-between">
                  <Text className="text-gray-800 text-base font-quando">
                    Reminder
                  </Text>
                  <TouchableOpacity
                    className={`w-12 h-6 rounded-full flex-row items-center ${
                      false ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  >
                    <View
                      className={`w-5 h-5 rounded-full bg-white ${
                        false ? "ml-6" : "ml-1"
                      }`}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Goal Section */}
              <View className="bg-gray-100 rounded-xl p-4 mb-4">
                <View className="flex-row items-center justify-between">
                  <Text className="text-gray-800 text-base font-quando">
                    Goal
                  </Text>
                  <TouchableOpacity
                    className={`w-12 h-6 rounded-full flex-row items-center ${
                      false ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  >
                    <View
                      className={`w-5 h-5 rounded-full bg-white ${
                        false ? "ml-6" : "ml-1"
                      }`}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>

            {/* Sticky Save Button */}
            <View className="absolute bottom-0 left-0 right-0 bg-white p-6 border-t border-gray-200">
              <TouchableOpacity
                className="bg-gray-800 rounded-xl py-4 items-center"
                onPress={() => {
                  // Handle save logic here
                  setIsModalVisible(false);
                }}
              >
                <Text className="text-white text-lg font-quando font-semibold">
                  Save Habit
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}
