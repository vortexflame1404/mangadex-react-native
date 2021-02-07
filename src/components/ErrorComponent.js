import React from 'react';
import { View } from 'react-native';
import { Text } from '@ui-kitten/components';

export const ErrorComponent = ({ code, message }) => {
  return (
    <View
      style={{ alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
      <Text status={'warning'} category={'h1'}>
        {message}
      </Text>
      <Text status={'warning'} category={'h1'}>
        {`Code: ${code}`}
      </Text>
    </View>
  );
};
