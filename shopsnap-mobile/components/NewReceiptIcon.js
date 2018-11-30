import React  from 'react';
import { TouchableNativeFeedback, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const NewReceiptIcon = () => (
  <View style={styles.cameraIconContainer}>
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple('white', true)}>
      <View style={styles.cameraIconBackground}>
        <Ionicons name="md-camera" size={35} color="#FFF8EB" />
      </View>
    </TouchableNativeFeedback>
  </View>
);

const styles = {
  cameraIconBackground: {
    width: 70,
    height: 70,
    backgroundColor: '#3D9970',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35
  },

  cameraIconContainer: {
    position: 'absolute',
    bottom: 40,
    right: 20
  }
};