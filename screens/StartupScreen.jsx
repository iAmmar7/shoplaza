import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../constants/colors';
import { setAutoLoginFailed, authenticate } from '../store/slices/auth';

const StartupScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        dispatch(setAutoLoginFailed());
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        dispatch(setAutoLoginFailed());
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();

      dispatch(authenticate({ userId, token, expirationTime }));
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <Image
        fadeDuration={300}
        source={{ uri: 'https://cdn.pixabay.com/photo/2019/04/26/07/14/store-4156934_960_720.png' }}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#119abf',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default StartupScreen;
