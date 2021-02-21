import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import {Image} from 'react-native-elements';
import LoginForm from '../forms/LoginForm';
import SenseHomeIcon from './assets/sensehome.png';

const LoginScreenView = (props: any) => {
  return (
    <>
      <StatusBar backgroundColor="aliceblue" barStyle="dark-content" />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'aliceblue',
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
            <Text style={{fontSize: 20, textAlign: 'center'}}>
              Authentication
            </Text>
          </View>
          <LoginForm />
        </View>
      </View>
    </>
  );
};

export default LoginScreenView;
