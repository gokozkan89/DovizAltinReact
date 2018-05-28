import React from 'react';
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Button,
  Content,
  Form,
  Item,
  Label,
  Input,
  Text,
  Picker,
} from 'native-base';
import {} from 'react-native';
import IonicIcon from 'react-native-vector-icons/Ionicons';

export default class WalletAdd extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  onValueChange(value: string) {
    this.setState({
      selected1: value
    });
  }
  render() {
    return (
      <Container>
        <Header>
          <Left style={{ flex: 1 }}>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('Wallet')}
            >
              <IonicIcon name="ios-arrow-back" size={25} color="skyblue" />
            </Button>
          </Left>
          <Body>
            <Title />
          </Body>
        </Header>
        <Content>
          <Form>
            <Picker
              iosHeader="Select one"
              mode="dropdown"
              selectedValue={this.state.selected1}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Wallet" value="key0" />
              <Picker.Item label="ATM Card" value="key1" />
              <Picker.Item label="Debit Card" value="key2" />
              <Picker.Item label="Credit Card" value="key3" />
              <Picker.Item label="Net Banking" value="key4" />
            </Picker>
            <Item stackedLabel>
              <Label>Alış Kuru</Label>
              <Input />
            </Item>
            <Item stackedLabel last>
              <Label>Miktar</Label>
              <Input />
            </Item>
            <Button block success>
              <Text>KAYDET</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
