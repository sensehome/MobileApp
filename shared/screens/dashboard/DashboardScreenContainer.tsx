import React from 'react';
import DashboardScreenView from './views/DashboardScreenView';
import StoreService from '../../services/StoreService';
import {AgentService} from '../../services/AgentService';
import {HubConnectionState} from '@microsoft/signalr';
import {TemperatureHumidityDto} from '../../models/TemperatureHumidityDto';
import {TemperatureHumidityProvider} from '../../contexts/TemperatureHumidityContext';
import {LightFanActionProvider} from '../../contexts/LightFanActionContext';
import {ConnectivityProvider} from '../../contexts/ConnectivityContext';
import {ScrollView, StatusBar, Alert} from 'react-native';

export default class DashboardScreenContainer extends React.Component<
  any,
  any
> {
  state = {
    temperature: 0.0,
    humidity: 0.0,
    shouldRender: false,
    isLoggedIn: false,
    isLogging: false,
    temperatureList: [0],
    humidityList: [0],
    timeSeries: [new Date().toLocaleTimeString().substr(0, 5)],
    lightStatus: 'N/A',
    fanStatus: 'N/A',
    lightSwitch: false,
    fanSwitch: false,
    isMobileAndAgentIsConnected: false,
    isAgentAndBrokerIsConnected: false,
  };

  MAX_X = 7;

  componentDidMount() {
    StoreService.getBearerToken()
      .then((token) => {
        this.initializeAgentHubConnection();
        this.setState({
          isLoggedIn: true,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.setState({
          shouldRender: true,
        });
      });
  }

  initializeAgentHubConnection = () => {
    AgentService.connect()
      .then(() => {
        this.startAgentHubService();
      })
      .catch((err) => {
        Alert.alert(JSON.stringify(err));
      });
  };

  startAgentHubService = () => {
    console.log(AgentService.hasInstance());
    console.log(AgentService.getInstance());
    AgentService.getInstance()
      .Hub.start()
      .then(() => {
        this.agentHubSubsriptions();
        AgentService.getInstance().Hub.onclose((err) => {
          this.autoReconnectAgent();
        });
        this.setState({
          isAgentAndBrokerIsConnected: true,
          isMobileAndAgentIsConnected: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  autoReconnectAgent = () => {
    setTimeout(this.initializeAgentHubConnection, 5000);
  };

  agentHubSubsriptions = () => {
    if (!AgentService.hasInstance()) {
      return;
    }
    let agentHub = AgentService.getInstance().Hub;

    let callbackMap = [
      {
        topic: 'home/temperature-humidity',
        handler: this.onTemperatureHumidityReadingCallback,
      },
      {
        topic: 'home/living-room/light/status',
        handler: this.onLivingRoomLightStatusReadingCallback,
      },
      {
        topic: 'home/living-room/fan/status',
        handler: this.onLivingRoomFanStatusReadingCallback,
      },
    ];

    if (agentHub.state === HubConnectionState.Connected) {
      agentHub.on(
        AgentService.RpcHubConnection,
        this.onAgentMqttConnectionCallback,
      );
      agentHub.on(AgentService.RpcHubBroadcast, (topic, payload) => {
        let callback = callbackMap.find((c) => c.topic === topic);
        if (callback) {
          callback.handler(topic, payload);
        }
      });
    } else {
    }
  };

  onAgentMqttConnectionCallback = (isConnected: boolean) => {
    if (isConnected) {
      if (!this.state.isAgentAndBrokerIsConnected) {
        this.setState({
          isAgentAndBrokerIsConnected: true,
        });
      }
    } else {
      this.setState({
        isAgentAndBrokerIsConnected: false,
      });
    }
  };

  onTemperatureHumidityReadingCallback = (topic: string, payload: string) => {
    let temperatureHumidity = JSON.parse(payload) as TemperatureHumidityDto;
    let temp = Number.parseFloat(temperatureHumidity.temperature.toFixed(1));

    this.setState({
      temperature: temp,
      humidity: temperatureHumidity.humidity,
    });
    if (this.state.temperatureList.length < this.MAX_X) {
      this.setState({
        temperatureList: [...this.state.temperatureList, temp],
        humidityList: [
          ...this.state.humidityList,
          temperatureHumidity.humidity,
        ],
        timeSeries: [
          ...this.state.timeSeries,
          new Date().toLocaleTimeString().substr(0, 5),
        ],
      });
    } else {
      let len = this.state.temperatureList.length;
      this.setState({
        temperatureList: [
          ...this.state.temperatureList.slice(len - this.MAX_X, len),
          temp,
        ],
        humidityList: [
          ...this.state.humidityList.slice(len - this.MAX_X, len),
          temperatureHumidity.humidity,
        ],
        timeSeries: [
          ...this.state.timeSeries.slice(len - this.MAX_X, len),
          new Date().toLocaleTimeString().substr(0, 5),
        ],
      });
    }
  };

  onLivingRoomLightStatusReadingCallback = (
    topic: string,
    payload: string,
  ) => {};

  onLivingRoomFanStatusReadingCallback = (topic: string, payload: string) => {};

  handleFanSwitch = (isOn: boolean) => {
    let topic = 'home/living-room/fan/status/change';
    let payload = JSON.stringify({
      status: this.state.fanSwitch ? 'OFF' : 'ON',
    });
    if (AgentService.hasInstance()) {
      AgentService.getInstance().Hub.invoke(
        AgentService.RpcInvokePublish,
        topic,
        payload,
      );
    }
  };

  handleLightSwitch = (isOn: boolean) => {
    let topic = 'home/living-room/light/status/change';
    let payload = JSON.stringify({
      status: this.state.lightSwitch ? 'OFF' : 'ON',
    });
    if (AgentService.hasInstance()) {
      AgentService.getInstance().Hub.invoke(
        AgentService.RpcInvokePublish,
        topic,
        payload,
      );
    }
  };

  render() {
    return (
      <>
        <StatusBar
          barStyle="light-content"
          backgroundColor={
            this.state.isMobileAndAgentIsConnected ? 'mediumseagreen' : 'salmon'
          }
        />
        <ScrollView
          style={{
            backgroundColor: this.state.isMobileAndAgentIsConnected
              ? 'mediumseagreen'
              : 'salmon',
          }}>
          <TemperatureHumidityProvider
            value={{
              temperatureHistory: this.state.temperatureList,
              humiditityHistory: this.state.humidityList,
              temperature: this.state.temperature,
              humidity: this.state.humidity,
              timeSeries: this.state.timeSeries,
            }}>
            <LightFanActionProvider
              value={{
                lightStatus: this.state.lightStatus,
                fanStatus: this.state.fanStatus,
                lightSwitch: this.state.lightSwitch,
                fanSwitch: this.state.fanSwitch,
                onFanSwitch: this.handleFanSwitch,
                onLightSwitch: this.handleLightSwitch,
              }}>
              <ConnectivityProvider
                value={{
                  isMobileAndAgentIsConnected: this.state
                    .isMobileAndAgentIsConnected,
                  isAgentAndBrokerIsConnected: this.state
                    .isAgentAndBrokerIsConnected,
                }}>
                <DashboardScreenView />
              </ConnectivityProvider>
            </LightFanActionProvider>
          </TemperatureHumidityProvider>
        </ScrollView>
      </>
    );
  }
}
