import React, { useContext } from 'react';
import { SafeAreaView, Button, Pressable, Text, View, Switch, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import { AppContext } from '../context/ContextProvider';

const DrawerItems = (props) => {
  const { colors, theme, toggleTheme } = useContext(AppContext);
  const styles = useStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <DrawerItemList {...props} />
        <Button title="Logout" color={colors.primary} onPress={props.logout} />
      </View>
      <Pressable style={styles.themeItem}>
        <Ionicons name="md-color-wand-sharp" size={24} color={colors.text} />
        <View style={styles.themeTextContainer}>
          <Text style={styles.themeText}>Dark Mode</Text>
          <Switch
            trackColor={{ false: '#767577', true: colors.primary }}
            thumbColor={theme === 'dark' ? colors.primary : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => toggleTheme()}
            value={theme === 'dark'}
            style={styles.switch}
          />
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

const useStyles = (colors) =>
  StyleSheet.create({
    container: {
      paddingTop: Constants.statusBarHeight,
      flex: 1,
      backgroundColor: colors.secondary,
      justifyContent: 'space-between',
    },
    themeItem: {
      marginVertical: 30,
      paddingHorizontal: 18,
      flexDirection: 'row',
      alignItems: 'center',
    },
    themeTextContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    themeText: {
      marginLeft: 24,
      color: colors.text,
      fontFamily: 'open-sans',
      fontSize: 15,
    },
    switch: {
      marginRight: 18,
    },
  });

export default DrawerItems;
