import React from 'react';
import {Text, StyleSheet, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import IrisTheme from '../../Styles/IrisTheme';

export const {height, width} = Dimensions.get('window');

const textStyle = weight => {
  switch (weight) {
    case 'bold':
    case '700':
      return styles.irisTextBold;
    case 'semiBold':
    case '600':
      return styles.irisTextSemiBold;
    case 'medium':
    case '500':
      return styles.irisTextMedium;
    case 'light':
    case '300':
      return styles.irisTextLight;
    case 'normal':
    case '400':
    default:
      return styles.irisTextNormal;
  }
};

function IrisHeadingText(props) {
  return <Text style={styles.headingText}>{props.text}</Text>;
}

function IrisSubHeadingText(props) {
  return <Text style={styles.subHeadingText}>{props.text}</Text>;
}

function IrisNormalText(props) {
  if (props.text) {
    return <Text style={styles.normalText}>{props.text}</Text>;
  }
}

function IrisSmallText(props) {
  if (props.text) {
    return <Text style={styles.smallText}>{props.text}</Text>;
  }
}

function IrisSuperscriptText(props) {
  return <Text style={styles.supText}>{props.text}</Text>;
}
function IrisSubscriptText(props) {
  return <Text style={styles.subText}>{props.text}</Text>;
}

const IrisText = props => {
  return (
    <Text {...props} style={[props.style, textStyle(props.weight)]}>
      {props.children}
    </Text>
  );
};

IrisText.propTypes = {
  weight: PropTypes.oneOf([
    'bold',
    'semiBold',
    'medium',
    'normal',
    'light',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
  ]),
  children: PropTypes.any,
  style: PropTypes.any,
};

export {
  IrisHeadingText,
  IrisSubHeadingText,
  IrisNormalText,
  IrisSmallText,
  IrisSuperscriptText,
  IrisSubscriptText,
  IrisText,
};

const styles = StyleSheet.create({
  headingText: {
    fontSize: 22,
    color: IrisTheme.Text600,
    fontWeight: 'bold',
  },
  subHeadingText: {
    fontSize: 18,
    color: IrisTheme.Text600,
    fontWeight: 'bold',
  },
  normalText: {
    fontSize: 16,
    color: IrisTheme.Text600,
    //fontWeight:'700'
  },
  smallText: {
    fontSize: 14,
    //color: IrisTheme.Text600,
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
  irisTextLight: {
    fontFamily: 'Roboto-Light',
  },
  irisTextNormal: {
    fontFamily: 'Roboto-Regular',
  },
  irisTextMedium: {
    fontFamily: 'Roboto-Regular',
  },
  irisTextSemiBold: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '600',
  },
  irisTextBold: {
    fontFamily: 'Roboto-Bold',
  },
});
