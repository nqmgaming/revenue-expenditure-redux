import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import RxExReducer from "../redux/reducers/ReExReducer";
import { store } from "../redux/store";

const _layout = () => {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </Provider>
  );
};

export default _layout;

const styles = StyleSheet.create({});
