import {StyleSheet, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LandingScreen from '../../screens/DashBoard';
import {fetchStack} from '../../store/slices/Trends/StackSlice';
import {fetchCrypto} from '../../store/slices/Trends/CryptoSlice';
import {fetchForex} from '../../store/slices/Trends/ForexSlice';
import {useDispatch} from 'react-redux';
const Stack = createStackNavigator();
const HomeStack = props => {
  return (
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Landing"
        component={LandingScreen}
        options={({route}) => ({
          title: 'Dashboard',
        })}
      />
    </Stack.Navigator>
  );
};
export default HomeStack;
