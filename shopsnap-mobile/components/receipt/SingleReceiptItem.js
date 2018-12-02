import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Switch,
  Button
} from "native-base";
import {
  Ionicons,
  MaterialIcons,
  Foundation,
  MaterialCommunityIcons,
  Octicons
} from "@expo/vector-icons";

const SingleReceiptItem = props => {
  return (
    <ListItem icon>
      <Left>
        <Button style={{ backgroundColor: "#FF9501" }}>
          <MaterialCommunityIcons name="food-fork-drink" />
        </Button>
      </Left>
      <Body>
        <Text>{props.receiptItem.Name}</Text>
      </Body>
      <Right>
          <Text>{`${props.receiptItem.Quantity}x${props.receiptItem.Price}€`}</Text>
      </Right>
    </ListItem>
  );
};

export default SingleReceiptItem;
