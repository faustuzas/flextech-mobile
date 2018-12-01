import React, { Component } from "react";
import { View } from "react-native";
import Ripple from "react-native-material-ripple";

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
  <Ripple rippleColor="gray" rippleContainerBorderRadius={1}  rippleOpacity={0.3}
  onPress={() => props.navigation.navigate('Receipt')}>
  <ListItem thumbnail >
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
      <Button onPress={() => props.navigation.navigate('Receipt')}>
        <Text>View</Text>
      </Button>
    </Right>
  </ListItem>
  </Ripple>
);

export default SingleReceipt;
