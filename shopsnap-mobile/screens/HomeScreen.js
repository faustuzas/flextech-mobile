import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { NewReceiptIcon } from "../components/NewReceiptIcon";
import ReceiptList from "../components/home/ReceiptList";
import { ActivityIndicator } from "react-native";

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    receiptList: [],
    isFetchingReceipts: true,
    totalSpent: 0
  };

  componentDidFocus = payload => {
    this.setState({isFetchingReceipts: true});
    fetch("https://shopsnapwebapi.azurewebsites.net/api/receipt/?userID=1", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(
        response => {
          this.setState({ isFetchingReceipts: false });
          return response.json();
        },
        ex => {
          this.setState({ isFetchingReceipts: false });
        }
      )
      .then(jsonResponse => {
        let spent = 0;

        jsonResponse.forEach(receipt => {
          receipt.ReceiptItems.forEach(item => spent += item.Price)
        });

        this.setState({ receiptList: jsonResponse, totalSpent: spent })
      });
  };

  componentDidMount() {
    this.subs = [
      this.props.navigation.addListener('didFocus', (payload) => this.componentDidFocus(payload)),
    ]; 
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }

  render() {
    if (this.state.isFetchingReceipts) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              padding: 20
            }}
            size="large"
            color="blue"
          />
          <NewReceiptIcon navigation={this.props.navigation} />
        </View>
      );
    }
    return (
      <View style={styles.rootContainer}>
        <ReceiptList
          navigation={this.props.navigation}
          itemList={this.state.receiptList}
        />
        <NewReceiptIcon navigation={this.props.navigation} />
        <View style={styles.helpContainer}>
          <TouchableOpacity style={styles.helpLink}>
            <Text style={styles.helpLinkText}>Viso: {this.state.totalSpent.toFixed(2)} €</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
  rootContainer: {
    position: "relative",
    height: "100%",
    width: "100%"
  },
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  helpContainer: {
    marginTop: 5,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
};
