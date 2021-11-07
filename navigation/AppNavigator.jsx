import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { DrawerNavigator, AuthNavigator } from './ShopNavigator';

const isAuth = false;
const AppNavigator = () => {
  return (
    <NavigationContainer>
      {isAuth && <DrawerNavigator />}
      {!isAuth && <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
