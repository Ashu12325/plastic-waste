import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "counter";

export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const loadCounter = async () => {
      try {
        const value = await AsyncStorage.getItem(KEY);
        if (value !== null) {
          setCount(parseInt(value));
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadCounter();

    const interval = setInterval(() => {
      setCount((count) => {
        const newCount = count + 1;
        AsyncStorage.setItem(KEY, newCount.toString()).catch(console.error);
        return newCount;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      <Text>{count}</Text>
    </View>
  );
}
