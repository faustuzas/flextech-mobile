import React from "react";
import {
  View,
  Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Ripple from "react-native-material-ripple";

const CameraIcon = () => (
  <Ripple rippleColor="white" rippleContainerBorderRadius={25}  rippleOpacity={0.6}>
    <View style={styles.cameraIconBackground}>
      <Ionicons name={Platform.OS === 'ios' ? 'ios-camera' : "md-camera"} size={Platform.OS === 'ios' ? 44 : 34} color="#FFF8EB" />
    </View>
  </Ripple>
);

function GetNativeCameraButton() {
  return (
    <Ripple rippleColor="white" rippleDuration={0.8}>
      <View style={styles.cameraIconBackground}>
        <Ionicons name="md-camera" size={34} color="#FFF8EB" />
      </View>
    </Ripple>
  );
}

export const NewReceiptIcon = () => (
  <View style={styles.cameraIconContainer}>
    <CameraIcon />
  </View>
);

const styles = {
  cameraIconBackground: {
    width: 70,
    height: 70,
    backgroundColor: "#3D9970",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35
  },

  cameraIconContainer: {
    position: "absolute",
    bottom: 40,
    right: 20
  }
};
