import React, { Component } from "react";
import { View } from "react-native";

import { Container, Content, List } from "native-base";

import SingleReceipt from "./SingleReceipt";

const maxima = "https://www.maxima.lt/images/front/logos/maxima_logo.png";
const norfa =
  "https://www.rokiskiotic.lt/wp-content/uploads/cache/images/05-1/05-1-685262323.jpg";
const rimi =
  "https://www.ryo.lt/uploads/plan/images/225x160_far/82_ab1012a727c17ba6eba5aa58a9e3f624.jpg";
const iki = "https://upload.wikimedia.org/wikipedia/commons/f/f1/IKI_logo.png";
const lidl =
  "https://upload.wikimedia.org/wikipedia/lt/7/77/Logo_LIDL_JPEG.jpg";

const storesUri = [maxima, rimi, iki, iki, lidl, lidl, norfa]; // kubas = lidl

const getReceiptPriceSum = receipt => {
  let sum = 0;
  receipt.ReceiptItems.forEach(receiptItem => (sum += receiptItem.Price));
  return sum.toFixed(2);
};

const GetRows = props => {
  return props.itemList.map(receipt => (
    <SingleReceipt
      key={receipt.ID}
      navigation={props.navigation}
      uri={storesUri[receipt.StoreID - 1]}
      date={receipt.Date}
      price={getReceiptPriceSum(receipt)}
      receipt={receipt}
    />
  ));
};

const getPriceSum = receiptList => {
  let sum = 0;
  receiptList.forEach(receipt => {
    receipt.ReceiptItems.forEach(receiptItem => (sum += receiptItem.Price));
  });
};

export default class ReceiptList extends Component {
  render() {
    return (
      <Container>
        <Content>
          <List>
            <GetRows
              itemList={this.props.itemList}
              navigation={this.props.navigation}
            />
          </List>
        </Content>
      </Container>
    );
  }
}
