import React, { createContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import NonAuthNavigator from './NonAuthNavigator';
import AuthNavigator from './AuthNavigator';
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
      {isAuth && <AuthNavigator logout={logoutHandler} />}
      {!isAuth && autoLoginTried && <NonAuthNavigator />}
      {!isAuth && !autoLoginTried && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
