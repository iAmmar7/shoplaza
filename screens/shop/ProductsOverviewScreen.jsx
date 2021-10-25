import React from 'react';
import { FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';

const ProductsOverviewScreen = (props) => {
  const { availableProducts } = useSelector((state) => state.products);

  return (
    <FlatList
      data={availableProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => <Text>{itemData.item.title}</Text>}
    />
  );
};

export default ProductsOverviewScreen;
