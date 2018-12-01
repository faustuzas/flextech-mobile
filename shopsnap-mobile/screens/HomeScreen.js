import React, { Component } from 'react';
import { View } from 'react-native';
import {NewReceiptIcon} from "../components/NewReceiptIcon";
import ReceiptList from '../components/home/ReceiptList';

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    receiptList: []
  }

  componentDidMount() {
    fetch("https://shopsnapwebapi.azurewebsites.net/api/receipt/?userID=1", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(
        response => response.json(),
        ex => {
          //this.showErrorPopup(String(ex));
        }
      )
      .then((jsonResponse) => this.setState({receiptList: jsonResponse}));
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        <ReceiptList navigation={this.props.navigation} itemList={this.state.receiptList} />
        <NewReceiptIcon navigation={this.props.navigation}/>
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