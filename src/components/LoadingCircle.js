import React from 'react';
import { Spinner } from '@ui-kitten/components';
import { View } from 'react-native';

export const LoadingCircle = () => {
  return (
    <View style={{ alignSelf: 'center', marginTop: 20 }}>
      <Spinner size={'giant'} />
    </View>
  );
};
