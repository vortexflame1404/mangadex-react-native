import React from 'react';
import { Avatar, ListItem } from '@ui-kitten/components';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/core';

const MangaThumbnail = ({ url }) => (
  <Avatar shape={'rounded'} source={{ uri: url }} ImageComponent={FastImage} />
);

export const UpdatesChapterListItem = ({ item }) => {
  const navigation = useNavigation();
  const { mangaTitle, volume, chapter, title, thumbnail_url, id } = item;
  let volumeString = '';
  let titleString = '';

  const renderThumbnail = () => <MangaThumbnail url={thumbnail_url} />;
  if (volume.length) {
    volumeString = `Vol.${volume} `;
  }
  if (title.length) {
    titleString = ` - ${title}`;
  }
  return (
    <ListItem
      title={mangaTitle}
      description={`${volumeString}Ch.${chapter}${titleString}`}
      accessoryLeft={renderThumbnail}
      onPress={() =>
        navigation.navigate('Reader', {
          chapterId: id,
          mangaTitle: mangaTitle,
          chapterTitle: `${volumeString}Ch.${chapter}${titleString}`,
        })
      }
    />
  );
};
