import 'react-native-gesture-handler';
import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as theme } from './src/assets/custom-theme.json';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { RootNavigator } from './src/navigations/RootNavigator';
import { enableScreens } from 'react-native-screens';

enableScreens(true);

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    </ApplicationProvider>
  </>
);
