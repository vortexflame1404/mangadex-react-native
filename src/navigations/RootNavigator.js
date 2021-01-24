import React, { useEffect } from 'react';
import { ToastAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import {
  checkAuth,
  selectAuthError,
  selectAuthStatusText,
  selectIsAuthenticated,
} from '../redux/authSlices';
import LoginScreen from '../screens/LoginScreen';
import { BottomTabAppNavigator } from './BottomTabNavigator';

export const RootNavigator = () => {
  const auth = useSelector(selectIsAuthenticated);
  const authStatusText = useSelector(selectAuthStatusText);
  const authError = useSelector(selectAuthError);
  const dispatch = useDispatch();
  console.log(auth);

  const toast = authStatusText || authError;

  if (toast) {
    ToastAndroid.show(toast, ToastAndroid.SHORT);
  }

  useEffect(() => {
    const checkLogin = async () => {
      try {
        await dispatch(checkAuth());
      } catch (e) {
        console.log(e.message);
      }
    };

    checkLogin();
  }, [dispatch]);

  return (
    <NavigationContainer>
      {!auth ? <LoginScreen /> : <BottomTabAppNavigator />}
    </NavigationContainer>
  );
};
