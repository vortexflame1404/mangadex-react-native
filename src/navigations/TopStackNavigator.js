import React from 'react';
import { useTheme } from '@ui-kitten/components';
import MangaDetailScreen from '../screens/MangaDetailScreen';
import { BottomTabAppNavigator } from './BottomTabAppNavigator';
import { getHeaderTitle } from './helpers';
import { createStackNavigator } from '@react-navigation/stack';
import { ReaderScreen } from '../screens/ReaderScreen';
import { ReaderScreenHeader } from '../components/ReaderScreenHeader';
import HeaderMenu from '../components/HeaderMenu';

const { Navigator, Screen } = createStackNavigator();

export default function TopStackNavigator() {
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
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
          headerRight: () => <HeaderMenu />,
        })}
      />
      <Screen
        name={'Manga'}
        component={MangaDetailScreen}
        options={{ headerTitle: 'Details' }}
      />
      <Screen
        name={'Reader'}
        component={ReaderScreen}
        options={({ route }) => ({
          headerTitle: (props) => (
            <ReaderScreenHeader
              {...props}
              mangaTitle={route.params.mangaTitle}
              chapterTitle={route.params.chapterTitle}
            />
          ),
          headerTitleAlign: 'left',
        })}
      />
    </Navigator>
  );
}
