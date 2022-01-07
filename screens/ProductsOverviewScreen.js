import React, { useEffect, useContext } from 'react';
import { FlatList, Button, View, Text, Pressable, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../components/ProductItem';
import Loader from '../components/Loader';
import { AppContext } from '../context/ContextProvider';
import { addToCart } from '../store/slices/cart';
import { fetchProducts } from '../store/slices/products';

const ProductsOverviewScreen = (props) => {
  const { navigation } = props;
  const { availableProducts, loading, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { colors } = useContext(AppContext);
  const styles = useStyles(colors);

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
        <Text style={styles.text}>No products found. Maybe start adding some?</Text>
      </View>
    );
  }

  return (
    <>
      {loading && <Loader />}
      <FlatList
        onRefresh={() => dispatch(fetchProducts())}
        refreshing={loading}
        data={availableProducts}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
        renderItem={(itemData) => (
          <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            colors={colors}
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
    text: {
      color: colors.text,
      fontFamily: 'open-sans',
      fontSize: 16,
    },
    buttonText: {
      color: 'white',
    },
  });

export default ProductsOverviewScreen;
