import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AppContext } from '../context/ContextProvider';

const CartItem = (props) => {
  const { quantity, title, amount, deletable, onRemove } = props;
  const { colors } = useContext(AppContext);
  const styles = useStyles(colors);

  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{quantity} </Text>
        <Text style={styles.mainText}>{title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>${amount?.toFixed(2)}</Text>
        {deletable && (
          <TouchableOpacity onPress={onRemove} style={styles.deleteButton}>
            <Ionicons name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'} size={23} color="red" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const useStyles = (colors) =>
  StyleSheet.create({
    cartItem: {
      padding: 10,
      backgroundColor: 'white',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 20,
      backgroundColor: colors.secondary,
      borderColor: colors.text,
      borderWidth: 1,
    },
    itemData: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    quantity: {
      fontFamily: 'open-sans',
      color: '#888',
      fontSize: 16,
    },
    mainText: {
      fontFamily: 'open-sans-bold',
      fontSize: 16,
      color: colors.text,
    },
    deleteButton: {
      marginLeft: 20,
    },
  });

export default CartItem;
