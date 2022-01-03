import React from 'react';
import {LoginDto} from '../models/AuthenticationDto';

interface IAuthContext {
  isLoggedIn?: boolean;
  isLogging?: boolean;
  onLogin: (data: LoginDto) => void;
}

export const AuthContext = React.createContext<IAuthContext>({
  onLogin: (data: LoginDto) => {},
});

export const AuthConsumer = AuthContext.Consumer;
export const AuthProvider = AuthContext.Provider;
