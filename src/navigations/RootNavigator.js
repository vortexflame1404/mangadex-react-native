import React, { useEffect, useLayoutEffect, useState } from 'react';
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
  const [showSplash, setShowSplash] = useState(true);
  const dispatch = useDispatch();

  const toast = authStatusText || authError;
  useEffect(() => {
    dispatch(authWhenLaunch());
    setShowSplash(false);
  }, [dispatch]);

  useEffect(() => {
    if (toast) {
      ToastAndroid.show(toast, ToastAndroid.SHORT);
    }
  }, [toast]);

  if (showSplash || loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {!auth ? <LoginScreen /> : <TopStackNavigator />}
    </NavigationContainer>
  );
};
