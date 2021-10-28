import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import OrderItem from '../../components/shop/OrderItem';

const readableDate = (date) => {
  return dayjs(date).format('MMMM DD YYYY, hh:mm');
};

const OrdersScreen = () => {
  const { orders } = useSelector((state) => state.orders);

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => {
        return (
          <OrderItem
            amount={itemData.item.totalAmount}
            date={readableDate(itemData.item.date)}
            items={itemData.item.items}
          />
        );
      }}
    />
  );
};

export default OrdersScreen;
