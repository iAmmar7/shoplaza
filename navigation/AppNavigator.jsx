import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { DrawerNavigator as ShopNavigator, AuthNavigator } from './ShopNavigator';
import StartupScreen from '../screens/StartupScreen';
import { logout } from '../store/slices/auth';

const AppNavigator = () => {
  const [isAuth, autoLoginTried] = useSelector((state) => [!!state.auth.token, state.auth.autoLoginTried]);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <NavigationContainer>
      {isAuth && <ShopNavigator logout={logoutHandler} />}
      {!isAuth && autoLoginTried && <AuthNavigator />}
      {!isAuth && !autoLoginTried && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
