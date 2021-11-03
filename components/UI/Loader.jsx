import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

import colors from '../../constants/colors';

const Loader = () => {
  return (
    <View style={{ ...StyleSheet.absoluteFillObject, ...styles.loader }}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

export default Loader;
