import React from 'react';
import LightFanCardView from './LightFanCardView';
import TemperatureHumidityCardView from './TemperatureHumidityCardView';
import {ConnectivityContext} from '../../../contexts/ConnectivityContext';
import TemperatureHumiditityChartView from './TemperatureHumidityChartView';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

interface Props {}

const DashboardScreenView = (props: Props) => {
  const connectivityContext = React.useContext(ConnectivityContext);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.flexCenter}>
          <LightFanCardView />
        </View>

        <View style={styles.flexCenter}>
          <TemperatureHumidityCardView />
        </View>
      </View>

      <View
        style={{
          marginTop: 10,
        }}>
        <TemperatureHumiditityChartView />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
});

export default DashboardScreenView;
