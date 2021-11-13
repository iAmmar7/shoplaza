import React, { useContext } from 'react';
import { ScrollView, View, Text, Image, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { AppContext } from '../context/ContextProvider';
import { addToCart } from '../store/slices/cart';

const ProductDetailScreen = (props) => {
  const {
    route: {
      params: { productId },
    },
  } = props;
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );
  const dispatch = useDispatch();
  const { colors } = useContext(AppContext);
  const styles = useStyles(colors);

  return (
    <ScrollView style={styles.scrollView}>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={colors.primary}
          title="Add to Cart"
          onPress={() => {
            dispatch(addToCart(selectedProduct));
          }}
        />
      </View>
      <Text style={styles.price}>${selectedProduct.price?.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

const useStyles = (colors) =>
  StyleSheet.create({
    scrollView: {
      backgroundColor: colors.secondary,
    },
    image: {
      width: '100%',
      height: 300,
      backgroundColor: 'white',
    },
    actions: {
      marginVertical: 10,
      alignItems: 'center',
    },
    price: {
      fontSize: 20,
      color: '#888',
      textAlign: 'center',
      marginVertical: 20,
      fontFamily: 'open-sans-bold',
    },
    description: {
      fontFamily: 'open-sans',
      fontSize: 16,
      textAlign: 'center',
      marginHorizontal: 20,
      color: colors.text,
    },
  });

export default ProductDetailScreen;
