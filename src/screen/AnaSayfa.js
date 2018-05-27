import React from 'react';
import { Container, Content } from 'native-base';
import { AsyncStorage } from 'react-native';
import MyCard from '../components/MyCard';
import MyHeader from '../components/MyHeader';

export default class AnaSayfa extends React.Component {
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
        .catch(error => this.alert('AsyncStorege getItem sıkıntılı', error));
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
      console.log(err);
    }
  }
  componentWillMount() {
    this.getPrices();
  }
  render() {
    return (
      <Container>
        <MyHeader
          leftNav="DrawerOpen"
          rightNav="Kurlar"
          title="Anasayfa"
          navigation={this.props.navigation}
        />
        <Content>
          <MyCard
            prices={this.state.prices}
            name="PARİTELER"
            navigation={this.props.navigation}
          />
        </Content>
      </Container>
    );
  }
}
