import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon, ListItem, useTheme } from '@ui-kitten/components';
import { timestampToString } from '../utils';
import languages from '../assets/languages';

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
  const vol = item.volume ? `Vol ${item.volume} ` : '';
  const title = item.title ? ` - ${item.title}` : '';

  return (
    <ListItem
      title={vol + `Ch. ${item.chapter}` + title}
      description={
        timestampToString(item.timestamp) + '   ◈   ' + languages[item.language]
      }
      accessoryRight={DownloadIcon}
      onPress={() => console.log('id and hash', item.id + ' ' + item.hash)}
    />
  );
};
