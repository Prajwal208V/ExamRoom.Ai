// import '@support/performance';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './src/containers/app';
import {name as appName} from './app.json';
import {MMKV} from 'react-native-mmkv';
import {initializeMMKVFlipper} from 'react-native-mmkv-flipper-plugin';
import React from 'react';

export const storage = new MMKV();
if (__DEV__) {
  initializeMMKVFlipper({default: storage});
}

function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }
  return <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
