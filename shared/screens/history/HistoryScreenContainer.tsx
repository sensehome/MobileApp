import {AxiosError} from 'axios';
import React from 'react';
import {StatusBar, Text, View, Alert, ScrollView} from 'react-native';
import {Button, ListItem} from 'react-native-elements';
import StoreService from '../../services/StoreService';
import ApiService from '../../services/ApiService';
import {HistoryTemperatureHumidityDto} from '../../models/HistoryTemperatureHumidityDto';

export default class HistoryScreenContainer extends React.Component<any, any> {
  state = {
    temperatureHumidities: Array<HistoryTemperatureHumidityDto>(),
    isLoading: false,
  };

  componentDidMount() {
    StoreService.getBearerToken()
      .then((token) => {
        this.loadTemperatureHumidityHistory(token);
      })
      .catch((err) => {
        this.props.navigation.navigate('Login');
      });
  }

  loadTemperatureHumidityHistory = (token: string) => {
    this.setState({
      isLoading: true,
    });
    ApiService.getTemperatureHumidityHistory(token)
      .then((res) => {
        this.setState({
          temperatureHumidities: res.data,
          isLoading: false,
        });
      })
      .catch((err: AxiosError) => {
        if (err.code === '401') {
          this.props.navigation.navigate('Login');
        } else {
          this.setState({
            isLoading: false,
          });
          Alert.alert(JSON.stringify(err));
        }
      });
  };

  render() {
    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor="crimson" />
        <ScrollView>
          <View>
            <Button
              loadingProps={{size: 'large', color: 'lightseagreen'}}
              loading={this.state.isLoading}
              type="clear"
            />
          </View>
          <View>
            {this.state.temperatureHumidities.map((l, i) => (
              <ListItem key={i} bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>{`Temperature: ${l.temperature} | Humiditiy: ${l.humidity}`}</ListItem.Title>
                  <ListItem.Subtitle>
                    {new Date(l.date).toLocaleString()}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))}
          </View>
        </ScrollView>
      </>
    );
  }
}
