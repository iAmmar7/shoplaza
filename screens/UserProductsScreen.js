import React, { useContext } from 'react';
import { FlatList, Button, Alert, View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../components/ProductItem';
import Loader from '../components/Loader';
import { AppContext } from '../context/ContextProvider';
import { deleteProduct } from '../store/slices/products';

const UserProductsScreen = (props) => {
  const { navigation } = props;
  const { userProducts, loading, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { colors } = useContext(AppContext);
  const styles = useStyles(colors);

  const editProductHandler = (id) => {
    navigation.navigate('EditProduct', { productId: id });
  };

  const deleteHandler = (id) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(deleteProduct(id));
        },
      },
    ]);
  };

  if (error) {
    Alert.alert('An error occured!', error, [{ text: 'Okay' }]);
  }

  if (!loading && userProducts.length === 0) {
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
        data={userProducts}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
        renderItem={(itemData) => (
          <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            colors={colors}
            onSelect={() => {
              editProductHandler(itemData.item.id);
            }}
          >
            <Button
              color={colors.primary}
              title="Edit"
              onPress={() => {
                editProductHandler(itemData.item.id);
              }}
            />
            <Button color={colors.primary} title="Delete" onPress={() => deleteHandler(itemData.item.id)} />
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
  });

export default UserProductsScreen;
