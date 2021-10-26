import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import colors from '../constants/colors';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Platform.OS === 'android' ? colors.primary : colors.white,
          },
          headerTitleStyle: {
            color: colors.white,
            fontFamily: 'open-sans-bold',
          },
          headerBackTitleStyle: {
            color: colors.white,
            fontFamily: 'open-sans',
          },
          headerTintColor: Platform.OS === 'android' ? colors.white : colors.primary,
        }}
      >
        <Stack.Screen
          name="ProductsOverview"
          component={ProductsOverviewScreen}
          options={() => ({
            title: 'All Products',
          })}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={({ route: { params } }) => {
            return {
              title: params?.productTitle,
            };
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
