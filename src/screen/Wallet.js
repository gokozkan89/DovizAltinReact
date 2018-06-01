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
      .then(json => this.setState({ dataWallet: json }))
      .catch(error => Alert.alert('AsyncStorege myWallet sıkıntılı', error));
  }
  componentWillMount() {
    this.veriGetir();
    this.karzararHesapla();
  }
  // Dizideki son item silinmiyor.Bakman lazım.
  veriSil(item) {
    const data = this.state.dataWallet;
    data.splice(data.indexOf(item), 1);
    this.setState({ dataWallet: data });
    AsyncStorage.setItem('myWallet', JSON.stringify(data));
  }
  async karzararHesapla() {
    Alert.alert(JSON.stringify(this.state.dataWallet));
  }
  render() {
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
            <CardItem>
              <Text style={{ textAlign: 'center', flex: 1 }}>CODE</Text>
              <Text style={{ textAlign: 'center', flex: 1 }}>ALIŞ KURU</Text>
              <Text style={{ textAlign: 'center', flex: 1 }}>MİKTAR</Text>
              <Text style={{ textAlign: 'center', flex: 1 }}>TUTAR</Text>
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
                      <CardItem>
                        <Text style={{ textAlign: 'center', flex: 1 }}>
                          {item.code}
                        </Text>
                        <Text style={{ textAlign: 'center', flex: 1 }}>
                          {item.alisKuru}
                        </Text>
                        <Text style={{ textAlign: 'center', flex: 1 }}>
                          {item.miktar}
                        </Text>
                        <Text style={{ textAlign: 'center', flex: 1 }}>
                          {item.tutar}
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
