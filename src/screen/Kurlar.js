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
  CheckBox
} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import { FlatList,  AsyncStorage } from 'react-native';

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
      selectedId:null,
      
    };
  }
  checkBoxPress(id){
    this.setState({selectedId:id});

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
                      checked={this.state.selectedId !== item.id}
                      onPress={this.checkBoxPress(item.id) 
                      }/>
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
