import React, { Component } from 'react';
import { View } from 'react-native';
import {NewReceiptIcon} from "../components/NewReceiptIcon";
import ItemsList from '../components/home/ItemsList';

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.rootContainer}>
        <ItemsList />
        <NewReceiptIcon callb={this.props.navigation}/>
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