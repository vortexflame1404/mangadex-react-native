import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RecentUpdateScreen from '../screens/RecentUpdateScreen';

const { Navigator, Screen } = createStackNavigator();

export const UpdateStackNavigator = () => {
  return (
    <Navigator initialRouteName={'Update'}>
      <Screen name={'Update'} component={RecentUpdateScreen} />
    </Navigator>
  );
};
