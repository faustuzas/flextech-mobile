import React, { Component } from "react";
import { View } from "react-native";

import { Container, Content, List } from "native-base";

import SingleItem from "./SingleItem";

const maxima = "https://www.maxima.lt/images/front/logos/maxima_logo.png";
const norfa =
  "https://www.rokiskiotic.lt/wp-content/uploads/cache/images/05-1/05-1-685262323.jpg";
const rimi =
  "https://www.ryo.lt/uploads/plan/images/225x160_far/82_ab1012a727c17ba6eba5aa58a9e3f624.jpg";
const iki = "https://upload.wikimedia.org/wikipedia/commons/f/f1/IKI_logo.png";
const lidl = "https://upload.wikimedia.org/wikipedia/lt/7/77/Logo_LIDL_JPEG.jpg";

export default class ItemsList extends Component {
  render() {
    return (
      <Container>
        <Content>
          <List>
            <SingleItem uri={maxima} date="2018-12-01" />
            <SingleItem uri={norfa} date="2018-11-21" />
            <SingleItem uri={lidl} date="2018-10-05" />
          </List>
        </Content>
      </Container>
    );
  }
}
