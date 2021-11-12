import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { DrawerNavigator, AuthNavigator } from './ShopNavigator';

const AppNavigator = () => {
  const isAuth = useSelector((state) => !!state.auth.token);

  return (
    <NavigationContainer>
      {isAuth && <DrawerNavigator />}
      {!isAuth && <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
