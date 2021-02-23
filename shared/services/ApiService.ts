import axios, {AxiosResponse} from 'axios';
import {TokenDto, LoginDto} from '../models/AuthenticationDto';
import { HistoryTemperatureHumidityDto } from '../models/HistoryTemperatureHumidityDto';

const SERVER_HOST = 'http://api.sensehome.online';

const ApiService = {
  login: (credential: LoginDto): Promise<AxiosResponse<TokenDto>> => {
    let endpoint = `${SERVER_HOST}/api/auth/login`;
    let body = JSON.stringify(credential);
    let config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return axios.post(endpoint, body, config);
  },

  getTemperatureHumidityHistory : (token : string) : Promise<AxiosResponse<Array<HistoryTemperatureHumidityDto>>> => {
    let endpoint = `${SERVER_HOST}/api/temperature-humidities`;
    let config = {
      headers: {
        'Authorization' :`Bearer ${token}`
      },
    };
    return axios.get(endpoint, config);
  }
};

export default ApiService;
