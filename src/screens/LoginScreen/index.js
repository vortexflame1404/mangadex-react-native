import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, Text, Layout, Button, useTheme } from '@ui-kitten/components';
import Strings from '../../assets/Strings';
import styles from './styles';

export default function LoginScreen(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const theme = useTheme();

  return (
    <Layout style={styles.container}>
      <Text
        style={[styles.logo, { color: theme['color-primary-default'] }]}
        category={'h1'}>
        {Strings.APP_NAME}
      </Text>
      <View style={styles.inputView}>
        <Input
          style={styles.inputText}
          placeholder={Strings.USERNAME_PLACEHOLDER}
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.inputView}>
        <Input
          secureTextEntry
          style={styles.inputText}
          placeholder={Strings.PASSWORD_PLACEHOLDER}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <Button style={styles.loginBtn} appearance={'filled'} activeOpacity={0.2}>
        {Strings.LOGIN_BTN}
      </Button>
    </Layout>
  );
}
