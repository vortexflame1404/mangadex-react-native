import React from 'react';
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/core';

export default function ({ item }) {
  const { uri, title, mangaId, description, other } = item;
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
          title,
          description,
          other,
          uri,
        })
      }>
      <FastImage
        source={{ uri: uri }}
        style={styles.image}
        defaultSource={require('../assets/cover_placeholder.png')}
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
