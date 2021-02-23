import React from 'react';
import {StatusBar, Text, View, Alert} from 'react-native';
import {Button, Image} from 'react-native-elements';
import StoreService from '../../services/StoreService';

export default class MenuScreenContainer extends React.Component<any, any> {
  onLogout = () => {
    StoreService.remoteBearerToken()
      .then(() => {})
      .catch((err) => {})
      .finally(() => {
        this.props.navigation.navigate('Login');
      });
  };
  render() {
    return (
      <>
        <StatusBar backgroundColor="crimson" />
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'crimson',
          }}>
          <Image
            source={require('./assets/sensehome.png')}
            style={{
              width: 50,
              height: 50,
            }}
          />
          <View style={{width: 400}}>
            <View style={{marginBottom: 40}}>
              <Text style={{fontSize: 20, textAlign: 'center', color: 'white'}}>
                SenseHome
              </Text>
              <Text style={{textAlign: 'center', color: 'white'}}>
                A Smart Home Automation System
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column-reverse',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View>
            <Button
              title="Logout"
              buttonStyle={{
                width: 200,
                height: 50,
                borderWidth: 15,
              }}
              titleStyle={{fontSize: 18}}
              onPress={(e) => {
                this.onLogout();
              }}
            />
          </View>
        </View>
      </>
    );
  }
}
