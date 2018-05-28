import React from 'react';
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Button,
  Content,
  Form,
  Item,
  Label,
  Input,
  Text,
  Picker,
} from 'native-base';
import { AsyncStorage,Alert } from 'react-native';
import IonicIcon from 'react-native-vector-icons/Ionicons';

export default class WalletAdd extends React.Component {
  constructor() {
    super();
    this.state = {alisKuru:null,miktar:null,code:""};
  }
  onValueChange(value: string) {
    this.setState({
      code: value
    });
    
  }
  btnKaydet(){
    const data=[{code:"",alisKuru:null,miktar:null}];
    const {alisKuru,code,miktar} = this.state;
    const a = ""+code+miktar+alisKuru  
    Alert.alert(a);
   // veri geliyor...   
      //AsyncStorage.setItem('myWallet')
    
  }
  render() {
    return (
      <Container>
        <Header>
          <Left style={{ flex: 1 }}>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('Wallet')}
            >
              <IonicIcon name="ios-arrow-back" size={25} color="skyblue" />
            </Button>
          </Left>
          <Body>
            <Title />
          </Body>
        </Header>
        <Content>
          <Form>
            <Picker
              iosHeader="Select one"
              mode="dropdown"
              selectedValue={this.state.code}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="USD" value="USD" />
              <Picker.Item label="EUR" value="EUR" />
              <Picker.Item label="AUD" value="AUD" />
            </Picker>
            <Item stackedLabel>
              <Label>Alış Kuru</Label>
              <Input keyboardType='numeric' onChangeText={(text)=>this.setState({ alisKuru:text })}/>
            </Item>
            <Item stackedLabel last>
              <Label>Miktar</Label>
              <Input keyboardType='numeric' onChangeText={(text) => this.setState({ miktar: text })} />
            </Item>
            <Button block success onPress={()=>this.btnKaydet()}>
              <Text>KAYDET</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
