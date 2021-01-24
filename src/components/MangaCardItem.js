import React from 'react';
import { StyleSheet, TouchableOpacity, Dimensions, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Text } from '@ui-kitten/components';

export default function ({ uri, title, onPress }) {
  const { width, height } = Dimensions.get('window');
  const sizeHeight = height / 3;
  const sizeWidth = width / 3;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.card, { width: sizeWidth, height: sizeHeight }]}
        onPress={onPress}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
  },
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
