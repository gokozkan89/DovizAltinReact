import React from 'react';
import { Image } from 'react-native';
import { Container, Content, Text, List, ListItem } from 'native-base';

const routes = ['DovizKurlari', 'DovizKuru', 'Kurlar', 'AnaSayfa'];

const SideBar = props => (
  <Container>
    <Content>
      <Image
        source={{
          uri:
            'https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/assets/drawer-cover.png',
        }}
        style={{
          height: 120,
          alignSelf: 'stretch',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
      <Image
        square
        style={{
          height: 80,
          width: 70,
          position: 'absolute',
          alignSelf: 'center',
          top: 20,
        }}
        source={{
          uri:
            'https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/assets/logo.png',
        }}
      />

      <List
        dataArray={routes}
        renderRow={data => (
          <ListItem
            style={{ justifyContent: 'center' }}
            button
            onPress={() => props.navigation.navigate(data)}
          >
            <Text style={{ textAlign: 'center' }}>{data.toUpperCase()}</Text>
          </ListItem>
        )}
      />
    </Content>
  </Container>
);

export default SideBar;
