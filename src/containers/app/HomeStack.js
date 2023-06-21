import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import LandingScreen from "../../screens/DashBoard"
const Stack = createStackNavigator()
const HomeStack = (props) => {
  return (
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={{ headerShown: false }}
    >
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
export default HomeStack
