import React from "react";
import {
  View,
  Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Ripple from "react-native-material-ripple";

const CameraIcon = props => (
  <Ripple rippleColor="white" rippleContainerBorderRadius={25}  rippleOpacity={0.6}
  onPress={() => props.navigation.navigate('Camera')}>
    <View style={styles.cameraIconBackground}>
      <Ionicons name={Platform.OS === 'ios' ? 'ios-camera' : "md-camera"} size={Platform.OS === 'ios' ? 44 : 34} color="#FFF8EB" />
    </View>
  </Ripple>
);

export const NewReceiptIcon = props => (
  <View style={styles.cameraIconContainer}>
    <CameraIcon navigation={props.navigation} />
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
