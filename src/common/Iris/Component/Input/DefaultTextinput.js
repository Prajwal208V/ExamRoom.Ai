import React, {
  useRef,
  useImperativeHandle,
  useEffect,
  useState,
  useCallback,
  useMemo,
  forwardRef,
} from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Text,
} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  interpolateColor,
} from 'react-native-reanimated';
import IrisTheme from '../../Styles/IrisTheme';

const InputOutline = forwardRef((props, ref) => {
  // establish provided props
  const {
    // theme colors
    inactivePlaceholderColor = IrisTheme.Text400,
    inactiveColor = IrisTheme.BG400,
    activeColor = IrisTheme.PRIMARY400,
    errorColor = IrisTheme.RED400,
    backgroundColor = IrisTheme.BG000,
    disabledColor = IrisTheme.COOLGREY200,

    // fonts
    fontSize = 14,
    fontColor = IrisTheme.Text600,
    fontFamily,

    error,
    helperText = error,
    errorFontSize = 10,
    errorFontFamily,

    assistiveText,
    assistiveTextFontSize = 10,
    assistiveTextColor = inactiveColor,
    assistiveFontFamily,

    characterCount,
    characterCountFontFamily,
    characterCountColor = inactiveColor,
    characterCountFontSize = 10,

    // styling
    paddingHorizontal = 16,
    paddingVertical = 12,
    roundness = 4,
    style,

    // features
    label = 'Placeholder',
    trailingIcon,

    // others
    value: providedValue = '',
    onChangeText,
    width,
    onBlur = () => {},
    placeholder,
    picker,
    dropDown,
    disabled,
    editable,
    placeholderTextSize,
    noSpaces,
    autoCapitalize = 'none',
    combinedRight,
    combinedLeft,
    additionalStyle = {},
    ...inputProps
  } = props;
  // value of input
  const _providedValue = providedValue || '';
  const [value, setValue] = useState(_providedValue);
  const [focusedState, setFocusedState] = useState(false);

  // animation vars
  const inputRef = useRef(null);
  const placeholderMap = useSharedValue(_providedValue ? 1 : 0);
  const placeholderSize = useSharedValue(0);
  const colorMap = useSharedValue(0);

  // helper functinos
  const focus = () => inputRef.current?.focus();
  const blur = () => inputRef.current?.blur();
  const isFocused = () => Boolean(inputRef.current?.isFocused());
  const clear = () => {
    Boolean(inputRef.current?.clear());
    setValue('');
  };

  const errorState = useCallback(
    () => helperText !== null && helperText !== undefined,
    [helperText],
  );

  const handleFocus = () => {
    if (!disabled === true) {
      setFocusedState(true);
      placeholderMap.value = withTiming(1); // focused
      if (!errorState()) {
        colorMap.value = withTiming(1);
      } // active
      focus();
    }
  };

  const handleBlur = () => {
    setFocusedState(false);
    onBlur();
    if (!value) {
      placeholderMap.value = withTiming(0);
    } // blur
    if (!errorState()) {
      colorMap.value = withTiming(0);
    } // inactive
    blur();
  };

  useEffect(() => {
    if (picker === true) {
      placeholderMap.value = withTiming(1);
      colorMap.value = withTiming(1);
    } else if (picker === false) {
      colorMap.value = withTiming(0);
      if (!value) {
        placeholderMap.value = withTiming(0);
      }
    }
    return () => {};
  }, [colorMap, picker, placeholderMap, value]);

  const handleChangeText = text => {
    onChangeText && onChangeText(text);
    setValue(text);
  };

  const handlePlaceholderLayout = useCallback(
    ({nativeEvent}) => {
      const {width} = nativeEvent.layout;
      placeholderSize.value = width;
    },
    [placeholderSize],
  );

  const renderTrailingIcon = useCallback(() => {
    if (trailingIcon) {
      return trailingIcon({});
    }
    return null;
  }, [trailingIcon]);

  // handle value update
  useEffect(() => {
    if (_providedValue.length) {
      placeholderMap.value = withTiming(1);
    } // focused;
    setValue(_providedValue);
  }, [_providedValue, placeholderMap]);
  // helperText handling
  useEffect(() => {
    if (errorState()) {
      colorMap.value = 2; // helperText -- no animation here, snap to color immediately
    } else if (disabled) {
      colorMap.value = 3;
    } else {
      colorMap.value = isFocused() ? 1 : 0; // to active or inactive color if focused
    }
  }, [helperText, colorMap, errorState, disabled]);

  const animatedPlaceholderStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          placeholderMap.value,
          [0, 1],
          [0, -(paddingVertical + fontSize * 0.7)],
        ),
      },
      {
        scale: interpolate(placeholderMap.value, [0, 1], [1, 0.7]),
      },
      {
        translateX: interpolate(
          placeholderMap.value,
          [0, 1],
          [0, -placeholderSize.value * 0.2],
        ),
      },
    ],
  }));

  const animatedPlaceholderTextStyles = useAnimatedStyle(() => ({
    color: disabled
      ? disabledColor
      : interpolateColor(
          colorMap.value,
          [0, 1, 2, 3],
          [
            inactivePlaceholderColor,
            activeColor,
            errorColor,
            inactivePlaceholderColor,
          ],
        ),
  }));

  const animatedPlaceholderSpacerStyles = useAnimatedStyle(() => ({
    width: interpolate(
      placeholderMap.value,
      [0, 1],
      [0, placeholderSize.value * 0.7 + 7],
      Extrapolate.CLAMP,
    ),
  }));

  const animatedContainerStyle = useAnimatedStyle(() => ({
    borderColor:
      placeholderSize.value > 0
        ? interpolateColor(
            colorMap.value,
            [0, 1, 2, 3],
            [inactiveColor, activeColor, errorColor, disabledColor],
          )
        : inactiveColor,
  }));

  useImperativeHandle(ref, () => ({
    focus: handleFocus,
    blur: handleBlur,
    isFocused: isFocused(),
    clear: clear,
  }));

  const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      borderRadius: roundness,
      alignSelf: 'stretch',
      flexDirection: 'row',
      backgroundColor,
      marginVertical: 8,
      marginBottom: props.subText ? 28 : 16,
    },
    combinedRight: {
      borderRightWidth: 0,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    combinedLeft: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
    inputContainer: {
      flex: 1,
      paddingVertical: Platform.OS !== 'android' ? paddingVertical : undefined,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    input: {
      flex: 1,
      fontSize: placeholderTextSize ? placeholderTextSize : fontSize,
      paddingHorizontal: paddingHorizontal - 1,
      fontFamily,
      color: disabled ? disabledColor : fontColor,
    },
    placeholder: {
      position: 'absolute',
      top: paddingVertical,
      left: paddingHorizontal,
    },
    placeholderText: {
      fontSize,
      fontFamily,
    },
    placeholderSpacer: {
      position: 'absolute',
      top: -1,
      left: paddingHorizontal - 3,
      backgroundColor,
      height: 1.5,
    },
    errorText: {
      position: 'absolute',
      color: errorColor,
      fontSize: errorFontSize,
      fontFamily: errorFontFamily,
      bottom: -errorFontSize - 7,
      left: 0,
    },
    subText: {
      position: 'absolute',
      color: IrisTheme.COOLGREY400,
      fontSize: errorFontSize,
      fontFamily: errorFontFamily,
      bottom: -14,
      left: 0,
    },
    trailingIcon: {
      position: 'absolute',
      right: paddingHorizontal,
      alignSelf: 'center',
    },
    counterText: {
      position: 'absolute',
      color: errorState() ? errorColor : characterCountColor,
      fontSize: characterCountFontSize,
      bottom: -characterCountFontSize - 7,
      right: paddingHorizontal,
      fontFamily: characterCountFontFamily,
    },
    assistiveText: {
      position: 'absolute',
      color: assistiveTextColor,
      fontSize: assistiveTextFontSize,
      bottom: -assistiveTextFontSize - 7,
      left: paddingHorizontal,
      fontFamily: assistiveFontFamily,
    },
  });

  const placeholderStyle = useMemo(() => {
    return [styles.placeholder, animatedPlaceholderStyles];
  }, [styles.placeholder, animatedPlaceholderStyles]);

  const [widthContainer, setWidthContainer] = useState(200);

  return (
    <Animated.View
      onLayout={event => {
        const {width} = event.nativeEvent.layout;
        setWidthContainer(width - 30);
      }}
      pointerEvents={dropDown ? 'none' : undefined}
      style={[
        styles.container,
        animatedContainerStyle,
        style,
        {width},
        combinedRight ? styles.combinedRight : {},
        combinedLeft ? styles.combinedLeft : {},
      ]}>
      <TouchableWithoutFeedback onPress={handleFocus}>
        <View style={styles.inputContainer}>
          <TextInput
            autoCapitalize={autoCapitalize}
            editable={!dropDown && !disabled}
            {...inputProps}
            ref={inputRef}
            style={[styles.input, {...additionalStyle}]}
            pointerEvents={isFocused() ? 'auto' : 'none'}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={handleChangeText}
            maxLength={characterCount ? characterCount : undefined}
            selectionColor={errorState() ? errorColor : activeColor}
            placeholder={focusedState || props.labelDisabled ? placeholder : ''}
            value={noSpaces ? value.replace(/\s/g, '').trim() : value}
          />
        </View>
      </TouchableWithoutFeedback>
      {trailingIcon && (
        <View style={styles.trailingIcon}>{renderTrailingIcon()}</View>
      )}

      {!props.labelDisabled && (
        <>
          <Animated.View
            style={[styles.placeholderSpacer, animatedPlaceholderSpacerStyles]}
          />
          <Animated.View
            style={placeholderStyle}
            onLayout={handlePlaceholderLayout}
            pointerEvents="none">
            <Animated.Text
              numberOfLines={1}
              style={[
                styles.placeholderText,
                {
                  maxWidth: widthContainer,
                },
                animatedPlaceholderTextStyles,
              ]}>
              {label}
            </Animated.Text>
          </Animated.View>
        </>
      )}
      {characterCount && (
        <Text
          style={
            styles.counterText
          }>{`${value.length} / ${characterCount}`}</Text>
      )}
      {props.subText ? (
        <Text style={[styles.subText]}>{props.subText}</Text>
      ) : null}
      {errorState() ? (
        <Text
          style={[
            styles.errorText,
            props.subText ? {bottom: -errorFontSize - 14} : null,
          ]}>
          {helperText}
        </Text>
      ) : (
        assistiveText && (
          <Text style={[styles.assistiveText]}>{assistiveText}</Text>
        )
      )}
    </Animated.View>
  );
});

export default InputOutline;
