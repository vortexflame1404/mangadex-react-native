import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, ToastAndroid } from 'react-native';
import {
  Input,
  Text,
  Layout,
  Button,
  useTheme,
  Icon,
  Spinner,
} from '@ui-kitten/components';
import Strings from '../../assets/Strings';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  login,
  selectAuthStatusText,
  selectIsAuthenticating,
} from '../../redux/authSlices';
import { unwrapResult } from '@reduxjs/toolkit';

export default function LoginScreen({ navigation, route }) {
  const [username, setUsername] = useState('thangle');
  const [password, setPassword] = useState('Th1s1sM4ng4D3x4cC0unt');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const theme = useTheme();
  const dispatch = useDispatch();
  const statusText = useSelector(selectAuthStatusText);
  const isAuthenticating = useSelector(selectIsAuthenticating);
  const buttonUsable = [username, password].every(Boolean) && !isAuthenticating;
  const buttonContent = isAuthenticating ? (
    <Spinner status={'basic'} />
  ) : (
    <Text style={{ color: theme['text-basic-color'] }}>
      {Strings.LOGIN_BTN}
    </Text>
  );

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  if (statusText) {
    ToastAndroid.show(statusText, ToastAndroid.SHORT);
  }
  const handleLogin = async () => {
    try {
      const resultAction = await dispatch(login({ username, password }));
      unwrapResult(resultAction);
    } catch (e) {
      console.log('login failed', e.message);
    }
  };

  return (
    <Layout style={styles.container}>
      <Text
        style={[styles.logo, { color: theme['text-basic-color'] }]}
        category={'h1'}>
        {Strings.APP_NAME}
      </Text>
      <View style={styles.inputView}>
        <Input
          style={styles.inputText}
          placeholder={Strings.USERNAME_PLACEHOLDER}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View style={styles.inputView}>
        <Input
          secureTextEntry={secureTextEntry}
          style={styles.inputText}
          placeholder={Strings.PASSWORD_PLACEHOLDER}
          accessoryRight={renderIcon}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <Button
        style={styles.loginBtn}
        appearance={'filled'}
        activeOpacity={0.5}
        disabled={!buttonUsable}
        onPress={() => handleLogin()}>
        {buttonContent}
      </Button>
    </Layout>
  );
}
