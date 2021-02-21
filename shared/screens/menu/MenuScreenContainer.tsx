import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import {Button, Image} from 'react-native-elements';
import SenseHomeIcon from './assets/sensehome.png';

export default class MenuScreenContainer extends React.Component<any, any> {
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
            source={SenseHomeIcon}
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
                this.props.navigation.navigate('Login');
              }}
            />
          </View>
        </View>
      </>
    );
  }
}
