import React from 'react';
import { ScrollView, View, Text, Image, Button, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import colors from '../../constants/colors';

const ProductDetailScreen = (props) => {
  const {
    route: {
      params: { productId },
    },
  } = props;
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct?.imageUrl }} />
      <View style={styles.actions}>
        <Button color={colors.primary} title="Add to Cart" onPress={() => {}} />
      </View>
      <Text style={styles.price}>${selectedProduct?.price?.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct?.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
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
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

export default ProductDetailScreen;
