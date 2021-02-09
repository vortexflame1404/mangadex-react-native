import React from 'react';
import { Layout } from '@ui-kitten/components';
import Logo from '../assets/Logo';

export const SplashScreen = () => {
  return (
    <Layout
      style={{
        backgroundColor: '#FF6721',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Logo />
    </Layout>
  );
};
