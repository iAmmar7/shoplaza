import React, { useEffect } from 'react';
import { FlatList, Button, View, Text, Pressable, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import Loader from '../../components/UI/Loader';
import { addToCart } from '../../store/slices/cart';
import { fetchProducts } from '../../store/slices/products';
import colors from '../../constants/colors';

const ProductsOverviewScreen = (props) => {
  const { navigation } = props;
  const { availableProducts, loading, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => dispatch(fetchProducts()));
    return unsubscribe;
  }, []);

  const selectItemHandler = (id, title) => {
    navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title,
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
        <Pressable
          onPress={() => dispatch(fetchProducts())}
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

  if (!loading && availableProducts.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    );
  }

  return (
    <>
      {loading && <Loader />}
      <FlatList
        data={availableProducts}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          >
            <Button
              color={colors.primary}
              title="View Details"
              onPress={() => {
                selectItemHandler(itemData.item.id, itemData.item.title);
              }}
            />
            <Button
              color={colors.primary}
              title="To Cart"
              onPress={() => {
                dispatch(addToCart(itemData.item));
              }}
            />
          </ProductItem>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginVertical: 10,
    backgroundColor: colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  buttonText: {
    color: colors.white,
  },
});

export default ProductsOverviewScreen;
