import React from 'react';
import { FlatList, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import { deleteProduct } from '../../store/slices/products';
import colors from '../../constants/colors';

const UserProductsScreen = (props) => {
  const { navigation } = props;
  const { userProducts, loading, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();

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

  console.log('UserProductsScreen', loading, error);

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
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
  );
};

export default UserProductsScreen;
