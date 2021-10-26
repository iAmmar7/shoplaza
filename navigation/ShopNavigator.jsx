import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import HeaderButton from '../components/UI/HeaderButton';
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
          options={({ navigation }) => ({
            title: 'All Products',
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Cart"
                  iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                  onPress={() => {
                    navigation.navigate('Cart');
                  }}
                />
              </HeaderButtons>
            ),
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
        <Stack.Screen name="Cart" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
