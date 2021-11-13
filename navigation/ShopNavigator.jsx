import React from 'react';
import { Platform, Dimensions, SafeAreaView, Button } from 'react-native';
import Constants from 'expo-constants';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import HeaderButton from '../components/UI/HeaderButton';
import colors from '../constants/colors';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const defaultStackOptions = {
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
};

const ProductsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultStackOptions}>
      <Stack.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={({ navigation }) => ({
          title: 'All Products',
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
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
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={() => ({
          title: 'Your Cart',
        })}
      />
    </Stack.Navigator>
  );
};

const OrdersNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultStackOptions}>
      <Stack.Screen
        name="Orders"
        component={OrdersScreen}
        options={({ navigation }) => ({
          title: 'Your Orders',
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const AdminNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultStackOptions}>
      <Stack.Screen
        name="UserProducts"
        component={UserProductsScreen}
        options={({ navigation }) => ({
          title: 'Your Products',
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Add"
                iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                onPress={() => {
                  navigation.navigate('EditProduct');
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <Stack.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={({ route: { params } }) => ({
          title: params?.productId ? 'Edit Product' : 'Add Product',
        })}
      />
    </Stack.Navigator>
  );
};

export const DrawerNavigator = ({ logout }) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: Dimensions.get('window').width >= 768 ? 'permanent' : 'front',
        activeTintColor: colors.primary,
      }}
      drawerContent={(props) => {
        return (
          <SafeAreaView style={{ paddingTop: Constants.statusBarHeight }}>
            <DrawerItemList {...props} />
            <Button title="Logout" color={colors.primary} onPress={logout} />
          </SafeAreaView>
        );
      }}
    >
      <Drawer.Screen
        name="ProductsDrawer"
        component={ProductsNavigator}
        options={() => ({
          drawerLabel: 'Products',
          drawerIcon: ({ color }) => (
            <Ionicons name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} size={23} color={color} />
          ),
        })}
      />
      <Drawer.Screen
        name="OrdersDrawer"
        component={OrdersNavigator}
        options={() => ({
          drawerLabel: 'Orders',
          drawerIcon: ({ color }) => (
            <Ionicons name={Platform.OS === 'android' ? 'md-list' : 'ios-list'} size={23} color={color} />
          ),
        })}
      />
      <Drawer.Screen
        name="AdminDrawer"
        component={AdminNavigator}
        options={() => ({
          drawerLabel: 'Admin',
          drawerIcon: ({ color }) => (
            <Ionicons name={Platform.OS === 'android' ? 'md-create' : 'ios-create'} size={23} color={color} />
          ),
        })}
      />
    </Drawer.Navigator>
  );
};

export const AuthNavigator = () => {
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
