import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import {Button, Image} from 'react-native-elements';
import LoginForm from '../forms/LoginForm';

const LoginScreenView = (props: {isMouned?: boolean}) => {
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
          source={require('./assets/sensehome.png')}
          transition={false}
          style={{
            width: 50,
            height: 50,
          }}
        />
        <View style={{width: 400}}>
          <View style={{marginBottom: 40}}>
            <Text style={{fontSize: 20, textAlign: 'center'}}>
              {props.isMouned ? 'Authentication' : 'Getting Ready'}
            </Text>
          </View>
          {props.isMouned ? <LoginForm /> : <Button loading type="clear" />}
        </View>
      </View>
    </>
  );
};

export default LoginScreenView;
