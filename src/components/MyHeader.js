import React from 'react';
import { Header, Right, Body, Left, Button, Icon, Title } from 'native-base';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

export default class MyHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
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
          <Title>{this.props.title}</Title>
        </Body>

        <Right style={{ flex: 1 }}>
          <Button
            transparent
            onPress={() => this.props.navigation.navigate('Kurlar')}
          >
            <IconFontAwesome name="plus-square-o" size={25} color="skyblue" />
          </Button>
        </Right>
      </Header>
    );
  }
}
