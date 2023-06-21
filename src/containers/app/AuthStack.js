import {StyleSheet, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../../screens/auth/Login';
import SignupScreen from '../../screens/auth/SignUp';
import IrisTheme from '../../../src/common/Iris/Styles/IrisTheme';
import LandingScreen from '../../screens/DashBoard';
import {fetchStack} from '../../store/slices/Trends/StackSlice';
import {fetchCrypto} from '../../store/slices/Trends/CryptoSlice';
import {fetchForex} from '../../store/slices/Trends/ForexSlice';
import {useDispatch} from 'react-redux';
const Stack = createStackNavigator();
const AuthStack = props => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchStack({type: 'oneHour'}));
  //   dispatch(fetchCrypto({type: 'Daily'}));
  //   dispatch(fetchForex({type: 'oneHour'}));
  // });
  return (
    <Stack.Navigator
      initialRouteName="Login"
      // headerMode="true"
      screenOptions={{
        headerStyle: {
          backgroundColor: IrisTheme.PRIMARY400,
        },
        headerTintColor: IrisTheme.COOLGREY200,
        headerTitleStyle: {
          fontSize: 22,
          fontWeight: '500',
        },
      }}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={({route}) => ({
          title: 'Sign Up',
        })}
      />
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
export default AuthStack;
