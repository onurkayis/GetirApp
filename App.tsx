import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import LoginProvider from './context/LoginProvider';
import AuthStack from './navigator/AuthStack';
import store from './store/index';
import {Provider} from 'react-redux';
import {LogBox} from 'react-native';
LogBox.ignoreAllLogs();

export default function App() {
  return (
    <Provider store={store}>
      <LoginProvider>
        <NavigationContainer>
          <AuthStack />
          {/* bildirim mesajı için oluşturulan kod */}
          <FlashMessage
            titleStyle={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 15,
              textAlign: 'center',
            }}
            position="top"
          />
        </NavigationContainer>
      </LoginProvider>
    </Provider>
  );
}
