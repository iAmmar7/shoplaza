import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { enableScreens } from 'react-native-screens';

import ShopNavigator from './navigation/ShopNavigator';
import store from './store';

// Make RN use native (Android|iOS) screen behavior. Good for performance
enableScreens();

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded)
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={(err) => console.log('Fetch fonts error', err)}
      />
    );

  return (
    <>
      <StatusBar style="auto" />
      <Provider store={store}>
        <ShopNavigator />
      </Provider>
    </>
  );
}

export default App;
