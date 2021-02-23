import React from 'react';
import ApiService from '../../services/ApiService';
import StoreService from '../../services/StoreService';
import LoginScreenView from './views/LoginScreenView';
import {AuthProvider} from '../../contexts/AuthContext';
import {LoginDto} from '../../models/AuthenticationDto';
import {Alert} from 'react-native';

export default class LoginScreenContainer extends React.Component<any, any> {
  state = {
    isLoggedIn: false,
    isLogging: false,
    isMounted: false,
  };

  componentDidMount() {
    StoreService.getBearerToken()
      .then((token) => {
        this.props.navigation.navigate('Main');
      })
      .catch((err) => {
        this.setState({
          isMounted: true,
        });
      });
  }

  onLogin = (credential: LoginDto) => {
    this.setState({
      isLogging: true,
    });
    ApiService.login(credential)
      .then((res) => {
        StoreService.setBearerToken(res.data.bearer)
          .then((res) => {
            this.props.navigation.navigate('Main');
          })
          .catch((err) => {
            Alert.alert(JSON.stringify(err));
          });
      })
      .catch((err) => {
        Alert.alert(JSON.stringify(err));
      })
      .finally(() => {
        this.setState({isLogging: false});
      });
  };

  render() {
    return (
      <AuthProvider
        value={{
          onLogin: this.onLogin,
          isLoggedIn: this.state.isLoggedIn,
          isLogging: this.state.isLogging,
        }}>
        <LoginScreenView isMouned={this.state.isMounted} />
      </AuthProvider>
    );
  }
}
