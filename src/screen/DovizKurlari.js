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
} from 'native-base';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { ActivityIndicator, FlatList, View } from 'react-native';

export default class DovizKurlari extends React.Component {
  constructor() {
    super();
    this.state = { isLoading: true };
  }

  componentDidMount() {
    return fetch('https://www.doviz.com/api/v1/currencies/all/latest')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
          },
          () => {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  veriGetir(item) {
    this.props.navigation.navigate('DovizKuru', { ...item });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
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
            <Title>Döviz Kurları</Title>
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
            <FlatList
              data={this.state.dataSource}
              renderItem={({ item }) => (
                <Card>
                  <CardItem button onPress={() => this.veriGetir(item)}>
                    <Text style={{ marginLeft: 5, flex: 1 }}>
                      {`${item.code}/TRY`}
                    </Text>
                    <IconFontAwesome
                      name={
                        JSON.stringify(item.change_rate).charAt(0) == '-'
                          ? 'arrow-circle-down'
                          : 'arrow-circle-up'
                      }
                      size={25}
                      color={
                        JSON.stringify(item.change_rate).charAt(0) == '-'
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
