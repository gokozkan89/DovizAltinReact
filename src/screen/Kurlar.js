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
  CheckBox,
} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import { FlatList, AsyncStorage } from 'react-native';

export default class Kurlar extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [
        { name: 'KURLAR', value: 'KURLAR', header: true },
        { name: 'USD', value: 'USD', header: false },
        { name: 'EUR', value: 'EUR', header: false },
        { name: 'GBP', value: 'GBP', header: false },
        { name: 'CHF', value: 'CHF', header: false },
        { name: 'CAD', value: 'CAD', header: false },
        { name: 'RUB', value: 'RUB', header: false },
        { name: 'AED', value: 'AED', header: false },
        { name: 'AUD', value: 'AUD', header: false },
        { name: 'DKK', value: 'DKK', header: false },
        { name: 'SEK', value: 'SEK', header: false },
        { name: 'NOK', value: 'NOK', header: false },
        { name: 'JPY', value: 'JPY', header: false },
        { name: 'KWD', value: 'KWD', header: false },
        { name: 'ZAR', value: 'ZAR', header: false },
        { name: 'BHD', value: 'ZAR', header: false },
        { name: 'LYD', value: 'LYD', header: false },
        { name: 'SAR', value: 'SAR', header: false },
        { name: 'IQD', value: 'IQD', header: false },
        { name: 'ILS', value: 'ILS', header: false },
        { name: 'IRR', value: 'IRR', header: false },
        { name: 'INR', value: 'INR', header: false },
        { name: 'MXN', value: 'MXN', header: false },
        { name: 'HUF', value: 'HUF', header: false },
        { name: 'NZD', value: 'NZD', header: false },
        { name: 'BRL', value: 'BRL', header: false },
        { name: 'IDR', value: 'IDR', header: false },
        { name: 'CSK', value: 'CSK', header: false },
        { name: 'PLN', value: 'PLN', header: false },
        { name: 'BGN', value: 'BGN', header: false },
        { name: 'RON', value: 'RON', header: false },
        { name: 'CNY', value: 'CNY', header: false },
        { name: 'ARS', value: 'ARS', header: false },
        { name: 'ALL', value: 'ALL', header: false },
        { name: 'ALTIN KURLARI', value: 'ALTIN KURLARI', header: true },
        { name: 'Çeyrek Altın', value: 'ceyrek-altin', header: false },
        { name: 'Yarım Altın', value: 'yarim-altin', header: false },
        { name: 'Tam Altın', value: 'tam-altin', header: false },
        { name: 'Cum. Altını', value: 'cumhuriyet-altini', header: false },
        { name: 'Ons Altın', value: 'ons', header: false },
        { name: 'Gram Altın', value: 'gram-altin', header: false },
        { name: 'Ata Altın', value: 'ata-altin', header: false },
      ],
      stickyHeaderIndices: [],
      checked: ['USD', 'EUR'],
    };
  }

  checkBoxPress(item) {
    const { checked } = this.state;
    if (!checked.includes(item)) {
      this.setState({ checked: [...checked, item] });
    } else {
      this.setState({ checked: checked.filter(a => a !== item) });
    }
  }

  async veriGetir() {
    await AsyncStorage.getItem('kurlar')
      .then(req => JSON.parse(req))
      .then(json => this.setState({ checked: json }));
  }
  componentWillMount() {
    let arr = [];
    this.state.data.map(obj => {
      if (obj.header) {
        arr.push(this.state.data.indexOf(obj));
      }
    });
    arr.push(0);
    this.setState({
      stickyHeaderIndices: arr,
    });
    this.veriGetir();
  }
  renderItem = ({ item }) => {
    if (item.header) {
      return (
        <Card style={{ marginLeft: 0, marginRight: 0, marginTop: 0,marginBottom:0}}>
          <CardItem itemDivider>
            <Text style={{ flex: 1,textAlign:"center" }}>
              {item.name}
            </Text>
          </CardItem>
        </Card>
      );
    } else if (!item.header) {
      return (
        <Card>
          <CardItem>
            <Text style={{ marginLeft: 5, flex: 1 }}>
              {`${item.name}/TRY`}
            </Text>
            <CheckBox
              onPress={() => {
                this.checkBoxPress(item.value);
              }}
              checked={this.state.checked.includes(item.value)}
            />
          </CardItem>
        </Card>
      );
    }
  };
  render() {
    AsyncStorage.setItem('kurlar', JSON.stringify(this.state.checked));
    return (
      <Container >
        
        <Header>
          <Right style={{ flex: 1 }}>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('AnaSayfa')}
            >
              <Feather name="x-square" size={25} color="skyblue" />
            </Button>
          </Right>
        </Header>
       
          <View style={{ flex: 1 }}>
            <FlatList
              data={this.state.data}
              extraData={this.state}
              renderItem={this.renderItem}
              keyExtractor={item=>item.name}
              stickyHeaderIndices={this.state.stickyHeaderIndices}
            />
          </View>
        
      </Container>
    );
  }
}
