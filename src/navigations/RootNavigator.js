import React, { useEffect } from 'react';
import { ToastAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import {
  authWhenLaunch,
  selectAuthError,
  selectAuthStatusText,
  selectIsAuthenticated,
  selectIsCheckingFirstLaunch,
} from '../redux/authSlices';
import LoginScreen from '../screens/LoginScreen';
import TopStackNavigator from './TopStackNavigator';
import { SplashScreen } from '../components/SplashScreen';

export const RootNavigator = () => {
  const loading = useSelector(selectIsCheckingFirstLaunch);
  const auth = useSelector(selectIsAuthenticated);
  const authStatusText = useSelector(selectAuthStatusText);
  const authError = useSelector(selectAuthError);
  const dispatch = useDispatch();

  const toast = authStatusText || authError;

  useEffect(() => {
    if (toast) {
      ToastAndroid.show(toast, ToastAndroid.SHORT);
    }
  }, [toast]);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        dispatch(authWhenLaunch());
        console.log('root nav after auth launch');
      } catch (e) {
        console.log('root nav');
        console.log(e);
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
