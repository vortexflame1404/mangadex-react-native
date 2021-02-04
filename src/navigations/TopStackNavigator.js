import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MangaDetailScreen from '../screens/MangaDetailScreen';
import { BottomTabAppNavigator } from './BottomTabAppNavigator';
import { getHeaderTitle } from './helpers';

const { Navigator, Screen } = createStackNavigator();

export const TopStackNavigator = (props) => {
  return (
    <Navigator initialRouteName={'AppTab'}>
      <Screen
        name={'AppTab'}
        component={BottomTabAppNavigator}
        options={({ route }) => ({ headerTitle: getHeaderTitle(route) })}
      />
      <Screen
        name={'Manga'}
        component={MangaDetailScreen}
        options={({ route }) => ({ headerTitle: getHeaderTitle(route) })}
      />
    </Navigator>
  );
};
