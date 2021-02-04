import React from 'react';
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/core';

export default function ({ uri, title, mangaId }) {
  const { width, height } = Dimensions.get('window');
  const sizeHeight = height / 3;
  const sizeWidth = width / 3;
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.card, { width: sizeWidth, height: sizeHeight }]}
      onPress={() =>
        navigation.navigate('Manga', {
          mangaId: mangaId,
        })
      }>
      <FastImage
        source={{
          uri: uri,
        }}
        style={styles.image}
      />
      <Text
        style={{ textAlign: 'center' }}
        numberOfLines={2}
        ellipsizeMode={'tail'}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingTop: 5,
    paddingStart: 5,
    paddingEnd: 5,
    paddingBottom: 35,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
});
