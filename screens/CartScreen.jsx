import React, { useMemo } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import CartItem from '../components/CartItem';
import Card from '../components/Card';
import Loader from '../components/Loader';
import { removeFromCart } from '../store/slices/cart';
import { addOrder } from '../store/slices/orders';
import colors from '../constants/colors';

const CartScreen = () => {
  const [{ totalAmount, items }, { loading, error }] = useSelector((state) => [state.cart, state.orders]);
  const dispatch = useDispatch();

  const cartItems = useMemo(() => {
    let transformedCartItems = [];
    for (const key in items) {
      transformedCartItems.push({
        productId: key,
        productTitle: items[key].productTitle,
        productPrice: items[key].productPrice,
        quantity: items[key].quantity,
        sum: items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) => (a.productId > b.productId ? 1 : -1));
  }, [items]);

  if (error) {
    Alert.alert('An error occured!', error, [{ text: 'Okay' }]);
  }

  return (
    <>
      {loading && <Loader />}
      <View style={styles.screen}>
        <Card style={styles.summary}>
          <Text style={styles.summaryText}>
            Total: <Text style={styles.amount}>${Math.round(totalAmount.toFixed(2) * 100) / 100}</Text>
          </Text>
          <Button
            color={colors.accent}
            title="Order Now"
            disabled={cartItems.length === 0}
            onPress={() => {
              dispatch(addOrder({ cartItems, totalAmount }));
            }}
          />
        </Card>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.productId}
          renderItem={(itemData) => (
            <CartItem
              quantity={itemData.item.quantity}
              title={itemData.item.productTitle}
              amount={itemData.item.sum}
              deletable
              onRemove={() => {
                dispatch(removeFromCart(itemData.item.productId));
              }}
            />
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
  },
  amount: {
    color: colors.primary,
  },
});

export default CartScreen;
