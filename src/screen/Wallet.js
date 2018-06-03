import React from 'react';
import {
  Container,
  Content,
  Card,
  CardItem,
  View,
  Text,
  Button,
  Icon,
  SwipeRow,
} from 'native-base';
import { FlatList, AsyncStorage, Alert, StyleSheet } from 'react-native';
import MyHeader from '../components/MyHeader';

export default class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      dataWallet: [],
    };
  }
  async veriGetir() {
    await AsyncStorage.getItem('myWallet')
      .then(req => JSON.parse(req))
      .then(json => {
        console.log(JSON.stringify(json));
        if (JSON.stringify(json) !== null) {
          this.deneme(json);
        }
      })
      .catch(error => Alert.alert('AsyncStorege myWallet sıkıntılı', error));
  }
  async deneme(json) {
    console.log(JSON.stringify(json));

    this.data = json;

    const price = await Promise.all(
      this.data.map(async currency =>
        fetch(
          `https://www.doviz.com/api/v1/currencies/${currency.code}/latest`
        ).then(res => res.json())
      )
    );
    this.data.map((item, index) => {
      item.karzarar = `${price[index].selling * item.miktar -
        item.tutar}`.substring(0, 6);
      if (!`${item.karzarar}`.includes('-')) {
        item.color = 'green';
      } else {
        item.color = 'red';
      }
    });
    console.log(JSON.stringify(this.state.dataWallet));
    this.setState({ dataWallet: this.data });
  }
  componentWillMount() {
    this.veriGetir();
  }

  veriSil(item) {
    const data = this.state.dataWallet;
    data.splice(data.indexOf(item), 1);
    this.setState({ dataWallet: data });
    AsyncStorage.setItem('myWallet', JSON.stringify(data));
  }

  render() {
    console.log(JSON.stringify(this.state.dataWallet));
    return (
      <Container>
        <MyHeader
          leftNav="DrawerOpen"
          rightNav="WalletAdd"
          title="Hesaplarım"
          navigation={this.props.navigation}
        />
        <Content>
          <Card style={styles.margin}>
            <CardItem style={{ paddingLeft: 0, paddingRight: 0 }}>
              <Text style={{ textAlign: 'center', flex: 1, marginLeft: 0 }}>
                CODE
              </Text>
              <Text style={{ textAlign: 'center', flex: 1.5 }}>ALIŞ KURU</Text>
              <Text style={{ textAlign: 'center', flex: 1 }}>MİKTAR</Text>
              <Text style={{ textAlign: 'center', flex: 1 }}>TUTAR</Text>
              <Text style={{ textAlign: 'center', flex: 1.5 }}>KAR/ZARAR</Text>
            </CardItem>
          </Card>
          <View style={{ flex: 1 }}>
            <FlatList
              data={this.state.dataWallet}
              renderItem={({ item }) => (
                <SwipeRow
                  style={(styles.margin, styles.padding)}
                  leftOpenValue={75}
                  rightOpenValue={-75}
                  body={
                    <Card style={(styles.padding, styles.margin)}>
                      <CardItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <Text style={{ textAlign: 'center', flex: 1 }}>
                          {item.code}
                        </Text>
                        <Text style={{ textAlign: 'center', flex: 1.5 }}>
                          {item.alisKuru}
                        </Text>
                        <Text style={{ textAlign: 'center', flex: 1 }}>
                          {item.miktar}
                        </Text>
                        <Text style={{ textAlign: 'center', flex: 1 }}>
                          {item.tutar}
                        </Text>
                        <Text
                          style={{
                            textAlign: 'center',
                            flex: 1.5,
                            color: item.color,
                          }}
                        >
                          {item.karzarar}
                        </Text>
                      </CardItem>
                    </Card>
                  }
                  right={
                    <Button danger onPress={() => this.veriSil(item)}>
                      <Icon active name="trash" />
                    </Button>
                  }
                />
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
  padding: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
});
