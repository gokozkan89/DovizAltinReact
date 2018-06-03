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

    this.state = {
      datas:[],
    };
  }
  onValueChange(value: string) {
    this.setState({
      code: value
    });
    
  }
  async veriGetir() {
    await AsyncStorage.getItem('myWallet')
      .then(req => JSON.parse(req))
      .then(json => this.setState({ datas: json }))
      .catch(error => Alert.alert('AsyncStorege myWallet sıkıntılı', error));
  }
  btnKaydet(){
    const obj = new Object();
    obj.code = this.state.code;
    obj.miktar =  this.state.miktar;
    obj.alisKuru = this.state.alisKuru;
    obj.tutar = parseFloat(this.state.miktar) * parseFloat(this.state.alisKuru);
    obj.karzarar = null;
    obj.color = null;
    if (this.state.datas===null||this.state.datas===undefined) {
      this.setState({ datas: obj });
    }
    else{
      this.setState({ datas: [...this.state.datas, obj] });
    }
  }
  componentWillMount(){
    this.veriGetir(); 

  }
  render() {
    AsyncStorage.setItem('myWallet', JSON.stringify(this.state.datas));
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
              <Input keyboardType='phone-pad' onChangeText={(text)=>this.setState({ alisKuru:text.replace(',','.') })}/>
            </Item>
            <Item stackedLabel last>
              <Label>Miktar</Label>
              <Input keyboardType='phone-pad' onChangeText={(text) => this.setState({ miktar: text.replace(',', '.') })} />
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
