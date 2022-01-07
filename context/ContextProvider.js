import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, createContext } from 'react';

const AppContext = createContext(null);

const colors = {
  light: {
    primary: '#1E6FEB',
    accent: '#FFC107',
    secondary: 'white',
    text: '#0D1117',
  },
  dark: {
    primary: '#1E6FEB',
    accent: '#FFC107',
    secondary: '#0D1117',
    text: 'white',
  },
};

const AppContextProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    async function fetchTheme() {
      const themeFromStorage = await AsyncStorage.getItem('theme');
      if (themeFromStorage) setTheme(themeFromStorage);
    }
    fetchTheme();
  }, []);

  return <AppContext.Provider value={{ colors: colors[theme], theme, toggleTheme }}>{children}</AppContext.Provider>;
};

export { AppContext };

export default AppContextProvider;
