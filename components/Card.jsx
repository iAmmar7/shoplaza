import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';

import { AppContext } from '../context/ContextProvider';

const Card = (props) => {
  const { theme, colors } = useContext(AppContext);

  const styles = useStyles(theme, colors);

  return <View style={{ ...styles.card, ...props.style }}>{props.children}</View>;
};

const useStyles = (theme, colors) =>
  StyleSheet.create({
    card: {
      shadowColor: theme === 'light' ? 'black' : 'white',
      shadowOpacity: 0.26,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      elevation: 5,
      borderRadius: 10,
      backgroundColor: theme === 'dark' ? colors.secondary : 'white',
    },
  });

export default Card;
