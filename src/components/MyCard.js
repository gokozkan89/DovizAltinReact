import React from 'react';
import { Content, Card, CardItem, Text } from 'native-base';
import { FlatList, View } from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

export default class MyCard extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <Content>
        <View style={{ flex: 1 }}>
          <Card>
            <CardItem>
              <Text style={{ marginLeft: 5, flex: 1 }}>{this.props.name}</Text>
              <Text style={{ textAlign: 'center', flex: 1 }}>SATIŞ</Text>
              <Text style={{ textAlign: 'center', flex: 1 }}>ALIŞ</Text>
              <Text style={{ textAlign: 'center', flex: 1 }}>DEĞİŞİM</Text>
            </CardItem>
          </Card>
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            data={this.props.prices}
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
    );
  }
}
