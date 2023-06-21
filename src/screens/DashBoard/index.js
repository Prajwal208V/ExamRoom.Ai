import React, { useEffect } from "react"
import { TouchableOpacity, View, Text, Platform } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import IrisTheme from "../../../src/common/Iris/Styles/IrisTheme"
import DeviceInfo from "react-native-device-info"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faBriefcase } from "@fortawesome/free-solid-svg-icons/faBriefcase"
import { faMoneyBillTrendUp } from "@fortawesome/free-solid-svg-icons/faMoneyBillTrendUp"
import JobPortalScreen from "./JobPortal"
import { useSelector, useDispatch } from "react-redux"
import TrendsScreen from "../Trends"
import { fetchCrypto } from "../../store/slices/Trends/CryptoSlice"
import { fetchForex } from "../../store/slices/Trends/ForexSlice"
import { fetchStack } from "../../store/slices/Trends/StackSlice"

const Tab = createBottomTabNavigator()

const options = {
  tabBarActiveTintColor: IrisTheme?.PRIMARY400,
  tabBarInactiveTintColor: IrisTheme?.BG500,
  tabBarLabelStyle: { fontSize: 12, fontWeight: "500" },
}

const CustomTabButton = (props) => (
  <TouchableOpacity
    {...props}
    // style={
    //   props.accessibilityState.selected
    //     ? [
    //         props.style,
    //         {
    //           borderTopColor: IrisTheme?.PRIMARY400,
    //           borderTopWidth: 10,
    //           borderRadius: 20,
    //           // borderBottomRightRadius: 2,
    //           // borderBottomLeftRadius: 2,
    //         },
    //       ]
    //     : props.style
    // }
  >
    <View
      style={
        props.accessibilityState.selected
          ? {
              position: "absolute",
              height: 4,
              backgroundColor: IrisTheme.PRIMARY400,
              borderRadius: 2,
              top: 0,
              left: 0,
              right: 0,
            }
          : {}
      }
    />
    {props.children}
  </TouchableOpacity>
)

const TabNavigator = (props) => {
  const dispatch = useDispatch()
  const cryptoDailyData = useSelector((state) => state.crypto?.cryptoDaysData)
  const forexoneHourData = useSelector((state) => state.forex?.forexOneHourData)
  const stackoneHourData = useSelector((state) => state.stacks?.stackHoursData)

  useEffect(() => {
    if (cryptoDailyData?.length === 0) {
      dispatch(fetchCrypto({ type: "Daily" }))
    }
    if (forexoneHourData?.length === 0) {
      dispatch(fetchForex({ type: "oneHour" }))
    }
    if (stackoneHourData?.length === 0) {
      dispatch(fetchStack({ type: "oneHour" }))
    }
  }, [cryptoDailyData, forexoneHourData, stackoneHourData])
  return (
    <>
      <Tab.Navigator
        backBehavior="none"
        screenOptions={{
          headerShown: false,
          lazy: true,
          tabBarStyle: DeviceInfo.isTablet() ? { height: 60 } : {},
        }}
        initialRouteName="JobPortalScreen"
        tabBarOptions={
          DeviceInfo.isTablet()
            ? {
                tabStyle: { flexDirection: "column", height: 45 },
              }
            : { tabStyle: {} }
        }
      >
        <Tab.Screen
          name="JobPortalScreen"
          component={JobPortalScreen}
          options={{
            unmountOnBlur: true,
            tabBarIcon: (props) => (
              <View style={{ paddingTop: 4 }}>
                <FontAwesomeIcon
                  icon={faBriefcase}
                  color={props.color}
                  size={Platform.OS === "ios" ? 21 : 20}
                />
              </View>
            ),
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  fontWeight: focused ? "700" : "500",
                  fontSize: 12,
                  color: focused ? IrisTheme?.PRIMARY400 : IrisTheme?.BG500,
                  marginLeft: 5,
                }}
              >
                Jobs
              </Text>
            ),
            ...options,
            tabBarButton: CustomTabButton,
          }}
          listeners={
            {
              // tabPress: e => {
              // },
            }
          }
        />
        <Tab.Screen
          name="TrendsScreen"
          component={TrendsScreen}
          options={{
            unmountOnBlur: true,
            tabBarIcon: (props) => (
              <View style={{ paddingTop: 4 }}>
                <FontAwesomeIcon
                  icon={faMoneyBillTrendUp}
                  color={props.color}
                  size={Platform.OS === "ios" ? 21 : 20}
                />
              </View>
            ),
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  fontWeight: focused ? "700" : "500",
                  fontSize: 12,
                  color: focused ? IrisTheme?.PRIMARY400 : IrisTheme?.BG500,
                  marginLeft: 5,
                }}
              >
                Market
              </Text>
            ),
            ...options,
            tabBarButton: CustomTabButton,
          }}
          listeners={
            {
              // tabPress: e => {
              // },
            }
          }
        />
      </Tab.Navigator>
    </>
  )
}

export default TabNavigator
