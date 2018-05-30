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
<<<<<<< HEAD
    this.state = {alisKuru:null,miktar:null,code:"",datas:[],data:{
      code:"USD",alisKuru:2,miktar:4
    }};
=======
    this.state = {
      datas:[],
    };
>>>>>>> 52bc7c5a6d2974921cb0eb63f945d519fe50b0ab
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
<<<<<<< HEAD
    const {data,datas,alisKuru,code,miktar} = this.state;
    const a = [];
    data.code = code;
    data.alisKuru = alisKuru;
    data.miktar = miktar;
    
    this.setState({datas:[...this.state.datas,data]});
    //this.setState({datas:a})
    
    Alert.alert(this.state.datas);
   // veri geliyor...   
      //AsyncStorage.setItem('myWallet')
    
=======
    const obj = new Object();
    obj.code = this.state.code;
    obj.miktar =  this.state.miktar;
    obj.alisKuru = this.state.alisKuru;
    obj.tutar = this.state.miktar * this.state.alisKuru;
    if (this.state.datas===null||this.state.datas===undefined) {
      this.setState({ datas: obj });
    }
    else{
      this.setState({ datas: [...this.state.datas, obj] });
    }
  }
  componentWillMount(){
    this.veriGetir(); 
>>>>>>> 52bc7c5a6d2974921cb0eb63f945d519fe50b0ab
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
