import React from 'react';
import { useTheme } from '@ui-kitten/components';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import MangaDetailScreen from '../screens/MangaDetailScreen';
import { BottomTabAppNavigator } from './BottomTabAppNavigator';
import { getHeaderTitle } from './helpers';

const { Navigator, Screen } = createNativeStackNavigator();

export const TopStackNavigator = (props) => {
  const theme = useTheme();

  return (
    <Navigator
      initialRouteName={'AppTab'}
      screenOptions={{
        headerStyle: { backgroundColor: theme['background-basic-color-1'] },
        headerTintColor: theme['text-basic-color'],
      }}>
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
