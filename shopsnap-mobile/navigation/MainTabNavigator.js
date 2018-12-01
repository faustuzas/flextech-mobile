import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import CameraScreen from "../screens/CameraScreen";

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  title: 'Shopsnap'
};

const CameraStack = createStackNavigator({
  Camera: CameraScreen
});

export default createStackNavigator({
  HomeStack,
  CameraStack,
});
