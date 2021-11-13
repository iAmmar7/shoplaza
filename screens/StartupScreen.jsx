import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { setAutoLoginFailed, authenticate, refreshToken as refetchToken } from '../store/slices/auth';

const StartupScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');

      // Set auto login failed
      if (!userData) {
        dispatch(setAutoLoginFailed());
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate, refreshToken } = transformedData;
      const expirationDate = new Date(expiryDate);

      // Set auto login failed
      if (!token || !userId) {
        dispatch(setAutoLoginFailed());
        return;
      }

      // Refetch new token if the old one has expired
      if (expirationDate <= new Date()) {
        dispatch(refetchToken(refreshToken));
        return;
      }

      // Auto login user if everything is okay in AysncStorage
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
