import React from 'react';
import {
  Container,
  Content,
  Card,
  CardItem,
  View,
  Text,
  Header,
  Left,
  Right,
  Body,
  Button,
  Icon,
  Title,
} from 'native-base';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { FlatList, StyleSheet } from 'react-native';

export default class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      dataWallet: [{ name: 'Dolars', number: 6000, amount: 27600 }],
    };
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
          <Body style={{ flex: 3, alignItems: 'center' }}>
            <Title>Hesaplarım</Title>
          </Body>
          <Right style={{ flex: 1 }}>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('WalletAdd')}
            >
              <IconFontAwesome name="plus-square-o" size={25} color="skyblue" />
            </Button>
          </Right>
        </Header>
        <Content>
          <Card style={styles.margin}>
            <CardItem>
              <Text style={{ marginLeft: 5, flex: 1 }}>HESAP ADI</Text>
              <Text style={{ textAlign: 'center', flex: 1 }}>MİKTAR</Text>
              <Text style={{ textAlign: 'center', flex: 1 }}>KAR/ZARAR</Text>
            </CardItem>
          </Card>
          <View style={{ flex: 1 }}>
            <FlatList
              data={this.state.dataWallet}
              renderItem={({ item }) => (
                <Card>
                  <CardItem>
                    <Text style={{ marginLeft: 5, flex: 1 }}>{item.name}</Text>
                    <Text style={{ textAlign: 'center', flex: 1 }}>
                      {item.number}
                    </Text>
                    <Text style={{ textAlign: 'center', flex: 1 }}>
                      {item.amount}
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
const styles = StyleSheet.create({
  margin: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
  },
});
