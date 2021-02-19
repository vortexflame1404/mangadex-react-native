import React from 'react';
import { Avatar, ListItem, Text } from '@ui-kitten/components';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/core';

const MangaThumbnail = ({ url }) => (
  <Avatar shape={'rounded'} source={{ uri: url }} ImageComponent={FastImage} />
);

export const UpdatesChapterListItem = ({ item }) => {
  const navigation = useNavigation();
  const { mangaTitle, volume, chapter, title, thumbnail_url, id, read } = item;
  let volumeString = '';
  let titleString = '';

  const renderThumbnail = () => <MangaThumbnail url={thumbnail_url} />;
  if (volume.length) {
    volumeString = `Vol.${volume} `;
  }
  if (title.length) {
    titleString = ` - ${title}`;
  }

  const textAppearance = read ? 'hint' : 'default';
  const renderTitle = () => (
    <Text
      appearance={textAppearance}
      category={'p1'}
      style={{ marginHorizontal: 5 }}>
      {mangaTitle}
    </Text>
  );
  const renderDescription = () => (
    <Text
      appearance={textAppearance}
      category={'c1'}
      style={{ marginHorizontal: 5 }}>
      {`${volumeString}Ch.${chapter}${titleString}`}
    </Text>
  );
  return (
    <ListItem
      title={renderTitle}
      description={renderDescription}
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
