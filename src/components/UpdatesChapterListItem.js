import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Avatar, ListItem, Text } from '@ui-kitten/components';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/core';
import { useSelector } from 'react-redux';

const MangaThumbnail = ({ url, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Avatar
      shape={'rounded'}
      source={{ uri: url }}
      ImageComponent={FastImage}
    />
  </TouchableOpacity>
);

const handleOnPressThumbnail = (navigation, param) =>
  navigation.navigate('Manga', param);

export const UpdatesChapterListItem = ({ item }) => {
  const navigation = useNavigation();
  const {
    chapterId,
    mangaId,
    volume,
    chapter,
    title,
    translatedLanguage,
    updatedAt,
    data,
    dataSaver,
    hash,
  } = item;
  const manga = useSelector((state) =>
    state.manga.mangaList.find((i) => i.mangaId === mangaId),
  );
  let volumeString = '';
  let titleString = '';

  const renderThumbnail = () => (
    <MangaThumbnail
      url={`${manga.uri}.512.jpg`}
      onPress={() => handleOnPressThumbnail(navigation, manga)}
    />
  );
  if (volume) {
    volumeString = `Vol.${volume} `;
  }
  if (title) {
    titleString = ` - ${title}`;
  }

  const renderTitle = () => (
    <Text
      category={'p1'}
      numberOfLines={1}
      ellipsizeMode={'tail'}
      style={{ marginHorizontal: 5 }}>
      {manga.title}
    </Text>
  );
  const renderDescription = () => (
    <Text
      category={'c1'}
      numberOfLines={1}
      ellipsizeMode={'tail'}
      style={{ marginHorizontal: 5 }}>
      {`${volumeString}Ch.${chapter}${titleString}`}
    </Text>
  );

  const selectHandler = () =>
    navigation.navigate('Reader', {
      chapterId,
      hash,
      data,
      dataSaver,
      mangaTitle: manga.title,
      chapterTitle: `${volumeString}Ch.${chapter}${titleString}`,
    });
  return (
    <ListItem
      title={renderTitle}
      description={renderDescription}
      accessoryLeft={renderThumbnail}
      onPress={selectHandler}
    />
  );
};
