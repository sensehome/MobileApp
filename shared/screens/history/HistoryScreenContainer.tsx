import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import {ListItem} from 'react-native-elements';

export default class HistoryScreenContainer extends React.Component<any, any> {
  render() {
    const l = [
      {
        value: 'Temperature: 22.2 Humidity: 68%',
        date: new Date().toLocaleString(),
      },
      {
        value: 'Temperature: 22.1 Humidity: 67%',
        date: new Date().toLocaleString(),
      },
    ];

    const list = [...l, ...l, ...l, ...l];

    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor="crimson" />
        <View>
          {list.map((l, i) => (
            <ListItem key={i} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{l.value}</ListItem.Title>
                <ListItem.Subtitle>{l.date}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
        </View>
      </>
    );
  }
}
