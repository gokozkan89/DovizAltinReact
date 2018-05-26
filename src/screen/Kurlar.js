import React from "react";
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
} from "native-base";
import Feather from "react-native-vector-icons/Feather";
import { FlatList, AsyncStorage } from "react-native";

export default class Kurlar extends React.Component {
  constructor() {
    super();

    this.state = {
      kurlar: [
        "USD",
        "EUR",
        "GBP",
        "CHF",
        "CAD",
        "RUB",
        "AED",
        "AUD",
        "DKK",
        "SEK",
        "NOK",
        "JPY",
        "KWD",
        "ZAR",
        "BHD",
        "LYD",
        "SAR",
        "IQD",
        "ILS",
        "IRR",
        "INR",
        "MXN",
        "HUF",
        "NZD",
        "BRL",
        "IDR",
        "CSK",
        "PLN",
        "BGN",
        "RON",
        "CNY",
        "ARS",
        "ALL"
      ],
      checked: []
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
  componentDidMount() {}
  render() {
    AsyncStorage.setItem("kurlar", JSON.stringify(this.state.checked));
    return (
      <Container>
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
        <Content>
          <View style={{ flex: 1 }}>
            <FlatList
              data={this.state.kurlar}
              extraData={this.state}
              renderItem={({ item }) => (
                <Card>
                  <CardItem>
                    <Text style={{ marginLeft: 5, flex: 1 }}>
                      {`${item}/TRY`}
                    </Text>
                    <CheckBox
                      onPress={() => {
                        this.checkBoxPress(item);
                      }}
                      checked={this.state.checked.includes(item)}
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
