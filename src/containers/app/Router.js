import * as React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';

function Router() {
  return (
    <NavigationContainer>
      {/* <HomeStack /> */}
      <AuthStack />
    </NavigationContainer>
  );
}

export default Router;
