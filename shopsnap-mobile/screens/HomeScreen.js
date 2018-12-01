import React, { Component } from 'react';
import { View } from 'react-native';
import {NewReceiptIcon} from "../components/NewReceiptIcon";

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    console.log(this.props.navigation);
  }

  render() {
    return (
      <View style={styles.rootContainer}>
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
  }
};