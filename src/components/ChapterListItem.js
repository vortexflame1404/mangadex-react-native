import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon, ListItem, Text, useTheme } from '@ui-kitten/components';
import { calculateDistanceFromTimestampToNow } from '../utils';
import languages from '../assets/languages';
import { useNavigation } from '@react-navigation/core';

const DownloadIcon = (props) => {
  const theme = useTheme();

  return (
    <TouchableOpacity>
      <Icon
        {...props}
        name={'arrow-circle-down-outline'}
        fill={theme['color-primary-default']}
      />
    </TouchableOpacity>
  );
};

export const ChapterListItem = ({ item }) => {
  const navigation = useNavigation();
  const vol = item.volume ? `Vol ${item.volume} ` : '';
  const title = item.title ? ` - ${item.title}` : '';

  const renderTitle = () => (
    <Text
      category={'p1'}
      numberOfLines={1}
      ellipsizeMode={'tail'}
      style={{ marginHorizontal: 5 }}>
      {vol + `Ch. ${item.chapter}` + title}
    </Text>
  );
  const renderDescription = () => (
    <Text
      category={'c1'}
      numberOfLines={1}
      ellipsizeMode={'tail'}
      style={{ marginHorizontal: 5 }}>
      {calculateDistanceFromTimestampToNow(item.timestamp) +
        '   ◈   ' +
        languages[item.language]}
    </Text>
  );

  return (
    <ListItem
      title={renderTitle}
      description={renderDescription}
      onPress={() =>
        navigation.navigate('Reader', {
          chapterId: item.id,
          chapterTitle: vol + `Ch. ${item.chapter}` + title,
          mangaTitle: item.mangaTitle,
        })
      }
    />
  );
};
