import React, { useState, useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import CartItem from './CartItem';
import Card from './Card';
import { AppContext } from '../context/ContextProvider';

const OrderItem = (props) => {
  const { amount, date, items } = props;
  const { colors } = useContext(AppContext);
  const styles = useStyles(colors);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${amount.toFixed(2)}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Button
        color={colors.primary}
        title={showDetails ? 'Hide Details' : 'Show Details'}
        onPress={() => {
          setShowDetails((prevState) => !prevState);
        }}
      />
      {showDetails && (
        <View style={styles.detailItems}>
          {items.map((cartItem) => (
            <CartItem
              key={cartItem.productId}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
              title={cartItem.productTitle}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const useStyles = (colors) =>
  StyleSheet.create({
    orderItem: {
      margin: 20,
      padding: 10,
      alignItems: 'center',
    },
    summary: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginBottom: 15,
    },
    totalAmount: {
      fontFamily: 'open-sans-bold',
      fontSize: 16,
      color: colors.text,
    },
    date: {
      fontSize: 16,
      fontFamily: 'open-sans',
      color: '#888',
    },
    detailItems: {
      width: '100%',
      marginTop: 10,
    },
  });

export default OrderItem;
