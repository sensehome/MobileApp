import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {AuthContext} from '../../../contexts/AuthContext';

const LoginForm = (props: any) => {
  const authContext = React.useContext(AuthContext);

  const usernameRef = React.createRef<Input>();
  const passwordRef = React.createRef<Input>();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const checkIfFormDataIsValid = (): boolean => {
    //TODO use username and password validator
    if (username === '') {
      usernameRef.current?.shake();
      return false;
    }
    if (password === '') {
      passwordRef.current?.shake();
      return false;
    }
    return true;
  };

  const handleLoginClick = () => {
    if (!checkIfFormDataIsValid()) {
      return;
    }
    authContext.onLogin({
      name: username,
      password: password,
    });
  };

  return (
    <>
      <View>
        <Input
          placeholder="username"
          label="User Name"
          ref={usernameRef}
          onChangeText={(value) => {
            setUsername(value);
          }}
          leftIcon={<Icon name="user" size={20} color="black" />}
        />
      </View>
      <View style={{marginTop: 20}}>
        <Input
          ref={passwordRef}
          placeholder="Password"
          label="Password"
          secureTextEntry={true}
          onChangeText={(value) => {
            setPassword(value);
          }}
          leftIcon={<Icon name="lock" size={20} color="black" />}
        />
      </View>
      <View style={{marginTop: 20}}>
        <Button
          title="Login"
          buttonStyle={{paddingTop: 12, paddingBottom: 12}}
          titleStyle={{fontSize: 18}}
          disabled={authContext.isLogging}
          loading={authContext.isLogging}
          onPress={(e) => {
            e.preventDefault();
            handleLoginClick();
          }}
        />
      </View>
    </>
  );
};

export default LoginForm;
