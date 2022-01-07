import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { defaultStackOptions } from './AuthNavigator';
import AuthScreen from '../screens/AuthScreen';

const Stack = createNativeStackNavigator();

const NonAuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultStackOptions}>
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={() => ({
          title: 'Authenticate',
        })}
      />
    </Stack.Navigator>
  );
};

export default NonAuthNavigator;
