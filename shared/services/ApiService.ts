import axios, {AxiosResponse} from 'axios';
import {TokenDto, LoginDto} from '../models/AuthenticationDto';

const SERVER_HOST = 'http://api.sensehome.online';

const ApiService = {
  login: (credential: LoginDto): Promise<AxiosResponse<TokenDto>> => {
    let endpoint = `${SERVER_HOST}/api/auth/login`;
    console.log(endpoint)
    let body = JSON.stringify(credential);
    let config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return axios.post(endpoint, body, config);
  },
};

export default ApiService;
