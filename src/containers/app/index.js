import { StyleSheet } from "react-native"
import React from "react"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import store, { persistor } from "./store"
import Router from "./Router"
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <Router />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})
