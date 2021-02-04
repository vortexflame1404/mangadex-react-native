import React from 'react';
import { View } from 'react-native';
import { Text, Layout, Icon, useTheme } from '@ui-kitten/components';

const data = {
  rating: 9.39,
  users: 8180,
  views: 2269061,
  follows: 71251,
};

export default function RecentUpdateScreen(props) {
  const theme = useTheme();

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category={'h1'}>Update Screen</Text>
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <Icon
          name={'bar-chart'}
          fill={theme['color-primary-default']}
          style={{ height: 20, width: 20, marginEnd: 10 }}
        />
        <Text>{data.rating}</Text>
        <Icon
          name={'people'}
          fill={theme['color-primary-default']}
          style={{ height: 20, width: 20, marginEnd: 10 }}
        />
        <Text>{data.users}</Text>
      </View>
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <Icon
          name={'eye'}
          fill={theme['color-primary-default']}
          style={{ height: 20, width: 20, marginEnd: 10 }}
        />
        <Text>{data.views}</Text>
        <Icon
          name={'bookmark'}
          fill={theme['color-primary-default']}
          style={{ height: 20, width: 20, marginEnd: 10 }}
        />
        <Text>{data.follows}</Text>
      </View>
    </Layout>
  );
}
