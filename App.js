import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import LibraryScreen from './src/screens/LibraryScreen';
import { default as theme } from './src/assets/custom-theme.json';

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
      <LibraryScreen />
    </ApplicationProvider>
  </>
);
