import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
} from 'react-native';
import { Text } from '@ui-kitten/components';

export default function ({ uri }) {
  const { width, height } = Dimensions.get('window');
  const sizeHeight = height / 4;
  const sizeWidth = width / 3;

  return (
    <View style={{ flexDirection: 'column', flex: 1 }}>
      <TouchableOpacity
        style={[styles.card, { width: sizeWidth, height: sizeHeight }]}>
        <Image
          source={{
            uri: uri,
          }}
          style={styles.image}
        />
        <Text
          style={{ textAlign: 'center' }}
          numberOfLines={2}
          ellipsizeMode={'tail'}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          sodales.
        </Text>
      </TouchableOpacity>
    </View>
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
