import React, { useContext } from 'react';
import { Platform, Dimensions, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import ProductsOverviewScreen from '../screens/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import OrdersScreen from '../screens/OrdersScreen';
import UserProductsScreen from '../screens/UserProductsScreen';
import EditProductScreen from '../screens/EditProductScreen';
import HeaderButton from '../components/HeaderButton';
import DrawerItems from '../components/DrawerItems';
import { AppContext } from '../context/ContextProvider';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export const defaultStackOptions = () => {
  const { colors } = useContext(AppContext);

  return {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? colors.primary : colors.secondary,
    },
    headerTitleStyle: {
      color: Platform.OS === 'android' ? 'white' : colors.primary,
      fontFamily: 'open-sans-bold',
    },
    headerBackTitleStyle: {
      color: colors.secondary,
      fontFamily: 'open-sans',
    },
    headerTintColor: Platform.OS === 'android' ? colors.secondary : colors.primary,
  };
};

const ProductsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultStackOptions()}>
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
    <Stack.Navigator screenOptions={defaultStackOptions()}>
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
    <Stack.Navigator screenOptions={defaultStackOptions()}>
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

const DrawerNavigator = ({ logout }) => {
  const { colors } = useContext(AppContext);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: Dimensions.get('window').width >= 768 ? 'permanent' : 'front',
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: 'red',
      }}
      drawerContent={(props) => <DrawerItems logout={logout} {...props} />}
    >
      <Drawer.Screen
        name="ProductsDrawer"
        component={ProductsNavigator}
        options={() => ({
          drawerLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? color : colors.text, fontFamily: 'open-sans' }}>Products</Text>
          ),
          drawerIcon: ({ focused, color }) => {
            return (
              <Ionicons
                name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                size={23}
                color={focused ? color : colors.text}
              />
            );
          },
        })}
      />
      <Drawer.Screen
        name="OrdersDrawer"
        component={OrdersNavigator}
        options={() => ({
          drawerLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? color : colors.text, fontFamily: 'open-sans' }}>Orders</Text>
          ),
          drawerIcon: ({ focused, color }) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
              size={23}
              color={focused ? color : colors.text}
            />
          ),
        })}
      />
      <Drawer.Screen
        name="AdminDrawer"
        component={AdminNavigator}
        options={() => ({
          drawerLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? color : colors.text, fontFamily: 'open-sans' }}>Admin</Text>
          ),
          drawerIcon: ({ focused, color }) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
              size={23}
              color={focused ? color : colors.text}
            />
          ),
        })}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
