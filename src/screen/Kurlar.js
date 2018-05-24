import React from 'react';
import {
  Container,
  Content,
  View,
  Text,
  Header,
  Right,
  Button,
  Card,
  CardItem,
} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import { FlatList, CheckBox, AsyncStorage } from 'react-native';

export default class Kurlar extends React.Component {
  constructor() {
    super();
    this.state = {
      kurlar: [
        'USD',
        'EUR',
        'GBP',
        'CHF',
        'CAD',
        'RUB',
        'AED',
        'AUD',
        'DKK',
        'SEK',
        'NOK',
        'JPY',
        'KWD',
        'ZAR',
        'BHD',
        'LYD',
        'SAR',
        'IQD',
        'ILS',
        'IRR',
        'INR',
        'MXN',
        'HUF',
        'NZD',
        'BRL',
        'IDR',
        'CSK',
        'PLN',
        'BGN',
        'RON',
        'CNY',
        'ARS',
        'ALL',
      ],
      checked: false,
    };
  }
  
  componentWillMount() {
    AsyncStorage.setItem('kurlar', JSON.stringify(this.state.kurlar));
  }
  render() {
    return (
      <Container>
        <Header>
          <Right style={{ flex: 1 }}>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('DovizKurlari')}
            >
              <Feather name="x-square" size={25} color="white" />
            </Button>
          </Right>
        </Header>
        <Content>
          <View style={{ flex: 1 }}>
            <FlatList
              data={this.state.kurlar}
              renderItem={({ item }) => (
                <Card>
                  <CardItem>
                    <Text style={{ marginLeft: 5, flex: 1 }}>
                      {`${item}/TRY`}
                    </Text>
                    <CheckBox
                      checked={this.state.checked}
                      onPress={() => {
                        this.setState({ checked: !this.state.checked });
                        alert(this.state.checked);
                      }}
                    />
                  </CardItem>
                </Card>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </Content>
      </Container>
    );
  }
}
