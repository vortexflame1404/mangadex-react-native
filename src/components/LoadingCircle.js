import React from 'react';
import { useTheme } from '@ui-kitten/components';
import { ActivityIndicator, View } from 'react-native';

export const LoadingCircle = () => {
  const theme = useTheme();
  return (
    <View style={{ alignSelf: 'center', marginTop: 20 }}>
      <ActivityIndicator
        size={'large'}
        color={theme['color-primary-default']}
      />
    </View>
  );
};
