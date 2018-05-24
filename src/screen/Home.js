import React from 'react';
import {
  Content,
  Container,
  Header,
  Button,
  Left,
  Right,
  Icon,
  Title,
  Body,
  Card,
  CardItem,
  Text,
  CheckBox,
} from 'native-base';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { FlatList, View, AsyncStorage } from 'react-native';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  async getPrices() {
    try {
      const item = [];
      await AsyncStorage.getItem('kurlar')
        .then(req => JSON.parse(req))
        .then(json => (item = json))
        .catch(error => console.log('error!'));
      this.setState({ currencies: item });
      const prices = await Promise.all(
        this.state.currencies.map(async currency =>
          fetch(
            `https://www.doviz.com/api/v1/currencies/${currency}/latest`
          ).then(res => res.json())
        )
      );

      this.setState({
        prices,
      });
    } catch (err) {
      this.console.log('error while fetching prices: ', err);
    }
  }

  componentWillMount() {
    this.getPrices();
  }

  render() {
    return (
      <Container>
        <Header>
          <Left style={{ flex: 1 }}>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('DrawerOpen')}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body style={{ flex: 1, alignItems: 'center' }}>
            <Title>Home</Title>
          </Body>
          <Right style={{ flex: 1 }}>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('Kurlar')}
            >
              <IconFontAwesome name="plus-square-o" size={25} color="white" />
            </Button>
          </Right>
        </Header>
        <Content>
          <View style={{ flex: 1 }}>
            <Card>
              <CardItem>
                <Text style={{ marginLeft: 5, flex: 1 }}>PARİTELER</Text>
                <Text style={{ textAlign: 'center', flex: 1 }}>SATIŞ</Text>
                <Text style={{ textAlign: 'center', flex: 1 }}>ALIŞ</Text>
                <Text style={{ textAlign: 'center', flex: 1 }}>DEĞİŞİM</Text>
              </CardItem>
            </Card>
          </View>
          <View style={{ flex: 1 }}>
            <FlatList
              data={this.state.prices}
              renderItem={({ item }) => (
                <Card>
                  <CardItem>
                    <Text style={{ marginLeft: 5, flex: 1 }}>
                      {`${item.code}/TRY`}
                    </Text>
                    <IconFontAwesome
                      name={
                        JSON.stringify(item.change_rate).charAt(0) === '-'
                          ? 'arrow-circle-down'
                          : 'arrow-circle-up'
                      }
                      size={25}
                      color={
                        JSON.stringify(item.change_rate).charAt(0) === '-'
                          ? 'red'
                          : 'green'
                      }
                    />
                    <Text style={{ textAlign: 'center', flex: 1 }}>
                      {JSON.stringify(item.selling).substring(0, 6)}
                    </Text>
                    <Text style={{ textAlign: 'center', flex: 1 }}>
                      {JSON.stringify(item.buying).substring(0, 6)}
                    </Text>
                    <Text style={{ textAlign: 'center', flex: 1 }}>
                      {`%${JSON.stringify(item.change_rate).substring(0, 6)}`}
                    </Text>
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
