import React from 'react';
import { View } from 'react-native';
import { Text } from '@ui-kitten/components';

export const ReaderScreenHeader = ({ mangaTitle, chapterTitle }) => {
  return (
    <View style={{ flex: 1 }}>
      <Text category={'h5'} numberOfLines={1} ellipsizeMode={'tail'}>
        {mangaTitle}
      </Text>
      <Text appearance={'hint'} numberOfLines={1} ellipsizeMode={'tail'}>
        {chapterTitle}
      </Text>
    </View>
  );
};
