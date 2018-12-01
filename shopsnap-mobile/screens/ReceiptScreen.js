import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';

export default class ReceiptScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.rootContainer}>
        <Text>FUCK YEA</Text>
      </View>
    );
  }
}

const styles = {
  rootContainer: {
    position: 'relative',
    height: '100%',
    width: '100%'
  },
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
};