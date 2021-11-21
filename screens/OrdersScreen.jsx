import React, { useEffect, useContext } from 'react';
import { FlatList, StyleSheet, View, Text, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';

import Loader from '../components/Loader';
import OrderItem from '../components/OrderItem';
import { AppContext } from '../context/ContextProvider';
import { fetchOrders } from '../store/slices/orders';

const readableDate = (date) => {
  return dayjs(date).format('MMMM DD YYYY, hh:mm');
};

const OrdersScreen = () => {
  const { orders, loading, error } = useSelector((state) => state.orders);
  const { colors } = useContext(AppContext);
  const styles = useStyles(colors);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
        <Pressable
          onPress={() => dispatch(fetchOrders())}
          style={styles.button}
          android_ripple={{
            color: '#3c3c3c',
          }}
        >
          <Text style={styles.buttonText}>Try again?</Text>
        </Pressable>
      </View>
    );
  }

  if (!loading && orders.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No orders found. Maybe start oredering some?</Text>
      </View>
    );
  }

  return (
    <>
      {loading && <Loader />}
      <FlatList
        onRefresh={() => dispatch(fetchOrders())}
        refreshing={loading}
        data={orders}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
        renderItem={(itemData) => {
          return (
            <OrderItem
              amount={itemData.item.totalAmount}
              date={readableDate(itemData.item.date)}
              items={itemData.item.items}
            />
          );
        }}
      />
    </>
  );
};

export default OrdersScreen;

const useStyles = (colors) =>
  StyleSheet.create({
    flatList: {
      flex: 1,
      backgroundColor: colors.secondary,
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.secondary,
    },
    button: {
      marginVertical: 10,
      backgroundColor: colors.primary,
      paddingVertical: 6,
      paddingHorizontal: 8,
    },
    buttonText: {
      color: colors.secondary,
    },
  });
