import React from 'react';
import {
  Container,
  Content,
  Header,
  Left,
  Right,
  Icon,
  Button,
  Body,
  Title,
  Card,
  CardItem,
  View,
  Text,
} from 'native-base';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { ActivityIndicator, FlatList } from 'react-native';
import { LineChart, Grid, YAxis } from 'react-native-svg-charts';

export default class DovizKuru extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      selling: [],
      update_date: [],
    };
  }
  convertTimestamp(timestamp) {
    let d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
      yyyy = d.getFullYear(),
      mm = `0${d.getMonth() + 1}`.slice(-2), // Months are zero based. Add leading 0.
      dd = `0${d.getDate()}`.slice(-2), // Add leading 0.
      hh = d.getHours(),
      h = hh,
      min = `0${d.getMinutes()}`.slice(-2), // Add leading 0.
      ampm = 'AM',
      time;

    if (hh > 12) {
      h = hh - 12;
      ampm = 'PM';
    } else if (hh === 12) {
      h = 12;
      ampm = 'PM';
    } else if (hh == 0) {
      h = 12;
    }

    // ie: 2013-02-18, 8:35 AM
    time = `${yyyy}-${mm}-${dd}, ${h}:${min} ${ampm}`;

    return time;
  }

  componentDidMount() {
    return fetch(
      `https://doviz.com/api/v1/currencies/${
        this.props.navigation.state.params.code
      }/daily`
    )
      .then(response => response.json())
      .then(responseJson => {
        for (let i = 0; i < responseJson.length; i++) {
          this.setState({
            selling: [...this.state.selling, responseJson[i].selling],
            update_date: [
              ...this.state.update_date,
              this.convertTimestamp(responseJson[i].update_date),
            ],
          });
        }
        // console.log(this.state.selling)

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

  render() {
    const data = this.state.selling;
    const contentInset = { top: 20, bottom: 20 };
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    // console.log(this.state.update_date)

    const {
      code,
      change_rate,
      selling,
      buying,
    } = this.props.navigation.state.params;

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
            <Title>Döviz Kuru</Title>
          </Body>

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
          <View style={{ flex: 1, height: 200, flexDirection: 'row' }}>
            <YAxis
              data={data}
              contentInset={contentInset}
              svg={{
                fill: 'grey',
                fontSize: 10,
              }}
              numberOfTicks={10}
              formatLabel={value => `${value}`}
            />
            <LineChart
              style={{ flex: 1, marginLeft: 16 }}
              data={data}
              svg={{ stroke: 'rgb(134, 65, 244)' }}
              contentInset={contentInset}
            >
              <Grid />
            </LineChart>
          </View>
          <View style={{ flex: 2 }}>
            <FlatList
              data={this.state.dataSource}
              renderItem={({ item }) => (
                <Card>
                  <CardItem>
                    <Text style={{ textAlign: 'center', flex: 1 }}>
                      {this.convertTimestamp(item.update_date)}
                    </Text>
                    <Text style={{ textAlign: 'center', flex: 1 }}>
                      {item.selling}
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
