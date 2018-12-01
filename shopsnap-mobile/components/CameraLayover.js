import React from 'react';

import { View } from "react-native";

export const CameraLayover = () => (
  <View style={styles.lowestLayer}>
    <View style={styles.ySideView} />

    <View style={styles.middleView}>
      <View style={styles.middleViewSide} />
      <View style={styles.middleViewMiddle} />
      <View style={styles.middleViewSide} />
    </View>

    <View style={styles.ySideView}/>
  </View>
);

const styles = {
  lowestLayer: {
    flexDirection: 'column',
    width: '100%',
    height: '100%'
  },

  ySideView: {
    flex: 1,
    width: '100%',
    backgroundColor: 'black',
    opacity: 0.5
  },

  middleView: {
    flex: 4,
    flexDirection: 'row'
  },

  middleViewSide: {
    flex: 1,
    backgroundColor: 'black',
    opacity: 0.5
  },

  middleViewMiddle: {
    flex: 5
  }
};