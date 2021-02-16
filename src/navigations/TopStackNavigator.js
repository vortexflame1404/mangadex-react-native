import React from 'react';
import { useTheme } from '@ui-kitten/components';
import MangaDetailScreen from '../screens/MangaDetailScreen';
import { BottomTabAppNavigator } from './BottomTabAppNavigator';
import { getHeaderTitle } from './helpers';
import { createStackNavigator } from '@react-navigation/stack';
import { ReaderScreen } from '../screens/ReaderScreen';

const { Navigator, Screen } = createStackNavigator();

export const TopStackNavigator = (props) => {
  const theme = useTheme();

  return (
    <Navigator
      initialRouteName={'AppTab'}
      screenOptions={{
        headerStyle: { backgroundColor: theme['background-basic-color-1'] },
        headerTintColor: theme['text-basic-color'],
        headerTitleAlign: 'center',
      }}>
      <Screen
        name={'AppTab'}
        component={BottomTabAppNavigator}
        options={({ route }) => ({ headerTitle: getHeaderTitle(route) })}
      />
      <Screen
        name={'Manga'}
        component={MangaDetailScreen}
        options={{ headerTitle: 'Details' }}
      />
      <Screen name={'Reader'} component={ReaderScreen} />
    </Navigator>
  );
};
