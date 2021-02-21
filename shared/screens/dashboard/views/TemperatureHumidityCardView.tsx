import React from 'react';
import DashboardCard from '../../../components/DashboardCard';
import {Color} from '../../../util/Colors';
import {TemperatureHumidityConsumer} from '../../../contexts/TemperatureHumidityContext';

const TemperatureHumidityCardView = (props: {}) => {
  return (
    <TemperatureHumidityConsumer>
      {(context) => (
        <>
          <DashboardCard
            backgroundColor={Color.Warning}
            textColor={Color.White}
            title="Temperature"
            content={`${context.temperature}°C`}
            icon="thermometer-half"
          />
          <DashboardCard
            backgroundColor={Color.Primary}
            title="Humidity"
            textColor={Color.White}
            content={`${context.humidity}%`}
            icon="tint"
          />
        </>
      )}
    </TemperatureHumidityConsumer>
  );
};

export default TemperatureHumidityCardView;
