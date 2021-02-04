import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabBar } from '../components/BottomTabBar';
import LibraryScreen from '../screens/LibraryScreen';
import RecentUpdateScreen from '../screens/RecentUpdateScreen';
import { getHeaderTitle } from './helpers';

const { Navigator, Screen } = createBottomTabNavigator();

export const BottomTabAppNavigator = () => {
  return (
    <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
      {/* <Navigator>*/}
      <Screen
        name={'Library'}
        component={LibraryScreen}
        options={({ route }) => ({ headerTitle: getHeaderTitle(route) })}
      />
      <Screen
        name={'Update'}
        component={RecentUpdateScreen}
        options={({ route }) => ({ headerTitle: getHeaderTitle(route) })}
      />
    </Navigator>
  );
};
