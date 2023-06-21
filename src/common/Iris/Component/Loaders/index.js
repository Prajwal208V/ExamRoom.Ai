import React, {Component} from 'react';
import {
  View,
  StatusBar,
  TextInput,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {LinearProgress} from 'react-native-elements';
import IrisTheme from '../../Styles/IrisTheme';

export const {height, width} = Dimensions.get('window');

function IrisSpinLoader(props) {
  const color = IrisTheme.PRIMARY400;
  return <ActivityIndicator {...props} color={color} />;
}

function IrisLinearLoader(props) {
  const color = IrisTheme.PRIMARY400;
  const track = IrisTheme.COOLGREY200;
  return <LinearProgress {...props} color={color} trackColor={track} />;
}

export {IrisSpinLoader, IrisLinearLoader};

const styles = StyleSheet.create({
  headingText: {
    fontSize: 22,
    color: '#000',
    fontWeight: 'bold',
  },
  subHeadingText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  normalText: {
    fontSize: 16,
    color: '#000',
    //fontWeight:'700'
  },
  smallText: {
    fontSize: 14,
    //color:'#000',
    //fontWeight:'700'
  },
  supText: {
    fontSize: 20 / 2.5,
    lineHeight: 30 / 2,
    textAlignVertical: 'top',
    //flexDirection:'flex-start'
  },
  subText: {
    fontSize: 11,
    lineHeight: 37,
  },
});
