import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Icon, Left, Body, Right, Switch, Button } from 'native-base';
import SingleReceiptItem from '../components/receipt/SingleReceiptItem';

const GetAllReceiptItemRows = props => {
  return props.receiptItems.map(receiptItem => <SingleReceiptItem receiptItem={receiptItem} key={receiptItem.ID} />);
}

export default class ReceiptScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { navigation } = this.props;
    const receiptItems = navigation.getParam('receiptItems', []);
    return (
      <Container>
        <Content>
          <GetAllReceiptItemRows receiptItems={receiptItems} />
        </Content>
        </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
