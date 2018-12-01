import React from 'react';

import { View } from "react-native";

export const CameraLayover = () => (
  <View style={styles.lowestLayer}>
    <View style={styles.ySideView} />

    <View style={styles.middleView}>
      <View style={styles.middleViewSide} />
      <View style={styles.middleViewMiddle}>
        <View style={styles.middleViewCornersContainer}>
          <View style={{ ...styles.corner, ...styles.cornerTop, ...styles.cornerLeft }} />
          <View style={{ ...styles.corner, ...styles.cornerTop, ...styles.cornerRight  }} />
        </View>
        <View style={ styles.middleViewCornersContainer}>
          <View style={{ ...styles.corner, ...styles.cornerBottom, ...styles.cornerLeft }} />
          <View style={{ ...styles.corner, ...styles.cornerBottom, ...styles.cornerRight }} />
        </View>
      </View>
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
    flex: 5,
    justifyContent: 'space-between'
  },

  middleViewCornersContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  corner: {
    height: 50,
    width: 50
  },

  cornerTop: {
    borderTopWidth: 2,
    borderColor: 'white',
    borderStyle: 'solid'
  },

  cornerLeft: {
    borderLeftWidth: 2,
    borderColor: 'white',
    borderStyle: 'solid'
  },

  cornerBottom: {
    borderBottomWidth: 2,
    borderColor: 'white',
    borderStyle: 'solid'
  },

  cornerRight: {
    borderRightWidth: 2,
    borderColor: 'white',
    borderStyle: 'solid'
  }
};