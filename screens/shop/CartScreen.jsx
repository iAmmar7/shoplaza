import React, { useMemo } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch, batch } from 'react-redux';

import CartItem from '../../components/shop/CartItem';
import { removeFromCart, clearCart } from '../../store/slices/cart';
import { addOrder } from '../../store/slices/orders';
import colors from '../../constants/colors';

const CartScreen = () => {
  const { totalAmount, items } = useSelector((state) => state.cart);
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

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${totalAmount?.toFixed(2)}</Text>
        </Text>
        <Button
          color={colors.accent}
          title="Order Now"
          disabled={cartItems.length === 0}
          onPress={() => {
            batch(() => {
              dispatch(addOrder({ cartItems, totalAmount }));
              dispatch(clearCart());
            });
          }}
        />
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            onRemove={() => {
              dispatch(removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />
    </View>
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
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
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
