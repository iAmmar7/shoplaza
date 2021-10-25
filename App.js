import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';

import ShopNavigator from './navigation/ShopNavigator';
import store from './store';

function App() {
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
