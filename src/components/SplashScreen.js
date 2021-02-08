import React from 'react';
import { Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Layout } from '@ui-kitten/components';

export const SplashScreen = () => {
  const { height } = Dimensions.get('window');
  const imageSize = height / 6;

  return (
    <Layout
      style={{
        backgroundColor: '#FF6721',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <FastImage
        source={require('../assets/logo.png')}
        style={{
          width: imageSize,
          height: imageSize,
        }}
      />
    </Layout>
  );
};
