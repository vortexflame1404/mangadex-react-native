import React, { useEffect, useState } from 'react';
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
import { TopStackNavigator } from './TopStackNavigator';
import { SplashScreen } from '../components/SplashScreen';

export const RootNavigator = () => {
  const [loading, setLoading] = useState(false);
  const auth = useSelector(selectIsAuthenticated);
  const authStatusText = useSelector(selectAuthStatusText);
  const authError = useSelector(selectAuthError);
  const dispatch = useDispatch();

  const toast = authStatusText || authError;

  if (toast) {
    ToastAndroid.show(toast, ToastAndroid.SHORT);
  }

  useEffect(() => {
    const checkLogin = async () => {
      try {
        setLoading(true);
        await dispatch(checkAuth());
      } catch (e) {
        console.log(e.message);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, [dispatch]);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {!auth ? <LoginScreen /> : <TopStackNavigator />}
    </NavigationContainer>
  );
};
