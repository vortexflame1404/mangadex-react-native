import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LibraryStackNavigator } from './LibraryStackNavigator';
import { UpdateStackNavigator } from './UpdateStackNavigator';

const { Navigator, Screen } = createBottomTabNavigator();

export const BottomTabAppNavigator = () => {
  return (
    <Navigator>
      <Screen
        name={'Library'}
        component={LibraryStackNavigator}
        options={{ title: 'Library' }}
      />
      <Screen
        name={'Update'}
        component={UpdateStackNavigator}
        options={{ title: 'Updates' }}
      />
    </Navigator>
  );
};
