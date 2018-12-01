import React, { Component } from "react";
import { View } from "react-native";

import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button
} from "native-base";

const SingleReceipt = props => (
  <ListItem thumbnail>
    <Left>
      <Thumbnail
        square
        source={{
          uri: props.uri
        }}
      />
    </Left>
    <Body>
      <Text>{props.date}</Text>
      <Text note numberOfLines={1}>
        {`${props.price}$`}
      </Text>
    </Body>
    <Right>
      <Button>
        <Text>View</Text>
      </Button>
    </Right>
  </ListItem>
);

export default SingleReceipt;
