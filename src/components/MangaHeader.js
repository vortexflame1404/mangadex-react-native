import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Text, useTheme, Icon } from '@ui-kitten/components';
import FastImage from 'react-native-fast-image';

export const MangaHeader = ({ manga }) => {
  const { height } = Dimensions.get('window');
  const sizeHeight = height / 3;
  const theme = useTheme();

  return (
    <React.Fragment>
      <View style={[styles.container, { height: sizeHeight }]}>
        <FastImage
          source={{
            uri: manga.thumbnail_url,
          }}
          style={styles.image}
        />
        <View style={{ flex: 2, marginEnd: 5 }}>
          <Text category={'h3'} style={{ flexWrap: 'wrap', marginBottom: 10 }}>
            {manga.title}
          </Text>
          <Text
            style={{
              flexWrap: 'wrap',
              color: theme['text-hint-color'],
              marginBottom: 10,
            }}>
            {`${manga.authorAndArtist}`}
          </Text>
          <Text
            style={{
              color: theme['text-hint-color'],
              marginBottom: 10,
            }}>
            {manga.status}
          </Text>
          <View style={styles.stats}>
            <Icon
              style={styles.icon}
              fill={theme['color-primary-default']}
              name={'bar-chart'}
            />
            <Text
              style={{
                color: theme['color-primary-default'],
                marginEnd: 10,
              }}>
              {manga.rating ? manga.rating : null}
            </Text>
            <Icon
              fill={theme['color-primary-default']}
              style={styles.icon}
              name={'people'}
            />
            <Text
              style={{
                color: theme['color-primary-default'],
                marginEnd: 10,
              }}>
              {manga.users ? manga.users : null}
            </Text>
          </View>
          <View style={styles.stats}>
            <Icon
              style={styles.icon}
              fill={theme['color-primary-default']}
              name={'eye'}
            />
            <Text
              style={{
                color: theme['color-primary-default'],
                marginEnd: 10,
              }}>
              {manga.views}
            </Text>
            <Icon
              style={styles.icon}
              name={'bookmark'}
              fill={theme['color-primary-default']}
            />
            <Text
              style={{
                color: theme['color-primary-default'],
                marginEnd: 10,
              }}>
              {manga.follows}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 20, marginHorizontal: 10, marginBottom: 20 }}>
        <Text>{manga.description}</Text>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
    margin: 10,
    borderRadius: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginEnd: 10,
  },
  stats: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});
