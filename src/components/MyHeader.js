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
        <Left style={{ flex: 1}}>
          <Button
            transparent
            onPress={() => this.props.navigation.navigate(this.props.leftNav)}
          >
            <Icon name="menu" />
          </Button>
        </Left>
        <Body style={{ flex: 3, alignItems: 'center' }}>
          <Title>{this.props.title}</Title>
        </Body>

        <Right style={{ flex: 1 }}>
          <Button
            transparent
            onPress={() => this.props.navigation.navigate(this.props.rightNav)}
          >
            <IconFontAwesome name="plus-square-o" size={25} color="skyblue" />
          </Button>
        </Right>
      </Header>
    );
  }
}
