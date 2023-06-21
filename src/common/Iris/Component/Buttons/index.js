import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {getColor} from '../../Styles/getColor';
import IrisTheme from '../../Styles/IrisTheme';

const IrisButton = (props = {}) => {
  const {
    // type="",
    icon = null,
    iconStyle = {marginTop: 3},
    ...restProps
  } = props || {};
  let componentStyle = {};

  let outline = restProps.type == 'outline' ? true : false;
  const colorData = outline
    ? getColor(restProps.color, 400, 'outline')
    : getColor(restProps.color, 400);

  if (outline) {
    componentStyle = {
      type: 'outline',
      buttonStyle: {
        borderColor: colorData ? colorData.finalColor : null,
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: null,
        padding: 3,
        height: restProps.height ? restProps.height : 32,
        ...(restProps?.style || {}),
      },
      titleStyle: {
        padding: 5,
        color: colorData ? colorData.textColor : null,
        minWidth: restProps?.style?.minWidth,
        textAlign: 'center',
      },
    };
    if (icon) {
      componentStyle.icon = (
        <FontAwesomeIcon
          size={15}
          icon={icon}
          color={colorData ? colorData.textColor : null}
          style={{...iconStyle}}
        />
      );
    }
  } else {
    componentStyle = {
      titleStyle: {
        borderRadius: 4,
        padding: 5,
        color: colorData ? colorData.textColor : null,
        minWidth: restProps?.style?.minWidth,
        textAlign: 'center',
      },
      buttonStyle: {
        backgroundColor: props.disabled
          ? IrisTheme.COOLGREY200
          : colorData
          ? colorData.finalColor
          : null,
        padding: 3,
        height: restProps.height ? restProps.height : 32,
      },
    };
    if (icon) {
      componentStyle.icon = (
        <FontAwesomeIcon
          size={15}
          icon={icon}
          color={colorData ? colorData.textColor : null}
          style={{...iconStyle}}
        />
      );
    }
  }

  return (
    <Button
      {...componentStyle}
      {...restProps}
      disabled={restProps.disabled ? true : false}
    />
  );
};

export default IrisButton;

const styles = StyleSheet.create({});
