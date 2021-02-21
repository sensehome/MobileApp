import React from 'react';
import {Text, View} from 'react-native';
import {Image} from 'react-native-elements';
import LoginForm from '../forms/LoginForm';
import SenseHomeIcon from './assets/sensehome.png';

const LoginScreenView = (props: any) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
  );
};

export default LoginScreenView;
