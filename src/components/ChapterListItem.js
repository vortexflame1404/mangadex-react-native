import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon, Text, useTheme } from '@ui-kitten/components';
import { calculateDistanceFromTimestampToNow } from '../utils';
import languages from '../assets/languages';
import { useNavigation } from '@react-navigation/core';
import { useSelector } from 'react-redux';
import { selectSelectedManga } from '../redux/mangaSlice';
import { listItemHeight } from '../utils';

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
  const manga = useSelector(selectSelectedManga);
  const vol = item.volume ? `Vol ${item.volume} ` : '';
  const title = item.title ? ` - ${item.title}` : '';
  const theme = useTheme();

  const chapterSelectHandler = () => {
    navigation.navigate('Reader', {
      chapterId: item.chapterId,
      chapterTitle: vol + `Ch. ${item.chapter}` + title,
      mangaTitle: manga.title,
      hash: item.hash,
      data: item.data,
      dataSaver: item.dataSaver,
    });
  };

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        width: '100%',
        height: listItemHeight,
        paddingVertical: 10,
        backgroundColor: theme['background-basic-color-1'],
      }}
      onPress={chapterSelectHandler}>
      <Text
        category={'p1'}
        numberOfLines={1}
        ellipsizeMode={'tail'}
        style={{ marginHorizontal: 5 }}>
        {vol + `Ch. ${item.chapter}` + title}
        <Text>{'\n'}</Text>
      </Text>
      <Text
        category={'c1'}
        numberOfLines={1}
        ellipsizeMode={'tail'}
        style={{ marginHorizontal: 5 }}>
        {calculateDistanceFromTimestampToNow(item.updatedAt) +
          '   ◈   ' +
          languages[item.translatedLanguage]}
      </Text>
    </TouchableOpacity>
  );
};
