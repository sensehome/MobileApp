import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, Text} from 'react-native';
import {Card} from 'react-native-elements';
import {Color} from '../util/Colors';

interface Props {
  title?: string;
  content?: string;
  icon: string;
  backgroundColor?: Color;
  textColor?: Color;
  children?: React.ReactNode;
}

export default function DashboardCard(props: Props) {
  return (
    <Card
      containerStyle={{
        backgroundColor: props.backgroundColor,
        borderColor: props.backgroundColor,
        borderRadius: 10,
        width: 150,
      }}>
      <Card.Title
        style={{color: props.textColor ? props.textColor : Color.Black}}>
        {props.title}
      </Card.Title>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
        <Icon
          style={{
            marginTop: 5,
            color: props.textColor ? props.textColor : Color.Black,
          }}
          name={props.icon}
          size={24}
        />
        <Text
          style={{
            color: props.textColor ? props.textColor : Color.Black,
            fontSize: 20,
          }}>
          {props.content}
        </Text>
        {props.children ? (
          <View
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}>
            {props.children}
          </View>
        ) : (
          <></>
        )}
      </View>
    </Card>
  );
}
