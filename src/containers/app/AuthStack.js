import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import LoginScreen from "../../screens/auth/Login"
import SignupScreen from "../../screens/auth/SignUp"
import LandingScreen from "../../screens/DashBoard"
const Stack = createStackNavigator()
const AuthStack = (props) => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={({ route }) => ({
          title: "Sign Up",
        })}
      />
      <Stack.Screen
        name="Landing"
        component={LandingScreen}
        options={({ route }) => ({
          title: "Dashboard",
        })}
      />
    </Stack.Navigator>
  )
}
export default AuthStack
